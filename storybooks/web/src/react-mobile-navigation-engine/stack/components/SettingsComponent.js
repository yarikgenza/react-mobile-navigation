import React from 'react';
import { MobileNavigationModal, MobileNavigationPage } from 'react-mobile-navigation-core';
import MobileNavigation, {
  navigationActions,
} from 'react-mobile-navigation-engine';
import MainScreen from './pages/MainScreen';
import LicensesScreen from './pages/LicensesScreen';
import HelpScreen from './pages/HelpScreen';
import * as SettingsModeTypesEnum from '../enum/settings-mode-types-enum';

const SettingsComponent = ({ initState }) => (
  <MobileNavigation
    initPagesState={[
      navigationActions.onPageOpen(SettingsModeTypesEnum.HELP),
    ]}
    pageHeight={500}
    pageIdRoot={SettingsModeTypesEnum.MAIN}
    pageWidth={400}
  >
    <MobileNavigationPage pageId={SettingsModeTypesEnum.MAIN}>
      <MainScreen />
    </MobileNavigationPage>
    <MobileNavigationModal pageId={SettingsModeTypesEnum.LICENSES}>
      <LicensesScreen />
    </MobileNavigationModal>
    <MobileNavigationPage pageId={SettingsModeTypesEnum.HELP}>
      <HelpScreen />
    </MobileNavigationPage>
  </MobileNavigation>
);

export default SettingsComponent;
