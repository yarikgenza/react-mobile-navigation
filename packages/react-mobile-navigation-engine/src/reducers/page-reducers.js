import { PageStatusTypesEnum } from 'react-mobile-navigation-core';

export function pagingReducers(
  state,
  actionType,
  zIndex,
  activePageId,
  direction
) {
  switch (actionType) {
    case PageStatusTypesEnum.PREPARE_TO_OPEN:
      return Object.assign({}, state, {
        status: PageStatusTypesEnum.PREPARE_TO_OPEN,
        zIndex,
        prevPageId: activePageId,
        direction,
      });
    case PageStatusTypesEnum.OPENING:
      return Object.assign({}, state, {
        status: PageStatusTypesEnum.OPENING,
      });
    case PageStatusTypesEnum.OPENED:
      return Object.assign({}, state, {
        status: PageStatusTypesEnum.OPENED,
      });
    case PageStatusTypesEnum.PREPARE_TO_CLOSE:
      return Object.assign({}, state, {
        status: PageStatusTypesEnum.PREPARE_TO_CLOSE,
      });
    case PageStatusTypesEnum.CLOSING:
      return Object.assign({}, state, {
        status: PageStatusTypesEnum.CLOSING,
      });
    case PageStatusTypesEnum.CLOSED:
      return Object.assign({}, state, {
        status: PageStatusTypesEnum.CLOSED,
        zIndex: 0,
        prevPageId: undefined,
        direction: undefined,
      });
    default:
      return state;
  }
}
