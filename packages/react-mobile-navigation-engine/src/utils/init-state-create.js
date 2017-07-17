import { getInitPage } from './page-manager';
import { openPageDone } from '../actions/navigation-actions';
import navigationReducers from '../reducers/navigation-reducers';

function getInitPages(pageIdActive, pagesList) {
  return pagesList.reduce((accumulator, currentValue) => (
    Object.assign({}, accumulator, {
      [currentValue.pageId]: getInitPage(
        pageIdActive === currentValue.pageId,
        currentValue.pageType
      ),
    })
  ), {});
}

export default (pageIdRoot, pagesList, actions = []) => (
  actions.reduce((accumulator, action) => {
    const stateStart = {
      actionMeta: undefined,
      pageIdActive: action.pageIdNew,
      pages: navigationReducers(accumulator.pages, action, accumulator.pageIdActive),
    };
    return {
      actionMeta: undefined,
      pageIdActive: action.pageIdNew,
      pages: navigationReducers(stateStart.pages, openPageDone(), stateStart.pageIdActive),
    };
  }, {
    actionMeta: undefined,
    pageIdActive: pageIdRoot,
    pages: getInitPages(pageIdRoot, pagesList),
  })
);
