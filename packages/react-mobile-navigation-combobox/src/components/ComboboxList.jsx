﻿import React from 'react';
import StackBodyCustomContent from 'binary-ui-stack/StackBodyCustomContent';
import ComboboxNoOptionsStyled from '../components-styled/ComboboxNoOptionsStyled';
import ComboBoxOption from './ComboboxOption';
import ComboBoxInput from './ComboboxInput';
import { ENTER, ESCAPE } from '../constants/key-events';

const propTypes = {
  customOptionModel: React.PropTypes.object,
  filteredItems: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  allowCustomValue: React.PropTypes.bool,
  textFilter: React.PropTypes.string,
  inputPlaceholder: React.PropTypes.string,
  isBold: React.PropTypes.bool,
  pageHeight: React.PropTypes.number.isRequired,
  pageWidth: React.PropTypes.number.isRequired,
  pressEnterToSaveCustomFieldLabel: React.PropTypes.string,
  noOptionsMatchingInputLabel: React.PropTypes.string,
  onCancel: React.PropTypes.func,
  onFilterSet: React.PropTypes.func,
  onSelect: React.PropTypes.func,
  onSelectCustom: React.PropTypes.func,
  onTrySelectCustom: React.PropTypes.func,
};

const defaultProps = {
  allowCustomValue: false,
  customOptionModel: {},
  filteredItems: [],
  isBold: false,
  textFilter: '',
  inputPlaceholder: '',
  pressEnterToSaveCustomFieldLabel: 'Type enter to save custom field name',
  noOptionsMatchingInputLabel: 'There are no options matching your input',
};

export default class ComboBoxList extends React.Component {

  constructor(props) {
    super(props);
    this.onFilterOnKeyUp = this.onFilterOnKeyUp.bind(this);
  }

  onFilterOnKeyUp(e) {
    const { onCancel, onTrySelectCustom } = this.props;
    switch (e.keyCode) {
      case ENTER:
        onTrySelectCustom();
        return;
      case ESCAPE:
        onCancel();
        return;
      default:
        return;
    }
  }

  getNoOptionsText() {
    const {
      allowCustomValue,
      noOptionsMatchingInputLabel,
      pressEnterToSaveCustomFieldLabel,
    } = this.props;
    return allowCustomValue ? pressEnterToSaveCustomFieldLabel : noOptionsMatchingInputLabel;
  }

  isValid() {
    const { allowCustomValue, filteredItems } = this.props;
    return filteredItems.length > 0 || allowCustomValue;
  }

  renderOptions(isBold) {
    const { filteredItems, onSelect } = this.props;
    return filteredItems.map((item) => (
      <ComboBoxOption
        isBold={isBold}
        item={item}
        key={item.key}
        handleItemSelect={onSelect}
      />
    ));
  }

  renderNoOptions() {
    return (
      <ComboboxNoOptionsStyled>
        {this.getNoOptionsText()}
      </ComboboxNoOptionsStyled>
    );
  }

  renderFilteredItems(isBold) {
    const { filteredItems } = this.props;
    return filteredItems.length ? this.renderOptions(isBold) : this.renderNoOptions();
  }

  render() {
    const {
      inputPlaceholder,
      isBold,
      pageHeight,
      pageWidth,
      textFilter,
      onFilterSet,
    } = this.props;
    return (
      <StackBodyCustomContent pageHeight={pageHeight} pageWidth={pageWidth} >
        <ComboBoxInput
          isBold={isBold}
          isValid={this.isValid()}
          placeholder={inputPlaceholder}
          textFilter={textFilter}
          onFilterSet={onFilterSet}
          onFilterOnKeyUp={this.onFilterOnKeyUp}
        />
        {this.renderFilteredItems(isBold)}
      </StackBodyCustomContent>
    );
  }
}

ComboBoxList.propTypes = propTypes;
ComboBoxList.defaultProps = defaultProps;
