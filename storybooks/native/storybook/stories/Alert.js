import Alert, { ALERT_TYPES } from 'binary-ui-components/mobile/Alert';
import Button from 'binary-ui-components/mobile/Button';
import React from 'react';
import { Dimensions, Text, View } from 'react-native';

import { actionSheetOptionModel } from 'react-mobile-navigation-action-sheet';
import { MobileNavigationPage } from 'react-mobile-navigation-core';
import MobileNavigation from 'react-mobile-navigation-engine';

const { height, width } = Dimensions.get('window');

class AlertComponent extends React.Component {

  constructor(props) {
    super(props);
    this.alertConfig = {
      autoHideDuration: this.props.autoHide ? 2000 : 0,
      render: () => (
        <View onPress={() => { onAlertClose(); }} >
          <Alert text="text" type={ALERT_TYPES.CRITICAL} onPress={() => { console.log(1); this.props.onAlertClose(); }} />
        </View>
      ),
    };
  }

  componentDidMount() {
    if (this.props.isOpened) {
      this.props.onAlertOpen(this.alertConfig);
    }
  }
  render() {
    const {
      pageHeight,
      onAlertOpen,
      onAlertClose,
    } = this.props;
    return (
      <View style={{ backgroundColor: 'rgb(255, 255, 255)', height: pageHeight }} >
        <Text>Alert</Text>
        <Button onPress={() => onAlertOpen(this.alertConfig)} label="Show Alert" />
      </View>
    );
  }
}

const Container = ({ initState, isOpened, autoHide }) => (
  <View style={{ height, width }} >
    <MobileNavigation
      pageHeight={height}
      pageIdRoot={'MAIN'}
      pageWidth={width}
    >
      <MobileNavigationPage pageId={'MAIN'} >
        <AlertComponent isOpened={isOpened} autoHide={autoHide}/>
      </MobileNavigationPage>
    </MobileNavigation>
  </View>
);


export default Container;
