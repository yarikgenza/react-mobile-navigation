import React from 'react';
import ComboboxOptionStyled from '../components-styled/ComboboxOptionStyled';

const propTypes = {
  isBold: React.PropTypes.bool.isRequired,
  item: React.PropTypes.object.isRequired,
  handleItemSelect: React.PropTypes.func.isRequired,
};

const defaultProps = {};

export default class ComboboxOption extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isHover: false,
    };
    this.onSetHoverStatus = this.onSetHoverStatus.bind(this);
    this.onItemSelect = this.onItemSelect.bind(this);
  }

  onSetHoverStatus(isHover) {
    this.setState({ isHover });
  }

  onItemSelect() {
    const { handleItemSelect, item } = this.props;
    handleItemSelect(item);
  }

  render() {
    const { item, isBold } = this.props;
    return (
      <ComboboxOptionStyled
        isBold={isBold}
        style={item.style}
        onClick={this.onItemSelect}
        onMouseEnter={() => { this.onSetHoverStatus(true); }}
        onMouseLeave={() => { this.onSetHoverStatus(false); }}
      >
        {item.label}
      </ComboboxOptionStyled>
    );
  }
}

ComboboxOption.propTypes = propTypes;
ComboboxOption.defaultProps = defaultProps;
