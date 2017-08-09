import PropTypes from 'prop-types';
import React from 'react';
import { Modal } from 'react-mobile-navigation-core';
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
    };
    this.onSelect = this.onSelect.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onShadowClick = this.onShadowClick.bind(this);
    this.onPageOpenDone = this.onPageOpenDone.bind(this);
    this.onPageCloseDone = this.onPageCloseDone.bind(this);
  }

  onSelect(selectedOption) {
    this.setState(() => ({ selectedOption }));
    this.closeActionSheet();
  }

  onCancel() {
    const { onCancel } = this.props;
    if (onCancel) {
      onCancel();
    }
    this.closeActionSheet();
  }

  onShadowClick() {
    const { onShadowClick } = this.props;
    if (onShadowClick) {
      onShadowClick();
      return;
    }
    this.onCancel();
  }

  onPageOpenDone() { }

  onPageCloseDone() {
    const { onSelect, onCloseDone } = this.props;
    const { selectedOption } = this.state;
    // set state until use does actions which can possibly unmount the component
    this.setState(() => ({ selectedOption: undefined }));
    onCloseDone();
    if (selectedOption && selectedOption.handler) {
      selectedOption.handler();
    }
    if (onSelect && selectedOption) {
      onSelect(selectedOption);
    }
  }

  closeActionSheet() {
    const { onCloseStart } = this.props;
    onCloseStart();
  }

  render() {
    const { cancelLabel, isVisible, items, pageHeight, pageWidth, onCloseStart } = this.props;
    return (
      <Modal
        isVisible={isVisible}
        pageHeight={pageHeight}
        pageWidth={pageWidth}
        onClose={onCloseStart}
      >
        <ActionSheetList
          cancelLabel={cancelLabel}
          items={items}
          onCancel={this.onCancel}
          onSelect={this.onSelect}
        />
      </Modal>
    );
  }
}

ActionSheet.propTypes = propTypes;
ActionSheet.defaultProps = defaultProps;
