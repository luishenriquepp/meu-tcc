import { browser, element, by } from 'protractor/globals';

export class MeuTccPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('formulario h3')).getText();
  }
}
