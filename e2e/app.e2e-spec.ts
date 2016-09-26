import { MeuTccPage } from './app.po';

describe('meu-tcc App', function() {
  let page: MeuTccPage;

  beforeEach(() => {
    page = new MeuTccPage();
  });

  it('valor imovel must be enabled', () => {
    page.navigateTo();
    expect(page.getInputState()).toEqual(true);
  });
});
