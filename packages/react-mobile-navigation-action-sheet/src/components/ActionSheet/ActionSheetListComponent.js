import React from 'react';
import { ActionSheetListItemComponent } from './ActionSheetListItemComponent';
import { ActionSheetOptionModel } from './ActionSheetOptionModel';
import { ACTION_SHEET_STYLE } from '../../utils/styles';

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

export class ActionSheetListComponent extends React.Component {

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
      <ActionSheetListItemComponent
        key={item.key}
        item={item}
        onSelect={onSelect}
      />
    ));
    const cancelItem = new ActionSheetOptionModel('cancel-key', cancelLabel);
    return (
      <div style={ACTION_SHEET_STYLE} >
        {itemsToDraw}
        <ActionSheetListItemComponent
          key={cancelItem.key}
          isRed
          item={cancelItem}
          onSelect={this.onSelect}
        />
      </div>
    );
  }
}

ActionSheetListComponent.propTypes = propTypes;
ActionSheetListComponent.defaultProps = defaultProps;
