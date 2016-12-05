import React from 'react';
import { actionAreaBlockHOC } from 'react-action-hoc';
import {
  ACTION_SHEET_ITEM_STYLE,
  ACTION_SHEET_ITEM_HOVER_EXT_STYLE,
  RED_EXT,
} from '../../utils/styles';

const ActionDivStyled = actionAreaBlockHOC(
  (props) => (<div {...props} />)
);

const propTypes = {
  isRed: React.PropTypes.bool,
  item: React.PropTypes.object.isRequired,
  onSelect: React.PropTypes.func.isRequired,
};

const defaultProps = {
  isRed: false,
};

export class ActionSheetListItemComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isHover: false,
    };
    this.onSetHoverStatus = this.onSetHoverStatus.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  onSetHoverStatus(isHover) {
    this.setState({
      isHover,
    });
  }

  onSelect() {
    const { onSelect, item } = this.props;
    onSelect(item);
  }

  render() {
    const { isRed, item } = this.props;
    const { isHover } = this.state;
    const style = Object.assign(
      {},
      ACTION_SHEET_ITEM_STYLE,
      isRed ? RED_EXT : undefined,
      isHover ? ACTION_SHEET_ITEM_HOVER_EXT_STYLE : undefined
    );
    return (
      <ActionDivStyled
        style={style}
        onClick={this.onSelect}
        onSetHoverStatus={this.onSetHoverStatus}
      >
        {item.label}
      </ActionDivStyled>
    );
  }
}

ActionSheetListItemComponent.propTypes = propTypes;
ActionSheetListItemComponent.defaultProps = defaultProps;
