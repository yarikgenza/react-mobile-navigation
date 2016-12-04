import React from 'react';
import { StandardPageComponent, PageManagerContainer } from '../../../../lib/react-mobile-navigation-engine/src';
import { SettingsMainPageComponent } from './pages/SettingsMainPageComponent';
import { SettingsLicencesPageComponent } from './pages/SettingsLicencesPageComponent';
import { SettingsHelpPageComponent } from './pages/SettingsHelpPageComponent';
import * as SettingsModeTypesEnum from '../enum/settings-mode-types-enum';

const width = 400;
const height = 500;

export const SettingsComponent = () => (
  <PageManagerContainer
    defaultPageId={SettingsModeTypesEnum.MAIN}
    pageWidth={width}
    pageHeight={height}
  >
    <StandardPageComponent pageId={SettingsModeTypesEnum.MAIN} >
      <SettingsMainPageComponent />
    </StandardPageComponent>
    <StandardPageComponent pageId={SettingsModeTypesEnum.LICENSES} >
      <SettingsLicencesPageComponent />
    </StandardPageComponent>
    <StandardPageComponent pageId={SettingsModeTypesEnum.HELP} >
      <SettingsHelpPageComponent />
    </StandardPageComponent>
  </PageManagerContainer>
);
