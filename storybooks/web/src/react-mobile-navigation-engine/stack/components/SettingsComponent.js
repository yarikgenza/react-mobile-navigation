import React from 'react';
import { MobileNavigationPage } from 'react-mobile-navigation-core';
import {
  MobileNavigation,
  mobileNavigationCreateInitState,
  mobileNavigationInitStatePseudoActions,
} from 'react-mobile-navigation-engine';
import SettingsMainPageComponent from './pages/SettingsMainPageComponent';
import SettingsLicencesPageComponent from './pages/SettingsLicencesPageComponent';
import SettingsHelpPageComponent from './pages/SettingsHelpPageComponent';
import * as SettingsModeTypesEnum from '../enum/settings-mode-types-enum';

const width = 400;
const height = 500;

const SettingsComponent = ({ initState }) => (
  <MobileNavigation
    initState={mobileNavigationCreateInitState(SettingsModeTypesEnum.MAIN, [
      SettingsModeTypesEnum.MAIN,
      SettingsModeTypesEnum.LICENSES,
      SettingsModeTypesEnum.HELP
    ], [
      mobileNavigationInitStatePseudoActions.openPageHorizontal(SettingsModeTypesEnum.HELP),
    ])}
    pageWidth={width}
    pageHeight={height}
  >
    <MobileNavigationPage pageId={SettingsModeTypesEnum.MAIN}>
      <SettingsMainPageComponent />
    </MobileNavigationPage>
    <MobileNavigationPage pageId={SettingsModeTypesEnum.LICENSES}>
      <SettingsLicencesPageComponent />
    </MobileNavigationPage>
    <MobileNavigationPage pageId={SettingsModeTypesEnum.HELP}>
      <SettingsHelpPageComponent />
    </MobileNavigationPage>
  </MobileNavigation>
);

export default SettingsComponent;
