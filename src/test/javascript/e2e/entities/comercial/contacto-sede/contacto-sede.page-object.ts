import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class ContactoSedeComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-contacto-sede div table .btn-danger'));
  title = element.all(by.css('jhi-contacto-sede div h2#page-heading span')).first();

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

export class ContactoSedeUpdatePage {
  pageTitle = element(by.id('jhi-contacto-sede-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  nombreInput = element(by.id('field_nombre'));
  telefonoInput = element(by.id('field_telefono'));
  correoInput = element(by.id('field_correo'));
  posicionInput = element(by.id('field_posicion'));
  sedeSelect = element(by.id('field_sede'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNombreInput(nombre) {
    await this.nombreInput.sendKeys(nombre);
  }

  async getNombreInput() {
    return await this.nombreInput.getAttribute('value');
  }

  async setTelefonoInput(telefono) {
    await this.telefonoInput.sendKeys(telefono);
  }

  async getTelefonoInput() {
    return await this.telefonoInput.getAttribute('value');
  }

  async setCorreoInput(correo) {
    await this.correoInput.sendKeys(correo);
  }

  async getCorreoInput() {
    return await this.correoInput.getAttribute('value');
  }

  async setPosicionInput(posicion) {
    await this.posicionInput.sendKeys(posicion);
  }

  async getPosicionInput() {
    return await this.posicionInput.getAttribute('value');
  }

  async sedeSelectLastOption(timeout?: number) {
    await this.sedeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async sedeSelectOption(option) {
    await this.sedeSelect.sendKeys(option);
  }

  getSedeSelect(): ElementFinder {
    return this.sedeSelect;
  }

  async getSedeSelectedOption() {
    return await this.sedeSelect.element(by.css('option:checked')).getText();
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

export class ContactoSedeDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-contactoSede-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-contactoSede'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
