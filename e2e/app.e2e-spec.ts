import { MeuTccPage } from './app.po';

describe('meu-tcc App', function() {
  let page: MeuTccPage;

  beforeEach(() => {
    page = new MeuTccPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
