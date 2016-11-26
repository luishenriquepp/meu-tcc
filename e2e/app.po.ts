import { browser, element, by } from 'protractor';

export class UpgradeTccPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.tagName('p')).getText();
  }
}
