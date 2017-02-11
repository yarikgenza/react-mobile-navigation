import {
  Search,
  AllSubstringsIndexStrategy,
  LowerCaseSanitizer,
  UnorderedSearchIndex,
} from 'js-search';
import getNoFilterTokenizer from 'js-search-no-filter';
import { isStringEmpty } from './string';

function getAllDataForItem(item) {
  return item.label;
}

function sortItems(leftItem, rightItem) {
  if (leftItem.itemIndex < rightItem.itemIndex) {
    return -1;
  }
  if (leftItem.itemIndex > rightItem.itemIndex) {
    return 1;
  }
  return 0;
}

export function getFilteredComboboxOptions(filterText, listOfItems) {
  if (isStringEmpty(filterText)) {
    return listOfItems;
  }
  const search = new Search('isbn');
  search.indexStrategy = new AllSubstringsIndexStrategy();
  search.sanitizer = new LowerCaseSanitizer();
  search.tokenizer = getNoFilterTokenizer();
  search.searchIndex = new UnorderedSearchIndex();
  search.addIndex('allItemData');
  const documents = listOfItems.map((item, itemIndex) => ({
    item,
    itemIndex,
    isbn: item.key,
    allItemData: getAllDataForItem(item),
  }));
  search.addDocuments(documents);
  const filterTextLower = filterText.toLowerCase();
  return search.search(filterTextLower).sort(sortItems).map(c => c.item);
}
