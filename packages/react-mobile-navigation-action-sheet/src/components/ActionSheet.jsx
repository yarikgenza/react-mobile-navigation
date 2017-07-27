import PropTypes from 'prop-types';
import React from 'react';
import {
  Interpolation,
  MobileNavigationShadowPage,
  PageStatusTypesEnum,
} from 'react-mobile-navigation-core';
import ActionSheetList from './ActionSheetList';

const propTypes = {
  cancelLabel: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  pageStatus: PropTypes.string,
  pageWidth: PropTypes.number.isRequired,
  zIndex: PropTypes.number.isRequired,
  onCancel: PropTypes.func,
  onSelect: PropTypes.func,
  onShadowClick: PropTypes.func,
  onActionSheetOpenDone: PropTypes.func.isRequired,
  onActionSheetCloseStart: PropTypes.func.isRequired,
  onActionSheetCloseDone: PropTypes.func.isRequired,
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
    const { cancelLabel, items, pageStatus, pageWidth, zIndex } = this.props;
    return (
      <Interpolation
        isShow={pageStatus !== PageStatusTypesEnum.CLOSE_DONE}
        pageStatus={pageStatus}
        onPageOpenDone={this.onPageOpenDone}
        onPageCloseDone={this.onPageCloseDone}
      >
        <MobileNavigationShadowPage
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
