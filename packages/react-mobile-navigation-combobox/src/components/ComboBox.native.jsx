import PropTypes from 'prop-types';
import React from 'react';
import {
  Interpolation,
  MobileNavigationModal,
  PageStatusTypesEnum,
} from 'react-mobile-navigation-core';
import ComboBoxList from './ComboBoxList';
import { isStringEmpty } from '../utils/string';
import { getFilteredComboboxOptions } from '../utils/combobox-options-filter';

const propTypes = {
  allowCustomValue: PropTypes.bool,
  bodyStyle: PropTypes.object,
  customOptionModel: PropTypes.object,
  inputPlaceholder: PropTypes.string,
  isBold: PropTypes.bool,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  headerStyle: PropTypes.object,
  pressEnterToSaveCustomFieldLabel: PropTypes.string,
  noOptionsMatchingInputLabel: PropTypes.string,
  pageHeight: PropTypes.number.isRequired,
  pageStatus: PropTypes.string,
  pageWidth: PropTypes.number.isRequired,
  title: PropTypes.string,
  zIndex: PropTypes.number.isRequired,
  onCancel: PropTypes.func,
  onSelect: PropTypes.func,
  onSelectCustom: PropTypes.func,
  onComboBoxOpenDone: PropTypes.func.isRequired,
  onComboBoxCloseStart: PropTypes.func.isRequired,
  onComboBoxCloseDone: PropTypes.func.isRequired,
};

const defaultProps = {
  allowCustomValue: false,
  bodyStyle: undefined,
  headerStyle: undefined,
  inputPlaceholder: undefined,
  isBold: undefined,
  items: [],
};

export default class ComboBox extends React.Component {

  constructor(props) {
    super(props);
    const textFilter = '';
    this.state = {
      selectedOption: undefined,
      selectedCustomOption: undefined,
      textFilter,
    };
    this.filteredItems = this.getFilteredItems(textFilter);
    this.onSelect = this.onSelect.bind(this);
    this.onSelectCustom = this.onSelectCustom.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onFilterSet = this.onFilterSet.bind(this);
    this.onPageOpenDone = this.onPageOpenDone.bind(this);
    this.onPageCloseDone = this.onPageCloseDone.bind(this);
    this.onTrySelectCustom = this.onTrySelectCustom.bind(this);
  }

  componentWillReceiveProps() {
    const { textFilter } = this.state;
    this.filteredItems = this.getFilteredItems(textFilter);
  }

  onSelect(selectedOption) {
    this.setState(() => ({ selectedOption }));
    this.closeComboBox();
  }

  onSelectCustom(selectedCustomOption) {
    this.setState(() => ({ selectedCustomOption }));
    this.closeComboBox();
  }

  onCancel() {
    const { onCancel } = this.props;
    if (onCancel) {
      onCancel();
    }
    this.closeComboBox();
  }

  onTrySelectCustom() {
    const { allowCustomValue, customOptionModel } = this.props;
    if (!allowCustomValue && this.filteredItems.length === 1) {
      this.onSelect(this.filteredItems[0]);
      return;
    }
    const { textFilter } = this.state;
    if (allowCustomValue && !isStringEmpty(textFilter)) {
      const customOptionModelValue = Object.assign({}, customOptionModel, {
        value: textFilter,
      });
      this.onSelectCustom(customOptionModelValue);
      return;
    }
    if (allowCustomValue) {
      this.onCancel();
      return;
    }
  }

  onFilterSet(value) {
    this.setState(() => ({ textFilter: value }));
    this.filteredItems = this.getFilteredItems(value);
  }

  onPageOpenDone() {
    const { onComboBoxOpenDone } = this.props;
    onComboBoxOpenDone();
  }

  onPageCloseDone() {
    const { onSelectCustom, onSelect, onComboBoxCloseDone } = this.props;
    const { selectedCustomOption, selectedOption } = this.state;
    // set state until a user does actions which can possibly unmount the component
    this.setState(() => ({
      selectedCustomOption: undefined,
      selectedOption: undefined,
      textFilter: '',
    }));
    // option
    if (selectedOption && selectedOption.handler) {
      selectedOption.handler();
    }
    if (onSelect && selectedOption) {
      onSelect(selectedOption);
    }
    // custom option
    if (selectedCustomOption && selectedCustomOption.handler) {
      selectedCustomOption.handler(selectedCustomOption.value);
    }
    if (onSelectCustom && selectedCustomOption) {
      onSelectCustom(selectedCustomOption);
    }
    onComboBoxCloseDone();
    return;
  }

  getFilteredItems(textFilter) {
    const { items } = this.props;
    return getFilteredComboboxOptions(textFilter, items);
  }

  closeComboBox() {
    const { onComboBoxCloseStart } = this.props;
    onComboBoxCloseStart();
  }

  render() {
    const {
      allowCustomValue,
      bodyStyle,
      customOptionModel,
      headerStyle,
      inputPlaceholder,
      isBold,
      noOptionsMatchingInputLabel,
      pageHeight,
      pageWidth,
      pageStatus,
      pressEnterToSaveCustomFieldLabel,
      title,
      zIndex,
      onComboBoxCloseStart,
    } = this.props;
    const { textFilter } = this.state;
    return (
      <MobileNavigationModal
        isShow={pageStatus !== PageStatusTypesEnum.CLOSE_DONE}
        pageHeight={pageHeight}
        pageStatus={pageStatus}
        pageWidth={pageWidth}
        zIndex={zIndex}
        onPageClose={onComboBoxCloseStart}
      >
        <ComboBoxList
          allowCustomValue={allowCustomValue}
          bodyStyle={bodyStyle}
          customOptionModel={customOptionModel}
          headerStyle={headerStyle}
          filteredItems={this.filteredItems}
          inputPlaceholder={inputPlaceholder}
          isBold={isBold}
          noOptionsMatchingInputLabel={noOptionsMatchingInputLabel}
          pressEnterToSaveCustomFieldLabel={pressEnterToSaveCustomFieldLabel}
          stackTitle={title}
          textFilter={textFilter}
          onCancel={this.onCancel}
          onFilterSet={this.onFilterSet}
          onSelect={this.onSelect}
          onSelectCustom={this.onSelectCustom}
          onTrySelectCustom={this.onTrySelectCustom}
        />
      </MobileNavigationModal>
    );
  }
}

ComboBox.propTypes = propTypes;
ComboBox.defaultProps = defaultProps;
