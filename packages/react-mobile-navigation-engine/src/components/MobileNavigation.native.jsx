import PropTypes from 'prop-types';
import React from 'react';
import ActionSheet from 'react-mobile-navigation-action-sheet';
import Alert from 'react-mobile-navigation-alert';
import ComboBox from 'react-mobile-navigation-combobox';
import { PageStatusTypesEnum } from 'react-mobile-navigation-core';
import { View } from 'react-native';
import { StackNavigator as createStackNavigator } from 'react-navigation';

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
    this.state = {
      isActionSheetVisible: false,
      isAlertVisible: false,
      isComboBoxVisible: false,
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
    const navigationConfig = {};
    React.Children.toArray(props.children)
      // .filter(child => child.type.pageType === PageTypesEnum.MODAL)
      .forEach(child => {
        navigationConfig[child.props.pageId] = {
          screen: ({ navigation }) => React.cloneElement(React.Children.only(child), {
            pageHeight: props.pageHeight,
            pageWidth: props.pageWidth,
            onActionSheetOpen: this.onActionSheetOpenStart,
            onActionSheetClose: this.onActionSheetCloseStart,
            onAlertOpen: this.onAlertOpenStart,
            onAlertClose: this.onAlertCloseStart,
            onComboBoxOpen: this.onComboBoxOpenStart,
            onComboBoxClose: this.onComboBoxCloseStart,
            onPageOpen: (pageId) => { navigation.navigate(pageId); },
            onPageClose: () => { navigation.goBack(); },
          }),
          navigationOptions: { header: null },
        };
      });
    this.MobileNavigationPageEngine = createStackNavigator(navigationConfig, {
      cardStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        shadowColor: 'rgba(0, 0, 0, 0)',
      },
      initialRouteName: props.pageIdRoot,
      mode: 'card',
    });
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
    const { pageHeight, pageWidth } = this.props;
    const { isActionSheetVisible, isAlertVisible, isComboBoxVisible } = this.state;
    return (
      <View style={{ height: pageHeight, width: pageWidth }} >
        <this.MobileNavigationPageEngine />
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
        <Alert
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
      </View>
    );
  }
}

MobileNavigation.propTypes = propTypes;
MobileNavigation.defaultProps = defaultProps;
