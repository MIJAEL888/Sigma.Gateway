import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class EquipoMonitoreoComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-equipo-monitoreo div table .btn-danger'));
  title = element.all(by.css('jhi-equipo-monitoreo div h2#page-heading span')).first();

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

export class EquipoMonitoreoUpdatePage {
  pageTitle = element(by.id('jhi-equipo-monitoreo-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  codigoEquipoInput = element(by.id('field_codigoEquipo'));
  reservadoDesdeInput = element(by.id('field_reservadoDesde'));
  reservadoHastaInput = element(by.id('field_reservadoHasta'));
  documentoCalibracionInput = element(by.id('field_documentoCalibracion'));
  proyectoSelect = element(by.id('field_proyecto'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setCodigoEquipoInput(codigoEquipo) {
    await this.codigoEquipoInput.sendKeys(codigoEquipo);
  }

  async getCodigoEquipoInput() {
    return await this.codigoEquipoInput.getAttribute('value');
  }

  async setReservadoDesdeInput(reservadoDesde) {
    await this.reservadoDesdeInput.sendKeys(reservadoDesde);
  }

  async getReservadoDesdeInput() {
    return await this.reservadoDesdeInput.getAttribute('value');
  }

  async setReservadoHastaInput(reservadoHasta) {
    await this.reservadoHastaInput.sendKeys(reservadoHasta);
  }

  async getReservadoHastaInput() {
    return await this.reservadoHastaInput.getAttribute('value');
  }

  async setDocumentoCalibracionInput(documentoCalibracion) {
    await this.documentoCalibracionInput.sendKeys(documentoCalibracion);
  }

  async getDocumentoCalibracionInput() {
    return await this.documentoCalibracionInput.getAttribute('value');
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

export class EquipoMonitoreoDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-equipoMonitoreo-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-equipoMonitoreo'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
