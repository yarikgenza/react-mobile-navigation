import IconCancel from 'binary-ui-icons/binary/Cancel';
import IconDone from 'binary-ui-icons/binary/Done';
import StackPage from 'binary-ui-stack';
import React from 'react';
import {
  PageStatusTypesEnum,
  Interpolation,
  MobileNavigationPage,
} from 'react-mobile-navigation-core';
import { ComboboxComponent } from './ComboboxComponent';
import { isStringEmpty } from '../utils/string';
import { getFilteredComboboxOptions } from '../utils/combobox-options-filter';

const propTypes = {
  allowCustomValue: React.PropTypes.bool,
  bodyStyle: React.PropTypes.object.isRequired,
  customOptionModel: React.PropTypes.object,
  direction: React.PropTypes.string.isRequired,
  inputPlaceholder: React.PropTypes.string,
  isBold: React.PropTypes.bool,
  items: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  headerStyle: React.PropTypes.object.isRequired,
  pressEnterToSaveCustomFieldLabel: React.PropTypes.string,
  noOptionsMatchingInputLabel: React.PropTypes.string,
  pageHeight: React.PropTypes.number.isRequired,
  pageWidth: React.PropTypes.number.isRequired,
  pageState: React.PropTypes.object,
  title: React.PropTypes.string,
  zIndex: React.PropTypes.number.isRequired,
  onCancel: React.PropTypes.func,
  onSelect: React.PropTypes.func,
  onSelectCustom: React.PropTypes.func,
  onComboBoxOpenDone: React.PropTypes.func.isRequired,
  onComboBoxCloseStart: React.PropTypes.func.isRequired,
  onComboBoxCloseDone: React.PropTypes.func.isRequired,
};

const defaultProps = {
  allowCustomValue: false,
  inputPlaceholder: '',
  isBold: false,
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
    this.onTrySelectCustom = this.onTrySelectCustom.bind(this);
    this.onSetFilter = this.onSetFilter.bind(this);
    this.onPageActivityEnd = this.onPageActivityEnd.bind(this);
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

  onSetFilter(value) {
    this.setState(() => ({ textFilter: value }));
    this.filteredItems = this.getFilteredItems(value);
  }

  onPageActivityEnd() {
    const {
      pageState,
      onSelectCustom,
      onSelect,
      onComboBoxOpenDone,
      onComboBoxCloseDone,
    } = this.props;
    switch (pageState.status) {
      case PageStatusTypesEnum.OPEN_DONE:
        onComboBoxOpenDone();
        return;
      case PageStatusTypesEnum.CLOSE_DONE: {
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
      default:
        return;
    }
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
      direction,
      headerStyle,
      inputPlaceholder,
      isBold,
      noOptionsMatchingInputLabel,
      pageHeight,
      pageWidth,
      pageState,
      pressEnterToSaveCustomFieldLabel,
      title,
      zIndex,
    } = this.props;
    return (
      <Interpolation
        isAction
        pageState={pageState}
        status={PageStatusTypesEnum.CLOSE_DONE}
        onPageActivityEnd={this.onPageActivityEnd}
      >
        <MobileNavigationPage direction={direction} pageHeight={pageHeight} zIndex={zIndex} >
          <StackPage
            bodyStyle={bodyStyle}
            headerStyle={headerStyle}
            leftButton={{
              onClick: this.onCancel,
              renderIcon: () => (<IconCancel />),
            }}
            pageHeight={pageHeight}
            rightButton={(allowCustomValue
              ? {
                onClick: this.onTrySelectCustom,
                renderIcon: () => (<IconDone />),
              } : undefined
            )}
            stackTitle={title}
            stackTitleEditable={false}
            titleIcon={undefined}
            useSearch={false}
          >
            <ComboboxComponent
              allowCustomValue={allowCustomValue}
              customOptionModel={customOptionModel}
              filteredItems={this.filteredItems}
              inputPlaceholder={inputPlaceholder}
              isBold={isBold}
              noOptionsMatchingInputLabel={noOptionsMatchingInputLabel}
              pageHeight={pageHeight}
              pageWidth={pageWidth}
              pressEnterToSaveCustomFieldLabel={pressEnterToSaveCustomFieldLabel}
              textFilter={this.state.textFilter}
              onSelectCustom={this.onSelectCustom}
              onCancel={this.onCancel}
              onSetFilter={this.onSetFilter}
              onSelect={this.onSelect}
              onTrySelectCustom={this.onTrySelectCustom}
            />
          </StackPage>
        </MobileNavigationPage>
      </Interpolation>
    );
  }
}

ComboBox.propTypes = propTypes;
ComboBox.defaultProps = defaultProps;
