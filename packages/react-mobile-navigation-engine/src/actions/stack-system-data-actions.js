import { INIT_STACK } from '../constants/stack-system-data-action-types';

export function initStack(stackId, defaultPageId, pages = {}) {
  return { type: INIT_STACK, stackId, defaultPageId, pages };
}
