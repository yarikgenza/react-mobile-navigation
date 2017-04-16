import React from 'react';
import ActionSheetListItemRender from '../components-styled/ActionSheetListItemRender';
import { RED_EXT } from '../utils/styles';

const propTypes = {
  isRed: React.PropTypes.bool,
  item: React.PropTypes.object.isRequired,
  onSelect: React.PropTypes.func.isRequired,
};

const defaultProps = {
  isRed: false,
};

export default class ActionSheetListItem extends React.Component {

  constructor(props) {
    super(props);
    this.onSelect = this.onSelect.bind(this);
  }

  onSelect() {
    const { onSelect, item } = this.props;
    onSelect(item);
  }

  render() {
    const { isRed, item } = this.props;
    return (
      <ActionSheetListItemRender style={isRed ? RED_EXT : undefined} onClick={this.onSelect} >
        {item.label}
      </ActionSheetListItemRender>
    );
  }
}

ActionSheetListItem.propTypes = propTypes;
ActionSheetListItem.defaultProps = defaultProps;
