import { RuenAppPage } from './app.po';

describe('ruen-app App', function() {
  let page: RuenAppPage;

  beforeEach(() => {
    page = new RuenAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
