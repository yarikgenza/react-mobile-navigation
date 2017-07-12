import React from 'react';
import ActionSheetListItemRender from '../components-styled/ActionSheetListItemRender';

const propTypes = {
  isRed: React.PropTypes.bool,
  item: React.PropTypes.object.isRequired,
  onSelect: React.PropTypes.func.isRequired,
};

const defaultProps = {
  isRed: false,
};

export default class ActionSheetListItem extends React.PureComponent {

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
      <ActionSheetListItemRender isRed={isRed} onClick={this.onSelect} >
        {item.label}
      </ActionSheetListItemRender>
    );
  }
}

ActionSheetListItem.propTypes = propTypes;
ActionSheetListItem.defaultProps = defaultProps;
