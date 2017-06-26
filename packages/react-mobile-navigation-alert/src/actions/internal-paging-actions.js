import {
  ALERT_GO_BACK,
  ALERT_GO_BACK_FORCE,
  ALERT_GOING_BACK,
  ALERT_GOING_BACK_DONE,
  ALERT_OPEN_PAGE,
  ALERT_OPENING_PAGE,
  ALERT_OPENING_PAGE_DONE,
} from '../action-types/internal-paging-action-types';

export function openPage(props) {
  return { type: ALERT_OPEN_PAGE, props };
}

export function openingPage() {
  return { type: ALERT_OPENING_PAGE };
}

export function openPageDone() {
  return { type: ALERT_OPENING_PAGE_DONE };
}

export function goBack() {
  return { type: ALERT_GO_BACK };
}

export function goBackForce() {
  return { type: ALERT_GO_BACK_FORCE };
}

export function goingBack() {
  return { type: ALERT_GOING_BACK };
}

export function goBackDone() {
  return { type: ALERT_GOING_BACK_DONE };
}
