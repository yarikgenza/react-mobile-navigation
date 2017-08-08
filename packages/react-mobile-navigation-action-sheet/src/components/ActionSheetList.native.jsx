import PropTypes from 'prop-types';
import React from 'react';
import ActionSheetListItem from './ActionSheetListItem';
import ActionSheetListRender from '../components-styled/ActionSheetListRender';
import actionSheetOptionModel from '../models/action-sheet-option-model';

const propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  cancelLabel: PropTypes.string,
  pageIndex: PropTypes.number,
  onCancel: PropTypes.func,
  onSelect: PropTypes.func,
};

const defaultProps = {
  items: [],
  cancelLabel: 'Cancel',
};

export default class ActionSheetList extends React.PureComponent {
  render() {
    const { cancelLabel, items, pageIndex, onCancel, onSelect } = this.props;
    const itemCancel = actionSheetOptionModel('cancel-key', cancelLabel);
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
          key={itemCancel.key}
          isRed
          item={itemCancel}
          onSelect={onCancel}
        />
      </ActionSheetListRender>
    );
  }
}

ActionSheetList.propTypes = propTypes;
ActionSheetList.defaultProps = defaultProps;
