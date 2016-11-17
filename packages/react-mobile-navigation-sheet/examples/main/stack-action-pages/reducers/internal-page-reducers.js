import { PageStatusTypesEnum } from 'react-mobile-navigation-core';

export function internalPagingReducers(
  state,
  actionType,
  zIndex,
  direction
) {
  switch (actionType) {
    case PageStatusTypesEnum.PREPARE_TO_OPEN:
      return Object.assign({}, state, {
        status: PageStatusTypesEnum.PREPARE_TO_OPEN,
        zIndex,
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
        direction: undefined,
      });
    default:
      return state;
  }
}
