import React from 'react';
import MobileNavigationPageEngine from '../components/MobileNavigationPageEngine';
import MobileNavigationRender from '../components-styled/MobileNavigationRender';
import { getActivePageId, getPageById, getPageState, initStack } from '../utils/page-manager';

const propTypes = {
  children: React.PropTypes.any,
  defaultPageId: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string,
  ]).isRequired,
  pageHeight: React.PropTypes.number,
  pageWidth: React.PropTypes.number,
  pagingActions: React.PropTypes.object.isRequired,
  stackId: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string,
  ]).isRequired,
  mobileNavigationData: React.PropTypes.object,
  mobileNavigationActions: React.PropTypes.object,
};

const defaultProps = {};

export default class MobileNavigation extends React.Component {

  componentDidMount() {
    const { children, defaultPageId, mobileNavigationActions, stackId } = this.props;
    const childrenArray = React.Children.toArray(children);
    initStack(childrenArray, defaultPageId, mobileNavigationActions, stackId);
  }

  getVisiblePageData(prevPageId) {
    const { defaultPageId, mobileNavigationData } = this.props;
    const prevPageState = getPageState(mobileNavigationData, defaultPageId, prevPageId);
    return {
      pageId: prevPageId,
      pageState: prevPageState,
    };
  }

  getVisiblePages(activePageId) {
    const visiblePagesData = [];
    let pageData = this.getVisiblePageData(activePageId);
    visiblePagesData.push(pageData);
    while (pageData.pageState.prevPageId) {
      pageData = this.getVisiblePageData(pageData.pageState.prevPageId);
      visiblePagesData.push(pageData);
    }
    return visiblePagesData;
  }

  renderPage(pageId, pageState) {
    const { children, pageHeight, pageWidth, pagingActions, stackId } = this.props;
    const childrenArray = React.Children.toArray(children);
    return (
      <MobileNavigationPageEngine
        key={pageId}
        pageHeight={pageHeight}
        pageId={pageId}
        pageState={pageState}
        pageWidth={pageWidth}
        pagingActions={pagingActions}
        stackId={stackId}
      >
        {getPageById(childrenArray, pageId)}
      </MobileNavigationPageEngine>
    );
  }

  renderVisiblePages() {
    const { defaultPageId, mobileNavigationData } = this.props;
    const activePageId = getActivePageId(mobileNavigationData, defaultPageId);
    const visiblePages = this.getVisiblePages(activePageId);
    return visiblePages.map(page => (
      this.renderPage(page.pageId, page.pageState)
    ));
  }

  render() {
    return (
      <MobileNavigationRender>
        {this.renderVisiblePages()}
      </MobileNavigationRender>
    );
  }
}

MobileNavigation.propTypes = propTypes;
MobileNavigation.defaultProps = defaultProps;
