import React from 'react';
import { MobileNavigationPage } from 'react-mobile-navigation-core';
import {
  MobileNavigation,
  mobileNavigationCreateInitState,
  mobileNavigationInitStatePseudoActions,
} from 'react-mobile-navigation-engine';
import SettingsMainPageContainer from '../container/pages/SettingsMainPageContainer';
import * as SettingsModeTypesEnum from '../enum/settings-mode-types-enum';

const width = 400;
const height = 500;

export const SettingsComponent = ({ initState, stackId }) => (
  <MobileNavigation
    initState={mobileNavigationCreateInitState(SettingsModeTypesEnum.MAIN, [
      SettingsModeTypesEnum.MAIN,
    ])}
    pageWidth={width}
    pageHeight={height}
    stackId={stackId}
  >
    <MobileNavigationPage pageId={SettingsModeTypesEnum.MAIN}>
      <SettingsMainPageContainer />
    </MobileNavigationPage>
  </MobileNavigation>
);
