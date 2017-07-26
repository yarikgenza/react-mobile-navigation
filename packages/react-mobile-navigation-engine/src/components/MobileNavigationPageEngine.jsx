import React from 'react';
import { Interpolation, PageStatusTypesEnum } from 'react-mobile-navigation-core';

const propTypes = {
  children: React.PropTypes.any.isRequired,
  pageHeight: React.PropTypes.number.isRequired,
  pageId: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string,
  ]).isRequired,
  pageState: React.PropTypes.object.isRequired,
  pageWidth: React.PropTypes.number.isRequired,
  setOnActionSheetOpenCallback: React.PropTypes.func.isRequired,
  setOnActionSheetCloseCallback: React.PropTypes.func.isRequired,
  setOnAlertOpenCallback: React.PropTypes.func.isRequired,
  setOnAlertCloseCallback: React.PropTypes.func.isRequired,
  setOnComboBoxOpenCallback: React.PropTypes.func.isRequired,
  setOnComboBoxCloseCallback: React.PropTypes.func.isRequired,
  onActionSheetOpenStart: React.PropTypes.func.isRequired,
  onActionSheetCloseStart: React.PropTypes.func.isRequired,
  onAlertOpenStart: React.PropTypes.func.isRequired,
  onAlertCloseStart: React.PropTypes.func.isRequired,
  onComboBoxOpenStart: React.PropTypes.func.isRequired,
  onComboBoxCloseStart: React.PropTypes.func.isRequired,
  onPageOpenStart: React.PropTypes.func.isRequired,
  onPageOpenDone: React.PropTypes.func,
  onPageCloseStart: React.PropTypes.func.isRequired,
  onPageCloseDone: React.PropTypes.func,
};

const defaultProps = {};

export default class MobileNavigationPageEngine extends React.Component {

  constructor(props) {
    super(props);
    this.cache = {
      onPageOpenCallback: null,
      onPageCloseCallback: null,
    };
    this.setOnOpen = this.setOnOpen.bind(this);
    this.setOnClose = this.setOnClose.bind(this);
    this.onPageOpenDone = this.onPageOpenDone.bind(this);
    this.onPageCloseDone = this.onPageCloseDone.bind(this);
  }

  onPageOpenDone() {
    const { onPageOpenDone } = this.props;
    if (!onPageOpenDone) {
      return;
    }
    onPageOpenDone(this.cache.onPageOpenCallback);
  }

  onPageCloseDone() {
    const { onPageCloseDone } = this.props;
    if (!onPageCloseDone) {
      return;
    }
    onPageCloseDone(this.cache.onPageCloseCallback);
  }

  setOnOpen(callback) {
    this.cache.onPageOpenCallback = callback;
  }

  setOnClose(callback) {
    this.cache.onPageCloseCallback = callback;
  }

  render() {
    const {
      children,
      pageHeight,
      pageId,
      pageState,
      pageWidth,
      setOnActionSheetOpenCallback,
      setOnActionSheetCloseCallback,
      setOnAlertOpenCallback,
      setOnAlertCloseCallback,
      setOnComboBoxOpenCallback,
      setOnComboBoxCloseCallback,
      onActionSheetOpenStart,
      onActionSheetCloseStart,
      onAlertOpenStart,
      onAlertCloseStart,
      onComboBoxOpenStart,
      onComboBoxCloseStart,
      onPageOpenStart,
      onPageCloseStart,
    } = this.props;
    const { isForce, status, zIndex } = pageState;
    return (
      <Interpolation
        isForce={isForce}
        isShow={
          status !== PageStatusTypesEnum.BACK_ANIMATING_OUT_DONE &&
          status !== PageStatusTypesEnum.CLOSE_DONE
        }
        pageStatus={status}
        onPageOpenDone={this.onPageOpenDone}
        onPageCloseDone={this.onPageCloseDone}
      >
        {React.cloneElement(children, {
          pageHeight,
          pageId,
          pageWidth,
          zIndex,
          setOnActionSheetOpenCallback,
          setOnActionSheetCloseCallback,
          setOnAlertOpenCallback,
          setOnAlertCloseCallback,
          setOnComboBoxOpenCallback,
          setOnComboBoxCloseCallback,
          setOnPageOpenCallback: this.setOnOpen,
          setOnPageCloseCallback: this.setOnClose,
          onActionSheetOpen: onActionSheetOpenStart,
          onActionSheetClose: onActionSheetCloseStart,
          onAlertOpen: onAlertOpenStart,
          onAlertClose: onAlertCloseStart,
          onComboBoxOpen: onComboBoxOpenStart,
          onComboBoxClose: onComboBoxCloseStart,
          onPageOpen: onPageOpenStart,
          onPageClose: onPageCloseStart,
        })}
      </Interpolation>
    );
  }
}

MobileNavigationPageEngine.propTypes = propTypes;
MobileNavigationPageEngine.defaultProps = defaultProps;
