import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class TipoComponenteComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-tipo-componente div table .btn-danger'));
  title = element.all(by.css('jhi-tipo-componente div h2#page-heading span')).first();

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

export class TipoComponenteUpdatePage {
  pageTitle = element(by.id('jhi-tipo-componente-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  nombreInput = element(by.id('field_nombre'));
  descripcionInput = element(by.id('field_descripcion'));
  componenteSelect = element(by.id('field_componente'));

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

  async componenteSelectLastOption(timeout?: number) {
    await this.componenteSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async componenteSelectOption(option) {
    await this.componenteSelect.sendKeys(option);
  }

  getComponenteSelect(): ElementFinder {
    return this.componenteSelect;
  }

  async getComponenteSelectedOption() {
    return await this.componenteSelect.element(by.css('option:checked')).getText();
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

export class TipoComponenteDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-tipoComponente-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-tipoComponente'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
