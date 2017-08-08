import PropTypes from 'prop-types';
import React from 'react';
import { TouchableOpacity } from 'react-native';
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
    const { item, isBold } = this.props;
    return (
      <TouchableOpacity onPress={this.onItemSelect} >
        <ComboBoxOptionView>
          <ComboBoxOptionStyled isBold={isBold} style={item.style} >
            {item.label}
          </ComboBoxOptionStyled>
        </ComboBoxOptionView>
      </TouchableOpacity>
    );
  }
}

ComboBoxOption.propTypes = propTypes;
ComboBoxOption.defaultProps = defaultProps;
