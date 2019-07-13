import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class PuntoMonitoreoObsComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-punto-monitoreo-obs div table .btn-danger'));
  title = element.all(by.css('jhi-punto-monitoreo-obs div h2#page-heading span')).first();

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

export class PuntoMonitoreoObsUpdatePage {
  pageTitle = element(by.id('jhi-punto-monitoreo-obs-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  codigoInput = element(by.id('field_codigo'));
  descripcionInput = element(by.id('field_descripcion'));
  comentarioInput = element(by.id('field_comentario'));
  observacionInput = element(by.id('field_observacion'));
  puntoMonitoreoSelect = element(by.id('field_puntoMonitoreo'));
  resultadoSelect = element(by.id('field_resultado'));
  proyectoSelect = element(by.id('field_proyecto'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setCodigoInput(codigo) {
    await this.codigoInput.sendKeys(codigo);
  }

  async getCodigoInput() {
    return await this.codigoInput.getAttribute('value');
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

  async setObservacionInput(observacion) {
    await this.observacionInput.sendKeys(observacion);
  }

  async getObservacionInput() {
    return await this.observacionInput.getAttribute('value');
  }

  async puntoMonitoreoSelectLastOption(timeout?: number) {
    await this.puntoMonitoreoSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async puntoMonitoreoSelectOption(option) {
    await this.puntoMonitoreoSelect.sendKeys(option);
  }

  getPuntoMonitoreoSelect(): ElementFinder {
    return this.puntoMonitoreoSelect;
  }

  async getPuntoMonitoreoSelectedOption() {
    return await this.puntoMonitoreoSelect.element(by.css('option:checked')).getText();
  }

  async resultadoSelectLastOption(timeout?: number) {
    await this.resultadoSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async resultadoSelectOption(option) {
    await this.resultadoSelect.sendKeys(option);
  }

  getResultadoSelect(): ElementFinder {
    return this.resultadoSelect;
  }

  async getResultadoSelectedOption() {
    return await this.resultadoSelect.element(by.css('option:checked')).getText();
  }

  async proyectoSelectLastOption(timeout?: number) {
    await this.proyectoSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async proyectoSelectOption(option) {
    await this.proyectoSelect.sendKeys(option);
  }

  getProyectoSelect(): ElementFinder {
    return this.proyectoSelect;
  }

  async getProyectoSelectedOption() {
    return await this.proyectoSelect.element(by.css('option:checked')).getText();
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

export class PuntoMonitoreoObsDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-puntoMonitoreoObs-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-puntoMonitoreoObs'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
