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
  prevPageId: undefined,
  status: undefined,
  zIndex: undefined,
};

export default (state = initialState, action, pageIdActive) => {
  switch (action.type) {
    case PAGE_OPEN_START: {
      const zIndex = state[pageIdActive].zIndex + 1;
      return Object.assign({}, state, {
        [action.pageIdNew]: action.direction !== undefined
          ? Object.assign({}, state[action.pageIdNew], {
            direction: action.direction,
            prevPageId: pageIdActive,
            status: PageStatusTypesEnum.OPEN_START,
            zIndex,
          }) : Object.assign({}, state[action.pageIdNew], {
            direction: undefined,
            prevPageId: pageIdActive,
            status: PageStatusTypesEnum.OPEN_START,
            zIndex,
          }),
        [pageIdActive]: action.direction !== undefined
          ? Object.assign({}, state[pageIdActive], {
            direction: action.direction,
            status: PageStatusTypesEnum.BACK_ANIMATING_OUT_START,
          }) : Object.assign({}, state[pageIdActive], {
            direction: undefined,
            status: PageStatusTypesEnum.CLOSE_DONE,
          }),
      });
    }
    case PAGE_OPEN_DONE: {
      const pageIdActivePrev = getPagingPrevPageById(state, pageIdActive);
      return Object.assign({}, state, {
        [pageIdActivePrev]: state[pageIdActivePrev].direction !== undefined
          ? Object.assign({}, state[pageIdActivePrev], {
            status: PageStatusTypesEnum.BACK_ANIMATING_OUT_DONE,
          }) : Object.assign({}, state[pageIdActivePrev], {
            status: PageStatusTypesEnum.CLOSE_DONE,
          }),
        [pageIdActive]: Object.assign({}, state[pageIdActive], {
          status: PageStatusTypesEnum.OPEN_DONE,
        }),
      });
    }
    case PAGE_CLOSE_START: {
      const pageIdActivePrev = getPagingPrevPageById(state, pageIdActive);
      return Object.assign({}, state, {
        [pageIdActive]: state[pageIdActive].direction !== undefined
          ? Object.assign({}, state[pageIdActive], {
            status: PageStatusTypesEnum.CLOSE_START,
          }) : Object.assign({}, state[pageIdActive], {
            direction: undefined,
            status: PageStatusTypesEnum.CLOSE_START,
            zIndex: 0,
          }),
        [pageIdActivePrev]: Object.assign({}, state[pageIdActivePrev], {
          status: PageStatusTypesEnum.OPEN_START,
        }),
      });
    }
    case PAGE_CLOSE_DONE_FORCE: {
      const pageIdActivePrev = getPagingPrevPageById(state, pageIdActive);
      return Object.assign({}, state, {
        [pageIdActive]: Object.assign({}, state[pageIdActive], {
          direction: undefined,
          status: PageStatusTypesEnum.CLOSE_START,
          zIndex: 0,
        }),
        [pageIdActivePrev]: Object.assign({}, state[pageIdActivePrev], {
          direction: undefined,
          status: PageStatusTypesEnum.OPEN_START,
        }),
      });
    }
    case PAGE_CLOSE_DONE: {
      const pageIdActivePrev = getPagingPrevPageById(state, pageIdActive);
      return Object.assign({}, state, {
        [pageIdActive]: Object.assign({}, state[pageIdActive], {
          direction: undefined,
          prevPageId: undefined,
          status: PageStatusTypesEnum.CLOSE_DONE,
          zIndex: 0,
        }),
        [pageIdActivePrev]: Object.assign({}, state[pageIdActivePrev], {
          direction: state[pageIdActivePrev].prevPageId
            ? state[state[pageIdActivePrev].prevPageId].direction
            : undefined,
          status: PageStatusTypesEnum.OPEN_DONE,
        }),
      });
    }
    default:
      return state;
  }
};
