import isFunction from 'lodash/isFunction';
import PropTypes from 'prop-types';
import React from 'react';
import ActionSheet from 'react-mobile-navigation-action-sheet';
import AlertBox from 'react-mobile-navigation-alert';
import ComboBox from 'react-mobile-navigation-combobox';
import { PAGE_OPEN_START, PAGE_CLOSE_START } from '../action-types/navigation-action-types';
import * as navigationActions from '../actions/navigation-actions';
import MobileNavigationPageEngine from '../components/MobileNavigationPageEngine';
import MobileNavigationRender from '../components-styled/MobileNavigationRender';
import navigationReducers from '../reducers/navigation-reducers';
import createInitState from '../utils/init-state-create';
import { getPrevPageById, getPrevPageId, isPrevPage } from '../utils/page-manager';

const propTypes = {
  children: PropTypes.any,
  initPagesState: PropTypes.array,
  pageHeight: PropTypes.number.isRequired,
  pageIdRoot: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  pageWidth: PropTypes.number.isRequired,
};

const defaultProps = {
  children: undefined,
  initPagesState: [],
};

export default class MobileNavigation extends React.Component {

  constructor(props) {
    super(props);
    this.cache = {
      onActionSheetOpenCallback: null,
      onActionSheetCloseCallback: null,
      onAlertOpenCallback: null,
      onAlertCloseCallback: null,
      onComboBoxOpenCallback: null,
      onComboBoxCloseCallback: null,
    };
    this.memoizedActionSheet = {};
    this.memoizedAlert = {};
    this.memoizedComboBox = {};
    this.memoizedNavigation = undefined;
    this.state = {
      isActionSheetVisible: false,
      isAlertVisible: false,
      isComboBoxVisible: false,
      navigation: createInitState(
        props.pageIdRoot,
        React.Children.toArray(props.children).map(child => ({
          pageId: child.props.pageId,
          pageType: child.type.pageType,
        })),
        props.initPagesState
      ),
    };
    this.setOnActionSheetOpenCallback = this.setOnActionSheetOpenCallback.bind(this);
    this.setOnActionSheetCloseCallback = this.setOnActionSheetCloseCallback.bind(this);
    this.setOnAlertOpenCallback = this.setOnAlertOpenCallback.bind(this);
    this.setOnAlertCloseCallback = this.setOnAlertCloseCallback.bind(this);
    this.setOnComboBoxOpenCallback = this.setOnComboBoxOpenCallback.bind(this);
    this.setOnComboBoxCloseCallback = this.setOnComboBoxCloseCallback.bind(this);
    this.onActionSheetOpenStart = this.onActionSheetOpenStart.bind(this);
    this.onActionSheetCloseStart = this.onActionSheetCloseStart.bind(this);
    this.onActionSheetCloseDone = this.onActionSheetCloseDone.bind(this);
    this.onAlertOpenStart = this.onAlertOpenStart.bind(this);
    this.onAlertCloseStart = this.onAlertCloseStart.bind(this);
    this.onAlertCloseDone = this.onAlertCloseDone.bind(this);
    this.onComboBoxOpenStart = this.onComboBoxOpenStart.bind(this);
    this.onComboBoxCloseStart = this.onComboBoxCloseStart.bind(this);
    this.onComboBoxCloseDone = this.onComboBoxCloseDone.bind(this);
    this.onPageOpenStart = this.onPageOpenStart.bind(this);
    this.onPageOpenDone = this.onPageOpenDone.bind(this);
    this.onPageCloseStart = this.onPageCloseStart.bind(this);
    this.onPageCloseDone = this.onPageCloseDone.bind(this);
  }

  onActionSheetOpenStart(props) {
    this.memoizedActionSheet = props;
    this.setState(() => ({
      isActionSheetVisible: true,
    }));
  }

  onActionSheetCloseStart() {
    this.setState(() => ({
      isActionSheetVisible: false,
    }));
  }

  onActionSheetCloseDone() {
    this.memoizedActionSheet = {};
  }

  onAlertOpenStart(props) {
    this.memoizedAlert = props;
    this.setState(() => ({
      isAlertVisible: true,
    }));
  }

  onAlertCloseStart() {
    this.setState(() => ({
      isAlertVisible: false,
    }));
  }

  onAlertCloseDone() {
    this.memoizedAlert = {};
  }

  onComboBoxOpenStart(props) {
    this.memoizedComboBox = props;
    this.setState(() => ({
      isComboBoxVisible: true,
    }));
  }

  onComboBoxCloseStart() {
    this.setState(() => ({
      isComboBoxVisible: false,
    }));
  }

  onComboBoxCloseDone() {
    this.memoizedComboBox = {};
  }

  onPageOpenStart(pageIdNew, isForce = false) {
    const { navigation } = this.state;
    // do not open previous page
    if (isPrevPage(navigation.pages, pageIdNew)) {
      return;
    }
    this.memoizedNavigation = navigation;
    this.setState(prevState => ({
      navigation: Object.assign({}, prevState.navigation, {
        actionMeta: {
          type: PAGE_OPEN_START,
          pageId: pageIdNew,
        },
        pageIdActive: pageIdNew,
        pages: navigationReducers(
          prevState.navigation.pages,
          navigationActions.onPageOpen(pageIdNew, isForce),
          getPrevPageId(prevState.navigation, pageIdNew),
        ),
      }),
    }), () => {
      if (isForce) {
        return;
      }
      // force rendering in the next frame
      window.requestAnimationFrame(() => {
        this.setState(prevState => ({
          navigation: Object.assign({}, prevState.navigation, {
            pages: navigationReducers(
              prevState.navigation.pages,
              navigationActions.onPageOpenProcessing(pageIdNew),
              getPrevPageId(prevState.navigation, pageIdNew),
            ),
          }),
        }));
      });
    });
  }

  onPageOpenDone(callback) {
    this.memoizedNavigation = undefined;
    this.setState(prevState => ({
      navigation: Object.assign({}, prevState.navigation, {
        actionMeta: undefined,
        pages: navigationReducers(
          prevState.navigation.pages,
          navigationActions.onPageOpenDone(),
          prevState.navigation.pageIdActive
        ),
      }),
    }), () => {
      if (isFunction(callback)) {
        callback();
      }
    });
  }

  onPageCloseStart(isForce = false) {
    this.memoizedNavigation = this.state.navigation;
    this.setState(prevState => ({
      navigation: Object.assign({}, prevState.navigation, {
        actionMeta: {
          type: PAGE_CLOSE_START,
          pageId: prevState.navigation.pageIdActive,
        },
        pages: navigationReducers(
          prevState.navigation.pages,
          navigationActions.onPageClose(isForce),
          prevState.navigation.pageIdActive
        ),
      }),
    }), () => {
      const { navigation } = this.state;
      if (navigation.pages[navigation.pageIdActive].isForce || isForce) {
        return;
      }
      // force rendering in the next frame
      window.requestAnimationFrame(() => {
        this.setState(prevState => ({
          navigation: Object.assign({}, prevState.navigation, {
            pages: navigationReducers(
              prevState.navigation.pages,
              navigationActions.onPageCloseProcessing(),
              prevState.navigation.pageIdActive
            ),
          }),
        }));
      });
    });
  }

  onPageCloseDone(callback) {
    this.setState(prevState => ({
      navigation: Object.assign({}, prevState.navigation, {
        actionMeta: undefined,
        pageIdActive: getPrevPageById(
          prevState.navigation.pages,
          prevState.navigation.pageIdActive
        ),
        pages: navigationReducers(
          prevState.navigation.pages,
          navigationActions.onPageCloseDone(),
          prevState.navigation.pageIdActive
        ),
      }),
    }), () => {
      this.memoizedNavigation = undefined;
      if (isFunction(callback)) {
        callback();
      }
    });
  }

  setOnActionSheetOpenCallback(callback) {
    this.cache.onActionSheetOpenCallback = callback;
  }

  setOnActionSheetCloseCallback(callback) {
    this.cache.onActionSheetCloseCallback = callback;
  }

  setOnAlertOpenCallback(callback) {
    this.cache.onAlertOpenCallback = callback;
  }

  setOnAlertCloseCallback(callback) {
    this.cache.onAlertCloseCallback = callback;
  }

  setOnComboBoxOpenCallback(callback) {
    this.cache.onComboBoxOpenCallback = callback;
  }

  setOnComboBoxCloseCallback(callback) {
    this.cache.onComboBoxCloseCallback = callback;
  }

  render() {
    const { children, pageHeight, pageWidth } = this.props;
    const { isActionSheetVisible, isAlertVisible, isComboBoxVisible, navigation } = this.state;
    return (
      <MobileNavigationRender>
        {React.Children.toArray(children).map(child => {
          const pageId = child.props.pageId;
          return (
            <MobileNavigationPageEngine
              key={pageId}
              pageHeight={pageHeight}
              pageId={pageId}
              pageState={navigation.pages[pageId]}
              pageWidth={pageWidth}
              setOnActionSheetOpenCallback={this.setOnActionSheetOpenCallback}
              setOnActionSheetCloseCallback={this.setOnActionSheetCloseCallback}
              setOnAlertOpenCallback={this.setOnAlertOpenCallback}
              setOnAlertCloseCallback={this.setOnAlertCloseCallback}
              setOnComboBoxOpenCallback={this.setOnComboBoxOpenCallback}
              setOnComboBoxCloseCallback={this.setOnComboBoxCloseCallback}
              onActionSheetOpenStart={this.onActionSheetOpenStart}
              onActionSheetCloseStart={this.onActionSheetCloseStart}
              onAlertOpenStart={this.onAlertOpenStart}
              onAlertCloseStart={this.onAlertCloseStart}
              onComboBoxOpenStart={this.onComboBoxOpenStart}
              onComboBoxCloseStart={this.onComboBoxCloseStart}
              onPageOpenStart={this.onPageOpenStart}
              onPageOpenDone={
                navigation.actionMeta &&
                navigation.actionMeta.type === PAGE_OPEN_START &&
                navigation.actionMeta.pageId === pageId
                  ? this.onPageOpenDone
                  : undefined
              }
              onPageCloseStart={this.onPageCloseStart}
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
        <ComboBox
          {...this.memoizedComboBox}
          isVisible={isComboBoxVisible}
          pageHeight={pageHeight}
          pageWidth={pageWidth}
          onOpenCallback={this.cache.onComboBoxOpenCallback}
          onCloseStart={this.onComboBoxCloseStart}
          onCloseDone={this.onComboBoxCloseDone}
          onCloseCallback={this.cache.onComboBoxCloseCallback}
        />
        <AlertBox
          {...this.memoizedAlert}
          isVisible={isAlertVisible}
          pageHeight={pageHeight}
          pageWidth={pageWidth}
          onOpenCallback={this.cache.onAlertOpenCallback}
          onCloseStart={this.onAlertCloseStart}
          onCloseDone={this.onAlertCloseDone}
          onCloseCallback={this.cache.onAlertCloseCallback}
        />
        <ActionSheet
          {...this.memoizedActionSheet}
          isVisible={isActionSheetVisible}
          pageHeight={pageHeight}
          pageWidth={pageWidth}
          onOpenCallback={this.cache.onActionSheetOpenCallback}
          onCloseStart={this.onActionSheetCloseStart}
          onCloseDone={this.onActionSheetCloseDone}
          onCloseCallback={this.cache.onActionSheetCloseCallback}
        />
      </MobileNavigationRender>
    );
  }
}

MobileNavigation.propTypes = propTypes;
MobileNavigation.defaultProps = defaultProps;
