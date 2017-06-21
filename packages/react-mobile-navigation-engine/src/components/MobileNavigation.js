import React from 'react';
import * as pagingActions from '../actions/paging-actions';
import MobileNavigationPageEngine from '../components/MobileNavigationPageEngine';
import MobileNavigationRender from '../components-styled/MobileNavigationRender';
import mobileNavigationReducers from '../reducers/index';
import { getPageById } from '../utils/page-manager';

const propTypes = {
  children: React.PropTypes.any,
  pageHeight: React.PropTypes.number,
  pageWidth: React.PropTypes.number,
  stackId: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string,
  ]).isRequired,
  initState: React.PropTypes.object,
};

const defaultProps = {};

export default class MobileNavigation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      navigation: Object.assign({}, props.initState),
    };
    this.dispatch = this.dispatch.bind(this);
    this.pagingActions = this.bindActionCreators(pagingActions, this.dispatch);
  }

  getVisiblePageData(prevPageId) {
    const { navigation } = this.state;
    return {
      pageId: prevPageId,
      pageState: navigation.pages[prevPageId],
    };
  }

  /**
   * Render only visible and the previous pages.
   * @param {*} activePageId
   */
  getVisiblePages(activePageId) {
    const visiblePagesData = [];
    let pageData = this.getVisiblePageData(activePageId);
    visiblePagesData.push(pageData);
    if (pageData.pageState.prevPageId) {
      pageData = this.getVisiblePageData(pageData.pageState.prevPageId);
      visiblePagesData.push(pageData);
    }
    return visiblePagesData;
  }

  bindActionCreators(actionCreator, dispatch) {
    return Object.keys(actionCreator)
      .reduce((accumulator, value) => (
        Object.assign(accumulator, {
          [value]: (...props) => { dispatch(actionCreator[value](...props)); },
        })
      ), {});
  }

  dispatch(action) {
    this.setState(prevState => ({
      navigation: mobileNavigationReducers(prevState.navigation, action),
    }));
  }

  render() {
    const { children, pageHeight, pageWidth, stackId } = this.props;
    const { navigation } = this.state;
    return (
      <MobileNavigationRender>
        {this.getVisiblePages(navigation.activePageId).map(page => {
          const pageId = page.pageId;
          return (
            <MobileNavigationPageEngine
              key={pageId}
              pageHeight={pageHeight}
              pagingActions={this.pagingActions}
              pageId={pageId}
              pageState={page.pageState}
              pageWidth={pageWidth}
              stackId={stackId}
            >
              {getPageById(React.Children.toArray(children), pageId)}
            </MobileNavigationPageEngine>
          );
        })}
      </MobileNavigationRender>
    );
  }
}

MobileNavigation.propTypes = propTypes;
MobileNavigation.defaultProps = defaultProps;
