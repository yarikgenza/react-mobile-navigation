import React from 'react';
import MobileNavigationShadowPage from 'react-mobile-navigation-sheet';
import { PageStatusTypesEnum, Interpolation } from 'react-mobile-navigation-core';
import { ActionSheetListComponent } from './ActionSheetListComponent';

const propTypes = {
  onCancel: React.PropTypes.func,
  pageStatus: React.PropTypes.string,
  pageId: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string,
  ]),
  onShadowClick: React.PropTypes.func,
  pagingActions: React.PropTypes.objectOf(React.PropTypes.func),
};

const defaultProps = {};

export default class ActionSheet extends React.Component {

  constructor(props) {
    super(props);
    this.onShadowClick = this.onShadowClick.bind(this);
    this.onPageActivityEnd = this.onPageActivityEnd.bind(this);
  }

  onShadowClick() {
    if (this.props.onShadowClick) {
      this.props.onShadowClick();
      return;
    }
    this.props.onCancel();
  }

  onPageActivityEnd() {
    switch (this.props.pageStatus) {
      case PageStatusTypesEnum.OPEN_DONE:
        this.props.pagingActions.openPageDone(
          this.props.pageId
        );
        return;
      case PageStatusTypesEnum.CLOSE_DONE:
        this.props.pagingActions.goBack(
          this.props.pageId
        );
        return;
      default:
        return;
    }
  }

  render() {
    const { pageStatus } = this.props;
    return (
      <Interpolation
        isAnimation
        pageStatus={pageStatus}
        onPageActivityEnd={this.onPageActivityEnd}
      >
        <MobileNavigationShadowPage onShadowClick={this.onShadowClick} >
          <ActionSheetListComponent />
        </MobileNavigationShadowPage>
      </Interpolation>
    );
  }
}

ActionSheet.propTypes = propTypes;
ActionSheet.defaultProps = defaultProps;
