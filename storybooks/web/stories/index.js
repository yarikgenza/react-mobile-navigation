import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { Provider } from 'react-redux';
import SettingsContainer from '../src/stack/container/SettingsContainer';
import configureStore from '../src/stack/store/configure-store';

/*
import ARTSVGMode from 'art/modes/svg';
import ARTCurrentMode from 'art/modes/current';
ARTCurrentMode.setCurrent(ARTSVGMode);
*/

const store = configureStore();
const style = {
  position: 'absolute',
  height: '500px',
  width: '400px',
};

storiesOf('Examples', module)
  .add('Cards Page', () => (
    <Provider store={store} >
      <div style={style} >
        <SettingsContainer />
      </div>
    </Provider>
  ));
