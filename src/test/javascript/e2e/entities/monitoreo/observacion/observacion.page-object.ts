import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class ObservacionComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-observacion div table .btn-danger'));
  title = element.all(by.css('jhi-observacion div h2#page-heading span')).first();

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

export class ObservacionUpdatePage {
  pageTitle = element(by.id('jhi-observacion-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  descripcionInput = element(by.id('field_descripcion'));
  comentarioInput = element(by.id('field_comentario'));
  codigoMonitoristaInput = element(by.id('field_codigoMonitorista'));
  proyectoSelect = element(by.id('field_proyecto'));
  componenteSelect = element(by.id('field_componente'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
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

  async setCodigoMonitoristaInput(codigoMonitorista) {
    await this.codigoMonitoristaInput.sendKeys(codigoMonitorista);
  }

  async getCodigoMonitoristaInput() {
    return await this.codigoMonitoristaInput.getAttribute('value');
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

  async componenteSelectLastOption(timeout?: number) {
    await this.componenteSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async componenteSelectOption(option) {
    await this.componenteSelect.sendKeys(option);
  }

  getComponenteSelect(): ElementFinder {
    return this.componenteSelect;
  }

  async getComponenteSelectedOption() {
    return await this.componenteSelect.element(by.css('option:checked')).getText();
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

export class ObservacionDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-observacion-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-observacion'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
