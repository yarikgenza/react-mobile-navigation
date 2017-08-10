import Button from 'binary-ui-components/mobile/Button';
import React from 'react';
import { Dimensions, Modal, Text, TouchableHighlight, View } from 'react-native';
import PropTypes from 'prop-types';

import { comboBoxOptionModel } from 'react-mobile-navigation-combobox';
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
      },
      headerStyle: {
        backgroundColor: '#eeeae5',
      },
      allowCustomValue: false,
      customOptionModel: undefined,
      items: [
        comboBoxOptionModel('first0', 'First', () => { console.log('1'); }, { color: 'blue' }),
        comboBoxOptionModel('first1', 'Second', () => { console.log('2'); }),
        comboBoxOptionModel('first2', 'Third', () => { console.log('3'); }),
        comboBoxOptionModel('first3', 'Fourth', () => { console.log('4'); }),
        comboBoxOptionModel('first4', 'Fifth', () => { console.log('5'); }),
        comboBoxOptionModel('first5', 'Sixth', () => { console.log('6'); }),
        comboBoxOptionModel('first6', 'Seventh', () => { console.log('7'); }),
        comboBoxOptionModel('first7', 'Eighth', () => { console.log('8'); }),
        comboBoxOptionModel('first8', 'Ninth', () => { console.log('9'); }),
        comboBoxOptionModel('first9', 'Tenth', () => { console.log('10'); }),
        comboBoxOptionModel('first10', 'Eleventh', () => { console.log('11'); }),
        comboBoxOptionModel('first11', 'Twelveth', () => { console.log('12'); }),
        comboBoxOptionModel('first12', 'Thirteenth', () => { console.log('13'); }),
        comboBoxOptionModel('first13', 'Fourteenth', () => { console.log('14'); }),
        comboBoxOptionModel('first14', 'Fifteenth', () => { console.log('15'); }),
        comboBoxOptionModel('first15', 'Sixteenth', () => { console.log('16'); }),
        comboBoxOptionModel('first16', 'Seventeenth', () => { console.log('17'); }),
        comboBoxOptionModel('first17', 'Eighteenth', () => { console.log('18'); }),
        comboBoxOptionModel('first18', 'Nineteenth', () => { console.log('19'); }),
        comboBoxOptionModel('first19', 'Twentieth', () => { console.log('20'); }),
        comboBoxOptionModel('first20', 'Twenty first', () => { console.log('21'); }),
        comboBoxOptionModel('first21', 'Twenty second', () => { console.log('22'); }),
        comboBoxOptionModel('first22', 'Twenty third', () => { console.log('23'); }),
        comboBoxOptionModel('first23', 'First', () => { console.log('1'); }, { color: 'blue' }),
        comboBoxOptionModel('first24', 'Second', () => { console.log('2'); }),
        comboBoxOptionModel('first25', 'Third', () => { console.log('3'); }),
        comboBoxOptionModel('first26', 'Fourth', () => { console.log('4'); }),
        comboBoxOptionModel('first27', 'Fifth', () => { console.log('5'); }),
        comboBoxOptionModel('first28', 'Sixth', () => { console.log('6'); }),
        comboBoxOptionModel('first29', 'Seventh', () => { console.log('7'); }),
        comboBoxOptionModel('first30', 'Eighth', () => { console.log('8'); }),
        comboBoxOptionModel('first31', 'Ninth', () => { console.log('9'); }),
        comboBoxOptionModel('first32', 'Tenth', () => { console.log('10'); }),
        comboBoxOptionModel('first33', 'Eleventh', () => { console.log('11'); }),
        comboBoxOptionModel('first34', 'Twelveth', () => { console.log('12'); }),
        comboBoxOptionModel('first35', 'Thirteenth', () => { console.log('13'); }),
        comboBoxOptionModel('first36', 'Fourteenth', () => { console.log('14'); }),
        comboBoxOptionModel('first37', 'Fifteenth', () => { console.log('15'); }),
        comboBoxOptionModel('first38', 'Sixteenth', () => { console.log('16'); }),
        comboBoxOptionModel('first39', 'Seventeenth', () => { console.log('17'); }),
        comboBoxOptionModel('first40', 'Eighteenth', () => { console.log('18'); }),
        comboBoxOptionModel('first41', 'Nineteenth', () => { console.log('19'); }),
        comboBoxOptionModel('first42', 'Twentieth', () => { console.log('20'); }),
        comboBoxOptionModel('first43', 'Twenty first', () => { console.log('21'); }),
        comboBoxOptionModel('first44', 'Twenty second', () => { console.log('22'); }),
        comboBoxOptionModel('first45', 'Twenty third', () => { console.log('23'); }),
        comboBoxOptionModel('first46', 'First', () => { console.log('1'); }, { color: 'blue' }),
        comboBoxOptionModel('first47', 'Second', () => { console.log('2'); }),
        comboBoxOptionModel('first48', 'Third', () => { console.log('3'); }),
        comboBoxOptionModel('first49', 'Fourth', () => { console.log('4'); }),
        comboBoxOptionModel('first50', 'Fifth', () => { console.log('5'); }),
        comboBoxOptionModel('first51', 'Sixth', () => { console.log('6'); }),
        comboBoxOptionModel('first52', 'Seventh', () => { console.log('7'); }),
        comboBoxOptionModel('first53', 'Eighth', () => { console.log('8'); }),
        comboBoxOptionModel('first54', 'Ninth', () => { console.log('9'); }),
        comboBoxOptionModel('first55', 'Tenth', () => { console.log('10'); }),
        comboBoxOptionModel('first56', 'Eleventh', () => { console.log('11'); }),
        comboBoxOptionModel('first57', 'Twelveth', () => { console.log('12'); }),
        comboBoxOptionModel('first58', 'Thirteenth', () => { console.log('13'); }),
        comboBoxOptionModel('first59', 'Fourteenth', () => { console.log('14'); }),
        comboBoxOptionModel('first60', 'Fifteenth', () => { console.log('15'); }),
        comboBoxOptionModel('first61', 'Sixteenth', () => { console.log('16'); }),
        comboBoxOptionModel('first62', 'Seventeenth', () => { console.log('17'); }),
        comboBoxOptionModel('first63', 'Eighteenth', () => { console.log('18'); }),
        comboBoxOptionModel('first64', 'Nineteenth', () => { console.log('19'); }),
        comboBoxOptionModel('first65', 'Twentieth', () => { console.log('20'); }),
        comboBoxOptionModel('first66', 'Twenty first', () => { console.log('21'); }),
        comboBoxOptionModel('first67', 'Twenty second', () => { console.log('22'); }),
        comboBoxOptionModel('first68', 'Twenty third', () => { console.log('23'); }),
        comboBoxOptionModel('first69', 'First', () => { console.log('1'); }, { color: 'blue' }),
        comboBoxOptionModel('first70', 'Second', () => { console.log('2'); }),
        comboBoxOptionModel('first71', 'Third', () => { console.log('3'); }),
        comboBoxOptionModel('first72', 'Fourth', () => { console.log('4'); }),
        comboBoxOptionModel('first73', 'Fifth', () => { console.log('5'); }),
        comboBoxOptionModel('first74', 'Sixth', () => { console.log('6'); }),
        comboBoxOptionModel('first75', 'Seventh', () => { console.log('7'); }),
        comboBoxOptionModel('first76', 'Eighth', () => { console.log('8'); }),
        comboBoxOptionModel('first77', 'Ninth', () => { console.log('9'); }),
        comboBoxOptionModel('first78', 'Tenth', () => { console.log('10'); }),
        comboBoxOptionModel('first79', 'Eleventh', () => { console.log('11'); }),
        comboBoxOptionModel('first80', 'Twelveth', () => { console.log('12'); }),
        comboBoxOptionModel('first81', 'Thirteenth', () => { console.log('13'); }),
        comboBoxOptionModel('first82', 'Fourteenth', () => { console.log('14'); }),
        comboBoxOptionModel('first83', 'Fifteenth', () => { console.log('15'); }),
        comboBoxOptionModel('first84', 'Sixteenth', () => { console.log('16'); }),
        comboBoxOptionModel('first85', 'Seventeenth', () => { console.log('17'); }),
        comboBoxOptionModel('first86', 'Eighteenth', () => { console.log('18'); }),
        comboBoxOptionModel('first87', 'Nineteenth', () => { console.log('19'); }),
        comboBoxOptionModel('first88', 'Twentieth', () => { console.log('20'); }),
        comboBoxOptionModel('first89', 'Twenty first', () => { console.log('21'); }),
        comboBoxOptionModel('first90', 'Twenty second', () => { console.log('22'); }),
        comboBoxOptionModel('first91', 'Twenty third', () => { console.log('23'); }),
      ],
      inputPlaceholder: 'Type a number',
      isBold: false,
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
