import React from 'react';
import ActionSheetListItem from './ActionSheetListItem';
import ActionSheetListRender from '../components-styled/ActionSheetListRender';
import actionSheetOptionModel from '../models/action-sheet-option-model';

const propTypes = {
  items: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  cancelLabel: React.PropTypes.string,
  pageIndex: React.PropTypes.number,
  onCancel: React.PropTypes.func,
  onSelect: React.PropTypes.func,
};

const defaultProps = {
  items: [],
  cancelLabel: 'Cancel',
};

export default class ActionSheetList extends React.PureComponent {

  constructor(props) {
    super(props);
    this.onSelect = this.onSelect.bind(this);
  }

  onSelect() {
    const { onCancel } = this.props;
    onCancel();
  }

  render() {
    const { cancelLabel, items, pageIndex, onSelect } = this.props;
    const cancelItem = actionSheetOptionModel('cancel-key', cancelLabel);
    return (
      <ActionSheetListRender styleIndex={pageIndex + 1} >
        {items.map((item) => (
          <ActionSheetListItem
            key={item.key}
            item={item}
            onSelect={onSelect}
          />
        ))}
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
