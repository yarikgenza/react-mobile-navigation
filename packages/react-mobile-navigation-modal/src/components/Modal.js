import IconCancel from 'binary-ui-icons/binary/Cancel';
import IconDone from 'binary-ui-icons/binary/Done';
import { StackPage } from 'binary-ui-stack';
import invariant from 'invariant';
import React from 'react';
import { PageStatusTypesEnum, Interpolation } from 'react-mobile-navigation-core';
import { MobileNavigationPage } from 'react-mobile-navigation-engine';

const propTypes = {
  bodyStyle: React.PropTypes.object.isRequired,
  children: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.arrayOf(React.PropTypes.number),
    React.PropTypes.arrayOf(React.PropTypes.string),
    React.PropTypes.node,
    React.PropTypes.number,
    React.PropTypes.string,
  ]),
  headerStyle: React.PropTypes.object.isRequired,
  pagingActions: React.PropTypes.objectOf(React.PropTypes.func),
  pageHeight: React.PropTypes.number.isRequired,
  pageWidth: React.PropTypes.number.isRequired,
  pageId: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string,
  ]),
  pageState: React.PropTypes.object,
  stackId: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string,
  ]),
  stackTitle: React.PropTypes.string,
  onCancel: React.PropTypes.func,
  onConfirm: React.PropTypes.func,
};

const defaultProps = {};

export default class Modal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedOption: undefined,
    };
    this.onCancel = this.onCancel.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
    this.onPageTransitionEnd = this.onPageTransitionEnd.bind(this);
    this.setPageStatus = this.setPageStatus.bind(this);
  }

  onCancel() {
    if (this.props.onCancel) {
      this.props.onCancel();
    }
    this.closeModal();
  }

  onConfirm() {
    if (this.props.onConfirm) {
      this.props.onConfirm();
    }
    this.closeModal();
  }

  onPageTransitionEnd() {
    switch (this.props.pageState.status) {
      case PageStatusTypesEnum.OPEN_ANIMATING:
        this.props.pagingActions.openingPageDone(
          this.props.stackId,
          this.props.pageId
        );
        return;
      case PageStatusTypesEnum.CLOSE_ANIMATING: {
        this.props.pagingActions.goingBackDone(
          this.props.stackId,
          this.props.pageId
        );
        return;
      }
      default:
        invariant(
          true,
          'Property "status" in onPageTransitionEnd function is out of range'
        );
        return;
    }
  }

  setPageStatus() {
    const stackData = {
      status: this.props.pageState.status,
      pagingActions: this.props.pagingActions,
      stackId: this.props.stackId,
      pageId: this.props.pageId,
    };
    switch (stackData.status) {
      case PageStatusTypesEnum.OPEN_PREPARE:
        // case PageSideTypesEnum.GOING_TO_MAIN:
        stackData.pagingActions.openingPage(
          stackData.stackId,
          stackData.pageId
        );
        return;
      case PageStatusTypesEnum.CLOSE_PREPARE:
        // case PageSideTypesEnum.GOING_TO_COVER:
        stackData.pagingActions.goingBack(
          stackData.stackId,
          stackData.pageId
        );
        return;
      default:
        invariant(
          true,
          'Property "status" in setPageStatus function is out of range'
        );
        return;
    }
  }

  closeModal() {
    const { pageId, pagingActions, stackId } = this.props;
    pagingActions.goBack(stackId, pageId);
  }

  render() {
    const {
      bodyStyle,
      children,
      headerStyle,
      pageHeight,
      pageState,
      stackId,
      stackTitle,
    } = this.props;
    if (pageState.status === PageStatusTypesEnum.CLOSE_DONE) {
      return null;
    }
    return (
      <Interpolation
        setPageStatus={this.setPageStatus}
        onPageTransitionEnd={this.onPageTransitionEnd}
        pageState={pageState}
      >
        <MobileNavigationPage stackId={stackId} pageHeight={pageHeight} >
          <StackPage
            bodyStyle={bodyStyle}
            headerStyle={headerStyle}
            leftButton={{ onClick: this.onCancel, renderIcon: () => (<IconCancel />) }}
            pageHeight={pageHeight}
            rightButton={{ onClick: this.onConfirm, renderIcon: () => (<IconDone />) }}
            stackTitle={stackTitle}
            stackTitleEditable={false}
            titleIcon={undefined}
            useSearch={false}
          >
            {children}
          </StackPage>
        </MobileNavigationPage>
      </Interpolation>
    );
  }
}

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;
