import { ExpressFrontPage } from './app.po';

describe('express-front App', () => {
  let page: ExpressFrontPage;

  beforeEach(() => {
    page = new ExpressFrontPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
