import React from 'react';
import { Text } from 'react-native';
import { storiesOf, action, linkTo } from '@kadira/react-native-storybook';
import { Provider } from 'react-redux';

import SettingsContainer2 from '../src/react-mobile-navigation-engine/stack/container/SettingsContainer';
import configureStore2 from '../src/react-mobile-navigation-engine/stack/store/configure-store';

const store2 = configureStore2();

storiesOf('examples', module)
  .add('react-mobile-navigation-engine', () => (
    <Provider store={store2} >
      <SettingsContainer2 />
    </Provider>
  ));

import Button from './Button';
import CenterView from './CenterView';
import Welcome from './Welcome';

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
