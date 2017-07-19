import { PageStatusTypesEnum, PageTypesEnum } from 'react-mobile-navigation-core';
import {
  PAGE_OPEN_START,
  PAGE_OPEN_DONE,
  PAGE_CLOSE_START,
  PAGE_CLOSE_DONE,
} from '../action-types/navigation-action-types';
import { getPagingPrevPageById } from '../utils/page-manager';

const initialState = {
  isForce: undefined,
  prevPageId: undefined,
  status: undefined,
  zIndex: undefined,
};

export default (state = initialState, action, pageIdActive) => {
  switch (action.type) {
    case PAGE_OPEN_START: {
      const zIndex = state[pageIdActive].zIndex + 1;
      return Object.assign({}, state, {
        [action.pageIdNew]: action.isForce
          ? Object.assign({}, state[action.pageIdNew], {
            isForce: true,
            prevPageId: pageIdActive,
            status: PageStatusTypesEnum.OPEN_PROCESSING,
            zIndex,
          })
          : Object.assign({}, state[action.pageIdNew], {
            isForce: undefined,
            prevPageId: pageIdActive,
            status: PageStatusTypesEnum.OPEN_PROCESSING,
            zIndex,
          }),
        [pageIdActive]: state[action.pageIdNew].type === PageTypesEnum.ORIGINAL
          ? (
            action.isForce
              ? Object.assign({}, state[pageIdActive], {
                isForce: true,
                status: PageStatusTypesEnum.CLOSE_DONE,
              })
              : Object.assign({}, state[pageIdActive], {
                isForce: undefined,
                status: PageStatusTypesEnum.BACK_ANIMATING_OUT_PROCESSING,
              })
          )
          : state[pageIdActive],
      });
    }
    case PAGE_OPEN_DONE: {
      const pageIdActivePrev = getPagingPrevPageById(state, pageIdActive);
      return Object.assign({}, state, {
        [pageIdActive]: Object.assign({}, state[pageIdActive], {
          status: PageStatusTypesEnum.OPEN_DONE,
        }),
        [pageIdActivePrev]: state[pageIdActive].type === PageTypesEnum.ORIGINAL
          ? (
            state[pageIdActivePrev].isForce
              ? Object.assign({}, state[pageIdActivePrev], {
                status: PageStatusTypesEnum.CLOSE_DONE,
              })
              : Object.assign({}, state[pageIdActivePrev], {
                status: PageStatusTypesEnum.BACK_ANIMATING_OUT_DONE,
              })
          )
          : state[pageIdActivePrev],
      });
    }
    case PAGE_CLOSE_START: {
      const pageIdActivePrev = getPagingPrevPageById(state, pageIdActive);
      return Object.assign({}, state, {
        [pageIdActive]: (state[pageIdActive].isForce || action.isForce)
          ? Object.assign({}, state[pageIdActive], {
            isForce: true,
            status: PageStatusTypesEnum.CLOSE_PROCESSING,
            zIndex: 0,
          })
          : Object.assign({}, state[pageIdActive], {
            isForce: undefined,
            status: PageStatusTypesEnum.CLOSE_PROCESSING,
          }),
        [pageIdActivePrev]: state[pageIdActive].type === PageTypesEnum.ORIGINAL
          ? (
            action.isForce
              ? Object.assign({}, state[pageIdActivePrev], {
                isForce: true,
                status: PageStatusTypesEnum.OPEN_PROCESSING,
              })
              : Object.assign({}, state[pageIdActivePrev], {
                status: PageStatusTypesEnum.OPEN_PROCESSING,
              })
          )
          : state[pageIdActivePrev],
      });
    }
    case PAGE_CLOSE_DONE: {
      const pageIdActivePrev = getPagingPrevPageById(state, pageIdActive);
      return Object.assign({}, state, {
        [pageIdActive]: Object.assign({}, state[pageIdActive], {
          isForce: undefined,
          prevPageId: undefined,
          status: PageStatusTypesEnum.CLOSE_DONE,
          zIndex: 0,
        }),
        [pageIdActivePrev]: state[pageIdActive].type === PageTypesEnum.ORIGINAL
          ? Object.assign({}, state[pageIdActivePrev], {
            isForce: state[pageIdActivePrev].prevPageId
              ? state[state[pageIdActivePrev].prevPageId].isForce
              : undefined,
            status: PageStatusTypesEnum.OPEN_DONE,
          })
          : state[pageIdActivePrev],
      });
    }
    default:
      return state;
  }
};
