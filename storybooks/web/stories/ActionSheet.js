import Button from 'binary-ui-components/mobile/Button';
import React from 'react';

import { actionSheetOptionModel } from 'react-mobile-navigation-action-sheet';
import { MobileNavigationPage } from 'react-mobile-navigation-core';
import MobileNavigation from 'react-mobile-navigation-engine';

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
      <div style={{ backgroundColor: 'rgb(255, 255, 255)', height: pageHeight }} >
        <Button onClick={() => onActionSheetOpen(actionSheetConfig)} label="Show ActionSheet" />
      </div>
    );
  }
}

const Container = ({ initState, isOpened }) => (
    <MobileNavigation
      pageHeight={500}
      pageIdRoot={1}
      pageWidth={400}
    >
      <MobileNavigationPage pageId={1} >
        <ActionSheet isOpened={isOpened}/>
      </MobileNavigationPage>
    </MobileNavigation>
);


export default Container;
