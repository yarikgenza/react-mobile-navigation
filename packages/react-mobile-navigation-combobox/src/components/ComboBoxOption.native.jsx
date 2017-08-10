import PropTypes from 'prop-types';
import React from 'react';
import { TouchableHighlight } from 'react-native';
import ComboBoxOptionStyled from '../components-styled/ComboBoxOptionStyled';
import ComboBoxOptionView from '../components-styled/ComboBoxOptionView';

const propTypes = {
  isBold: PropTypes.bool.isRequired,
  item: PropTypes.object.isRequired,
  handleItemSelect: PropTypes.func.isRequired,
};

const defaultProps = {};

export default class ComboBoxOption extends React.PureComponent {

  constructor(props) {
    super(props);
    this.onItemSelect = this.onItemSelect.bind(this);
  }

  onItemSelect() {
    const { handleItemSelect, item } = this.props;
    handleItemSelect(item);
  }

  render() {
    const { item, isBold, props } = this.props;
    return (
      <TouchableHighlight underlayColor={'rgba(0, 0, 0, 0.05)'} onPress={this.onItemSelect} >
        <ComboBoxOptionView {...props} >
          <ComboBoxOptionStyled isBold={isBold} style={item.style} >
            {item.label}
          </ComboBoxOptionStyled>
        </ComboBoxOptionView>
      </TouchableHighlight>
    );
  }
}

ComboBoxOption.propTypes = propTypes;
ComboBoxOption.defaultProps = defaultProps;
