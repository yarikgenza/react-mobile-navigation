import React from 'react';
import { MobileNavigationPage } from 'react-mobile-navigation-core';
import MobileNavigation from 'react-mobile-navigation-engine';
import SettingsMainPageComponent from './pages/SettingsMainPageComponent';
import * as SettingsModeTypesEnum from '../enum/settings-mode-types-enum';

const width = 400;
const height = 500;

const SettingsComponent = ({ initState }) => (
  <MobileNavigation
    pageHeight={height}
    pageIdRoot={SettingsModeTypesEnum.MAIN}
    pageWidth={width}
  >
    <MobileNavigationPage pageId={SettingsModeTypesEnum.MAIN}>
      <SettingsMainPageComponent />
    </MobileNavigationPage>
  </MobileNavigation>
);

export default SettingsComponent
 