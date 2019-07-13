import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class ClienteComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-cliente div table .btn-danger'));
  title = element.all(by.css('jhi-cliente div h2#page-heading span')).first();

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

export class ClienteUpdatePage {
  pageTitle = element(by.id('jhi-cliente-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  razonSocialInput = element(by.id('field_razonSocial'));
  direccionInput = element(by.id('field_direccion'));
  rucInput = element(by.id('field_ruc'));
  telefonoInput = element(by.id('field_telefono'));
  correoInput = element(by.id('field_correo'));
  nombreContactoInput = element(by.id('field_nombreContacto'));
  actividadInput = element(by.id('field_actividad'));
  comentarioInput = element(by.id('field_comentario'));
  fechaCreacionInput = element(by.id('field_fechaCreacion'));
  codigoZonaInput = element(by.id('field_codigoZona'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setRazonSocialInput(razonSocial) {
    await this.razonSocialInput.sendKeys(razonSocial);
  }

  async getRazonSocialInput() {
    return await this.razonSocialInput.getAttribute('value');
  }

  async setDireccionInput(direccion) {
    await this.direccionInput.sendKeys(direccion);
  }

  async getDireccionInput() {
    return await this.direccionInput.getAttribute('value');
  }

  async setRucInput(ruc) {
    await this.rucInput.sendKeys(ruc);
  }

  async getRucInput() {
    return await this.rucInput.getAttribute('value');
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

  async setNombreContactoInput(nombreContacto) {
    await this.nombreContactoInput.sendKeys(nombreContacto);
  }

  async getNombreContactoInput() {
    return await this.nombreContactoInput.getAttribute('value');
  }

  async setActividadInput(actividad) {
    await this.actividadInput.sendKeys(actividad);
  }

  async getActividadInput() {
    return await this.actividadInput.getAttribute('value');
  }

  async setComentarioInput(comentario) {
    await this.comentarioInput.sendKeys(comentario);
  }

  async getComentarioInput() {
    return await this.comentarioInput.getAttribute('value');
  }

  async setFechaCreacionInput(fechaCreacion) {
    await this.fechaCreacionInput.sendKeys(fechaCreacion);
  }

  async getFechaCreacionInput() {
    return await this.fechaCreacionInput.getAttribute('value');
  }

  async setCodigoZonaInput(codigoZona) {
    await this.codigoZonaInput.sendKeys(codigoZona);
  }

  async getCodigoZonaInput() {
    return await this.codigoZonaInput.getAttribute('value');
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

export class ClienteDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-cliente-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-cliente'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
