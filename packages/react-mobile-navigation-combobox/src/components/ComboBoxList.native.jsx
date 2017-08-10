import Input from 'binary-ui-components/mobile/Input';
import IconCancel from 'binary-ui-icons/binary/Cancel';
import IconDone from 'binary-ui-icons/binary/Done';
import StackPage from 'binary-ui-stack';
import StackBodyContainer from 'binary-ui-stack/StackBodyContainer';
import PropTypes from 'prop-types';
import React from 'react';
import { FlatList } from 'react-native';
import ComboBoxOption from './ComboBoxOption';
import ComboBoxNoOptionsStyled from '../components-styled/ComboBoxNoOptionsStyled';

const STACK_PAGE_WRAPPER_STYLE = {
  borderTopLeftRadius: 10,
  borderTopRightRadius: 10,
};

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
    this.renderRow = this.renderRow.bind(this);
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

  renderRow({ index, item, key }) {
    const {
      filteredItems,
      inputPlaceholder,
      isBold,
      textFilter,
      onFilterSet,
      onSelect,
    } = this.props;
    if (index === 0) {
      return (
        <Input
          isBold={isBold}
          isValid={this.isValid()}
          key={key}
          placeholder={inputPlaceholder}
          value={textFilter}
          onTextChange={onFilterSet}
        />
      );
    }
    if (filteredItems.length === 0) {
      return (
        <ComboBoxNoOptionsStyled key={key} >
          {this.getNoOptionsText()}
        </ComboBoxNoOptionsStyled>
      );
    }
    return (
      <ComboBoxOption
        isBold={isBold}
        item={item}
        key={item.key}
        handleItemSelect={onSelect}
      />
    );
  }

  render() {
    const {
      allowCustomValue,
      bodyStyle,
      filteredItems,
      headerStyle,
      pageHeight,
      pageWidth,
      stackTitle,
      onCancel,
      onTrySelectCustom,
    } = this.props;
    const filteredItemsExtended = filteredItems.length > 0
      ? [{ key: 'search-bar' }, ...filteredItems]
      : [{ key: 'search-bar' }, { key: 'no-items' }];
    return (
      <StackPage
        wrapperStyle={STACK_PAGE_WRAPPER_STYLE}
        bodyStyle={bodyStyle}
        headerStyle={headerStyle}
        leftButton={{
          renderIcon: () => (<IconCancel />),
          onPress: onCancel,
        }}
        pageHeight={pageHeight}
        rightButton={(allowCustomValue
          ? {
            renderIcon: () => (<IconDone />),
            onPress: onTrySelectCustom,
          } : undefined
        )}
        stackTitle={stackTitle}
        stackTitleEditable={false}
        titleIcon={undefined}
        useSearch={false}
      >
        <StackBodyContainer pageHeight={pageHeight} pageWidth={pageWidth} >
          <FlatList
            data={filteredItemsExtended}
            renderItem={this.renderRow}
          />
        </StackBodyContainer>
      </StackPage>
    );
  }
}

ComboBoxList.propTypes = propTypes;
ComboBoxList.defaultProps = defaultProps;
