import faker from 'faker';
import { ItemTypes } from '../../src/constants';
import { Item } from '../../src/models';

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomItemType() {
  return [
    ItemTypes.TAB,
    ItemTypes.HISTORY,
    ItemTypes.BOOKMARK
  ][randomInt(0, 2)];
}

export default function createItem({
  type       = randomItemType(),
  windowId   = faker.random.number(),
  tabIndex   = faker.random.number(),
  title      = faker.name.title(),
  url        = faker.internet.url(),
  favIconUrl = faker.image.imageUrl()
} = {}) {
  return new Item({
    type,
    windowId,
    tabIndex,
    title,
    url,
    favIconUrl
  });
}
