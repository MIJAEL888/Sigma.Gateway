import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class ServicioComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-servicio div table .btn-danger'));
  title = element.all(by.css('jhi-servicio div h2#page-heading span')).first();

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

export class ServicioUpdatePage {
  pageTitle = element(by.id('jhi-servicio-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  codigoInput = element(by.id('field_codigo'));
  fechaEntregaInput = element(by.id('field_fechaEntrega'));
  nombreSolicitanteInput = element(by.id('field_nombreSolicitante'));
  numeroSolicitanteInput = element(by.id('field_numeroSolicitante'));
  observacionInput = element(by.id('field_observacion'));
  descripcionInput = element(by.id('field_descripcion'));
  estadoSelect = element(by.id('field_estado'));
  codigoClienteInput = element(by.id('field_codigoCliente'));
  codigoSedeInput = element(by.id('field_codigoSede'));
  tipoServiciosSelect = element(by.id('field_tipoServicios'));
  tipoSolicitudSelect = element(by.id('field_tipoSolicitud'));
  tipoInduccionSelect = element(by.id('field_tipoInduccion'));
  requisitosSeguridadSelect = element(by.id('field_requisitosSeguridad'));
  sedeSelect = element(by.id('field_sede'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setCodigoInput(codigo) {
    await this.codigoInput.sendKeys(codigo);
  }

  async getCodigoInput() {
    return await this.codigoInput.getAttribute('value');
  }

  async setFechaEntregaInput(fechaEntrega) {
    await this.fechaEntregaInput.sendKeys(fechaEntrega);
  }

  async getFechaEntregaInput() {
    return await this.fechaEntregaInput.getAttribute('value');
  }

  async setNombreSolicitanteInput(nombreSolicitante) {
    await this.nombreSolicitanteInput.sendKeys(nombreSolicitante);
  }

  async getNombreSolicitanteInput() {
    return await this.nombreSolicitanteInput.getAttribute('value');
  }

  async setNumeroSolicitanteInput(numeroSolicitante) {
    await this.numeroSolicitanteInput.sendKeys(numeroSolicitante);
  }

  async getNumeroSolicitanteInput() {
    return await this.numeroSolicitanteInput.getAttribute('value');
  }

  async setObservacionInput(observacion) {
    await this.observacionInput.sendKeys(observacion);
  }

  async getObservacionInput() {
    return await this.observacionInput.getAttribute('value');
  }

  async setDescripcionInput(descripcion) {
    await this.descripcionInput.sendKeys(descripcion);
  }

  async getDescripcionInput() {
    return await this.descripcionInput.getAttribute('value');
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

  async setCodigoClienteInput(codigoCliente) {
    await this.codigoClienteInput.sendKeys(codigoCliente);
  }

  async getCodigoClienteInput() {
    return await this.codigoClienteInput.getAttribute('value');
  }

  async setCodigoSedeInput(codigoSede) {
    await this.codigoSedeInput.sendKeys(codigoSede);
  }

  async getCodigoSedeInput() {
    return await this.codigoSedeInput.getAttribute('value');
  }

  async tipoServiciosSelectLastOption(timeout?: number) {
    await this.tipoServiciosSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async tipoServiciosSelectOption(option) {
    await this.tipoServiciosSelect.sendKeys(option);
  }

  getTipoServiciosSelect(): ElementFinder {
    return this.tipoServiciosSelect;
  }

  async getTipoServiciosSelectedOption() {
    return await this.tipoServiciosSelect.element(by.css('option:checked')).getText();
  }

  async tipoSolicitudSelectLastOption(timeout?: number) {
    await this.tipoSolicitudSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async tipoSolicitudSelectOption(option) {
    await this.tipoSolicitudSelect.sendKeys(option);
  }

  getTipoSolicitudSelect(): ElementFinder {
    return this.tipoSolicitudSelect;
  }

  async getTipoSolicitudSelectedOption() {
    return await this.tipoSolicitudSelect.element(by.css('option:checked')).getText();
  }

  async tipoInduccionSelectLastOption(timeout?: number) {
    await this.tipoInduccionSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async tipoInduccionSelectOption(option) {
    await this.tipoInduccionSelect.sendKeys(option);
  }

  getTipoInduccionSelect(): ElementFinder {
    return this.tipoInduccionSelect;
  }

  async getTipoInduccionSelectedOption() {
    return await this.tipoInduccionSelect.element(by.css('option:checked')).getText();
  }

  async requisitosSeguridadSelectLastOption(timeout?: number) {
    await this.requisitosSeguridadSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async requisitosSeguridadSelectOption(option) {
    await this.requisitosSeguridadSelect.sendKeys(option);
  }

  getRequisitosSeguridadSelect(): ElementFinder {
    return this.requisitosSeguridadSelect;
  }

  async getRequisitosSeguridadSelectedOption() {
    return await this.requisitosSeguridadSelect.element(by.css('option:checked')).getText();
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

export class ServicioDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-servicio-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-servicio'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
