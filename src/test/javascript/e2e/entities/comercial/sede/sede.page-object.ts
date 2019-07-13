import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class SedeComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-sede div table .btn-danger'));
  title = element.all(by.css('jhi-sede div h2#page-heading span')).first();

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

export class SedeUpdatePage {
  pageTitle = element(by.id('jhi-sede-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  direccionInput = element(by.id('field_direccion'));
  referenciaInput = element(by.id('field_referencia'));
  latitudInput = element(by.id('field_latitud'));
  longitudInput = element(by.id('field_longitud'));
  actividadInput = element(by.id('field_actividad'));
  telefonoInput = element(by.id('field_telefono'));
  descripcionInput = element(by.id('field_descripcion'));
  comentarioInput = element(by.id('field_comentario'));
  rutaDocEstudioInput = element(by.id('field_rutaDocEstudio'));
  nombreDocEstudioInput = element(by.id('field_nombreDocEstudio'));
  documentoEstudioInput = element(by.id('file_documentoEstudio'));
  clienteSelect = element(by.id('field_cliente'));
  distritoSelect = element(by.id('field_distrito'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setDireccionInput(direccion) {
    await this.direccionInput.sendKeys(direccion);
  }

  async getDireccionInput() {
    return await this.direccionInput.getAttribute('value');
  }

  async setReferenciaInput(referencia) {
    await this.referenciaInput.sendKeys(referencia);
  }

  async getReferenciaInput() {
    return await this.referenciaInput.getAttribute('value');
  }

  async setLatitudInput(latitud) {
    await this.latitudInput.sendKeys(latitud);
  }

  async getLatitudInput() {
    return await this.latitudInput.getAttribute('value');
  }

  async setLongitudInput(longitud) {
    await this.longitudInput.sendKeys(longitud);
  }

  async getLongitudInput() {
    return await this.longitudInput.getAttribute('value');
  }

  async setActividadInput(actividad) {
    await this.actividadInput.sendKeys(actividad);
  }

  async getActividadInput() {
    return await this.actividadInput.getAttribute('value');
  }

  async setTelefonoInput(telefono) {
    await this.telefonoInput.sendKeys(telefono);
  }

  async getTelefonoInput() {
    return await this.telefonoInput.getAttribute('value');
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

  async setRutaDocEstudioInput(rutaDocEstudio) {
    await this.rutaDocEstudioInput.sendKeys(rutaDocEstudio);
  }

  async getRutaDocEstudioInput() {
    return await this.rutaDocEstudioInput.getAttribute('value');
  }

  async setNombreDocEstudioInput(nombreDocEstudio) {
    await this.nombreDocEstudioInput.sendKeys(nombreDocEstudio);
  }

  async getNombreDocEstudioInput() {
    return await this.nombreDocEstudioInput.getAttribute('value');
  }

  async setDocumentoEstudioInput(documentoEstudio) {
    await this.documentoEstudioInput.sendKeys(documentoEstudio);
  }

  async getDocumentoEstudioInput() {
    return await this.documentoEstudioInput.getAttribute('value');
  }

  async clienteSelectLastOption(timeout?: number) {
    await this.clienteSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async clienteSelectOption(option) {
    await this.clienteSelect.sendKeys(option);
  }

  getClienteSelect(): ElementFinder {
    return this.clienteSelect;
  }

  async getClienteSelectedOption() {
    return await this.clienteSelect.element(by.css('option:checked')).getText();
  }

  async distritoSelectLastOption(timeout?: number) {
    await this.distritoSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async distritoSelectOption(option) {
    await this.distritoSelect.sendKeys(option);
  }

  getDistritoSelect(): ElementFinder {
    return this.distritoSelect;
  }

  async getDistritoSelectedOption() {
    return await this.distritoSelect.element(by.css('option:checked')).getText();
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

export class SedeDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-sede-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-sede'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
