
export function isStringEmpty(filterText) {
  return filterText === undefined || filterText === null || filterText.trim() === '';
}
