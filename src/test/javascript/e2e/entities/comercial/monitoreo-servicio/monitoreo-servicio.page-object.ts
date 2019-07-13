import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class MonitoreoServicioComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-monitoreo-servicio div table .btn-danger'));
  title = element.all(by.css('jhi-monitoreo-servicio div h2#page-heading span')).first();

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

export class MonitoreoServicioUpdatePage {
  pageTitle = element(by.id('jhi-monitoreo-servicio-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  cantidadInput = element(by.id('field_cantidad'));
  costoTotalInput = element(by.id('field_costoTotal'));
  servicioSelect = element(by.id('field_servicio'));
  paramentroMonitoreoSelect = element(by.id('field_paramentroMonitoreo'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setCantidadInput(cantidad) {
    await this.cantidadInput.sendKeys(cantidad);
  }

  async getCantidadInput() {
    return await this.cantidadInput.getAttribute('value');
  }

  async setCostoTotalInput(costoTotal) {
    await this.costoTotalInput.sendKeys(costoTotal);
  }

  async getCostoTotalInput() {
    return await this.costoTotalInput.getAttribute('value');
  }

  async servicioSelectLastOption(timeout?: number) {
    await this.servicioSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async servicioSelectOption(option) {
    await this.servicioSelect.sendKeys(option);
  }

  getServicioSelect(): ElementFinder {
    return this.servicioSelect;
  }

  async getServicioSelectedOption() {
    return await this.servicioSelect.element(by.css('option:checked')).getText();
  }

  async paramentroMonitoreoSelectLastOption(timeout?: number) {
    await this.paramentroMonitoreoSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async paramentroMonitoreoSelectOption(option) {
    await this.paramentroMonitoreoSelect.sendKeys(option);
  }

  getParamentroMonitoreoSelect(): ElementFinder {
    return this.paramentroMonitoreoSelect;
  }

  async getParamentroMonitoreoSelectedOption() {
    return await this.paramentroMonitoreoSelect.element(by.css('option:checked')).getText();
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

export class MonitoreoServicioDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-monitoreoServicio-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-monitoreoServicio'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
