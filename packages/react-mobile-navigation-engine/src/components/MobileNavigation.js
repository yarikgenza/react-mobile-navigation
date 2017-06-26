import React from 'react';
import {
  ActionSheet,
  actionSheetActionTypes,
  actionSheetActions,
  actionSheetPagesInitialState,
  actionSheetPagesReducers,
} from 'react-mobile-navigation-action-sheet';
import {
  AlertBox,
  alertActionTypes,
  alertActions,
  alertPagesInitialState,
  alertPagesReducers,
} from 'react-mobile-navigation-alert';
import {
  ComboBox,
  comboBoxActionTypes,
  comboBoxActions,
  comboBoxPagesInitialState,
  comboBoxReducers,
} from 'react-mobile-navigation-combobox';
import {
  Modal,
  modalActionTypes,
  modalActions,
  modalPagesInitialState,
  modalPagesReducers,
} from 'react-mobile-navigation-modal';
import * as pagingActions from '../actions/paging-actions';
import MobileNavigationPageEngine from '../components/MobileNavigationPageEngine';
import MobileNavigationRender from '../components-styled/MobileNavigationRender';
import mobileNavigationReducers from '../reducers/index';
import { getPageById } from '../utils/page-manager';

const propTypes = {
  children: React.PropTypes.any,
  initState: React.PropTypes.object,
  pageHeight: React.PropTypes.number,
  pageWidth: React.PropTypes.number,
  stackId: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string,
  ]).isRequired,
};

const defaultProps = {};

export default class MobileNavigation extends React.Component {

  constructor(props) {
    super(props);
    this.memoizedActionSheet = undefined;
    this.memoizedAlert = undefined;
    this.memoizedComboBox = undefined;
    this.memoizedModal = undefined;
    this.state = {
      actionSheet: actionSheetPagesInitialState,
      alert: alertPagesInitialState,
      comboBox: comboBoxPagesInitialState,
      modal: modalPagesInitialState,
      navigation: props.initState,
    };
    this.dispatchPagingActions = this.dispatchPagingActions.bind(this);
    this.dispatchActionSheetActions = this.dispatchActionSheetActions.bind(this);
    this.dispatchAlertActions = this.dispatchAlertActions.bind(this);
    this.dispatchComboBoxActions = this.dispatchComboBoxActions.bind(this);
    this.dispatchModalActions = this.dispatchModalActions.bind(this);
    this.pagingActions = this.bindActionCreators(pagingActions, this.dispatchPagingActions);
    this.actionSheetActions = this.bindActionCreators(
      actionSheetActions,
      this.dispatchActionSheetActions
    );
    this.alertActions = this.bindActionCreators(alertActions, this.dispatchAlertActions);
    this.comboBoxActions = this.bindActionCreators(comboBoxActions, this.dispatchComboBoxActions);
    this.modalActions = this.bindActionCreators(modalActions, this.dispatchModalActions);
  }

  getVisiblePageData(prevPageId) {
    const { navigation } = this.state;
    return {
      pageId: prevPageId,
      pageState: navigation.pages[prevPageId],
    };
  }

  /**
   * Render only visible and the previous pages.
   * @param {*} activePageId
   */
  getVisiblePages(activePageId) {
    const visiblePagesData = [];
    let pageData = this.getVisiblePageData(activePageId);
    visiblePagesData.push(pageData);
    if (pageData.pageState.prevPageId) {
      pageData = this.getVisiblePageData(pageData.pageState.prevPageId);
      visiblePagesData.push(pageData);
    }
    return visiblePagesData;
  }

  bindActionCreators(actionCreator, dispatch) {
    return Object.keys(actionCreator)
      .reduce((accumulator, value) => (
        Object.assign(accumulator, {
          [value]: (...props) => { dispatch(actionCreator[value](...props)); },
        })
      ), {});
  }

  dispatchActionSheetActions(action) {
    // do not store alert info in a state
    switch (action.type) {
      case actionSheetActionTypes.ACTION_SHEET_OPEN_START:
        this.memoizedActionSheet = action.props;
        break;
      case actionSheetActionTypes.ACTION_SHEET_CLOSE_DONE:
        this.memoizedActionSheet = undefined;
        break;
      default:
        break;
    }
    this.setState(prevState => ({
      actionSheet: actionSheetPagesReducers(prevState.actionSheet, action),
    }));
  }

  dispatchAlertActions(action) {
    // do not store alert info in a state
    switch (action.type) {
      case alertActionTypes.ALERT_OPEN_PAGE:
        this.memoizedAlert = action.props;
        break;
      case alertActionTypes.ALERT_GOING_BACK_DONE:
      case alertActionTypes.ALERT_GO_BACK_FORCE:
        this.memoizedAlert = undefined;
        break;
      default:
        break;
    }
    this.setState(prevState => ({
      alert: alertPagesReducers(prevState.alert, action),
    }));
  }

  dispatchComboBoxActions(action) {
    // do not store alert info in a state
    switch (action.type) {
      case comboBoxActionTypes.COMBO_BOX_OPEN_PAGE:
        this.memoizedComboBox = action.props;
        break;
      case comboBoxActionTypes.COMBO_BOX_GOING_BACK_DONE:
        this.memoizedComboBox = undefined;
        break;
      default:
        break;
    }
    this.setState(prevState => ({
      comboBox: comboBoxReducers(prevState.comboBox, action),
    }));
  }

  dispatchModalActions(action) {
    // do not store modal info in a state
    switch (action.type) {
      case modalActionTypes.MODAL_OPEN_PAGE:
        this.memoizedModal = action.props;
        break;
      case modalActionTypes.MODAL_GOING_BACK_DONE:
        this.memoizedModal = undefined;
        break;
      default:
        break;
    }
    this.setState(prevState => ({
      modal: modalPagesReducers(prevState.modal, action),
    }));
  }

  dispatchPagingActions(action) {
    this.setState(prevState => ({
      navigation: mobileNavigationReducers(prevState.navigation, action),
    }));
  }

  render() {
    const { children, pageHeight, pageWidth, stackId } = this.props;
    const { actionSheet, alert, comboBox, modal, navigation } = this.state;
    return (
      <MobileNavigationRender>
        {this.getVisiblePages(navigation.activePageId).map(page => {
          const pageId = page.pageId;
          return (
            <MobileNavigationPageEngine
              actionSheetActions={this.actionSheetActions}
              alertActions={this.alertActions}
              comboBoxActions={this.comboBoxActions}
              key={pageId}
              modalActions={this.modalActions}
              pageHeight={pageHeight}
              pagingActions={this.pagingActions}
              pageId={pageId}
              pageState={page.pageState}
              pageWidth={pageWidth}
              stackId={stackId}
            >
              {getPageById(React.Children.toArray(children), pageId)}
            </MobileNavigationPageEngine>
          );
        })}
        {this.memoizedActionSheet && (
          <ActionSheet
            cancelLabel={this.memoizedActionSheet.cancelLabel}
            items={this.memoizedActionSheet.items}
            pageState={actionSheet}
            pagingActions={this.actionSheetActions}
            onSelect={this.memoizedActionSheet.onSelect}
            onCancel={this.memoizedActionSheet.onCancel}
          />
        )}
        {this.memoizedAlert && (
          <AlertBox
            autoHideDuration={this.memoizedAlert.autoHideDuration}
            pageState={alert}
            pagingActions={this.alertActions}
            text={this.memoizedAlert.text}
            type={this.memoizedAlert.type}
            onClick={this.memoizedAlert.onClick}
          />
        )}
        {this.memoizedComboBox && (
          <ComboBox
            allowCustomValue={this.memoizedComboBox.allowCustomValue}
            bodyStyle={this.memoizedComboBox.bodyStyle}
            customOptionModel={this.memoizedComboBox.customOptionModel}
            headerStyle={this.memoizedComboBox.headerStyle}
            items={this.memoizedComboBox.items}
            inputPlaceholder={this.memoizedComboBox.inputPlaceholder}
            isBold={this.memoizedComboBox.isBold}
            noOptionsMatchingInputLabel={this.memoizedComboBox.noOptionsMatchingInputLabel}
            pageHeight={pageHeight}
            pageWidth={pageWidth}
            pressEnterToSaveCustomFieldLabel={
              this.memoizedComboBox.pressEnterToSaveCustomFieldLabel
            }
            pageState={comboBox}
            pagingActions={this.comboBoxActions}
            title={this.memoizedComboBox.title}
            onCancel={this.memoizedComboBox.onCancel}
            onSelect={this.memoizedComboBox.onSelect}
            onSelectCustom={this.memoizedComboBox.onSelectCustom}
          />
        )}
        {this.memoizedModal && (
          <Modal
            bodyStyle={this.memoizedModal.bodyStyle}
            headerStyle={this.memoizedModal.headerStyle}
            pageHeight={pageHeight}
            pageWidth={pageWidth}
            pageState={modal}
            pagingActions={this.modalActions}
            title={this.memoizedModal.title}
            onCancel={this.memoizedModal.onCancel}
            onConfirm={this.memoizedModal.onConfirm}
          >
            {this.memoizedModal.render()}
          </Modal>
        )}
      </MobileNavigationRender>
    );
  }
}

MobileNavigation.propTypes = propTypes;
MobileNavigation.defaultProps = defaultProps;
