import isFunction from 'lodash/isFunction';
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
  isVisible: PropTypes.bool.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  headerStyle: PropTypes.object,
  pressEnterToSaveCustomFieldLabel: PropTypes.string,
  noOptionsMatchingInputLabel: PropTypes.string,
  pageHeight: PropTypes.number.isRequired,
  pageWidth: PropTypes.number.isRequired,
  title: PropTypes.string,
  onCancel: PropTypes.func,
  onSelect: PropTypes.func,
  onSelectCustom: PropTypes.func,
  onOpenCallback: PropTypes.func,
  onCloseStart: PropTypes.func.isRequired,
  onCloseDone: PropTypes.func,
  onCloseCallback: PropTypes.func,
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
      status: props.isVisible ? PageStatusTypesEnum.OPEN_DONE : PageStatusTypesEnum.CLOSE_DONE,
      textFilter,
    };
    this.filteredItems = getFilteredComboboxOptions(textFilter, props.items);
    this.onSelect = this.onSelect.bind(this);
    this.onSelectCustom = this.onSelectCustom.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onFilterSet = this.onFilterSet.bind(this);
    this.onPageOpenDone = this.onPageOpenDone.bind(this);
    this.onPageCloseDone = this.onPageCloseDone.bind(this);
    this.onTrySelectCustom = this.onTrySelectCustom.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { isVisible } = this.props;
    if (isVisible === false && nextProps.isVisible === true) {
      this.onOpenStart();
    }
    if (isVisible === true && nextProps.isVisible === false) {
      this.onCloseStart();
    }
    this.filteredItems = getFilteredComboboxOptions(nextProps.textFilter, nextProps.items);
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
    if (onCloseDone) {
      onCloseDone();
    }
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

  onSelectCustom(selectedCustomOption) {
    const { onCloseStart } = this.props;
    this.setState(() => ({ selectedCustomOption }));
    onCloseStart();
  }

  onCancel() {
    const { onCancel, onCloseStart } = this.props;
    if (onCancel) {
      onCancel();
    }
    onCloseStart();
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
    const { items } = this.props;
    this.filteredItems = getFilteredComboboxOptions(value, items);
    this.setState(() => ({ textFilter: value }));
  }

  onPageOpenDone() {
    this.onOpenDone();
  }

  onPageCloseDone() {
    const { onSelectCustom, onSelect } = this.props;
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
    this.onCloseDone();
    return;
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
      pressEnterToSaveCustomFieldLabel,
      title,
      onCloseStart,
    } = this.props;
    const { status, textFilter } = this.state;
    const zIndex = status !== PageStatusTypesEnum.CLOSE_DONE ? 1001 : 0;
    return (
      <Interpolation
        isShow={status !== PageStatusTypesEnum.CLOSE_DONE}
        pageStatus={status}
        onPageOpenDone={this.onPageOpenDone}
        onPageCloseDone={this.onPageCloseDone}
      >
        <MobileNavigationModal
          pageHeight={pageHeight}
          pageWidth={pageWidth}
          zIndex={zIndex}
          onPageClose={onCloseStart}
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
      </Interpolation>
    );
  }
}

ComboBox.propTypes = propTypes;
ComboBox.defaultProps = defaultProps;
