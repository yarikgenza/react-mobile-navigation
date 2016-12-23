import React from 'react';
import { MobileNavigation, MobileNavigationPage } from 'react-mobile-navigation-engine';
import { SettingsMainPageComponent } from './pages/SettingsMainPageComponent';
import { SettingsLicencesPageComponent } from './pages/SettingsLicencesPageComponent';
import { SettingsHelpPageComponent } from './pages/SettingsHelpPageComponent';
import * as SettingsModeTypesEnum from '../enum/settings-mode-types-enum';

const width = 400;
const height = 500;

export const SettingsComponent = () => (
  <MobileNavigation
    defaultPageId={SettingsModeTypesEnum.MAIN}
    pageWidth={width}
    pageHeight={height}
    stackId="Settings"
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
