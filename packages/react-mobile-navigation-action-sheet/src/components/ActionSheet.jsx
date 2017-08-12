import isFunction from 'lodash/isFunction';
import PropTypes from 'prop-types';
import React from 'react';
import {
  Interpolation,
  MobileNavigationModal,
  PageStatusTypesEnum,
} from 'react-mobile-navigation-core';
import ActionSheetList from './ActionSheetList';

const propTypes = {
  cancelLabel: PropTypes.string,
  isVisible: PropTypes.bool.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  pageHeight: PropTypes.number.isRequired,
  pageWidth: PropTypes.number.isRequired,
  onCancel: PropTypes.func,
  onSelect: PropTypes.func,
  onShadowClick: PropTypes.func,
  onOpenCallback: PropTypes.func,
  onCloseStart: PropTypes.func.isRequired,
  onCloseDone: PropTypes.func.isRequired,
  onCloseCallback: PropTypes.func,
};

const defaultProps = {
  items: [],
};

/**
 * MobileNavigationShadowPage engine
 */
export default class ActionSheet extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedOption: undefined,
      status: props.isVisible ? PageStatusTypesEnum.OPEN_DONE : PageStatusTypesEnum.CLOSE_DONE,
    };
    this.onSelect = this.onSelect.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onShadowClick = this.onShadowClick.bind(this);
    this.onPageOpenDone = this.onPageOpenDone.bind(this);
    this.onPageCloseDone = this.onPageCloseDone.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { isVisible } = this.props;
    if (isVisible === false && nextProps.isVisible === true) {
      this.onOpenStart();
      return;
    }
    if (isVisible === true && nextProps.isVisible === false) {
      this.onCloseStart();
    }
  }

  onOpenStart() {
    const { status } = this.state;
    // ignore opening attempts if not closed yet
    if (status !== PageStatusTypesEnum.CLOSE_DONE) {
      return;
    }
    this.setState(() => ({
      status: PageStatusTypesEnum.OPEN_START,
    }), () => {
      // force rendering in the next frame
      window.requestAnimationFrame(() => {
        this.setState(() => ({
          status: PageStatusTypesEnum.OPEN_PROCESSING,
        }));
      });
    });
  }

  onOpenDone() {
    this.setState(() => ({
      status: PageStatusTypesEnum.OPEN_DONE,
    }), () => {
      const { onOpenCallback } = this.props;
      if (isFunction(onOpenCallback)) {
        onOpenCallback();
      }
    });
  }

  onCloseStart() {
    this.setState(() => ({
      status: PageStatusTypesEnum.CLOSE_START,
    }), () => {
      // force rendering in the next frame
      window.requestAnimationFrame(() => {
        this.setState(() => ({
          status: PageStatusTypesEnum.CLOSE_PROCESSING,
        }));
      });
    });
  }

  onCloseDone() {
    const { onCloseDone } = this.props;
    onCloseDone();
    this.setState(() => ({
      status: PageStatusTypesEnum.CLOSE_DONE,
    }), () => {
      const { onCloseCallback } = this.props;
      if (isFunction(onCloseCallback)) {
        onCloseCallback();
      }
    });
  }

  onSelect(selectedOption) {
    const { onCloseStart } = this.props;
    this.setState(() => ({ selectedOption }));
    onCloseStart();
  }

  onCancel() {
    const { onCancel, onCloseStart } = this.props;
    if (onCancel) {
      onCancel();
    }
    onCloseStart();
  }

  onShadowClick() {
    const { onShadowClick } = this.props;
    if (onShadowClick) {
      onShadowClick();
      return;
    }
    this.onCancel();
  }

  onPageOpenDone() {
    this.onOpenDone();
  }

  onPageCloseDone() {
    const { onSelect } = this.props;
    const { selectedOption } = this.state;
    // set state until use does actions which can possibly unmount the component
    this.setState(() => ({ selectedOption: undefined }));
    this.onCloseDone();
    if (selectedOption && selectedOption.handler) {
      selectedOption.handler();
    }
    if (onSelect && selectedOption) {
      onSelect(selectedOption);
    }
  }

  render() {
    const { cancelLabel, items, pageHeight, pageWidth } = this.props;
    const { status } = this.state;
    const zIndex = status !== PageStatusTypesEnum.CLOSE_DONE ? 1002 : 0;
    return (
      <Interpolation
        isShow={status !== PageStatusTypesEnum.CLOSE_DONE}
        pageStatus={status}
        onPageOpenDone={this.onPageOpenDone}
        onPageCloseDone={this.onPageCloseDone}
      >
        <MobileNavigationModal
          isPassHeight={false}
          pageHeight={pageHeight}
          pageWidth={pageWidth}
          zIndex={zIndex}
          onPageClose={this.onShadowClick}
        >
          <ActionSheetList
            cancelLabel={cancelLabel}
            items={items}
            pageIndex={zIndex}
            onCancel={this.onCancel}
            onSelect={this.onSelect}
          />
        </MobileNavigationModal>
      </Interpolation>
    );
  }
}

ActionSheet.propTypes = propTypes;
ActionSheet.defaultProps = defaultProps;
