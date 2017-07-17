import React from 'react';
import MobileNavigationShadowPage from './MobileNavigationShadowPage';
import MobileNavigationModalRender from '../components-styled/MobileNavigationModalRender';
import * as DirectionEnum from '../constants/direction-types';
import { MODAL } from '../constants/page-types';

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

const MobileNavigationModal = ({
  children,
  isForce,
  isShow,
  pageHeight,
  pageStatus,
  pageWidth,
  zIndex,
  onTransitionEnd,
  ...props,
}) => {
  const pageHeightNew = pageHeight - 10;
  const pageWidthNew = pageWidth - 20;
  return (
    <MobileNavigationShadowPage
      direction={DirectionEnum.VERTICAL}
      isForce={isForce}
      isShow={isShow}
      pageStatus={pageStatus}
      zIndex={zIndex}
      onShadowClick={props.onPageClose}
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
};

MobileNavigationModal.propTypes = propTypes;
MobileNavigationModal.defaultProps = defaultProps;
MobileNavigationModal.pageType = MODAL;

export default MobileNavigationModal;
