import { PageStatusTypesEnum } from 'react-mobile-navigation-core';
import {
  PAGE_OPEN_START,
  // PAGE_OPEN_DONE,
  PAGE_CLOSE_START,
  PAGE_CLOSE_DONE,
} from '../action-types/paging-action-types';
import { getPagingPrevPageById } from '../utils/page-manager';

const initialState = {
  direction: undefined,
  prevPageId: undefined,
  status: undefined,
  zIndex: undefined,
};

export default (state = initialState, action, activePageId) => {
  switch (action.type) {
    case PAGE_OPEN_START: {
      const zIndex = state[activePageId].zIndex + 1;
      return Object.assign({}, state, {
        [action.pageIdNew]: action.direction ? Object.assign({}, state[action.pageIdNew], {
          direction: action.direction,
          prevPageId: activePageId,
          status: PageStatusTypesEnum.OPEN_DONE,
          zIndex,
        }) : Object.assign({}, state[action.pageIdNew], {
          direction: undefined,
          prevPageId: activePageId,
          status: PageStatusTypesEnum.OPEN_DONE,
          zIndex,
        }),
        [activePageId]: action.direction ? Object.assign({}, state[activePageId], {
          direction: action.direction,
          status: PageStatusTypesEnum.BACK_ANIMATING_OUT_DONE,
        }) : Object.assign({}, state[activePageId], {
          direction: undefined,
          status: PageStatusTypesEnum.BACK_ANIMATING_OUT_DONE,
        }),
      });
    }
    /*
    case PAGE_OPEN_DONE: {
      const backMovingOutId = state[activePageId].prevPageId;
      return Object.assign({}, state, {
        [action.pageIdNew]: Object.assign({}, state[action.pageIdNew], {
          // status: OPEN_DONE,
        }),
        [backMovingOutId]: Object.assign({}, state[backMovingOutId], {
          // status: BACK_ANIMATING_OUT_DONE,
        }),
      });
    }
    */
    case PAGE_CLOSE_START: {
      const activePageIdPrev = getPagingPrevPageById(state, activePageId);
      return Object.assign({}, state, {
        [activePageId]: Object.assign({}, state[activePageId], {
          status: PageStatusTypesEnum.CLOSE_DONE,
        }),
        [activePageIdPrev]: Object.assign({}, state[activePageIdPrev], {
          status: PageStatusTypesEnum.OPEN_DONE,
        }),
      });
    }
    case PAGE_CLOSE_DONE: {
      const activePageIdPrev = getPagingPrevPageById(state, activePageId);
      return Object.assign({}, state, {
        [activePageId]: Object.assign({}, state[activePageId], {
          direction: undefined,
          prevPageId: undefined,
          zIndex: 0,
        }),
        [activePageIdPrev]: Object.assign({}, state[activePageIdPrev], {
          direction: state[activePageIdPrev].prevPageId
            ? state[state[activePageIdPrev].prevPageId].direction
            : undefined,
        }),
      });
    }
    default:
      return state;
  }
};
