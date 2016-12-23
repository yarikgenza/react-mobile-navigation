import React from 'react';
import {
  getTranslate3dByDirection,
  MobileNavigationPageRender,
} from 'react-mobile-navigation-core';
import BackgroundActiveRender from '../components-styled/BackgroundActiveRender';
import ContentRender from '../components-styled/ContentRender';
import { getDarkBackgroundStyle } from '../utils/shadow-page-styles';

const propTypes = {
  children: React.PropTypes.element,
  pageId: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string,
  ]).isRequired,
  pageState: React.PropTypes.object,
  pagingActions: React.PropTypes.object.isRequired,
  stackId: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string,
  ]).isRequired,
  translateValue: React.PropTypes.number,
  onShadowClick: React.PropTypes.func,
};

const defaultProps = {};

export default class MobileNavigationShadowPage extends React.Component {

  constructor(props) {
    super(props);
    this.onShadowClick = this.onShadowClick.bind(this);
  }

  onShadowClick() {
    const { onShadowClick } = this.props;
    if (onShadowClick) {
      onShadowClick();
    }
  }

  render() {
    const { children, pageId, pageState, pagingActions, stackId, translateValue } = this.props;
    const { direction, status, zIndex } = pageState;
    return (
      <MobileNavigationPageRender style={{ zIndex }} >
        <BackgroundActiveRender
          style={getDarkBackgroundStyle(status, translateValue)}
          onClick={this.onShadowClick}
        />
        <ContentRender style={getTranslate3dByDirection(status, direction, translateValue)} >
          {React.cloneElement(React.Children.only(children), {
            pageId,
            pageState,
            pagingActions,
            stackId,
          })}
        </ContentRender>
      </MobileNavigationPageRender>
    );
  }
}

MobileNavigationShadowPage.propTypes = propTypes;
MobileNavigationShadowPage.defaultProps = defaultProps;
