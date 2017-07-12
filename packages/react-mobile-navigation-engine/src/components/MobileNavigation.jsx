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
        isShow: false,
        status: PageStatusTypesEnum.CLOSE_DONE,
      },
      alert: {
        isShow: false,
        status: PageStatusTypesEnum.CLOSE_DONE,
      },
      comboBox: {
        isShow: false,
        status: PageStatusTypesEnum.CLOSE_DONE,
      },
      modal: {
        isShow: false,
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
    const { actionSheet } = this.state;
    // ignore opening attempts if not closed yet
    if (actionSheet.status !== PageStatusTypesEnum.CLOSE_DONE) {
      return;
    }
    this.setState((prevState) => ({
      actionSheet: Object.assign({}, prevState.actionSheet, {
        isShow: true,
        status: PageStatusTypesEnum.OPEN_DONE,
      }),
    }));
  }

  onActionSheetOpenDone() {}

  onActionSheetCloseStart() {
    this.setState((prevState) => ({
      actionSheet: Object.assign({}, prevState.actionSheet, {
        status: PageStatusTypesEnum.CLOSE_DONE,
      }),
    }));
  }

  onActionSheetCloseDone() {
    this.memoizedActionSheet = undefined;
    this.memoizedActionSheetDirection = undefined;
    this.setState((prevState) => ({
      actionSheet: Object.assign({}, prevState.actionSheet, {
        isShow: false,
      }),
    }));
  }

  onAlertOpenStart(props) {
    this.memoizedAlert = props;
    const { alert } = this.state;
    // ignore opening attempts if not closed yet
    if (alert.status !== PageStatusTypesEnum.CLOSE_DONE) {
      return;
    }
    this.setState((prevState) => ({
      alert: Object.assign({}, prevState.alert, {
        isShow: true,
        status: PageStatusTypesEnum.OPEN_DONE,
      }),
    }));
  }

  onAlertOpenDone() { }

  onAlertCloseStart() {
    this.setState((prevState) => ({
      alert: Object.assign({}, prevState.alert, {
        status: PageStatusTypesEnum.CLOSE_DONE,
      }),
    }));
  }

  onAlertCloseDone() {
    this.memoizedAlert = undefined;
    this.setState((prevState) => ({
      alert: Object.assign({}, prevState.alert, {
        isShow: false,
      }),
    }));
  }

  onComboBoxOpenStart(props, direction) {
    this.memoizedComboBox = props;
    this.memoizedComboBoxDirection = direction;
    const { comboBox } = this.state;
    // ignore opening attempts if not closed yet
    if (comboBox.status !== PageStatusTypesEnum.CLOSE_DONE) {
      return;
    }
    this.setState((prevState) => ({
      comboBox: Object.assign({}, prevState.comboBox, {
        isShow: true,
        status: PageStatusTypesEnum.OPEN_DONE,
      }),
    }));
  }

  onComboBoxOpenDone() { }

  onComboBoxCloseStart() {
    this.setState((prevState) => ({
      comboBox: Object.assign({}, prevState.comboBox, {
        status: PageStatusTypesEnum.CLOSE_DONE,
      }),
    }));
  }

  onComboBoxCloseDone() {
    this.memoizedComboBox = undefined;
    this.memoizedComboBoxDirection = undefined;
    this.setState((prevState) => ({
      comboBox: Object.assign({}, prevState.comboBox, {
        isShow: false,
      }),
    }));
  }

  onModalOpenStart(props, direction) {
    this.memoizedModal = props;
    this.memoizedModalDirection = direction;
    const { modal } = this.state;
    // ignore opening attempts if not closed yet
    if (modal.status !== PageStatusTypesEnum.CLOSE_DONE) {
      return;
    }
    this.setState((prevState) => ({
      modal: Object.assign({}, prevState.modal, {
        isShow: true,
        status: PageStatusTypesEnum.OPEN_DONE,
      }),
    }));
  }

  onModalOpenDone() { }

  onModalCloseStart() {
    this.setState((prevState) => ({
      modal: Object.assign({}, prevState.modal, {
        status: PageStatusTypesEnum.CLOSE_DONE,
      }),
    }));
  }

  onModalCloseDone() {
    this.memoizedModal = undefined;
    this.memoizedModalDirection = undefined;
    this.setState((prevState) => ({
      modal: Object.assign({}, prevState.modal, {
        isShow: false,
      }),
    }));
  }

  onPageOpenStart(pageIdNew, direction) {
    const { navigation } = this.state;
    // do not open previous page
    if (isPrevPage(navigation.pages, pageIdNew)) {
      return;
    }
    this.memoizedNavigation = navigation;
    this.setState((prevState) => ({
      navigation: Object.assign({}, prevState.navigation, {
        actionMeta: {
          type: PAGE_OPEN_START,
          pageId: pageIdNew,
        },
        pageIdActive: pageIdNew,
        pages: stackPagingReducers(
          prevState.navigation.pages,
          { type: PAGE_OPEN_START, pageIdNew, direction },
          getPrevPageId(prevState.navigation, pageIdNew),
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
    this.memoizedNavigation = undefined;
    this.setState((prevState) => ({
      navigation: Object.assign({}, prevState.navigation, {
        actionMeta: undefined,
        pages: stackPagingReducers(
          prevState.navigation.pages,
          { type: PAGE_OPEN_DONE },
          prevState.navigation.pageIdActive
        ),
      }),
    }));
  }

  onPageCloseStart() {
    const { navigation } = this.state;
    this.memoizedNavigation = navigation;
    this.setState((prevState) => ({
      navigation: Object.assign({}, prevState.navigation, {
        actionMeta: {
          type: PAGE_CLOSE_START,
          pageId: prevState.navigation.pageIdActive,
        },
        pages: stackPagingReducers(
          prevState.navigation.pages,
          { type: PAGE_CLOSE_START },
          prevState.navigation.pageIdActive
        ),
      }),
    }));
  }

  onPageCloseForce() {
    this.setState((prevState) => ({
      navigation: Object.assign({}, prevState.navigation, {
        actionMeta: {
          type: PAGE_CLOSE_DONE_FORCE,
          pageId: prevState.navigation.pageIdActive,
        },
        pages: stackPagingReducers(
          prevState.navigation.pages,
          { type: PAGE_CLOSE_DONE_FORCE },
          prevState.navigation.pageIdActive
        ),
      }),
    }));
  }

  onPageCloseDone() {
    this.setState((prevState) => ({
      navigation: Object.assign({}, prevState.navigation, {
        actionMeta: undefined,
        pageIdActive: getPrevPageById(
          prevState.navigation.pages,
          prevState.navigation.pageIdActive
        ),
        pages: stackPagingReducers(
          prevState.navigation.pages,
          { type: PAGE_CLOSE_DONE },
          prevState.navigation.pageIdActive
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
              onAlertCloseStart={this.onAlertCloseStart}
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
                navigation.actionMeta && (
                  navigation.actionMeta.type === PAGE_CLOSE_START ||
                  navigation.actionMeta.type === PAGE_CLOSE_DONE_FORCE
                ) &&
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
            {...this.memoizedComboBox}
            direction={this.memoizedComboBoxDirection}
            isShow={comboBox.isShow}
            pageHeight={pageHeight}
            pageWidth={pageWidth}
            pageStatus={comboBox.status}
            zIndex={1000}
            onComboBoxOpenDone={this.onComboBoxOpenDone}
            onComboBoxCloseStart={this.onComboBoxCloseStart}
            onComboBoxCloseDone={this.onComboBoxCloseDone}
          />
        )}
        {this.memoizedModal && (
          <Modal
            {...this.memoizedModal}
            direction={this.memoizedModalDirection}
            isShow={modal.isShow}
            pageHeight={pageHeight}
            pageStatus={modal.status}
            zIndex={1001}
            onModalOpenDone={this.onModalOpenDone}
            onModalCloseDone={this.onModalCloseDone}
          />
        )}
        {this.memoizedAlert && (
          <AlertBox
            {...this.memoizedAlert}
            direction={DirectionEnum.VERTICAL}
            isShow={alert.isShow}
            pageStatus={alert.status}
            zIndex={1002}
            onAlertOpenDone={this.onAlertOpenDone}
            onAlertCloseStart={this.onAlertCloseStart}
            onAlertCloseDone={this.onAlertCloseDone}
          />
        )}
        {this.memoizedActionSheet && (
          <ActionSheet
            {...this.memoizedActionSheet}
            direction={this.memoizedActionSheetDirection}
            isShow={actionSheet.isShow}
            pageStatus={actionSheet.status}
            zIndex={1003}
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
