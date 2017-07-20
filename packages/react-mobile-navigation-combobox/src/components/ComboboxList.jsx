import IconCancel from 'binary-ui-icons/binary/Cancel';
import IconDone from 'binary-ui-icons/binary/Done';
import StackPage from 'binary-ui-stack';
import StackBodyCustomContent from 'binary-ui-stack/StackBodyCustomContent';
import React from 'react';
import ComboBoxOption from './ComboBoxOption';
import ComboBoxInput from './ComboBoxInput';
import ComboBoxNoOptionsStyled from '../components-styled/ComboBoxNoOptionsStyled';
import { ENTER, ESCAPE } from '../constants/key-events';

const propTypes = {
  allowCustomValue: React.PropTypes.bool,
  bodyStyle: React.PropTypes.object,
  customOptionModel: React.PropTypes.object,
  filteredItems: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  headerStyle: React.PropTypes.object,
  inputPlaceholder: React.PropTypes.string,
  isBold: React.PropTypes.bool,
  noOptionsMatchingInputLabel: React.PropTypes.string,
  pageHeight: React.PropTypes.number,
  pageWidth: React.PropTypes.number,
  pressEnterToSaveCustomFieldLabel: React.PropTypes.string,
  stackTitle: React.PropTypes.string,
  textFilter: React.PropTypes.string,
  onCancel: React.PropTypes.func,
  onFilterSet: React.PropTypes.func,
  onSelect: React.PropTypes.func,
  onSelectCustom: React.PropTypes.func,
  onTrySelectCustom: React.PropTypes.func,
};

const defaultProps = {
  allowCustomValue: false,
  bodyStyle: undefined,
  customOptionModel: {},
  filteredItems: [],
  headerStyle: undefined,
  inputPlaceholder: undefined,
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
      </StackPage>
    );
  }
}

ComboBoxList.propTypes = propTypes;
ComboBoxList.defaultProps = defaultProps;
