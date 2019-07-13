import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class ProyectoComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-proyecto div table .btn-danger'));
  title = element.all(by.css('jhi-proyecto div h2#page-heading span')).first();

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

export class ProyectoUpdatePage {
  pageTitle = element(by.id('jhi-proyecto-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  codigoInput = element(by.id('field_codigo'));
  codigoSolicitudInput = element(by.id('field_codigoSolicitud'));
  codigoResponsableInput = element(by.id('field_codigoResponsable'));
  estadoSelect = element(by.id('field_estado'));
  fechaIncioInput = element(by.id('field_fechaIncio'));
  fechaFinaInput = element(by.id('field_fechaFina'));
  descripcionInput = element(by.id('field_descripcion'));
  comentarioInput = element(by.id('field_comentario'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setCodigoInput(codigo) {
    await this.codigoInput.sendKeys(codigo);
  }

  async getCodigoInput() {
    return await this.codigoInput.getAttribute('value');
  }

  async setCodigoSolicitudInput(codigoSolicitud) {
    await this.codigoSolicitudInput.sendKeys(codigoSolicitud);
  }

  async getCodigoSolicitudInput() {
    return await this.codigoSolicitudInput.getAttribute('value');
  }

  async setCodigoResponsableInput(codigoResponsable) {
    await this.codigoResponsableInput.sendKeys(codigoResponsable);
  }

  async getCodigoResponsableInput() {
    return await this.codigoResponsableInput.getAttribute('value');
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

  async setFechaIncioInput(fechaIncio) {
    await this.fechaIncioInput.sendKeys(fechaIncio);
  }

  async getFechaIncioInput() {
    return await this.fechaIncioInput.getAttribute('value');
  }

  async setFechaFinaInput(fechaFina) {
    await this.fechaFinaInput.sendKeys(fechaFina);
  }

  async getFechaFinaInput() {
    return await this.fechaFinaInput.getAttribute('value');
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

export class ProyectoDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-proyecto-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-proyecto'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
