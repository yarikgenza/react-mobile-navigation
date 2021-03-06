﻿import Input from 'binary-ui-components/mobile/Input';
import IconCancel from 'binary-ui-icons/binary/Cancel';
import IconDone from 'binary-ui-icons/binary/Done';
import StackPage from 'binary-ui-stack';
import StackBodyContainer from 'binary-ui-stack/StackBodyContainer';
import PropTypes from 'prop-types';
import React from 'react';
import ComboBoxOption from './ComboBoxOption';
import ComboBoxNoOptionsStyled from '../components-styled/ComboBoxNoOptionsStyled';
import { ENTER, ESCAPE } from '../constants/key-events';

const propTypes = {
  allowCustomValue: PropTypes.bool,
  bodyStyle: PropTypes.object,
  customOptionModel: PropTypes.object,
  filteredItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  headerStyle: PropTypes.object,
  inputPlaceholder: PropTypes.string,
  isBold: PropTypes.bool,
  noOptionsMatchingInputLabel: PropTypes.string,
  pageHeight: PropTypes.number,
  pageWidth: PropTypes.number,
  pressEnterToSaveCustomFieldLabel: PropTypes.string,
  stackTitle: PropTypes.string,
  textFilter: PropTypes.string,
  onCancel: PropTypes.func,
  onFilterSet: PropTypes.func,
  onSelect: PropTypes.func,
  onSelectCustom: PropTypes.func,
  onTrySelectCustom: PropTypes.func,
};

const defaultProps = {
  allowCustomValue: false,
  bodyStyle: undefined,
  customOptionModel: {},
  filteredItems: [],
  headerStyle: undefined,
  inputPlaceholder: '',
  isBold: false,
  noOptionsMatchingInputLabel: undefined,
  pageHeight: undefined,
  pageWidth: undefined,
  pressEnterToSaveCustomFieldLabel: undefined,
  stackTitle: undefined,
  textFilter: '',
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
      <ComboBoxNoOptionsStyled>
        {this.getNoOptionsText()}
      </ComboBoxNoOptionsStyled>
    );
  }

  renderFilteredItems(isBold) {
    const { filteredItems } = this.props;
    return filteredItems.length ? this.renderOptions(isBold) : this.renderNoOptions();
  }

  render() {
    const {
      allowCustomValue,
      bodyStyle,
      headerStyle,
      inputPlaceholder,
      isBold,
      pageHeight,
      pageWidth,
      stackTitle,
      textFilter,
      onCancel,
      onFilterSet,
      onTrySelectCustom,
    } = this.props;
    return (
      <StackPage
        bodyStyle={bodyStyle}
        headerStyle={headerStyle}
        leftButton={{
          renderIcon: () => (<IconCancel />),
          onClick: onCancel,
        }}
        pageHeight={pageHeight}
        rightButton={(allowCustomValue
          ? {
            renderIcon: () => (<IconDone />),
            onClick: onTrySelectCustom,
          } : undefined
        )}
        stackTitle={stackTitle}
        stackTitleEditable={false}
        titleIcon={undefined}
        useSearch={false}
      >
        <StackBodyContainer pageHeight={pageHeight} pageWidth={pageWidth} >
          <Input
            isBold={isBold}
            isValid={this.isValid()}
            placeholder={inputPlaceholder}
            value={textFilter}
            onChange={onFilterSet}
            onKeyUp={this.onFilterOnKeyUp}
          />
          {this.renderFilteredItems(isBold)}
        </StackBodyContainer>
      </StackPage>
    );
  }
}

ComboBoxList.propTypes = propTypes;
ComboBoxList.defaultProps = defaultProps;
