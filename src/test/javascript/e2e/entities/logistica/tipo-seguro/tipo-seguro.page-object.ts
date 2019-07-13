import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class TipoSeguroComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-tipo-seguro div table .btn-danger'));
  title = element.all(by.css('jhi-tipo-seguro div h2#page-heading span')).first();

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

export class TipoSeguroUpdatePage {
  pageTitle = element(by.id('jhi-tipo-seguro-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  nombreInput = element(by.id('field_nombre'));
  descripcionInput = element(by.id('field_descripcion'));
  fechaCaudicidadInput = element(by.id('field_fechaCaudicidad'));
  codigoTipoSeguroInput = element(by.id('field_codigoTipoSeguro'));

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

  async setFechaCaudicidadInput(fechaCaudicidad) {
    await this.fechaCaudicidadInput.sendKeys(fechaCaudicidad);
  }

  async getFechaCaudicidadInput() {
    return await this.fechaCaudicidadInput.getAttribute('value');
  }

  async setCodigoTipoSeguroInput(codigoTipoSeguro) {
    await this.codigoTipoSeguroInput.sendKeys(codigoTipoSeguro);
  }

  async getCodigoTipoSeguroInput() {
    return await this.codigoTipoSeguroInput.getAttribute('value');
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

export class TipoSeguroDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-tipoSeguro-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-tipoSeguro'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
