import React from 'react';
import { MobileNavigationPage } from 'react-mobile-navigation-core';
import {
  MobileNavigation,
  mobileNavigationCreateInitState,
  mobileNavigationInitStatePseudoActions,
} from 'react-mobile-navigation-engine';
import SettingsMainPageComponent from './pages/SettingsMainPageComponent';
import * as SettingsModeTypesEnum from '../enum/settings-mode-types-enum';

const width = 400;
const height = 500;

const SettingsComponent = ({ initState }) => (
  <MobileNavigation
    initState={mobileNavigationCreateInitState(SettingsModeTypesEnum.MAIN, [
      SettingsModeTypesEnum.MAIN,
    ])}
    pageWidth={width}
    pageHeight={height}
  >
    <MobileNavigationPage pageId={SettingsModeTypesEnum.MAIN}>
      <SettingsMainPageComponent />
    </MobileNavigationPage>
  </MobileNavigation>
);

export default SettingsComponent
 