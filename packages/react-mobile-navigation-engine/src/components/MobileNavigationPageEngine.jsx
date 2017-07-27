import PropTypes from 'prop-types';
import React from 'react';
import { Interpolation, PageStatusTypesEnum } from 'react-mobile-navigation-core';

const propTypes = {
  children: PropTypes.any.isRequired,
  pageHeight: PropTypes.number.isRequired,
  pageId: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  pageState: PropTypes.object.isRequired,
  pageWidth: PropTypes.number.isRequired,
  setOnActionSheetOpenCallback: PropTypes.func.isRequired,
  setOnActionSheetCloseCallback: PropTypes.func.isRequired,
  setOnAlertOpenCallback: PropTypes.func.isRequired,
  setOnAlertCloseCallback: PropTypes.func.isRequired,
  setOnComboBoxOpenCallback: PropTypes.func.isRequired,
  setOnComboBoxCloseCallback: PropTypes.func.isRequired,
  onActionSheetOpenStart: PropTypes.func.isRequired,
  onActionSheetCloseStart: PropTypes.func.isRequired,
  onAlertOpenStart: PropTypes.func.isRequired,
  onAlertCloseStart: PropTypes.func.isRequired,
  onComboBoxOpenStart: PropTypes.func.isRequired,
  onComboBoxCloseStart: PropTypes.func.isRequired,
  onPageOpenStart: PropTypes.func.isRequired,
  onPageOpenDone: PropTypes.func,
  onPageCloseStart: PropTypes.func.isRequired,
  onPageCloseDone: PropTypes.func,
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
