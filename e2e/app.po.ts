import { browser, element, by } from 'protractor/globals';

export class MeuTccPage {
  navigateTo() {
    return browser.get('/');
  }

  getInputState() {
    return element(by.id('valor-imovel')).isEnabled();
  }
}
