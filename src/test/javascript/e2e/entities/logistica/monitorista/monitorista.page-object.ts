import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class MonitoristaComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-monitorista div table .btn-danger'));
  title = element.all(by.css('jhi-monitorista div h2#page-heading span')).first();

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

export class MonitoristaUpdatePage {
  pageTitle = element(by.id('jhi-monitorista-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  nombreInput = element(by.id('field_nombre'));
  apellidoPaternoInput = element(by.id('field_apellidoPaterno'));
  apellidoMaternoInput = element(by.id('field_apellidoMaterno'));
  dniInput = element(by.id('field_dni'));
  fechaNacimientoInput = element(by.id('field_fechaNacimiento'));
  laboratorioSelect = element(by.id('field_laboratorio'));
  tipoSeguroSelect = element(by.id('field_tipoSeguro'));

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

  async setDniInput(dni) {
    await this.dniInput.sendKeys(dni);
  }

  async getDniInput() {
    return await this.dniInput.getAttribute('value');
  }

  async setFechaNacimientoInput(fechaNacimiento) {
    await this.fechaNacimientoInput.sendKeys(fechaNacimiento);
  }

  async getFechaNacimientoInput() {
    return await this.fechaNacimientoInput.getAttribute('value');
  }

  async laboratorioSelectLastOption(timeout?: number) {
    await this.laboratorioSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async laboratorioSelectOption(option) {
    await this.laboratorioSelect.sendKeys(option);
  }

  getLaboratorioSelect(): ElementFinder {
    return this.laboratorioSelect;
  }

  async getLaboratorioSelectedOption() {
    return await this.laboratorioSelect.element(by.css('option:checked')).getText();
  }

  async tipoSeguroSelectLastOption(timeout?: number) {
    await this.tipoSeguroSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async tipoSeguroSelectOption(option) {
    await this.tipoSeguroSelect.sendKeys(option);
  }

  getTipoSeguroSelect(): ElementFinder {
    return this.tipoSeguroSelect;
  }

  async getTipoSeguroSelectedOption() {
    return await this.tipoSeguroSelect.element(by.css('option:checked')).getText();
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

export class MonitoristaDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-monitorista-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-monitorista'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
