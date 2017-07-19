import React from 'react';
import {
  DirectionEnum,
  Interpolation,
  MobileNavigationShadowPage,
} from 'react-mobile-navigation-core';
import ActionSheetList from './ActionSheetList';

const propTypes = {
  cancelLabel: React.PropTypes.string,
  isShow: React.PropTypes.bool.isRequired,
  items: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  pageStatus: React.PropTypes.string,
  pageWidth: React.PropTypes.number.isRequired,
  zIndex: React.PropTypes.number.isRequired,
  onCancel: React.PropTypes.func,
  onSelect: React.PropTypes.func,
  onShadowClick: React.PropTypes.func,
  onActionSheetOpenDone: React.PropTypes.func.isRequired,
  onActionSheetCloseStart: React.PropTypes.func.isRequired,
  onActionSheetCloseDone: React.PropTypes.func.isRequired,
};

const defaultProps = {
  items: [],
};

/**
 * MobileNavigationShadowPage engine
 */
export default class ActionSheet extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedOption: undefined,
    };
    this.onSelect = this.onSelect.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onShadowClick = this.onShadowClick.bind(this);
    this.onPageOpenDone = this.onPageOpenDone.bind(this);
    this.onPageCloseDone = this.onPageCloseDone.bind(this);
  }

  onSelect(selectedOption) {
    this.setState(() => ({ selectedOption }));
    this.closeActionSheet();
  }

  onCancel() {
    const { onCancel } = this.props;
    if (onCancel) {
      onCancel();
    }
    this.closeActionSheet();
  }

  onShadowClick() {
    const { onShadowClick } = this.props;
    if (onShadowClick) {
      onShadowClick();
      return;
    }
    this.onCancel();
  }

  onPageOpenDone() {
    const { onActionSheetOpenDone } = this.props;
    onActionSheetOpenDone();
  }

  onPageCloseDone() {
    const { onSelect, onActionSheetCloseDone } = this.props;
    const { selectedOption } = this.state;
    // set state until use does actions which can possibly unmount the component
    this.setState(() => ({ selectedOption: undefined }));
    onActionSheetCloseDone();
    if (selectedOption && selectedOption.handler) {
      selectedOption.handler();
    }
    if (onSelect && selectedOption) {
      onSelect(selectedOption);
    }
  }

  closeActionSheet() {
    const { onActionSheetCloseStart } = this.props;
    onActionSheetCloseStart();
  }

  render() {
    const { cancelLabel, isShow, items, pageStatus, pageWidth, zIndex } = this.props;
    return (
      <Interpolation
        isShow={isShow}
        pageStatus={pageStatus}
        onPageOpenDone={this.onPageOpenDone}
        onPageCloseDone={this.onPageCloseDone}
      >
        <MobileNavigationShadowPage
          direction={DirectionEnum.VERTICAL}
          pageLeft={0}
          pageWidth={pageWidth}
          zIndex={zIndex}
          onShadowClick={this.onShadowClick}
        >
          <ActionSheetList
            cancelLabel={cancelLabel}
            items={items}
            pageIndex={zIndex}
            onCancel={this.onCancel}
            onSelect={this.onSelect}
          />
        </MobileNavigationShadowPage>
      </Interpolation>
    );
  }
}

ActionSheet.propTypes = propTypes;
ActionSheet.defaultProps = defaultProps;
