import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class LaboratorioComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-laboratorio div table .btn-danger'));
  title = element.all(by.css('jhi-laboratorio div h2#page-heading span')).first();

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

export class LaboratorioUpdatePage {
  pageTitle = element(by.id('jhi-laboratorio-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  razonSocialInput = element(by.id('field_razonSocial'));
  direccionInput = element(by.id('field_direccion'));
  rucInput = element(by.id('field_ruc'));
  acreditadoPorInput = element(by.id('field_acreditadoPor'));
  numeroAcreditacionInput = element(by.id('field_numeroAcreditacion'));
  rutaDocAcreditacionInput = element(by.id('field_rutaDocAcreditacion'));
  nombreDocAcreditacionInput = element(by.id('field_nombreDocAcreditacion'));
  documentoAcreditacionInput = element(by.id('file_documentoAcreditacion'));
  vigenciaDesdeInput = element(by.id('field_vigenciaDesde'));
  vigenciaHastaInput = element(by.id('field_vigenciaHasta'));
  telefonoInput = element(by.id('field_telefono'));
  correoInput = element(by.id('field_correo'));
  nombreContactoInput = element(by.id('field_nombreContacto'));
  fechaCreacionInput = element(by.id('field_fechaCreacion'));

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

  async setAcreditadoPorInput(acreditadoPor) {
    await this.acreditadoPorInput.sendKeys(acreditadoPor);
  }

  async getAcreditadoPorInput() {
    return await this.acreditadoPorInput.getAttribute('value');
  }

  async setNumeroAcreditacionInput(numeroAcreditacion) {
    await this.numeroAcreditacionInput.sendKeys(numeroAcreditacion);
  }

  async getNumeroAcreditacionInput() {
    return await this.numeroAcreditacionInput.getAttribute('value');
  }

  async setRutaDocAcreditacionInput(rutaDocAcreditacion) {
    await this.rutaDocAcreditacionInput.sendKeys(rutaDocAcreditacion);
  }

  async getRutaDocAcreditacionInput() {
    return await this.rutaDocAcreditacionInput.getAttribute('value');
  }

  async setNombreDocAcreditacionInput(nombreDocAcreditacion) {
    await this.nombreDocAcreditacionInput.sendKeys(nombreDocAcreditacion);
  }

  async getNombreDocAcreditacionInput() {
    return await this.nombreDocAcreditacionInput.getAttribute('value');
  }

  async setDocumentoAcreditacionInput(documentoAcreditacion) {
    await this.documentoAcreditacionInput.sendKeys(documentoAcreditacion);
  }

  async getDocumentoAcreditacionInput() {
    return await this.documentoAcreditacionInput.getAttribute('value');
  }

  async setVigenciaDesdeInput(vigenciaDesde) {
    await this.vigenciaDesdeInput.sendKeys(vigenciaDesde);
  }

  async getVigenciaDesdeInput() {
    return await this.vigenciaDesdeInput.getAttribute('value');
  }

  async setVigenciaHastaInput(vigenciaHasta) {
    await this.vigenciaHastaInput.sendKeys(vigenciaHasta);
  }

  async getVigenciaHastaInput() {
    return await this.vigenciaHastaInput.getAttribute('value');
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

  async setFechaCreacionInput(fechaCreacion) {
    await this.fechaCreacionInput.sendKeys(fechaCreacion);
  }

  async getFechaCreacionInput() {
    return await this.fechaCreacionInput.getAttribute('value');
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

export class LaboratorioDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-laboratorio-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-laboratorio'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
