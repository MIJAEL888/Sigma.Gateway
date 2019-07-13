import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class DistritoComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-distrito div table .btn-danger'));
  title = element.all(by.css('jhi-distrito div h2#page-heading span')).first();

  async clickOnCreateButton(timeout?: number) {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(timeout?: number) {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons() {
    return this.deleteButtons.count();
  }

  async getTitle() {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class DistritoUpdatePage {
  pageTitle = element(by.id('jhi-distrito-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  nombreInput = element(by.id('field_nombre'));
  ubigeoInput = element(by.id('field_ubigeo'));
  descripcionInput = element(by.id('field_descripcion'));
  provinciaSelect = element(by.id('field_provincia'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNombreInput(nombre) {
    await this.nombreInput.sendKeys(nombre);
  }

  async getNombreInput() {
    return await this.nombreInput.getAttribute('value');
  }

  async setUbigeoInput(ubigeo) {
    await this.ubigeoInput.sendKeys(ubigeo);
  }

  async getUbigeoInput() {
    return await this.ubigeoInput.getAttribute('value');
  }

  async setDescripcionInput(descripcion) {
    await this.descripcionInput.sendKeys(descripcion);
  }

  async getDescripcionInput() {
    return await this.descripcionInput.getAttribute('value');
  }

  async provinciaSelectLastOption(timeout?: number) {
    await this.provinciaSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async provinciaSelectOption(option) {
    await this.provinciaSelect.sendKeys(option);
  }

  getProvinciaSelect(): ElementFinder {
    return this.provinciaSelect;
  }

  async getProvinciaSelectedOption() {
    return await this.provinciaSelect.element(by.css('option:checked')).getText();
  }

  async save(timeout?: number) {
    await this.saveButton.click();
  }

  async cancel(timeout?: number) {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class DistritoDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-distrito-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-distrito'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
