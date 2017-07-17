import IconCancel from 'binary-ui-icons/binary/Cancel';
import IconDone from 'binary-ui-icons/binary/Done';
import StackPage from 'binary-ui-stack';
import React from 'react';
import {
  PageStatusTypesEnum,
  Interpolation,
  MobileNavigationModal,
} from 'react-mobile-navigation-core';
import ComboboxList from './ComboboxList';
import { isStringEmpty } from '../utils/string';
import { getFilteredComboboxOptions } from '../utils/combobox-options-filter';

const propTypes = {
  allowCustomValue: React.PropTypes.bool,
  bodyStyle: React.PropTypes.object,
  customOptionModel: React.PropTypes.object,
  inputPlaceholder: React.PropTypes.string,
  isBold: React.PropTypes.bool,
  isShow: React.PropTypes.bool.isRequired,
  items: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  headerStyle: React.PropTypes.object,
  pressEnterToSaveCustomFieldLabel: React.PropTypes.string,
  noOptionsMatchingInputLabel: React.PropTypes.string,
  pageHeight: React.PropTypes.number.isRequired,
  pageStatus: React.PropTypes.string,
  pageWidth: React.PropTypes.number.isRequired,
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
      isShow,
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
      <Interpolation
        isAnimation
        isShow={isShow}
        pageStatusInit={PageStatusTypesEnum.CLOSE_DONE}
        pageStatus={pageStatus}
        onPageOpenDone={this.onPageOpenDone}
        onPageCloseDone={this.onPageCloseDone}
      >
        <MobileNavigationModal
          pageHeight={pageHeight}
          pageWidth={pageWidth}
          zIndex={zIndex}
          onPageClose={onComboBoxCloseStart}
        >
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
            <ComboboxList
              allowCustomValue={allowCustomValue}
              customOptionModel={customOptionModel}
              filteredItems={this.filteredItems}
              isBold={isBold}
              noOptionsMatchingInputLabel={noOptionsMatchingInputLabel}
              pageHeight={pageHeight}
              pageWidth={pageWidth}
              placeholder={inputPlaceholder}
              pressEnterToSaveCustomFieldLabel={pressEnterToSaveCustomFieldLabel}
              textFilter={textFilter}
              onCancel={this.onCancel}
              onFilterSet={this.onFilterSet}
              onSelect={this.onSelect}
              onSelectCustom={this.onSelectCustom}
              onTrySelectCustom={this.onTrySelectCustom}
            />
          </StackPage>
        </MobileNavigationModal>
      </Interpolation>
    );
  }
}

ComboBox.propTypes = propTypes;
ComboBox.defaultProps = defaultProps;
