import React from 'react';
import { MobileNavigationModal, MobileNavigationPage } from 'react-mobile-navigation-core';
import MobileNavigation, {
  navigationActions,
} from 'react-mobile-navigation-engine';
import SettingsMainPageComponent from './pages/SettingsMainPageComponent';
import SettingsLicensesPageComponent from './pages/SettingsLicencesPageComponent';
import SettingsHelpPageComponent from './pages/SettingsHelpPageComponent';
import * as SettingsModeTypesEnum from '../enum/settings-mode-types-enum';

const width = 400;
const height = 500;

const SettingsComponent = ({ initState }) => (
  <MobileNavigation
    initPagesState={[
      navigationActions.onPageOpen(SettingsModeTypesEnum.HELP),
    ]}
    pageHeight={height}
    pageIdRoot={SettingsModeTypesEnum.MAIN}
    pageWidth={width}
  >
    <MobileNavigationPage pageId={SettingsModeTypesEnum.MAIN}>
      <SettingsMainPageComponent />
    </MobileNavigationPage>
    <MobileNavigationModal pageId={SettingsModeTypesEnum.LICENSES}>
      <SettingsLicensesPageComponent />
    </MobileNavigationModal>
    <MobileNavigationPage pageId={SettingsModeTypesEnum.HELP}>
      <SettingsHelpPageComponent />
    </MobileNavigationPage>
  </MobileNavigation>
);

export default SettingsComponent;
