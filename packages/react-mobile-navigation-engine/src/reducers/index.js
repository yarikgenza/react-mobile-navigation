import { PageStatusTypesEnum } from 'react-mobile-navigation-core';
import { INIT_STACK } from '../constants/stack-system-data-action-types';
import {
  OPEN_PAGE,
  OPENING_PAGE,
  OPENING_PAGE_DONE,
  GO_BACK,
  GOING_BACK,
  GOING_BACK_DONE,
} from '../action-types/paging-action-types';
import stackPagingReducers, { getPagingPrevPageById } from './stack-pages-reducers';

const { CLOSE_ANIMATING } = PageStatusTypesEnum;

const initialState = {
  activePageId: undefined,
  pages: {},
  stackId: undefined,
};

function getPrevPageById(state) {
  return getPagingPrevPageById(state.pages, state.activePageId);
}

function isCurrentPageActive(state, pageName) {
  return pageName === state.activePageId;
}

function getPrevPageId(state, pageName) {
  return isCurrentPageActive(state, pageName) ? getPrevPageById(state) : state.activePageId;
}

function isClosingAnimation(pages) {
  return Object.keys(pages).find(pageId => pages[pageId].status === CLOSE_ANIMATING) !== undefined;
}

export default (state = initialState, action) => {
  switch (action.type) {
    case INIT_STACK: {
      return Object.assign({}, {
        stackId: action.stackId,
        activePageId: action.defaultPageId,
        pages: action.pages,
      });
    }
    case OPEN_PAGE: {
      // prevent opening new page until current closing is not finished
      if (isClosingAnimation(state.pages)) {
        return state;
      }
      const activePageId = getPrevPageId(state, action.pageName);
      return Object.assign({}, state, {
        activePageId: action.pageName,
        pages: stackPagingReducers(state.pages, action, activePageId),
      });
    }
    case OPENING_PAGE:
    case OPENING_PAGE_DONE:
    case GOING_BACK:
      return Object.assign({}, state, {
        pages: stackPagingReducers(state.pages, action),
      });
    case GO_BACK:
      // prevent closing main page
      if (!getPrevPageById(state)) {
        return state;
      }
      return Object.assign({}, state, {
        pages: stackPagingReducers(state.pages, action, state.activePageId),
      });
    case GOING_BACK_DONE: {
      const newActivePageId = getPrevPageById(state);
      return Object.assign({}, state, {
        activePageId: newActivePageId,
        pages: stackPagingReducers(state.pages, action, newActivePageId),
      });
    }
    default:
      return state;
  }
};
