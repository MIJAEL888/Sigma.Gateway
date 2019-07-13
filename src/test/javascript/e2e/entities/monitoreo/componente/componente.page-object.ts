import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class ComponenteComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-componente div table .btn-danger'));
  title = element.all(by.css('jhi-componente div h2#page-heading span')).first();

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

export class ComponenteUpdatePage {
  pageTitle = element(by.id('jhi-componente-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  nombreInput = element(by.id('field_nombre'));
  descripcionInput = element(by.id('field_descripcion'));
  protocoloInput = element(by.id('field_protocolo'));
  guiaInput = element(by.id('field_guia'));
  isoInput = element(by.id('field_iso'));
  objetivosInput = element(by.id('field_objetivos'));

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

  async setProtocoloInput(protocolo) {
    await this.protocoloInput.sendKeys(protocolo);
  }

  async getProtocoloInput() {
    return await this.protocoloInput.getAttribute('value');
  }

  async setGuiaInput(guia) {
    await this.guiaInput.sendKeys(guia);
  }

  async getGuiaInput() {
    return await this.guiaInput.getAttribute('value');
  }

  async setIsoInput(iso) {
    await this.isoInput.sendKeys(iso);
  }

  async getIsoInput() {
    return await this.isoInput.getAttribute('value');
  }

  async setObjetivosInput(objetivos) {
    await this.objetivosInput.sendKeys(objetivos);
  }

  async getObjetivosInput() {
    return await this.objetivosInput.getAttribute('value');
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

export class ComponenteDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-componente-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-componente'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
