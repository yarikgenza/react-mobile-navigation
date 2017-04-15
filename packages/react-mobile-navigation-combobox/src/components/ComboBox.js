import IconCancel from 'binary-ui-icons/binary/Cancel';
import IconDone from 'binary-ui-icons/binary/Done';
import { StackPage } from 'binary-ui-stack';
import invariant from 'invariant';
import React from 'react';
import { PageStatusTypesEnum, Interpolation } from 'react-mobile-navigation-core';
import { MobileNavigationPage } from 'react-mobile-navigation-engine';
import { ComboboxComponent } from './ComboboxComponent';
import { isStringEmpty } from '../utils/string';
import { getFilteredComboboxOptions } from '../utils/combobox-options-filter';

const propTypes = {
  allowCustomValue: React.PropTypes.bool,
  bodyStyle: React.PropTypes.object.isRequired,
  customOptionModel: React.PropTypes.object,
  itemStyleValue: React.PropTypes.bool,
  inputPlaceholder: React.PropTypes.string,
  isBold: React.PropTypes.bool,
  items: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  headerStyle: React.PropTypes.object.isRequired,
  pressEnterToSaveCustomFieldLabel: React.PropTypes.string,
  noOptionsMatchingInputLabel: React.PropTypes.string,
  pagingActions: React.PropTypes.objectOf(React.PropTypes.func),
  pageHeight: React.PropTypes.number.isRequired,
  pageWidth: React.PropTypes.number.isRequired,
  pageId: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string,
  ]),
  pageState: React.PropTypes.object,
  stackId: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string,
  ]),
  stackTitle: React.PropTypes.string,
  onCancel: React.PropTypes.func,
  onSelect: React.PropTypes.func,
  onSelectCustom: React.PropTypes.func,
};

const defaultProps = {
  allowCustomValue: false,
  inputPlaceholder: '',
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
    this.onTrySelectCustom = this.onTrySelectCustom.bind(this);
    this.onSetFilter = this.onSetFilter.bind(this);
    this.onPageTransitionEnd = this.onPageTransitionEnd.bind(this);
    this.setPageStatus = this.setPageStatus.bind(this);
  }

  componentWillReceiveProps() {
    const { textFilter } = this.state;
    this.filteredItems = this.getFilteredItems(textFilter);
  }

  onSelect(selectedOption) {
    this.setState({
      selectedOption,
    });
    this.closeComboBox();
  }

  onSelectCustom(selectedCustomOption) {
    this.setState({
      selectedCustomOption,
    });
    this.closeComboBox();
  }

  onCancel() {
    if (this.props.onCancel) {
      this.props.onCancel();
    }
    this.closeComboBox();
  }

  onTrySelectCustom() {
    const {
      allowCustomValue,
      customOptionModel,
    } = this.props;
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
    this.setState({
      textFilter: value,
    });
    this.filteredItems = this.getFilteredItems(value);
  }

  onPageTransitionEnd() {
    switch (this.props.pageState.status) {
      case PageStatusTypesEnum.OPEN_ANIMATING:
        this.props.pagingActions.openingPageDone(
          this.props.stackId,
          this.props.pageId
        );
        return;
      case PageStatusTypesEnum.CLOSE_ANIMATING: {
        this.props.pagingActions.goingBackDone(
          this.props.stackId,
          this.props.pageId
        );
        // option
        const { selectedOption } = this.state;
        if (selectedOption && selectedOption.handler) {
          selectedOption.handler();
        }
        const { onSelect } = this.props;
        if (onSelect && selectedOption) {
          onSelect(selectedOption);
        }
        this.setState({
          selectedOption: undefined,
          textFilter: '',
        });
        // custom option
        const { selectedCustomOption } = this.state;
        if (selectedCustomOption && selectedCustomOption.handler) {
          selectedCustomOption.handler(selectedCustomOption.value);
        }
        const { onSelectCustom } = this.props;
        if (onSelectCustom && selectedCustomOption) {
          onSelectCustom(selectedCustomOption);
        }
        this.setState({
          selectedCustomOption: undefined,
          textFilter: '',
        });
        return;
      }
      default:
        invariant(
          true,
          'Property "status" in onPageTransitionEnd function is out of range'
        );
        return;
    }
  }

  setPageStatus() {
    const stackData = {
      status: this.props.pageState.status,
      pagingActions: this.props.pagingActions,
      stackId: this.props.stackId,
      pageId: this.props.pageId,
    };
    switch (stackData.status) {
      case PageStatusTypesEnum.OPEN_PREPARE:
        // case PageSideTypesEnum.GOING_TO_MAIN:
        stackData.pagingActions.openingPage(
          stackData.stackId,
          stackData.pageId
        );
        return;
      case PageStatusTypesEnum.CLOSE_PREPARE:
        // case PageSideTypesEnum.GOING_TO_COVER:
        stackData.pagingActions.goingBack(
          stackData.stackId,
          stackData.pageId
        );
        return;
      default:
        invariant(
          true,
          'Property "status" in setPageStatus function is out of range'
        );
        return;
    }
  }

  getFilteredItems(textFilter) {
    const { items } = this.props;
    return getFilteredComboboxOptions(textFilter, items);
  }

  closeComboBox() {
    const { pageId, pagingActions, stackId } = this.props;
    pagingActions.goBack(stackId, pageId);
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
      pageState,
      pressEnterToSaveCustomFieldLabel,
      stackId,
      stackTitle,
      itemStyleValue,
    } = this.props;
    if (pageState.status === PageStatusTypesEnum.CLOSE_DONE) {
      return null;
    }
    return (
      <Interpolation
        setPageStatus={this.setPageStatus}
        onPageTransitionEnd={this.onPageTransitionEnd}
        pageState={pageState}
      >
        <MobileNavigationPage stackId={stackId} pageHeight={pageHeight} >
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
            stackTitle={stackTitle}
            stackTitleEditable={false}
            titleIcon={undefined}
            useSearch={false}
          >
            <ComboboxComponent
              allowCustomValue={allowCustomValue}
              customOptionModel={customOptionModel}
              filteredItems={this.filteredItems}
              itemStyleValue={itemStyleValue}
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
