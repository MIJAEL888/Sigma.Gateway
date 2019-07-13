import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class NormaCalidadComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-norma-calidad div table .btn-danger'));
  title = element.all(by.css('jhi-norma-calidad div h2#page-heading span')).first();

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

export class NormaCalidadUpdatePage {
  pageTitle = element(by.id('jhi-norma-calidad-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  nombreInput = element(by.id('field_nombre'));
  codigoInput = element(by.id('field_codigo'));
  fechaPublicacionInput = element(by.id('field_fechaPublicacion'));
  tipoSelect = element(by.id('field_tipo'));
  fuenteInput = element(by.id('field_fuente'));
  rutaDocNormaInput = element(by.id('field_rutaDocNorma'));
  nombreDocNormaInput = element(by.id('field_nombreDocNorma'));
  documentoNormaInput = element(by.id('file_documentoNorma'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNombreInput(nombre) {
    await this.nombreInput.sendKeys(nombre);
  }

  async getNombreInput() {
    return await this.nombreInput.getAttribute('value');
  }

  async setCodigoInput(codigo) {
    await this.codigoInput.sendKeys(codigo);
  }

  async getCodigoInput() {
    return await this.codigoInput.getAttribute('value');
  }

  async setFechaPublicacionInput(fechaPublicacion) {
    await this.fechaPublicacionInput.sendKeys(fechaPublicacion);
  }

  async getFechaPublicacionInput() {
    return await this.fechaPublicacionInput.getAttribute('value');
  }

  async setTipoSelect(tipo) {
    await this.tipoSelect.sendKeys(tipo);
  }

  async getTipoSelect() {
    return await this.tipoSelect.element(by.css('option:checked')).getText();
  }

  async tipoSelectLastOption(timeout?: number) {
    await this.tipoSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async setFuenteInput(fuente) {
    await this.fuenteInput.sendKeys(fuente);
  }

  async getFuenteInput() {
    return await this.fuenteInput.getAttribute('value');
  }

  async setRutaDocNormaInput(rutaDocNorma) {
    await this.rutaDocNormaInput.sendKeys(rutaDocNorma);
  }

  async getRutaDocNormaInput() {
    return await this.rutaDocNormaInput.getAttribute('value');
  }

  async setNombreDocNormaInput(nombreDocNorma) {
    await this.nombreDocNormaInput.sendKeys(nombreDocNorma);
  }

  async getNombreDocNormaInput() {
    return await this.nombreDocNormaInput.getAttribute('value');
  }

  async setDocumentoNormaInput(documentoNorma) {
    await this.documentoNormaInput.sendKeys(documentoNorma);
  }

  async getDocumentoNormaInput() {
    return await this.documentoNormaInput.getAttribute('value');
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

export class NormaCalidadDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-normaCalidad-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-normaCalidad'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
