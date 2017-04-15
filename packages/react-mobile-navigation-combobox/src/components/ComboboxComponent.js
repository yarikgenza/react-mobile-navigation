import React from 'react';
import { StackBodyCustomContent } from 'binary-ui-stack';
import ComboboxNoOptionsStyled from '../components-styled/ComboboxNoOptionsStyled';
import ComboboxOption from './ComboboxOption';
import ComboboxInput from './ComboboxInput';
import { ENTER, ESCAPE } from '../constants/key-events';

const propTypes = {
  customOptionModel: React.PropTypes.object,
  filteredItems: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  allowCustomValue: React.PropTypes.bool,
  textFilter: React.PropTypes.string,
  inputPlaceholder: React.PropTypes.string,
  isBold: React.PropTypes.bool.isRequired,
  pageHeight: React.PropTypes.number.isRequired,
  pageWidth: React.PropTypes.number.isRequired,
  pressEnterToSaveCustomFieldLabel: React.PropTypes.string,
  noOptionsMatchingInputLabel: React.PropTypes.string,
  onCancel: React.PropTypes.func,
  onSelect: React.PropTypes.func,
  onSelectCustom: React.PropTypes.func,
  onSetFilter: React.PropTypes.func,
  onTrySelectCustom: React.PropTypes.func,
};

const defaultProps = {
  customOptionModel: {},
  filteredItems: [],
  allowCustomValue: false,
  textFilter: '',
  inputPlaceholder: '',
  pressEnterToSaveCustomFieldLabel: 'Type enter to save custom field name',
  noOptionsMatchingInputLabel: 'There are no options matching your input',
};

export class ComboboxComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isHover: false,
    };
    this.onSetHoverStatus = this.onSetHoverStatus.bind(this);
    this.onFilterOnKeyUp = this.onFilterOnKeyUp.bind(this);
  }

  onSetHoverStatus(isHover) {
    this.setState({
      isHover,
    });
  }

  onFilterOnKeyUp(e) {
    switch (e.keyCode) {
      case ENTER:
        this.props.onTrySelectCustom();
        return;
      case ESCAPE:
        this.props.onCancel();
        return;
      default:
        return;
    }
  }

  getNoOptionsText() {
    return this.props.allowCustomValue
      ? this.props.pressEnterToSaveCustomFieldLabel
      : this.props.noOptionsMatchingInputLabel;
  }

  isValid() {
    return this.props.filteredItems.length > 0 || this.props.allowCustomValue;
  }

  renderOptions(isBold) {
    return this.props.filteredItems.map((item) => (
      <ComboboxOption
        isBold={isBold}
        item={item}
        key={item.key}
        handleItemSelect={this.props.onSelect}
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
    return this.props.filteredItems.length
      ? this.renderOptions(isBold)
      : this.renderNoOptions();
  }

  render() {
    const {
      inputPlaceholder,
      isBold,
      pageHeight,
      pageWidth,
      textFilter,
      onSetFilter,
    } = this.props;
    return (
      <StackBodyCustomContent pageHeight={pageHeight} pageWidth={pageWidth} >
        <ComboboxInput
          isBold={isBold}
          isValid={this.isValid()}
          placeholder={inputPlaceholder}
          textFilter={textFilter}
          onSetFilter={onSetFilter}
          onFilterOnKeyUp={this.onFilterOnKeyUp}
        />
        {this.renderFilteredItems(isBold)}
      </StackBodyCustomContent>
    );
  }
}

ComboboxComponent.propTypes = propTypes;
ComboboxComponent.defaultProps = defaultProps;
