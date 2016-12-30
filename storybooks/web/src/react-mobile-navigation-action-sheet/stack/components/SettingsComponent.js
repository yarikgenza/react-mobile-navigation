import React from 'react';
import { MobileNavigation, MobileNavigationPage } from 'react-mobile-navigation-engine';
import SettingsMainPageContainer from '../container/pages/SettingsMainPageContainer';
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
      <SettingsMainPageContainer />
    </MobileNavigationPage>
  </MobileNavigation>
);