import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class LaboratorioMonitoreoComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-laboratorio-monitoreo div table .btn-danger'));
  title = element.all(by.css('jhi-laboratorio-monitoreo div h2#page-heading span')).first();

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

export class LaboratorioMonitoreoUpdatePage {
  pageTitle = element(by.id('jhi-laboratorio-monitoreo-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  codigoLaboratorioInput = element(by.id('field_codigoLaboratorio'));
  fechaResevaInput = element(by.id('field_fechaReseva'));
  proyectoSelect = element(by.id('field_proyecto'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setCodigoLaboratorioInput(codigoLaboratorio) {
    await this.codigoLaboratorioInput.sendKeys(codigoLaboratorio);
  }

  async getCodigoLaboratorioInput() {
    return await this.codigoLaboratorioInput.getAttribute('value');
  }

  async setFechaResevaInput(fechaReseva) {
    await this.fechaResevaInput.sendKeys(fechaReseva);
  }

  async getFechaResevaInput() {
    return await this.fechaResevaInput.getAttribute('value');
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

export class LaboratorioMonitoreoDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-laboratorioMonitoreo-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-laboratorioMonitoreo'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
