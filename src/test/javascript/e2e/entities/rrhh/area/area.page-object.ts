import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class AreaComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-area div table .btn-danger'));
  title = element.all(by.css('jhi-area div h2#page-heading span')).first();

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

export class AreaUpdatePage {
  pageTitle = element(by.id('jhi-area-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  nombreInput = element(by.id('field_nombre'));
  descripcionInput = element(by.id('field_descripcion'));
  comentarioInput = element(by.id('field_comentario'));
  gerenciaSelect = element(by.id('field_gerencia'));

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

  async setComentarioInput(comentario) {
    await this.comentarioInput.sendKeys(comentario);
  }

  async getComentarioInput() {
    return await this.comentarioInput.getAttribute('value');
  }

  async gerenciaSelectLastOption(timeout?: number) {
    await this.gerenciaSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async gerenciaSelectOption(option) {
    await this.gerenciaSelect.sendKeys(option);
  }

  getGerenciaSelect(): ElementFinder {
    return this.gerenciaSelect;
  }

  async getGerenciaSelectedOption() {
    return await this.gerenciaSelect.element(by.css('option:checked')).getText();
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

export class AreaDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-area-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-area'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
