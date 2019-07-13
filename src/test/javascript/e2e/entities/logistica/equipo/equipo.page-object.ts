import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class EquipoComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-equipo div table .btn-danger'));
  title = element.all(by.css('jhi-equipo div h2#page-heading span')).first();

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

export class EquipoUpdatePage {
  pageTitle = element(by.id('jhi-equipo-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  codigoEquipoInput = element(by.id('field_codigoEquipo'));
  serieInput = element(by.id('field_serie'));
  calibradoDesdeInput = element(by.id('field_calibradoDesde'));
  calibradoHastaInput = element(by.id('field_calibradoHasta'));
  rutaDocCalibracionInput = element(by.id('field_rutaDocCalibracion'));
  nombreDocCalibracionInput = element(by.id('field_nombreDocCalibracion'));
  documentoCalibracionInput = element(by.id('file_documentoCalibracion'));
  estadoSelect = element(by.id('field_estado'));
  fechaCompraInput = element(by.id('field_fechaCompra'));
  observacionInput = element(by.id('field_observacion'));
  comentarioInput = element(by.id('field_comentario'));
  testInput = element(by.id('file_test'));
  modeloSelect = element(by.id('field_modelo'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setCodigoEquipoInput(codigoEquipo) {
    await this.codigoEquipoInput.sendKeys(codigoEquipo);
  }

  async getCodigoEquipoInput() {
    return await this.codigoEquipoInput.getAttribute('value');
  }

  async setSerieInput(serie) {
    await this.serieInput.sendKeys(serie);
  }

  async getSerieInput() {
    return await this.serieInput.getAttribute('value');
  }

  async setCalibradoDesdeInput(calibradoDesde) {
    await this.calibradoDesdeInput.sendKeys(calibradoDesde);
  }

  async getCalibradoDesdeInput() {
    return await this.calibradoDesdeInput.getAttribute('value');
  }

  async setCalibradoHastaInput(calibradoHasta) {
    await this.calibradoHastaInput.sendKeys(calibradoHasta);
  }

  async getCalibradoHastaInput() {
    return await this.calibradoHastaInput.getAttribute('value');
  }

  async setRutaDocCalibracionInput(rutaDocCalibracion) {
    await this.rutaDocCalibracionInput.sendKeys(rutaDocCalibracion);
  }

  async getRutaDocCalibracionInput() {
    return await this.rutaDocCalibracionInput.getAttribute('value');
  }

  async setNombreDocCalibracionInput(nombreDocCalibracion) {
    await this.nombreDocCalibracionInput.sendKeys(nombreDocCalibracion);
  }

  async getNombreDocCalibracionInput() {
    return await this.nombreDocCalibracionInput.getAttribute('value');
  }

  async setDocumentoCalibracionInput(documentoCalibracion) {
    await this.documentoCalibracionInput.sendKeys(documentoCalibracion);
  }

  async getDocumentoCalibracionInput() {
    return await this.documentoCalibracionInput.getAttribute('value');
  }

  async setEstadoSelect(estado) {
    await this.estadoSelect.sendKeys(estado);
  }

  async getEstadoSelect() {
    return await this.estadoSelect.element(by.css('option:checked')).getText();
  }

  async estadoSelectLastOption(timeout?: number) {
    await this.estadoSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async setFechaCompraInput(fechaCompra) {
    await this.fechaCompraInput.sendKeys(fechaCompra);
  }

  async getFechaCompraInput() {
    return await this.fechaCompraInput.getAttribute('value');
  }

  async setObservacionInput(observacion) {
    await this.observacionInput.sendKeys(observacion);
  }

  async getObservacionInput() {
    return await this.observacionInput.getAttribute('value');
  }

  async setComentarioInput(comentario) {
    await this.comentarioInput.sendKeys(comentario);
  }

  async getComentarioInput() {
    return await this.comentarioInput.getAttribute('value');
  }

  async setTestInput(test) {
    await this.testInput.sendKeys(test);
  }

  async getTestInput() {
    return await this.testInput.getAttribute('value');
  }

  async modeloSelectLastOption(timeout?: number) {
    await this.modeloSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async modeloSelectOption(option) {
    await this.modeloSelect.sendKeys(option);
  }

  getModeloSelect(): ElementFinder {
    return this.modeloSelect;
  }

  async getModeloSelectedOption() {
    return await this.modeloSelect.element(by.css('option:checked')).getText();
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

export class EquipoDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-equipo-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-equipo'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
