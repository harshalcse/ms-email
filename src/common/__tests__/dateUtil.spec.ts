import dateUtil from '../dateUtil';
import { advanceTo, clear } from 'jest-date-mock';

describe('dateUtil', () => {
  afterEach(() => {
    clear();
  });
  it('Should return true when diff year', () => {
    advanceTo(new Date('2018-12-31'));
    const dateTest = new Date('2019-11-01');
    const expected = dateUtil.isDiffYear(dateTest);
    expect(expected).toBeTruthy();
  });
  it('Should return false when same year', () => {
    advanceTo(new Date('2019-11-11'));
    const dateTest = new Date('2019-11-11');
    const expected = dateUtil.isDiffYear(dateTest);
    expect(expected).toBeFalsy();
  });

  it('Should return true when diff month', () => {
    advanceTo(new Date('2019-12-01'));
    const dateTest = new Date('2019-11-30');
    const expected = dateUtil.isDiffMonth(dateTest);
    expect(expected).toBeTruthy();
  });
  it('Should return false when same month', () => {
    advanceTo(new Date('2019-11-11'));
    const dateTest = new Date('2019-11-11');
    const expected = dateUtil.isDiffMonth(dateTest);
    expect(expected).toBeFalsy();
  });

  it('Should return true when diff day', () => {
    advanceTo(new Date('2019-10-29T09:31:28.373Z'));
    const expected = dateUtil.isDiffDay(new Date('2019-10-28T02:31:28.373Z'));
    expect(expected).toBeTruthy();
  });
  it('Should return false when same day', () => {
    advanceTo(new Date('2019-10-29T08:31:28.373Z'));
    const expected = dateUtil.isDiffDay(new Date('2019-10-29T09:31:28.373Z'));
    expect(expected).toBeFalsy();
  });
});
