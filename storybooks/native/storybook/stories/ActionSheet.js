import Button from 'binary-ui-components/mobile/Button';
import React from 'react';
import { Dimensions, Text, View } from 'react-native';

import { actionSheetOptionModel } from 'react-mobile-navigation-action-sheet';
import { MobileNavigationPage } from 'react-mobile-navigation-core';
import MobileNavigation from 'react-mobile-navigation-engine';

const { height, width } = Dimensions.get('window');

class ActionSheet extends React.PureComponent {
  componentDidMount() {
    if (this.props.isOpened) {
      this.props.onActionSheetOpen();
    }
  }
  render() {
    const {
      pageHeight,
      onActionSheetOpen,
    } = this.props;
    const actionSheetConfig = {
      cancelLabel: 'Cancel',
      items: [
        actionSheetOptionModel('licenses', 'Licenses', () => { console.log('licenses'); }),
      ],
      onCancel: () => {},
      onSelect: () => {},
    };
    return (
      <View style={{ backgroundColor: 'rgb(255, 255, 255)', height: pageHeight }} >
        <Text>ActionSheet</Text>
        <Button onPress={() => onActionSheetOpen(actionSheetConfig)} label="Show ActionSheet" />
      </View>
    );
  }
}

const Container = ({ initState, isOpened }) => (
  <View style={{ height, width }} >
    <MobileNavigation
      pageHeight={height}
      pageIdRoot={'MAIN'}
      pageWidth={width}
    >
      <MobileNavigationPage pageId={'MAIN'} >
        <ActionSheet isOpened={isOpened}/>
      </MobileNavigationPage>
    </MobileNavigation>
  </View>
);


export default Container;
