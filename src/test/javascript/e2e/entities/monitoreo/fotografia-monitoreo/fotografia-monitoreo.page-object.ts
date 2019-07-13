import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class FotografiaMonitoreoComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-fotografia-monitoreo div table .btn-danger'));
  title = element.all(by.css('jhi-fotografia-monitoreo div h2#page-heading span')).first();

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

export class FotografiaMonitoreoUpdatePage {
  pageTitle = element(by.id('jhi-fotografia-monitoreo-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  nombreInput = element(by.id('field_nombre'));
  rutaInput = element(by.id('field_ruta'));
  extensionInput = element(by.id('field_extension'));
  fotografiaInput = element(by.id('file_fotografia'));
  puntoMonitoreoObsSelect = element(by.id('field_puntoMonitoreoObs'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNombreInput(nombre) {
    await this.nombreInput.sendKeys(nombre);
  }

  async getNombreInput() {
    return await this.nombreInput.getAttribute('value');
  }

  async setRutaInput(ruta) {
    await this.rutaInput.sendKeys(ruta);
  }

  async getRutaInput() {
    return await this.rutaInput.getAttribute('value');
  }

  async setExtensionInput(extension) {
    await this.extensionInput.sendKeys(extension);
  }

  async getExtensionInput() {
    return await this.extensionInput.getAttribute('value');
  }

  async setFotografiaInput(fotografia) {
    await this.fotografiaInput.sendKeys(fotografia);
  }

  async getFotografiaInput() {
    return await this.fotografiaInput.getAttribute('value');
  }

  async puntoMonitoreoObsSelectLastOption(timeout?: number) {
    await this.puntoMonitoreoObsSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async puntoMonitoreoObsSelectOption(option) {
    await this.puntoMonitoreoObsSelect.sendKeys(option);
  }

  getPuntoMonitoreoObsSelect(): ElementFinder {
    return this.puntoMonitoreoObsSelect;
  }

  async getPuntoMonitoreoObsSelectedOption() {
    return await this.puntoMonitoreoObsSelect.element(by.css('option:checked')).getText();
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

export class FotografiaMonitoreoDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-fotografiaMonitoreo-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-fotografiaMonitoreo'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
