import IconCancel from 'binary-ui-icons/binary/Cancel';
import IconDone from 'binary-ui-icons/binary/Done';
import { StackPage } from 'binary-ui-stack';
import React from 'react';
import {
  PageStatusTypesEnum,
  Interpolation,
  MobileNavigationPage,
} from 'react-mobile-navigation-core';

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
  pageState: React.PropTypes.object,
  title: React.PropTypes.string,
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
    const { onCancel } = this.props;
    if (onCancel) {
      onCancel();
    }
    this.closeModal();
  }

  onConfirm() {
    const { onConfirm } = this.props;
    if (onConfirm) {
      onConfirm();
    }
    this.closeModal();
  }

  onPageTransitionEnd() {
    const { pageState, pagingActions } = this.props;
    switch (pageState.status) {
      case PageStatusTypesEnum.OPEN_ANIMATING:
        pagingActions.openPageDone();
        return;
      case PageStatusTypesEnum.CLOSE_ANIMATING: {
        pagingActions.goBackDone();
        return;
      }
      default:
        return;
    }
  }

  setPageStatus() {
    const { pageState, pagingActions } = this.props;
    switch (pageState.status) {
      case PageStatusTypesEnum.OPEN_PREPARE:
        // case PageSideTypesEnum.GOING_TO_MAIN:
        pagingActions.openingPage();
        return;
      case PageStatusTypesEnum.CLOSE_PREPARE:
        // case PageSideTypesEnum.GOING_TO_COVER:
        pagingActions.goingBack();
        return;
      default:
        return;
    }
  }

  closeModal() {
    const { pagingActions } = this.props;
    pagingActions.goBack();
  }

  render() {
    const {
      bodyStyle,
      children,
      headerStyle,
      pageHeight,
      pageState,
      title,
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
        <MobileNavigationPage pageHeight={pageHeight} >
          <StackPage
            bodyStyle={bodyStyle}
            headerStyle={headerStyle}
            leftButton={{ onClick: this.onCancel, renderIcon: () => (<IconCancel />) }}
            pageHeight={pageHeight}
            rightButton={{ onClick: this.onConfirm, renderIcon: () => (<IconDone />) }}
            stackTitle={title}
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
