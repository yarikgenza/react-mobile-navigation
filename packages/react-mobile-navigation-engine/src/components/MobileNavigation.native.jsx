import PropTypes from 'prop-types';
import React from 'react';
import ActionSheet from 'react-mobile-navigation-action-sheet';
import Alert from 'react-mobile-navigation-alert';
import ComboBox from 'react-mobile-navigation-combobox';
import { PageStatusTypesEnum } from 'react-mobile-navigation-core';
import Modal from 'react-mobile-navigation-core/components/Modal.native';
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
      actionSheet: {
        status: PageStatusTypesEnum.CLOSE_DONE,
      },
      alert: {
        status: PageStatusTypesEnum.CLOSE_DONE,
      },
      comboBox: {
        status: PageStatusTypesEnum.CLOSE_DONE,
      },
    };
    this.onActionSheetOpenStart = this.onActionSheetOpenStart.bind(this);
    this.onActionSheetCloseStart = this.onActionSheetCloseStart.bind(this);
    this.onAlertOpenStart = this.onAlertOpenStart.bind(this);
    this.onAlertCloseStart = this.onAlertCloseStart.bind(this);
    this.onComboBoxOpenStart = this.onComboBoxOpenStart.bind(this);
    this.onComboBoxCloseStart = this.onComboBoxCloseStart.bind(this);
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
      cardStyle: { shadowColor: 'rgba(0, 0, 0, 0)' },
      initialRouteName: props.pageIdRoot,
      // mode: 'modal',
    });
  }

  onActionSheetOpenStart(props) {
    this.memoizedActionSheet = props;
    const { actionSheet } = this.state;
    // ignore opening attempts if not closed yet
    if (actionSheet.status !== PageStatusTypesEnum.CLOSE_DONE) {
      return;
    }
    this.setState(prevState => ({
      actionSheet: Object.assign({}, prevState.actionSheet, {
        status: PageStatusTypesEnum.OPEN_DONE,
      }),
    }), () => {
      //
    });
  }

  onActionSheetCloseStart() {
    this.setState(prevState => ({
      actionSheet: Object.assign({}, prevState.actionSheet, {
        status: PageStatusTypesEnum.CLOSE_DONE,
      }),
    }), () => {
      //
    });
  }

  onAlertOpenStart(props) {
    this.memoizedAlert = props;
    const { alert } = this.state;
    // ignore opening attempts if not closed yet
    if (alert.status !== PageStatusTypesEnum.CLOSE_DONE) {
      return;
    }
    this.setState(prevState => ({
      alert: Object.assign({}, prevState.alert, {
        status: PageStatusTypesEnum.OPEN_DONE,
      }),
    }), () => {
      //
    });
  }

  onAlertCloseStart() {
    this.setState(prevState => ({
      alert: Object.assign({}, prevState.alert, {
        status: PageStatusTypesEnum.CLOSE_DONE,
      }),
    }), () => {
      //
    });
  }

  onComboBoxOpenStart(props) {
    this.memoizedComboBox = props;
    const { comboBox } = this.state;
    // ignore opening attempts if not closed yet
    if (comboBox.status !== PageStatusTypesEnum.CLOSE_DONE) {
      return;
    }
    this.setState(prevState => ({
      comboBox: Object.assign({}, prevState.comboBox, {
        status: PageStatusTypesEnum.OPEN_DONE,
      }),
    }), () => {
      //
    });
  }

  onComboBoxCloseStart() {
    this.setState(prevState => ({
      comboBox: Object.assign({}, prevState.comboBox, {
        status: PageStatusTypesEnum.CLOSE_DONE,
      }),
    }), () => {
      //
    });
  }

  render() {
    const { pageHeight, pageWidth } = this.props;
    const { actionSheet, alert, comboBox } = this.state;
    return (
      <View style={{ height: pageHeight, width: pageWidth }} >
        <this.MobileNavigationPageEngine />
        <Modal
          isVisible={comboBox.status === PageStatusTypesEnum.OPEN_DONE}
          pageHeight={pageHeight}
          pageWidth={pageWidth}
          onClose={this.onComboBoxCloseStart}
        >
          <ComboBox
            {...this.memoizedComboBox}
            pageStatus={comboBox.status}
            zIndex={1000}
            onComboBoxOpenDone={() => { }}
            onComboBoxCloseStart={this.onComboBoxCloseStart}
            onComboBoxCloseDone={() => { }}
          />
        </Modal>
        <Modal
          isVisible={alert.status === PageStatusTypesEnum.OPEN_DONE}
          pageHeight={pageHeight}
          pageWidth={pageWidth}
          onClose={this.onAlertCloseStart}
        >
          <Alert
            {...this.memoizedAlert}
            pageStatus={alert.status}
            zIndex={1001}
            onAlertOpenDone={() => { }}
            onAlertCloseStart={this.onAlertCloseStart}
            onAlertCloseDone={() => { }}
          />
        </Modal>
        <Modal
          isVisible={actionSheet.status === PageStatusTypesEnum.OPEN_DONE}
          pageHeight={pageHeight}
          pageWidth={pageWidth}
          onClose={this.onAlertCloseStart}
        >
          <ActionSheet
            {...this.memoizedActionSheet}
            pageStatus={actionSheet.status}
            zIndex={1002}
            onActionSheetOpenDone={() => { }}
            onActionSheetCloseStart={this.onActionSheetCloseStart}
            onActionSheetCloseDone={() => { }}
          />
        </Modal>
      </View>
    );
  }
}

MobileNavigation.propTypes = propTypes;
MobileNavigation.defaultProps = defaultProps;
