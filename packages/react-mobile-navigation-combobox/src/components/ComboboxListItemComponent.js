import React from 'react';
import {
  COMBOBOX_OPTION_STYLE,
  COMBOBOX_OPTION_HOVER_EXT_STYLE,
} from '../utils/styles';

const propTypes = {
  item: React.PropTypes.object.isRequired,
  handleItemSelect: React.PropTypes.func.isRequired,
};

const defaultProps = {};

export default class ComboboxListItemComponent extends React.Component {

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
    const { item } = this.props;
    const { isHover } = this.state;
    const style = Object.assign(
      {},
      COMBOBOX_OPTION_STYLE,
      item.style,
      isHover ? COMBOBOX_OPTION_HOVER_EXT_STYLE : undefined
    );
    return (
      <div
        style={style}
        onClick={this.onItemSelect}
        onMouseEnter={() => { this.onSetHoverStatus(true); }}
        onMouseLeave={() => { this.onSetHoverStatus(false); }}
      >
        {item.label}
      </div>
    );
  }
}

ComboboxListItemComponent.propTypes = propTypes;
ComboboxListItemComponent.defaultProps = defaultProps;
