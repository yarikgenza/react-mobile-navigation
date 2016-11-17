import { PageStatusTypesEnum } from 'react-mobile-navigation-core';
import {
  GO_BACK,
  GOING_BACK,
  GOING_BACK_DONE,
  OPEN_PAGE,
  OPENING_PAGE,
  OPENING_PAGE_DONE,
} from '../constants/paging-action-types';
import { pagingReducers } from './page-reducers';

const initialState = {};

export function stackPagingReducers(state = initialState, action, activePageId) {
  switch (action.type) {
    case OPEN_PAGE: {
      const pageName = action.pageName;
      const zIndex = state[activePageId].zIndex + 1;
      const pageValue = pagingReducers(
        state[pageName],
        PageStatusTypesEnum.PREPARE_TO_OPEN,
        zIndex,
        activePageId,
        action.direction
      );
      return Object.assign({}, state, {
        [pageName]: pageValue,
      });
    }
    case OPENING_PAGE: {
      const pageName = action.pageName;
      const pageValue = pagingReducers(state[pageName], PageStatusTypesEnum.OPENING);
      return Object.assign({}, state, {
        [pageName]: pageValue,
      });
    }
    case OPENING_PAGE_DONE: {
      const pageName = action.pageName;
      const pageValue = pagingReducers(state[pageName], PageStatusTypesEnum.OPENED);
      return Object.assign({}, state, {
        [pageName]: pageValue,
      });
    }
    case GO_BACK: {
      const pageValue = pagingReducers(state[activePageId], PageStatusTypesEnum.PREPARE_TO_CLOSE);
      return Object.assign({}, state, {
        [activePageId]: pageValue,
      });
    }
    case GOING_BACK: {
      const pageName = action.pageName;
      const pageValue = pagingReducers(state[pageName], PageStatusTypesEnum.CLOSING);
      return Object.assign({}, state, {
        [pageName]: pageValue,
      });
    }
    case GOING_BACK_DONE: {
      const pageName = action.pageName;
      const pageValue = pagingReducers(state[pageName], PageStatusTypesEnum.CLOSED);
      return Object.assign({}, state, {
        [pageName]: pageValue,
      });
    }
    default:
      return state;
  }
}
