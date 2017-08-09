import PropTypes from 'prop-types';
import React from 'react';
import { TouchableHighlight } from 'react-native';
import ActionSheetListItemRender from '../components-styled/ActionSheetListItemRender';
import ActionSheetListItemView from '../components-styled/ActionSheetListItemView';

const propTypes = {
  isRed: PropTypes.bool,
  item: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
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
    const { isRed, item, ...props } = this.props;
    return (
      <TouchableHighlight
        underlayColor="rgba(0, 0, 0, 0.1)"
        onPress={this.onSelect}
        style={{ overflow: 'hidden' }}
      >
        <ActionSheetListItemView {...props}>
          <ActionSheetListItemRender isRed={isRed}>
            {item.label}
          </ActionSheetListItemRender>
        </ActionSheetListItemView>
      </TouchableHighlight>
    );
  }
}

ActionSheetListItem.propTypes = propTypes;
ActionSheetListItem.defaultProps = defaultProps;
