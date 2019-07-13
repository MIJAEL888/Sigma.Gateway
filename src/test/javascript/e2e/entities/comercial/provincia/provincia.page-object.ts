import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class ProvinciaComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-provincia div table .btn-danger'));
  title = element.all(by.css('jhi-provincia div h2#page-heading span')).first();

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

export class ProvinciaUpdatePage {
  pageTitle = element(by.id('jhi-provincia-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  nombreInput = element(by.id('field_nombre'));
  ubigeoInput = element(by.id('field_ubigeo'));
  descripcionInput = element(by.id('field_descripcion'));
  departamentoSelect = element(by.id('field_departamento'));

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

  async departamentoSelectLastOption(timeout?: number) {
    await this.departamentoSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async departamentoSelectOption(option) {
    await this.departamentoSelect.sendKeys(option);
  }

  getDepartamentoSelect(): ElementFinder {
    return this.departamentoSelect;
  }

  async getDepartamentoSelectedOption() {
    return await this.departamentoSelect.element(by.css('option:checked')).getText();
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

export class ProvinciaDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-provincia-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-provincia'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
