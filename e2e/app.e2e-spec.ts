import { SimImoveisUpdatePage } from './app.po';

describe('sim-imoveis-update App', () => {
  let page: SimImoveisUpdatePage;

  beforeEach(() => {
    page = new SimImoveisUpdatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
