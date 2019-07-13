import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class PuntoMonitoreoComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-punto-monitoreo div table .btn-danger'));
  title = element.all(by.css('jhi-punto-monitoreo div h2#page-heading span')).first();

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

export class PuntoMonitoreoUpdatePage {
  pageTitle = element(by.id('jhi-punto-monitoreo-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  codigoInput = element(by.id('field_codigo'));
  codigoSedeInput = element(by.id('field_codigoSede'));
  codigoClienteInput = element(by.id('field_codigoCliente'));
  coordenadaNorteInput = element(by.id('field_coordenadaNorte'));
  coordenadaEsteInput = element(by.id('field_coordenadaEste'));
  descripcionInput = element(by.id('field_descripcion'));
  comentarioInput = element(by.id('field_comentario'));
  latitudInput = element(by.id('field_latitud'));
  longitudInput = element(by.id('field_longitud'));
  observacionInput = element(by.id('field_observacion'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setCodigoInput(codigo) {
    await this.codigoInput.sendKeys(codigo);
  }

  async getCodigoInput() {
    return await this.codigoInput.getAttribute('value');
  }

  async setCodigoSedeInput(codigoSede) {
    await this.codigoSedeInput.sendKeys(codigoSede);
  }

  async getCodigoSedeInput() {
    return await this.codigoSedeInput.getAttribute('value');
  }

  async setCodigoClienteInput(codigoCliente) {
    await this.codigoClienteInput.sendKeys(codigoCliente);
  }

  async getCodigoClienteInput() {
    return await this.codigoClienteInput.getAttribute('value');
  }

  async setCoordenadaNorteInput(coordenadaNorte) {
    await this.coordenadaNorteInput.sendKeys(coordenadaNorte);
  }

  async getCoordenadaNorteInput() {
    return await this.coordenadaNorteInput.getAttribute('value');
  }

  async setCoordenadaEsteInput(coordenadaEste) {
    await this.coordenadaEsteInput.sendKeys(coordenadaEste);
  }

  async getCoordenadaEsteInput() {
    return await this.coordenadaEsteInput.getAttribute('value');
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

  async setObservacionInput(observacion) {
    await this.observacionInput.sendKeys(observacion);
  }

  async getObservacionInput() {
    return await this.observacionInput.getAttribute('value');
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

export class PuntoMonitoreoDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-puntoMonitoreo-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-puntoMonitoreo'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
