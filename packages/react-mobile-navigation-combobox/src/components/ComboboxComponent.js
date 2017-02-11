import React from 'react';
import { StackBodyCustomContent } from 'binary-ui-stack';
import ComboboxListItemComponent from './ComboboxListItemComponent';
import ComboboxCustomItem from './ComboboxCustomItem';
import { ENTER, ESCAPE } from '../constants/key-events';
import {
  COMBOBOX_OPTION_STYLE,
  COMBOBOX_OPTION_HOVER_EXT_STYLE,
  COMBOBOX_OPTION_DISABLED_EXT_STYLE,
  COMBOBOX_OPTION_DISABLED_HOVER_EXT_STYLE,
  FIELD_NAME_FONT,
  FIELD_VALUE_FONT,
} from '../utils/styles';

const propTypes = {
  customOptionModel: React.PropTypes.object,
  filteredItems: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  itemStyleValue: React.PropTypes.bool,
  allowCustomValue: React.PropTypes.bool,
  textFilter: React.PropTypes.string,
  inputPlaceholder: React.PropTypes.string,
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
  itemStyleValue: true,
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

  renderOptions(compoboxCustomItemStyleExt) {
    const filteredItems = this.props.filteredItems.map((item) => (
      <ComboboxListItemComponent
        item={item}
        key={item.key}
        handleItemSelect={this.props.onSelect}
      />
    ));
    return (
      <div style={compoboxCustomItemStyleExt} >
        {filteredItems}
      </div>
    );
  }

  renderNoOptions(compoboxCustomItemStyleExt) {
    const { isHover } = this.state;
    const styleHoverExt = Object.assign(
      {},
      COMBOBOX_OPTION_HOVER_EXT_STYLE,
      COMBOBOX_OPTION_DISABLED_HOVER_EXT_STYLE
    );
    const style = Object.assign(
      {},
      COMBOBOX_OPTION_STYLE,
      COMBOBOX_OPTION_DISABLED_EXT_STYLE,
      compoboxCustomItemStyleExt,
      isHover ? styleHoverExt : undefined
    );
    return (
      <div
        style={style}
        onMouseEnter={() => { this.onSetHoverStatus(true); }}
        onMouseLeave={() => { this.onSetHoverStatus(false); }}
      >
        {this.getNoOptionsText()}
      </div>
    );
  }

  renderFilteredItems(compoboxCustomItemStyleExt) {
    return this.props.filteredItems.length
      ? this.renderOptions(compoboxCustomItemStyleExt)
      : this.renderNoOptions(compoboxCustomItemStyleExt);
  }

  render() {
    const {
      inputPlaceholder,
      itemStyleValue,
      pageHeight,
      pageWidth,
      textFilter,
      onSetFilter,
    } = this.props;
    const compoboxCustomItemStyleExt = itemStyleValue ? FIELD_VALUE_FONT : FIELD_NAME_FONT;
    return (
      <StackBodyCustomContent pageHeight={pageHeight} pageWidth={pageWidth} >
        <ComboboxCustomItem
          isValid={this.isValid()}
          placeholder={inputPlaceholder}
          textFilter={textFilter}
          styleExt={compoboxCustomItemStyleExt}
          onSetFilter={onSetFilter}
          onFilterOnKeyUp={this.onFilterOnKeyUp}
        />
        {this.renderFilteredItems(compoboxCustomItemStyleExt)}
      </StackBodyCustomContent>
    );
  }
}

ComboboxComponent.propTypes = propTypes;
ComboboxComponent.defaultProps = defaultProps;
