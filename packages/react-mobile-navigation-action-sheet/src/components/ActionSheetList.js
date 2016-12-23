import React from 'react';
import ActionSheetListItem from './ActionSheetListItem';
import ActionSheetListRender from '../components-styled/ActionSheetListRender';
import actionSheetOptionModel from '../models/action-sheet-option-model';

const propTypes = {
  items: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  cancelLabel: React.PropTypes.string,
  onCancel: React.PropTypes.func,
  onSelect: React.PropTypes.func,
};

const defaultProps = {
  items: [],
  cancelLabel: 'Cancel',
};

export default class ActionSheetList extends React.Component {

  constructor(props) {
    super(props);
    this.onSelect = this.onSelect.bind(this);
  }

  onSelect() {
    const { onCancel } = this.props;
    onCancel();
  }

  render() {
    const { cancelLabel, items, onSelect } = this.props;
    const itemsToDraw = items.map((item) => (
      <ActionSheetListItem
        key={item.key}
        item={item}
        onSelect={onSelect}
      />
    ));
    const cancelItem = actionSheetOptionModel('cancel-key', cancelLabel);
    return (
      <ActionSheetListRender>
        {itemsToDraw}
        <ActionSheetListItem
          key={cancelItem.key}
          isRed
          item={cancelItem}
          onSelect={this.onSelect}
        />
      </ActionSheetListRender>
    );
  }
}

ActionSheetList.propTypes = propTypes;
ActionSheetList.defaultProps = defaultProps;
