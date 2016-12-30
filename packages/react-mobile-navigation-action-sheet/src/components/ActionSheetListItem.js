import React from 'react';
import ActionSheetListItemRender from '../components-styled/ActionSheetListItemRender';
import { ACTION_SHEET_ITEM_HOVER_EXT_STYLE, RED_EXT } from '../utils/styles';

const propTypes = {
  isRed: React.PropTypes.bool,
  item: React.PropTypes.object.isRequired,
  onMouseEnter: React.PropTypes.func,
  onMouseLeave: React.PropTypes.func,
  onSelect: React.PropTypes.func.isRequired,
};

const defaultProps = {
  isRed: false,
};

export default class ActionSheetListItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isHover: false,
    };
    this.onSelect = this.onSelect.bind(this);
  }

  onSetHover(isHover) {
    this.setState({ isHover });
  }

  onSelect() {
    const { onSelect, item } = this.props;
    onSelect(item);
  }

  render() {
    const {
      isRed,
      item,
      onMouseEnter,
      onMouseLeave,
    } = this.props;
    const { isHover } = this.state;
    const style = Object.assign(
      {},
      isRed ? RED_EXT : undefined,
      isHover ? ACTION_SHEET_ITEM_HOVER_EXT_STYLE : undefined
    );
    return (
      <ActionSheetListItemRender
        style={style}
        onClick={this.onSelect}
        onMouseEnter={(e) => { this.onSetHover(true); if (onMouseEnter) { onMouseEnter(e); } }}
        onMouseLeave={(e) => { this.onSetHover(false); if (onMouseLeave) { onMouseLeave(e); } }}
      >
        {item.label}
      </ActionSheetListItemRender>
    );
  }
}

ActionSheetListItem.propTypes = propTypes;
ActionSheetListItem.defaultProps = defaultProps;
