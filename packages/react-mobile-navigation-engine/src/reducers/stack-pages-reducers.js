import { PageStatusTypesEnum } from 'react-mobile-navigation-core';
import {
  PAGE_OPEN_START,
  PAGE_OPEN_DONE,
  PAGE_CLOSE_START,
  PAGE_CLOSE_DONE,
  PAGE_CLOSE_DONE_FORCE,
} from '../action-types/paging-action-types';
import { getPagingPrevPageById } from '../utils/page-manager';

const initialState = {
  direction: undefined,
  isShow: false,
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
          isShow: true,
          prevPageId: activePageId,
          status: PageStatusTypesEnum.OPEN_DONE,
          zIndex,
        }) : Object.assign({}, state[action.pageIdNew], {
          direction: undefined,
          isShow: true,
          prevPageId: activePageId,
          status: PageStatusTypesEnum.OPEN_DONE,
          zIndex,
        }),
        [activePageId]: action.direction ? Object.assign({}, state[activePageId], {
          direction: action.direction,
          status: PageStatusTypesEnum.BACK_ANIMATING_OUT_DONE,
        }) : Object.assign({}, state[activePageId], {
          direction: undefined,
          isShow: false,
          status: PageStatusTypesEnum.CLOSE_DONE,
        }),
      });
    }
    case PAGE_OPEN_DONE: {
      const activePageIdPrev = getPagingPrevPageById(state, activePageId);
      return Object.assign({}, state, {
        [activePageIdPrev]: Object.assign({}, state[activePageIdPrev], {
          isShow: false,
        }),
      });
    }
    case PAGE_CLOSE_START: {
      const activePageIdPrev = getPagingPrevPageById(state, activePageId);
      return Object.assign({}, state, {
        [activePageId]: state[activePageId].direction !== undefined
          ? Object.assign({}, state[activePageId], {
            status: PageStatusTypesEnum.CLOSE_DONE,
          }) : Object.assign({}, state[activePageId], {
            direction: undefined,
            // isShow: false,
            // prevPageId: undefined,
            status: PageStatusTypesEnum.CLOSE_DONE,
            zIndex: 0,
          }),
        [activePageIdPrev]: Object.assign({}, state[activePageIdPrev], {
          isShow: true,
          status: PageStatusTypesEnum.OPEN_DONE,
        }),
      });
    }
    case PAGE_CLOSE_DONE: {
      const activePageIdPrev = getPagingPrevPageById(state, activePageId);
      return Object.assign({}, state, {
        [activePageId]: Object.assign({}, state[activePageId], {
          direction: undefined,
          isShow: false,
          prevPageId: undefined,
          // status: PageStatusTypesEnum.CLOSE_DONE
          zIndex: 0,
        }),
        [activePageIdPrev]: Object.assign({}, state[activePageIdPrev], {
          direction: state[activePageIdPrev].prevPageId
            ? state[state[activePageIdPrev].prevPageId].direction
            : undefined,
        }),
      });
    }
    case PAGE_CLOSE_DONE_FORCE: {
      const activePageIdPrev = getPagingPrevPageById(state, activePageId);
      return Object.assign({}, state, {
        [activePageId]: Object.assign({}, state[activePageId], {
          direction: undefined,
          isShow: false,
          prevPageId: undefined,
          status: PageStatusTypesEnum.CLOSE_DONE,
          zIndex: 0,
        }),
        [activePageIdPrev]: Object.assign({}, state[activePageIdPrev], {
          direction: undefined,
          isShow: true,
          status: PageStatusTypesEnum.OPEN_DONE,
        }),
      });
    }
    default:
      return state;
  }
};
