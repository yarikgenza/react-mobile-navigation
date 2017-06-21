import { PageStatusTypesEnum } from 'react-mobile-navigation-core';
import {
  PAGE_OPEN_START,
  PAGE_OPENING,
  PAGE_OPEN_DONE,
  PAGE_CLOSE_START,
  PAGE_CLOSING,
  PAGE_CLOSE_DONE,
  PAGE_CLOSE_FORCE,
} from '../action-types/paging-action-types';
import stackPagingReducers from './stack-pages-reducers';
import { isPrevPage, getPrevPageById, getPrevPageId } from '../utils/page-manager';

const { CLOSE_ANIMATING } = PageStatusTypesEnum;

const initialState = {
  activePageId: undefined,
  pages: {},
};

function isClosingAnimation(pages) {
  return Object.keys(pages).find(pageId => pages[pageId].status === CLOSE_ANIMATING) !== undefined;
}

export default (state = initialState, action) => {
  switch (action.type) {
    case PAGE_OPEN_START: {
      // prevent opening new page until current closing is not finished
      if (isClosingAnimation(state.pages)) {
        return state;
      }
      // do not open previous page
      if (isPrevPage(state.pages, action.pageName)) {
        return state;
      }
      const activePageId = getPrevPageId(state, action.pageName);
      return Object.assign({}, state, {
        activePageId: action.pageName,
        pages: stackPagingReducers(state.pages, action, activePageId),
      });
    }
    case PAGE_OPENING:
    case PAGE_OPEN_DONE:
    case PAGE_CLOSING:
      return Object.assign({}, state, {
        pages: stackPagingReducers(state.pages, action),
      });
    case PAGE_CLOSE_START: {
        // prevent closing main page
      const newActivePageId = getPrevPageById(state);
      if (!newActivePageId) {
        return state;
      }
      // if no direction(animation) - set new active page here
      const { direction } = state.pages[state.activePageId];
      return Object.assign({}, state, {
        activePageId: direction ? state.activePageId : newActivePageId,
        pages: stackPagingReducers(state.pages, action, state.activePageId),
      });
    }
    case PAGE_CLOSE_DONE: {
      const newActivePageId = getPrevPageById(state);
      return Object.assign({}, state, {
        activePageId: newActivePageId,
        pages: stackPagingReducers(state.pages, action, newActivePageId),
      });
    }
    case PAGE_CLOSE_FORCE: {
      const newActivePageId = getPrevPageById(state);
      return Object.assign({}, state, {
        activePageId: newActivePageId,
        pages: stackPagingReducers(state.pages, action, state.activePageId),
      });
    }
    default:
      return state;
  }
};
