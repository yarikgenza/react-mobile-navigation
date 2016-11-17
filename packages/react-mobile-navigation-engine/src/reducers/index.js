import * as StackSystemDataActionTypes from '../constants/stack-system-data-action-types';
import * as PagingActionTypes from '../constants/paging-action-types';
import { stackPagingReducers } from './stack-pages-reducers';

const initialState = {
  stackId: undefined,
  activePageId: undefined,
  pages: {},
};

function getPrevPageById(state) {
  return state.pages[state.activePageId].prevPageId;
}

function getPrevPageId(state, action) {
  return action.pageName !== state.activePageId ? state.activePageId : getPrevPageById(state);
}

function initStack(action) {
  return Object.assign({}, {
    stackId: action.stackId,
    activePageId: action.defaultPageId,
    pages: action.pages,
  });
}

export function stackSystemDataReducers(state = initialState, action) {
  switch (action.type) {
    case StackSystemDataActionTypes.INIT_STACK: {
      return initStack(action);
    }
    case PagingActionTypes.OPEN_PAGE: {
      const activePageId = getPrevPageId(state, action);
      return Object.assign({}, state, {
        activePageId: action.pageName,
        pages: stackPagingReducers(state.pages, action, activePageId),
      });
    }
    case PagingActionTypes.OPENING_PAGE:
    case PagingActionTypes.OPENING_PAGE_DONE:
    case PagingActionTypes.GOING_BACK:
      return Object.assign({}, state, {
        pages: stackPagingReducers(state.pages, action),
      });
    case PagingActionTypes.GO_BACK:
      // prevent closing main page
      if (!getPrevPageById(state)) {
        return state;
      }
      return Object.assign({}, state, {
        pages: stackPagingReducers(state.pages, action, state.activePageId),
      });
    case PagingActionTypes.GOING_BACK_DONE: {
      const newActivePageId = getPrevPageById(state);
      return Object.assign({}, state, {
        activePageId: newActivePageId,
        pages: stackPagingReducers(state.pages, action),
      });
    }
    default:
      return state;
  }
}
