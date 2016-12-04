import React from 'react';
import { Text } from 'react-native';
import { storiesOf, action, linkTo } from '@kadira/react-native-storybook';

import { Provider } from 'react-redux';
import SettingsContainer from '../src/stack/container/SettingsContainer';
import configureStore from '../src/stack/store/configure-store';

import Button from './Button';
import CenterView from './CenterView';
import Welcome from './Welcome';

const store = configureStore();

storiesOf('Examples', module)
  .add('Cards Page', () => (
    <Provider store={store} >
      <SettingsContainer />
    </Provider>
  ));

storiesOf('Welcome', module)
  .add('to Storybook', () => (
    <Welcome showApp={linkTo('Button')}/>
  ));

storiesOf('Button', module)
  .addDecorator(getStory => (
    <CenterView>{getStory()}</CenterView>
  ))
  .add('with text', () => (
    <Button onPress={action('clicked-text')}>
      <Text>Hello Button</Text>
    </Button>
  ))
  .add('with some emoji', () => (
    <Button onPress={action('clicked-emoji')}>
      <Text>😀 😎 👍 💯</Text>
    </Button>
  ));
