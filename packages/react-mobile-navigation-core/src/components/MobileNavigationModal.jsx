import React from 'react';
import MobileNavigationShadowPage from './MobileNavigationShadowPage';
import MobileNavigationModalRender from '../components-styled/MobileNavigationModalRender';
import * as DirectionEnum from '../constants/direction-types';
import { MODAL } from '../constants/page-types';
import { MODAL_MARGIN } from '../utils/style-api';

const propTypes = {
  children: React.PropTypes.element,
  isForce: React.PropTypes.bool,
  isShow: React.PropTypes.bool,
  pageHeight: React.PropTypes.number,
  pageStatus: React.PropTypes.string,
  pageWidth: React.PropTypes.number,
  zIndex: React.PropTypes.number,
  onPageClose: React.PropTypes.func,
  onTransitionEnd: React.PropTypes.func,
};

const defaultProps = {
  children: undefined,
  isForce: undefined,
  isShow: undefined,
  pageHeight: undefined,
  pageStatus: undefined,
  pageWidth: undefined,
  zIndex: undefined,
  onPageClose: undefined,
  onTransitionEnd: undefined,
};

export default class MobileNavigationModal extends React.Component {

  constructor(props) {
    super(props);
    this.onShadowClick = this.onShadowClick.bind(this);
  }

  onShadowClick() {
    const { onPageClose } = this.props;
    if (!onPageClose) {
      return;
    }
    onPageClose();
  }

  render() {
    const {
      children,
      isForce,
      isShow,
      pageHeight,
      pageStatus,
      pageWidth,
      zIndex,
      onTransitionEnd,
      ...props,
    } = this.props;
    const pageHeightNew = pageHeight - MODAL_MARGIN;
    const pageWidthNew = pageWidth - (2 * MODAL_MARGIN);
    return (
      <MobileNavigationShadowPage
        direction={DirectionEnum.VERTICAL}
        isForce={isForce}
        isShow={isShow}
        pageLeft={MODAL_MARGIN}
        pageStatus={pageStatus}
        pageWidth={pageWidthNew}
        zIndex={zIndex}
        onShadowClick={this.onShadowClick}
        onTransitionEnd={onTransitionEnd}
      >
        <MobileNavigationModalRender pageHeight={pageHeightNew} pageWidth={pageWidthNew} >
          {children
            ? React.cloneElement(
              React.Children.only(children),
              Object.assign({}, props, { pageHeight: pageHeightNew, pageWidth: pageWidthNew })
            )
            : null
          }
        </MobileNavigationModalRender>
      </MobileNavigationShadowPage>
    );
  }
}

MobileNavigationModal.propTypes = propTypes;
MobileNavigationModal.defaultProps = defaultProps;
MobileNavigationModal.pageType = MODAL;
