import { PageStatusTypesEnum } from 'react-mobile-navigation-core';
import {
  GO_BACK,
  GOING_BACK,
  GOING_BACK_DONE,
  OPEN_PAGE,
  OPENING_PAGE,
  OPENING_PAGE_DONE,
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
    case OPEN_PAGE: {
      const zIndex = state[activePageId].zIndex + 1;
      return Object.assign({}, state, {
        [action.pageName]: Object.assign({}, state[action.pageName], {
          direction: action.direction,
          prevPageId: activePageId,
          status: OPEN_PREPARE,
          zIndex,
        }),
        [activePageId]: Object.assign({}, state[activePageId], {
          direction: action.direction,
          status: BACK_ANIMATING_OUT,
        }),
      });
    }
    case OPENING_PAGE: {
      return Object.assign({}, state, {
        [action.pageName]: Object.assign({}, state[action.pageName], {
          status: OPEN_ANIMATING,
        }),
      });
    }
    case OPENING_PAGE_DONE: {
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
    case GO_BACK: {
      const backMovingInId = getPagingPrevPageById(state, activePageId);
      return Object.assign({}, state, {
        [activePageId]: Object.assign({}, state[activePageId], {
          status: CLOSE_PREPARE,
        }),
        [backMovingInId]: Object.assign({}, state[backMovingInId], {
          direction: state[activePageId].direction,
          status: BACK_ANIMATING_IN,
        }),
      });
    }
    case GOING_BACK: {
      return Object.assign({}, state, {
        [action.pageName]: Object.assign({}, state[action.pageName], {
          status: CLOSE_ANIMATING,
        }),
      });
    }
    case GOING_BACK_DONE: {
      return Object.assign({}, state, {
        [action.pageName]: Object.assign({}, state[action.pageName], {
          direction: undefined,
          prevPageId: undefined,
          status: CLOSE_DONE,
          zIndex: 0,
        }),
        [activePageId]: Object.assign({}, state[activePageId], {
          status: OPEN_DONE,
        }),
      });
    }
    default:
      return state;
  }
};
