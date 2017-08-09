import Button from 'binary-ui-components/mobile/Button';
import React from 'react';
import { Dimensions, Modal, Text, TouchableHighlight, View } from 'react-native';
import PropTypes from 'prop-types';

import { actionSheetOptionModel } from 'react-mobile-navigation-action-sheet';
import { MobileNavigationModal, MobileNavigationPage } from 'react-mobile-navigation-core';
import MobileNavigation, {
  navigationActions,
} from 'react-mobile-navigation-engine';
import { PageStatusTypesEnum } from 'react-mobile-navigation-engine';

const { height, width } = Dimensions.get('window');

const MAIN = 'MAIN';
const LICENSES = 'LICENSES';
const HELP = 'HELP';

class MainScreen extends React.PureComponent {
  render() {
    const { pageHeight, onPageOpen } = this.props;
    return (
      <View style={{ backgroundColor: 'rgb(255, 255, 255)', height: pageHeight }} >
        <Text>Main (1)</Text>
        <Button onClick={() => onPageOpen(LICENSES)} label="Open Licenses" />
        <Button onClick={() => onPageOpen(HELP)} label="Open Help" />
      </View>
    );
  }
}

class LicensesScreen extends React.PureComponent {
  render() {
    const { pageHeight, onPageOpen, onPageClose } = this.props;
    return (
      <View style={{ backgroundColor: 'rgb(255, 255, 255)', height: pageHeight }} >
        <Text>Licenses (2)</Text>
        <Button onClick={() => onPageOpen(HELP)} label="Open Help" />
        <Button onClick={() => onPageClose()} label="Go Back" />
      </View>
    );
  }
}

class HelpScreen extends React.PureComponent {
  render() {
    const {
      pageHeight,
      onActionSheetOpen,
      onAlertOpen,
      onAlertClose,
      onComboBoxOpen,
      onComboBoxClose,
      onPageOpen,
      onPageClose,
    } = this.props;
    const actionSheetConfig = {
      cancelLabel: 'Cancel',
      items: [
        actionSheetOptionModel('licenses', 'Licenses', () => { console.log('licenses'); }),
      ],
      onCancel: () => {},
      onSelect: () => {},
    };
    const alertAutoHideConfig = {
      autoHideDuration: 2500,
      render: () => (
        <View onPress={() => { }} >
          <Text>Alert</Text>
        </View>
      ),
    };
    const alertConfig = {
      autoHideDuration: 0,
      render: () => (
        <View onPress={() => { onAlertClose(); }} >
          <Text>Alert</Text>
        </View>
      ),
    };
    const comboBoxConfig = {
      bodyStyle: {
        backgroundColor: 'white',
        // overflowX: 'hidden',
        // overflowY: 'auto',
      },
      headerStyle: {
        backgroundColor: '#eeeae5',
      },
      allowCustomValue: false,
      customOptionModel: undefined,
      items: [],
      inputPlaceholder: 'Placeholder',
      isBold: true,
      noOptionsMatchingInputLabel: 'No matches',
      pressEnterToSaveCustomFieldLabel: 'Press enter',
      title: 'ComboBox title',
      onCancel: () => { onComboBoxClose(); },
      onSelect: () => {},
      onSelectCustom: () => {},
    };
    return (
      <View style={{ backgroundColor: 'rgb(255, 255, 255)', height: pageHeight }} >
        <Text>Licenses (2)</Text>
        <Button onClick={() => onPageOpen(LICENSES)} label="Open Licenses" />
        <Button onClick={() => onPageOpen(LICENSES, true)} label="Open Licenses Force" />
        <Button onClick={() => onPageClose()} label="Go Back" />
        <Button onClick={() => onPageClose(true)} label="Go Back force" />
        <Button onClick={() => onActionSheetOpen(actionSheetConfig)} label="Show ActionSheet" />
        <Button onClick={() => onComboBoxOpen(comboBoxConfig)} label="Show ComboBox" />
        <Button onClick={() => onAlertOpen(alertAutoHideConfig)} label="Show Alert auto-hide" />
        <Button onClick={() => onAlertOpen(alertConfig)} label="Show Alert" />
      </View>
    );
  }
}

const Demo = ({ initState }) => (
  <View style={{ height, width }} >
    <MobileNavigation
      initPagesState={[
        navigationActions.onPageOpen(HELP),
      ]}
      pageHeight={height}
      pageIdRoot={MAIN}
      pageWidth={width}
    >
      <MobileNavigationPage pageId={MAIN} >
        <MainScreen />
      </MobileNavigationPage>
      <MobileNavigationModal pageId={LICENSES} >
        <LicensesScreen />
      </MobileNavigationModal>
      <MobileNavigationPage pageId={HELP} >
        <HelpScreen />
      </MobileNavigationPage>
    </MobileNavigation>
  </View>
);

export default Demo;
