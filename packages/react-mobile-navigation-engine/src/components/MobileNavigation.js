import React from 'react';
import MobileNavigationPageEngine from '../components/MobileNavigationPageEngine';
import MobileNavigationRender from '../components-styled/MobileNavigationRender';
import { getPageById } from '../utils/page-manager';

const propTypes = {
  children: React.PropTypes.any,
  pageHeight: React.PropTypes.number,
  pageWidth: React.PropTypes.number,
  pagingActions: React.PropTypes.object.isRequired,
  stackId: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string,
  ]).isRequired,
  mobileNavigationData: React.PropTypes.object,
};

const defaultProps = {};

export default class MobileNavigation extends React.Component {

  getVisiblePageData(prevPageId) {
    const { mobileNavigationData } = this.props;
    return {
      pageId: prevPageId,
      pageState: mobileNavigationData.pages[prevPageId],
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

  render() {
    const {
      children,
      mobileNavigationData,
      pageHeight,
      pageWidth,
      pagingActions,
      stackId,
    } = this.props;
    const childrenArray = React.Children.toArray(children);
    return (
      <MobileNavigationRender>
        {this.getVisiblePages(mobileNavigationData.activePageId).map(page => {
          const pageId = page.pageId;
          return (
            <MobileNavigationPageEngine
              key={pageId}
              pageHeight={pageHeight}
              pageId={pageId}
              pageState={page.pageState}
              pageWidth={pageWidth}
              pagingActions={pagingActions}
              stackId={stackId}
            >
              {getPageById(childrenArray, pageId)}
            </MobileNavigationPageEngine>
          );
        })}
      </MobileNavigationRender>
    );
  }
}

MobileNavigation.propTypes = propTypes;
MobileNavigation.defaultProps = defaultProps;
