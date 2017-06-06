import { PageStatusTypesEnum } from 'react-mobile-navigation-core';
import {
  PAGE_CLOSE_START,
  PAGE_CLOSING,
  PAGE_CLOSE_DONE,
  PAGE_CLOSE_FORCE,
  PAGE_OPEN_START,
  PAGE_OPENING,
  PAGE_OPEN_DONE,
} from '../action-types/paging-action-types';
import { getPagingPrevPageById } from '../utils/page-manager';

const {
  BACK_ANIMATING_IN,
  BACK_ANIMATING_OUT,
  BACK_ANIMATING_OUT_DONE,
  OPEN_PREPARE,
  OPEN_ANIMATING,
  OPEN_DONE,
  CLOSE_PREPARE,
  CLOSE_ANIMATING,
  CLOSE_DONE,
} = PageStatusTypesEnum;

const initialState = {
  direction: undefined,
  prevPageId: undefined,
  status: undefined,
  zIndex: undefined,
};

function getBackMovingOutPageId(pages) {
  return Object.keys(pages).find(pageId => pages[pageId].status === BACK_ANIMATING_OUT);
}

export default (state = initialState, action, activePageId) => {
  switch (action.type) {
    case PAGE_OPEN_START: {
      const zIndex = state[activePageId].zIndex + 1;
      return Object.assign({}, state, {
        [action.pageName]: action.direction ? Object.assign({}, state[action.pageName], {
          direction: action.direction,
          prevPageId: activePageId,
          status: OPEN_PREPARE,
          zIndex,
        }) : Object.assign({}, state[action.pageName], {
          direction: undefined,
          prevPageId: activePageId,
          status: OPEN_DONE,
          zIndex,
        }),
        [activePageId]: action.direction ? Object.assign({}, state[activePageId], {
          direction: action.direction,
          status: BACK_ANIMATING_OUT,
        }) : Object.assign({}, state[activePageId], {
          direction: undefined,
          status: CLOSE_DONE,
        }),
      });
    }
    case PAGE_OPENING: {
      return Object.assign({}, state, {
        [action.pageName]: Object.assign({}, state[action.pageName], {
          status: OPEN_ANIMATING,
        }),
      });
    }
    case PAGE_OPEN_DONE: {
      const backMovingOutId = getBackMovingOutPageId(state);
      return Object.assign({}, state, {
        [action.pageName]: Object.assign({}, state[action.pageName], {
          status: OPEN_DONE,
        }),
        [backMovingOutId]: Object.assign({}, state[backMovingOutId], {
          status: BACK_ANIMATING_OUT_DONE,
        }),
      });
    }
    case PAGE_CLOSE_START: {
      const backMovingInId = getPagingPrevPageById(state, activePageId);
      const { direction } = state[activePageId];
      return Object.assign({}, state, {
        [activePageId]: direction ? Object.assign({}, state[activePageId], {
          status: CLOSE_PREPARE,
        }) : Object.assign({}, state[activePageId], {
          direction: undefined,
          prevPageId: undefined,
          status: CLOSE_DONE,
          zIndex: 0,
        }),
        [backMovingInId]: direction ? Object.assign({}, state[backMovingInId], {
          direction: state[activePageId].direction,
          status: BACK_ANIMATING_IN,
        }) : Object.assign({}, state[backMovingInId], {
          direction: state[backMovingInId].prevPageId
            ? state[state[backMovingInId].prevPageId].direction
            : undefined,
          status: OPEN_DONE,
        }),
      });
    }
    case PAGE_CLOSING: {
      return Object.assign({}, state, {
        [action.pageName]: Object.assign({}, state[action.pageName], {
          status: CLOSE_ANIMATING,
        }),
      });
    }
    case PAGE_CLOSE_DONE: {
      return Object.assign({}, state, {
        [action.pageName]: Object.assign({}, state[action.pageName], {
          direction: undefined,
          prevPageId: undefined,
          status: CLOSE_DONE,
          zIndex: 0,
        }),
        [activePageId]: Object.assign({}, state[activePageId], {
          direction: state[activePageId].prevPageId
            ? state[state[activePageId].prevPageId].direction
            : undefined,
          status: OPEN_DONE,
        }),
      });
    }
    case PAGE_CLOSE_FORCE: {
      const backMovingInId = getPagingPrevPageById(state, activePageId);
      return Object.assign({}, state, {
        [activePageId]: Object.assign({}, state[activePageId], {
          direction: undefined,
          prevPageId: undefined,
          status: CLOSE_DONE,
          zIndex: 0,
        }),
        [backMovingInId]: Object.assign({}, state[backMovingInId], {
          direction: undefined,
          status: OPEN_DONE,
        }),
      });
    }
    default:
      return state;
  }
};
