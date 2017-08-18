import Alert, { ALERT_TYPES } from 'binary-ui-components/mobile/Alert';
import Button from 'binary-ui-components/mobile/Button';
import React from 'react';
import { MobileNavigationPage } from 'react-mobile-navigation-core';
import MobileNavigation, {
  navigationActions,
} from 'react-mobile-navigation-engine';

class AlertComponent extends React.Component {

  constructor(props) {
    super(props);
    this.alertConfig = {
      autoHideDuration: this.props.autoHide ? 2000 : 0,
      render: () => (
        <div onClick={() => { onAlertClose(); }} >
          <Alert text="text" type={ALERT_TYPES.CRITICAL} onClick={() => { console.log(1); this.props.onAlertClose(); }} />
        </div>
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
      <div style={{ backgroundColor: 'rgb(255, 255, 255)', height: pageHeight }} >
        <Button onClick={() => onAlertOpen(this.alertConfig)} label="Show Alert" />
      </div>
    );
  }
}

const Container = ({ initState, isOpened, autoHide }) => (
  <MobileNavigation
    pageHeight={500}
    pageIdRoot={1}
    pageWidth={400}
  >
    <MobileNavigationPage pageId={1}>
      <AlertComponent isOpened={isOpened} autoHide={autoHide}/>
    </MobileNavigationPage>
  </MobileNavigation>
);

export default Container;
