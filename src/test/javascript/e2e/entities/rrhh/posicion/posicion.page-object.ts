import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class PosicionComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-posicion div table .btn-danger'));
  title = element.all(by.css('jhi-posicion div h2#page-heading span')).first();

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

export class PosicionUpdatePage {
  pageTitle = element(by.id('jhi-posicion-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  nombreInput = element(by.id('field_nombre'));
  descripcionInput = element(by.id('field_descripcion'));
  funcionesInput = element(by.id('field_funciones'));
  areaSelect = element(by.id('field_area'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNombreInput(nombre) {
    await this.nombreInput.sendKeys(nombre);
  }

  async getNombreInput() {
    return await this.nombreInput.getAttribute('value');
  }

  async setDescripcionInput(descripcion) {
    await this.descripcionInput.sendKeys(descripcion);
  }

  async getDescripcionInput() {
    return await this.descripcionInput.getAttribute('value');
  }

  async setFuncionesInput(funciones) {
    await this.funcionesInput.sendKeys(funciones);
  }

  async getFuncionesInput() {
    return await this.funcionesInput.getAttribute('value');
  }

  async areaSelectLastOption(timeout?: number) {
    await this.areaSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async areaSelectOption(option) {
    await this.areaSelect.sendKeys(option);
  }

  getAreaSelect(): ElementFinder {
    return this.areaSelect;
  }

  async getAreaSelectedOption() {
    return await this.areaSelect.element(by.css('option:checked')).getText();
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

export class PosicionDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-posicion-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-posicion'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
