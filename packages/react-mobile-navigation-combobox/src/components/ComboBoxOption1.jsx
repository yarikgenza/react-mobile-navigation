import PropTypes from 'prop-types';
import React from 'react';
import ComboBoxOptionStyled from '../components-styled/ComboBoxOptionStyled';

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
      <ComboBoxOptionStyled isBold={isBold} style={item.style} onCick={this.onItemSelect} >
        {item.label}
      </ComboBoxOptionStyled>
    );
  }
}

ComboBoxOption.propTypes = propTypes;
ComboBoxOption.defaultProps = defaultProps;
