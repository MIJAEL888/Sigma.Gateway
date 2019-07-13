import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class ParamentroMonitoreoComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-paramentro-monitoreo div table .btn-danger'));
  title = element.all(by.css('jhi-paramentro-monitoreo div h2#page-heading span')).first();

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

export class ParamentroMonitoreoUpdatePage {
  pageTitle = element(by.id('jhi-paramentro-monitoreo-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  nombreInput = element(by.id('field_nombre'));
  descripcionInput = element(by.id('field_descripcion'));
  costoInput = element(by.id('field_costo'));
  componenteMonitoreoSelect = element(by.id('field_componenteMonitoreo'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNombreInput(nombre) {
    await this.nombreInput.sendKeys(nombre);
  }

  async getNombreInput() {
    return await this.nombreInput.getAttribute('value');
  }

  async setDescripcionInput(descripcion) {
    await this.descripcionInput.sendKeys(descripcion);
  }

  async getDescripcionInput() {
    return await this.descripcionInput.getAttribute('value');
  }

  async setCostoInput(costo) {
    await this.costoInput.sendKeys(costo);
  }

  async getCostoInput() {
    return await this.costoInput.getAttribute('value');
  }

  async componenteMonitoreoSelectLastOption(timeout?: number) {
    await this.componenteMonitoreoSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async componenteMonitoreoSelectOption(option) {
    await this.componenteMonitoreoSelect.sendKeys(option);
  }

  getComponenteMonitoreoSelect(): ElementFinder {
    return this.componenteMonitoreoSelect;
  }

  async getComponenteMonitoreoSelectedOption() {
    return await this.componenteMonitoreoSelect.element(by.css('option:checked')).getText();
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

export class ParamentroMonitoreoDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-paramentroMonitoreo-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-paramentroMonitoreo'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
