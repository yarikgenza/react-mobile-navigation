import React from 'react';
import ComboBoxOptionStyled from '../components-styled/ComboboxOptionStyled';

const propTypes = {
  isBold: React.PropTypes.bool.isRequired,
  item: React.PropTypes.object.isRequired,
  handleItemSelect: React.PropTypes.func.isRequired,
};

const defaultProps = {};

export default class ComboboxOption extends React.PureComponent {

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
      <ComboBoxOptionStyled isBold={isBold} style={item.style} onClick={this.onItemSelect} >
        {item.label}
      </ComboBoxOptionStyled>
    );
  }
}

ComboboxOption.propTypes = propTypes;
ComboboxOption.defaultProps = defaultProps;
