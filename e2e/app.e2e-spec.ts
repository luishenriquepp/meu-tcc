import { UpgradeTccPage } from './app.po';

describe('upgrade-tcc App', function() {
  let page: UpgradeTccPage;

  beforeEach(() => {
    page = new UpgradeTccPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Página principal');
  });
});
