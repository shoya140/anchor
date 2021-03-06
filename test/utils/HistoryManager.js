import assert from 'power-assert';
import sinon from 'sinon';
import { ItemTypes } from '../../src/constants';
import { HistoryManager } from '../../src/utils';
import { createHistory, createMockChromeObject } from '../helpers';

describe('HistoryManager', () => {
  let histories;
  let items;
  let historyManager;

  beforeEach(() => {
    histories = [...Array(100).keys()].map(() => createHistory());
    items = histories.map((history) => {
      return {
        type:  ItemTypes.HISTORY,
        title: history.title,
        url:   history.url
      };
    });

    global.chrome = createMockChromeObject();
    chrome.history.search.callsArgWith(1, histories);

    historyManager = new HistoryManager();
  });

  it("should emit 'update' when history has been created", () => {
    const callback = sinon.spy();
    historyManager.on('update', callback);
    chrome.history.onVisited.emit();

    assert(callback.called);
    assert.deepEqual(historyManager.getItems(), items);
  });

  it("should emit 'update' when history has been removed", () => {
    const callback = sinon.spy();
    historyManager.on('update', callback);
    chrome.history.onVisitRemoved.emit();

    assert(callback.called);
    assert.deepEqual(historyManager.getItems(), items);
  });
});
