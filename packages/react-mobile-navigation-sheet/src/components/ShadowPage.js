import React from 'react';
import { BASE_CONTAINER_STYLE } from 'react-mobile-navigation-core';
import DarkBackground from '../components-styled/DarkBackground';
import BaseContentWrapper from '../components-styled/BaseContentWrapper';
import ShadowPageRender from '../components-styled/ShadowPageRender';
import { getShadowPageContentStyle, getDarkBackgroundStyle } from '../utils/shadow-page-styles';

const propTypes = {
  pageId: React.PropTypes.any,
  pageState: React.PropTypes.any,
  translateValue: React.PropTypes.number,
  stackId: React.PropTypes.any,
  pagingActions: React.PropTypes.any,
  onShadowClick: React.PropTypes.any,
  children: React.PropTypes.element.isRequired,
};

const defaultProps = {};

export default class ShadowPage extends React.Component {

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

  renderFullShadowPage(shadowPageStyle, pageState, zIndex, status) {
    const { direction } = pageState;
    const { stackId, pageId, pagingActions, translateValue, children } = this.props;
    const shadowPageContentStyle = getShadowPageContentStyle(
      direction,
      zIndex,
      status,
      translateValue
    );
    const darkBackgroundStyle = getDarkBackgroundStyle(zIndex, status, translateValue);
    return (
      <ShadowPageRender style={shadowPageStyle} >
        <DarkBackground style={darkBackgroundStyle} onClick={this.onShadowClick} />
        <BaseContentWrapper style={shadowPageContentStyle} >
          {React.cloneElement(React.Children.only(children), {
            pageState,
            stackId,
            pageId,
            pagingActions,
          })}
        </BaseContentWrapper>
      </ShadowPageRender>
    );
  }

  render() {
    const { pageState } = this.props;
    const { zIndex, status } = pageState;
    const shadowPageStyle = Object.assign({}, BASE_CONTAINER_STYLE, {
      zIndex,
    });
    return this.renderFullShadowPage(shadowPageStyle, pageState, zIndex, status);
  }
}

ShadowPage.propTypes = propTypes;
ShadowPage.defaultProps = defaultProps;
