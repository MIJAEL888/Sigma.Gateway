import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class ModeloComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-modelo div table .btn-danger'));
  title = element.all(by.css('jhi-modelo div h2#page-heading span')).first();

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

export class ModeloUpdatePage {
  pageTitle = element(by.id('jhi-modelo-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  nombreInput = element(by.id('field_nombre'));
  descripcionInput = element(by.id('field_descripcion'));
  tipoEuipoSelect = element(by.id('field_tipoEuipo'));
  marcaSelect = element(by.id('field_marca'));

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

  async tipoEuipoSelectLastOption(timeout?: number) {
    await this.tipoEuipoSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async tipoEuipoSelectOption(option) {
    await this.tipoEuipoSelect.sendKeys(option);
  }

  getTipoEuipoSelect(): ElementFinder {
    return this.tipoEuipoSelect;
  }

  async getTipoEuipoSelectedOption() {
    return await this.tipoEuipoSelect.element(by.css('option:checked')).getText();
  }

  async marcaSelectLastOption(timeout?: number) {
    await this.marcaSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async marcaSelectOption(option) {
    await this.marcaSelect.sendKeys(option);
  }

  getMarcaSelect(): ElementFinder {
    return this.marcaSelect;
  }

  async getMarcaSelectedOption() {
    return await this.marcaSelect.element(by.css('option:checked')).getText();
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

export class ModeloDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-modelo-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-modelo'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
