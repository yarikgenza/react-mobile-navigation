import { PageStatusTypesEnum, PageTypesEnum } from 'react-mobile-navigation-core';
import {
  PAGE_OPEN_START,
  PAGE_OPEN_PROCESSING,
  PAGE_OPEN_DONE,
  PAGE_CLOSE_START,
  PAGE_CLOSE_PROCESSING,
  PAGE_CLOSE_DONE,
} from '../action-types/navigation-action-types';
import { getPagingPrevPageById } from '../utils/page-manager';

const initialState = {
  isForce: undefined,
  prevPageId: undefined,
  status: undefined,
  zIndex: undefined,
};

function getStartOpeningPageState(state, action, pageIdActive) {
  const zIndex = state[pageIdActive].zIndex + 1;
  return action.isForce
    ? Object.assign({}, state[action.pageIdNew], {
      isForce: true,
      prevPageId: pageIdActive,
      status: PageStatusTypesEnum.OPEN_PROCESSING,
      zIndex,
    })
    : Object.assign({}, state[action.pageIdNew], {
      isForce: undefined,
      prevPageId: pageIdActive,
      status: PageStatusTypesEnum.OPEN_START,
      zIndex,
    });
}

function getStartClosingPageState(state, action, pageIdActive) {
  return (state[pageIdActive].isForce || action.isForce)
    ? Object.assign({}, state[pageIdActive], {
      isForce: true,
      status: PageStatusTypesEnum.CLOSE_PROCESSING,
      zIndex: 0,
    })
    : Object.assign({}, state[pageIdActive], {
      isForce: undefined,
      status: PageStatusTypesEnum.CLOSE_START,
    });
}

export default (state = initialState, action, pageIdActive) => {
  switch (action.type) {
    case PAGE_OPEN_START: {
      if (state[action.pageIdNew].type === PageTypesEnum.ORIGINAL) {
        return Object.assign({}, state, {
          [action.pageIdNew]: getStartOpeningPageState(state, action, pageIdActive),
          [pageIdActive]: (
            action.isForce
              ? Object.assign({}, state[pageIdActive], {
                isForce: true,
                status: PageStatusTypesEnum.CLOSE_DONE,
              })
              : Object.assign({}, state[pageIdActive], {
                isForce: undefined,
                status: PageStatusTypesEnum.BACK_ANIMATING_OUT_START,
              })
          ),
        });
      }
      return Object.assign({}, state, {
        [action.pageIdNew]: getStartOpeningPageState(state, action, pageIdActive),
      });
    }
    case PAGE_OPEN_PROCESSING: {
      if (state[action.pageIdNew].type === PageTypesEnum.ORIGINAL) {
        return Object.assign({}, state, {
          [action.pageIdNew]: Object.assign({}, state[action.pageIdNew], {
            status: PageStatusTypesEnum.OPEN_PROCESSING,
          }),
          [pageIdActive]: (
            action.isForce
              ? Object.assign({}, state[pageIdActive], { })
              : Object.assign({}, state[pageIdActive], {
                status: PageStatusTypesEnum.BACK_ANIMATING_OUT_PROCESSING,
              })
          ),
        });
      }
      return Object.assign({}, state, {
        [action.pageIdNew]: Object.assign({}, state[action.pageIdNew], {
          status: PageStatusTypesEnum.OPEN_PROCESSING,
        }),
      });
    }
    case PAGE_OPEN_DONE: {
      if (state[pageIdActive].type === PageTypesEnum.ORIGINAL) {
        const pageIdActivePrev = getPagingPrevPageById(state, pageIdActive);
        return Object.assign({}, state, {
          [pageIdActive]: Object.assign({}, state[pageIdActive], {
            status: PageStatusTypesEnum.OPEN_DONE,
          }),
          [pageIdActivePrev]: (
            state[pageIdActivePrev].isForce
              ? Object.assign({}, state[pageIdActivePrev], {
                status: PageStatusTypesEnum.CLOSE_DONE,
              })
              : Object.assign({}, state[pageIdActivePrev], {
                status: PageStatusTypesEnum.BACK_ANIMATING_OUT_DONE,
              })
          ),
        });
      }
      return Object.assign({}, state, {
        [pageIdActive]: Object.assign({}, state[pageIdActive], {
          status: PageStatusTypesEnum.OPEN_DONE,
        }),
      });
    }
    case PAGE_CLOSE_START: {
      if (state[pageIdActive].type === PageTypesEnum.ORIGINAL) {
        const pageIdActivePrev = getPagingPrevPageById(state, pageIdActive);
        return Object.assign({}, state, {
          [pageIdActive]: getStartClosingPageState(state, action, pageIdActive),
          [pageIdActivePrev]: (
            action.isForce
              ? Object.assign({}, state[pageIdActivePrev], {
                isForce: true,
                status: PageStatusTypesEnum.BACK_ANIMATING_IN_PROCESSING,
              })
              : Object.assign({}, state[pageIdActivePrev], {
                status: PageStatusTypesEnum.BACK_ANIMATING_IN_START,
              })
          ),
        });
      }
      return Object.assign({}, state, {
        [pageIdActive]: getStartClosingPageState(state, action, pageIdActive),
      });
    }
    case PAGE_CLOSE_PROCESSING: {
      if (state[pageIdActive].type === PageTypesEnum.ORIGINAL) {
        const pageIdActivePrev = getPagingPrevPageById(state, pageIdActive);
        return Object.assign({}, state, {
          [pageIdActive]: Object.assign({}, state[pageIdActive], {
            status: PageStatusTypesEnum.CLOSE_PROCESSING,
          }),
          [pageIdActivePrev]: Object.assign({}, state[pageIdActivePrev], {
            status: PageStatusTypesEnum.BACK_ANIMATING_IN_PROCESSING,
          }),
        });
      }
      return Object.assign({}, state, {
        [pageIdActive]: Object.assign({}, state[pageIdActive], {
          status: PageStatusTypesEnum.CLOSE_PROCESSING,
        }),
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
