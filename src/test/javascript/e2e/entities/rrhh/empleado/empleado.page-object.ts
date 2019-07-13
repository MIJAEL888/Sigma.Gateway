import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class EmpleadoComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-empleado div table .btn-danger'));
  title = element.all(by.css('jhi-empleado div h2#page-heading span')).first();

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

export class EmpleadoUpdatePage {
  pageTitle = element(by.id('jhi-empleado-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  nombreInput = element(by.id('field_nombre'));
  apellidoPaternoInput = element(by.id('field_apellidoPaterno'));
  apellidoMaternoInput = element(by.id('field_apellidoMaterno'));
  tipoDocumentoSelect = element(by.id('field_tipoDocumento'));
  numeroDocumentoInput = element(by.id('field_numeroDocumento'));
  fechaNacimientoInput = element(by.id('field_fechaNacimiento'));
  fechaIngresoInput = element(by.id('field_fechaIngreso'));
  tipoContratoSelect = element(by.id('field_tipoContrato'));
  tipoAportacionSelect = element(by.id('field_tipoAportacion'));
  estadoSelect = element(by.id('field_estado'));
  fechaCreacionInput = element(by.id('field_fechaCreacion'));
  fechaActualizacionInput = element(by.id('field_fechaActualizacion'));
  direccionInput = element(by.id('field_direccion'));
  estadoCivilSelect = element(by.id('field_estadoCivil'));
  posicionSelect = element(by.id('field_posicion'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNombreInput(nombre) {
    await this.nombreInput.sendKeys(nombre);
  }

  async getNombreInput() {
    return await this.nombreInput.getAttribute('value');
  }

  async setApellidoPaternoInput(apellidoPaterno) {
    await this.apellidoPaternoInput.sendKeys(apellidoPaterno);
  }

  async getApellidoPaternoInput() {
    return await this.apellidoPaternoInput.getAttribute('value');
  }

  async setApellidoMaternoInput(apellidoMaterno) {
    await this.apellidoMaternoInput.sendKeys(apellidoMaterno);
  }

  async getApellidoMaternoInput() {
    return await this.apellidoMaternoInput.getAttribute('value');
  }

  async setTipoDocumentoSelect(tipoDocumento) {
    await this.tipoDocumentoSelect.sendKeys(tipoDocumento);
  }

  async getTipoDocumentoSelect() {
    return await this.tipoDocumentoSelect.element(by.css('option:checked')).getText();
  }

  async tipoDocumentoSelectLastOption(timeout?: number) {
    await this.tipoDocumentoSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async setNumeroDocumentoInput(numeroDocumento) {
    await this.numeroDocumentoInput.sendKeys(numeroDocumento);
  }

  async getNumeroDocumentoInput() {
    return await this.numeroDocumentoInput.getAttribute('value');
  }

  async setFechaNacimientoInput(fechaNacimiento) {
    await this.fechaNacimientoInput.sendKeys(fechaNacimiento);
  }

  async getFechaNacimientoInput() {
    return await this.fechaNacimientoInput.getAttribute('value');
  }

  async setFechaIngresoInput(fechaIngreso) {
    await this.fechaIngresoInput.sendKeys(fechaIngreso);
  }

  async getFechaIngresoInput() {
    return await this.fechaIngresoInput.getAttribute('value');
  }

  async setTipoContratoSelect(tipoContrato) {
    await this.tipoContratoSelect.sendKeys(tipoContrato);
  }

  async getTipoContratoSelect() {
    return await this.tipoContratoSelect.element(by.css('option:checked')).getText();
  }

  async tipoContratoSelectLastOption(timeout?: number) {
    await this.tipoContratoSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async setTipoAportacionSelect(tipoAportacion) {
    await this.tipoAportacionSelect.sendKeys(tipoAportacion);
  }

  async getTipoAportacionSelect() {
    return await this.tipoAportacionSelect.element(by.css('option:checked')).getText();
  }

  async tipoAportacionSelectLastOption(timeout?: number) {
    await this.tipoAportacionSelect
      .all(by.tagName('option'))
      .last()
      .click();
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

  async setFechaCreacionInput(fechaCreacion) {
    await this.fechaCreacionInput.sendKeys(fechaCreacion);
  }

  async getFechaCreacionInput() {
    return await this.fechaCreacionInput.getAttribute('value');
  }

  async setFechaActualizacionInput(fechaActualizacion) {
    await this.fechaActualizacionInput.sendKeys(fechaActualizacion);
  }

  async getFechaActualizacionInput() {
    return await this.fechaActualizacionInput.getAttribute('value');
  }

  async setDireccionInput(direccion) {
    await this.direccionInput.sendKeys(direccion);
  }

  async getDireccionInput() {
    return await this.direccionInput.getAttribute('value');
  }

  async setEstadoCivilSelect(estadoCivil) {
    await this.estadoCivilSelect.sendKeys(estadoCivil);
  }

  async getEstadoCivilSelect() {
    return await this.estadoCivilSelect.element(by.css('option:checked')).getText();
  }

  async estadoCivilSelectLastOption(timeout?: number) {
    await this.estadoCivilSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async posicionSelectLastOption(timeout?: number) {
    await this.posicionSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async posicionSelectOption(option) {
    await this.posicionSelect.sendKeys(option);
  }

  getPosicionSelect(): ElementFinder {
    return this.posicionSelect;
  }

  async getPosicionSelectedOption() {
    return await this.posicionSelect.element(by.css('option:checked')).getText();
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

export class EmpleadoDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-empleado-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-empleado'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
