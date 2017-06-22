import Alert from 'binary-ui-components/mobile/Alert';
import React from 'react';
import { PageStatusTypesEnum, Interpolation } from 'react-mobile-navigation-core';
import { MobileNavigationView } from 'react-mobile-navigation-engine';

const propTypes = {
  autoHideDuration: React.PropTypes.number.isRequired,
  pagingActions: React.PropTypes.objectOf(React.PropTypes.func),
  pageId: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string,
  ]),
  pageState: React.PropTypes.object,
  stackId: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string,
  ]),
  text: React.PropTypes.string,
  type: React.PropTypes.string,
};

const defaultProps = {
  autoHideDuration: 1000,
  text: '',
  type: undefined,
};

export default class AlertBox extends React.Component {

  constructor(props) {
    super(props);
    this.timerAutoHideId = undefined;
    this.onPageTransitionEnd = this.onPageTransitionEnd.bind(this);
    this.setPageStatus = this.setPageStatus.bind(this);
  }

  componentWillUnmount() {
    clearTimeout(this.timerAutoHideId);
  }

  onPageTransitionEnd() {
    const { autoHideDuration, pageId, pageState, pagingActions, stackId } = this.props;
    switch (pageState.status) {
      case PageStatusTypesEnum.OPEN_ANIMATING: {
        pagingActions.openPageDone(stackId, pageId);
        if (autoHideDuration > 0) {
          clearTimeout(this.timerAutoHideId);
          this.timerAutoHideId = setTimeout(() => {
            pagingActions.goBack(stackId, pageId);
          }, autoHideDuration);
        }
        return;
      }
      case PageStatusTypesEnum.CLOSE_ANIMATING: {
        pagingActions.goBackDone(stackId, pageId);
        return;
      }
      default:
        return;
    }
  }

  setPageStatus() {
    const { pageId, pageState, pagingActions, stackId } = this.props;
    switch (pageState.status) {
      case PageStatusTypesEnum.OPEN_PREPARE:
        // case PageSideTypesEnum.GOING_TO_MAIN:
        pagingActions.openingPage(stackId, pageId);
        return;
      case PageStatusTypesEnum.CLOSE_PREPARE:
        // case PageSideTypesEnum.GOING_TO_COVER:
        pagingActions.goingBack(stackId, pageId);
        return;
      default:
        return;
    }
  }

  render() {
    const {
      pageState,
      text,
      type,
    } = this.props;
    if (pageState.status === PageStatusTypesEnum.CLOSE_DONE) {
      return null;
    }
    return (
      <Interpolation
        setPageStatus={this.setPageStatus}
        onPageTransitionEnd={this.onPageTransitionEnd}
        pageState={pageState}
      >
        <MobileNavigationView>
          <Alert text={text} type={type} />
        </MobileNavigationView>
      </Interpolation>
    );
  }
}

AlertBox.propTypes = propTypes;
AlertBox.defaultProps = defaultProps;
