import React from 'react';
import { CustomPage } from '../components/CustomPage';
import PageManagerRender from '../components-styled/PageManagerRender';
import { getActivePageId, getPageById, getPageState, initStack } from '../utils/page-manager';

const propTypes = {
  children: React.PropTypes.any,
  defaultPageId: React.PropTypes.any.isRequired,
  pageHeight: React.PropTypes.number,
  pageWidth: React.PropTypes.number,
  pagingActions: React.PropTypes.object.isRequired,
  stackId: React.PropTypes.any.isRequired,
  stackSystemData: React.PropTypes.object,
  stackSystemDataActions: React.PropTypes.object,
};

const defaultProps = {};

export class PageManager extends React.Component {

  componentDidMount() {
    const { children, defaultPageId, stackSystemDataActions, stackId } = this.props;
    const childrenArray = React.Children.toArray(children);
    initStack(childrenArray, defaultPageId, stackSystemDataActions, stackId);
  }

  getVisiblePageData(prevPageId) {
    const { defaultPageId, stackSystemData } = this.props;
    const prevPageState = getPageState(stackSystemData, defaultPageId, prevPageId);
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
    const page = getPageById(childrenArray, pageId);
    return (
      <CustomPage
        key={pageId}
        pageHeight={pageHeight}
        pageId={pageId}
        pageState={pageState}
        pageWidth={pageWidth}
        pagingActions={pagingActions}
        stackId={stackId}
      >
        {page}
      </CustomPage>
    );
  }

  renderVisiblePages() {
    const { defaultPageId, stackSystemData } = this.props;
    const activePageId = getActivePageId(stackSystemData, defaultPageId);
    const visiblePages = this.getVisiblePages(activePageId);
    return visiblePages.map(c => (
      this.renderPage(c.pageId, c.pageState)
    ));
  }

  render() {
    return (
      <PageManagerRender>
        {this.renderVisiblePages()}
      </PageManagerRender>
    );
  }
}

PageManager.propTypes = propTypes;
PageManager.defaultProps = defaultProps;
