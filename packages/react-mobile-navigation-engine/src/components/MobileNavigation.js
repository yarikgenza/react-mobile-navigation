import React from 'react';
import ActionSheet from 'react-mobile-navigation-action-sheet';
import AlertBox from 'react-mobile-navigation-alert';
import ComboBox from 'react-mobile-navigation-combobox';
import { DirectionEnum, PageStatusTypesEnum } from 'react-mobile-navigation-core';
import Modal from 'react-mobile-navigation-modal';
import {
  PAGE_OPEN_START,
  PAGE_OPEN_DONE,
  PAGE_CLOSE_START,
  PAGE_CLOSE_DONE,
  PAGE_CLOSE_DONE_FORCE,
} from '../action-types/paging-action-types';
import MobileNavigationPageEngine from '../components/MobileNavigationPageEngine';
import MobileNavigationRender from '../components-styled/MobileNavigationRender';
import stackPagingReducers from '../reducers/stack-pages-reducers';
import { getPrevPageById, getPrevPageId, isPrevPage } from '../utils/page-manager';

const propTypes = {
  children: React.PropTypes.any,
  initState: React.PropTypes.object,
  pageHeight: React.PropTypes.number,
  pageWidth: React.PropTypes.number,
};

const defaultProps = {};

export default class MobileNavigation extends React.Component {

  constructor(props) {
    super(props);
    this.memoizedActionSheet = undefined;
    this.memoizedActionSheetDirection = undefined;
    this.memoizedAlert = undefined;
    this.memoizedComboBox = undefined;
    this.memoizedComboBoxDirection = undefined;
    this.memoizedModal = undefined;
    this.memoizedModalDirection = undefined;
    this.memoizedNavigation = undefined;
    this.state = {
      actionSheet: {
        status: PageStatusTypesEnum.CLOSE_DONE,
      },
      alert: {
        status: PageStatusTypesEnum.CLOSE_DONE,
      },
      comboBox: {
        status: PageStatusTypesEnum.CLOSE_DONE,
      },
      modal: {
        status: PageStatusTypesEnum.CLOSE_DONE,
      },
      navigation: props.initState,
    };
    this.onActionSheetOpenStart = this.onActionSheetOpenStart.bind(this);
    this.onActionSheetOpenDone = this.onActionSheetOpenDone.bind(this);
    this.onActionSheetCloseStart = this.onActionSheetCloseStart.bind(this);
    this.onActionSheetCloseDone = this.onActionSheetCloseDone.bind(this);
    this.onAlertOpenStart = this.onAlertOpenStart.bind(this);
    this.onAlertOpenDone = this.onAlertOpenDone.bind(this);
    this.onAlertCloseStart = this.onAlertCloseStart.bind(this);
    this.onAlertCloseDone = this.onAlertCloseDone.bind(this);
    this.onComboBoxOpenStart = this.onComboBoxOpenStart.bind(this);
    this.onComboBoxOpenDone = this.onComboBoxOpenDone.bind(this);
    this.onComboBoxCloseStart = this.onComboBoxCloseStart.bind(this);
    this.onComboBoxCloseDone = this.onComboBoxCloseDone.bind(this);
    this.onModalOpenStart = this.onModalOpenStart.bind(this);
    this.onModalOpenDone = this.onModalOpenDone.bind(this);
    this.onModalCloseStart = this.onModalCloseStart.bind(this);
    this.onModalCloseDone = this.onModalCloseDone.bind(this);
    this.onPageOpenStart = this.onPageOpenStart.bind(this);
    this.onPageOpenHorizontalStart = this.onPageOpenHorizontalStart.bind(this);
    this.onPageOpenVerticalStart = this.onPageOpenVerticalStart.bind(this);
    this.onPageOpenForce = this.onPageOpenForce.bind(this);
    this.onPageOpenDone = this.onPageOpenDone.bind(this);
    this.onPageCloseStart = this.onPageCloseStart.bind(this);
    this.onPageCloseForce = this.onPageCloseForce.bind(this);
    this.onPageCloseDone = this.onPageCloseDone.bind(this);
  }

  onActionSheetOpenStart(props, direction) {
    this.memoizedActionSheet = props;
    this.memoizedActionSheetDirection = direction;
    this.setState(() => ({
      actionSheet: {
        status: PageStatusTypesEnum.OPEN_DONE,
      },
    }));
  }

  onActionSheetOpenDone() {}

  onActionSheetCloseStart() {
    this.setState(() => ({
      actionSheet: {
        status: PageStatusTypesEnum.CLOSE_DONE,
      },
    }));
  }

  onActionSheetCloseDone() {
    this.memoizedActionSheet = undefined;
    this.memoizedActionSheetDirection = undefined;
  }

  onAlertOpenStart(props) {
    this.memoizedAlert = props;
    this.setState(() => ({
      alert: {
        status: PageStatusTypesEnum.OPEN_DONE,
      },
    }));
  }

  onAlertOpenDone() { }

  onAlertCloseStart() {
    this.setState(() => ({
      alert: {
        status: PageStatusTypesEnum.CLOSE_DONE,
      },
    }));
  }

  onAlertCloseDone() {
    this.memoizedAlert = undefined;
  }

  onComboBoxOpenStart(props, direction) {
    this.memoizedComboBox = props;
    this.memoizedComboBoxDirection = direction;
    this.setState(() => ({
      comboBox: {
        status: PageStatusTypesEnum.OPEN_DONE,
      },
    }));
  }

  onComboBoxOpenDone() { }

  onComboBoxCloseStart() {
    this.setState(() => ({
      comboBox: {
        status: PageStatusTypesEnum.CLOSE_DONE,
      },
    }));
  }

  onComboBoxCloseDone() {
    this.memoizedComboBox = undefined;
    this.memoizedComboBoxDirection = undefined;
  }

  onModalOpenStart(props, direction) {
    this.memoizedModal = props;
    this.memoizedModalDirection = direction;
    this.setState(() => ({
      modal: {
        status: PageStatusTypesEnum.OPEN_DONE,
      },
    }));
  }

  onModalOpenDone() { }

  onModalCloseStart() {
    this.setState(() => ({
      modal: {
        status: PageStatusTypesEnum.CLOSE_DONE,
      },
    }));
  }

  onModalCloseDone() {
    this.memoizedModal = undefined;
    this.memoizedModalDirection = undefined;
  }

  onPageOpenStart(pageIdNew, direction) {
    const { navigation } = this.state;
    // do not open previous page
    if (isPrevPage(navigation.pages, pageIdNew)) {
      return;
    }
    this.memoizedNavigation = navigation;
    this.setState(() => ({
      navigation: Object.assign({}, navigation, {
        actionMeta: {
          type: PAGE_OPEN_START,
          pageId: pageIdNew,
        },
        pageIdActive: pageIdNew,
        pages: stackPagingReducers(
          navigation.pages,
          { type: PAGE_OPEN_START, pageIdNew, direction },
          getPrevPageId(navigation, pageIdNew),
        ),
      }),
    }));
  }

  onPageOpenHorizontalStart(pageIdNew) {
    this.onPageOpenStart(pageIdNew, DirectionEnum.HORIZONTAL);
  }

  onPageOpenVerticalStart(pageIdNew) {
    this.onPageOpenStart(pageIdNew, DirectionEnum.VERTICAL);
  }

  onPageOpenForce(pageIdNew) {
    this.onPageOpenStart(pageIdNew);
  }

  onPageOpenDone() {
    const { navigation } = this.state;
    this.memoizedNavigation = undefined;
    this.setState(() => ({
      navigation: Object.assign({}, navigation, {
        actionMeta: undefined,
        pages: stackPagingReducers(
          navigation.pages,
          { type: PAGE_OPEN_DONE },
          navigation.pageIdActive
        ),
      }),
    }));
  }

  onPageCloseStart() {
    const { navigation } = this.state;
    this.memoizedNavigation = navigation;
    this.setState(() => ({
      navigation: Object.assign({}, navigation, {
        actionMeta: {
          type: PAGE_CLOSE_START,
          pageId: navigation.pageIdActive,
        },
        pages: stackPagingReducers(
          navigation.pages,
          { type: PAGE_CLOSE_START },
          navigation.pageIdActive
        ),
      }),
    }));
  }

  onPageCloseForce() {
    const { navigation } = this.state;
    this.setState(() => ({
      navigation: Object.assign({}, navigation, {
        pageIdActive: getPrevPageById(navigation.pages, navigation.pageIdActive),
        pages: stackPagingReducers(
          navigation.pages,
          { type: PAGE_CLOSE_DONE_FORCE },
          navigation.pageIdActive
        ),
      }),
    }));
  }

  onPageCloseDone() {
    const { navigation } = this.state;
    this.setState(() => ({
      navigation: Object.assign({}, navigation, {
        actionMeta: undefined,
        pageIdActive: getPrevPageById(navigation.pages, navigation.pageIdActive),
        pages: stackPagingReducers(
          navigation.pages,
          { type: PAGE_CLOSE_DONE },
          navigation.pageIdActive
        ),
      }),
    }), () => {
      this.memoizedNavigation = undefined;
    });
  }

  getPageState(prevPageId) {
    const { navigation } = this.state;
    return navigation.pages[prevPageId];
  }

  isVisiblePage(pageIdActive, pageId) {
    // is active page
    if (pageIdActive === pageId) {
      return true;
    }
    // active page hasn't finished animating yet
    const activePageState = this.getPageState(pageIdActive);
    if (
      activePageState.status !== PageStatusTypesEnum.BACK_ANIMATING_OUT_DONE &&
      activePageState.status !== PageStatusTypesEnum.CLOSE_DONE &&
      activePageState.prevPageId === pageId
    ) {
      return true;
    }
    return false;
  }

  render() {
    const { children, pageHeight, pageWidth } = this.props;
    const { actionSheet, alert, comboBox, modal, navigation } = this.state;
    console.log('navigation', navigation);
    return (
      <MobileNavigationRender>
        {React.Children.toArray(children).map(child => {
          const pageId = child.props.pageId;
          if (!this.isVisiblePage(navigation.pageIdActive, pageId)) {
            return null;
          }
          return (
            <MobileNavigationPageEngine
              isAnimation={!!(
                navigation.actionMeta &&
                navigation.actionMeta.type === PAGE_OPEN_START &&
                navigation.actionMeta.pageId === pageId
              )}
              key={pageId}
              pageHeight={pageHeight}
              pageId={pageId}
              pageStatusInit={
                this.memoizedNavigation
                  ? this.memoizedNavigation.pages[pageId].status
                  : undefined
              }
              pageState={this.getPageState(pageId)}
              pageWidth={pageWidth}
              onActionSheetOpenStart={this.onActionSheetOpenStart}
              onActionSheetCloseStart={this.onActionSheetCloseStart}
              onAlertOpenStart={this.onAlertOpenStart}
              onComboBoxOpenStart={this.onComboBoxOpenStart}
              onComboBoxCloseStart={this.onComboBoxCloseStart}
              onModalOpenStart={this.onModalOpenStart}
              onModalCloseStart={this.onModalCloseStart}
              onPageOpenStart={this.onPageOpenStart}
              onPageOpenHorizontalStart={this.onPageOpenHorizontalStart}
              onPageOpenVerticalStart={this.onPageOpenVerticalStart}
              onPageOpenForce={this.onPageOpenForce}
              onPageOpenDone={
                navigation.actionMeta &&
                navigation.actionMeta.type === PAGE_OPEN_START &&
                navigation.actionMeta.pageId === pageId
                  ? this.onPageOpenDone
                  : undefined
              }
              onPageCloseStart={this.onPageCloseStart}
              onPageCloseForce={this.onPageCloseForce}
              onPageCloseDone={
                navigation.actionMeta &&
                navigation.actionMeta.type === PAGE_CLOSE_START &&
                navigation.actionMeta.pageId === pageId
                  ? this.onPageCloseDone
                  : undefined
              }
            >
              {child}
            </MobileNavigationPageEngine>
          );
        })}
        {this.memoizedComboBox && (
          <ComboBox
            allowCustomValue={this.memoizedComboBox.allowCustomValue}
            bodyStyle={this.memoizedComboBox.bodyStyle}
            customOptionModel={this.memoizedComboBox.customOptionModel}
            direction={this.memoizedComboBoxDirection}
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
            pageStatus={comboBox.status}
            title={this.memoizedComboBox.title}
            zIndex={1000}
            onCancel={this.memoizedComboBox.onCancel}
            onSelect={this.memoizedComboBox.onSelect}
            onSelectCustom={this.memoizedComboBox.onSelectCustom}
            onComboBoxOpenDone={this.onComboBoxOpenDone}
            onComboBoxCloseStart={this.onComboBoxCloseStart}
            onComboBoxCloseDone={this.onComboBoxCloseDone}
          />
        )}
        {this.memoizedModal && (
          <Modal
            direction={this.memoizedModalDirection}
            pageHeight={pageHeight}
            pageStatus={modal.status}
            zIndex={1001}
            onModalOpenDone={this.onModalOpenDone}
            onModalCloseDone={this.onModalCloseDone}
          >
            {this.memoizedModal.render()}
          </Modal>
        )}
        {this.memoizedAlert && (
          <AlertBox
            autoHideDuration={this.memoizedAlert.autoHideDuration}
            direction={DirectionEnum.VERTICAL}
            pageStatus={alert.status}
            zIndex={1002}
            onAlertOpenDone={this.onAlertOpenDone}
            onAlertCloseStart={this.onAlertCloseStart}
            onAlertCloseDone={this.onAlertCloseDone}
          >
            {this.memoizedAlert.render()}
          </AlertBox>
        )}
        {this.memoizedActionSheet && (
          <ActionSheet
            cancelLabel={this.memoizedActionSheet.cancelLabel}
            direction={this.memoizedActionSheetDirection}
            items={this.memoizedActionSheet.items}
            pageStatus={actionSheet.status}
            zIndex={1003}
            onSelect={this.memoizedActionSheet.onSelect}
            onCancel={this.memoizedActionSheet.onCancel}
            onActionSheetOpenDone={this.onActionSheetOpenDone}
            onActionSheetCloseStart={this.onActionSheetCloseStart}
            onActionSheetCloseDone={this.onActionSheetCloseDone}
          />
        )}
      </MobileNavigationRender>
    );
  }
}

MobileNavigation.propTypes = propTypes;
MobileNavigation.defaultProps = defaultProps;
