import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class ResultadoMetereologiaComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-resultado-metereologia div table .btn-danger'));
  title = element.all(by.css('jhi-resultado-metereologia div h2#page-heading span')).first();

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

export class ResultadoMetereologiaUpdatePage {
  pageTitle = element(by.id('jhi-resultado-metereologia-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  fechaInput = element(by.id('field_fecha'));
  valorInput = element(by.id('field_valor'));
  valorDecimalInput = element(by.id('field_valorDecimal'));
  resultadoSelect = element(by.id('field_resultado'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setFechaInput(fecha) {
    await this.fechaInput.sendKeys(fecha);
  }

  async getFechaInput() {
    return await this.fechaInput.getAttribute('value');
  }

  async setValorInput(valor) {
    await this.valorInput.sendKeys(valor);
  }

  async getValorInput() {
    return await this.valorInput.getAttribute('value');
  }

  async setValorDecimalInput(valorDecimal) {
    await this.valorDecimalInput.sendKeys(valorDecimal);
  }

  async getValorDecimalInput() {
    return await this.valorDecimalInput.getAttribute('value');
  }

  async resultadoSelectLastOption(timeout?: number) {
    await this.resultadoSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async resultadoSelectOption(option) {
    await this.resultadoSelect.sendKeys(option);
  }

  getResultadoSelect(): ElementFinder {
    return this.resultadoSelect;
  }

  async getResultadoSelectedOption() {
    return await this.resultadoSelect.element(by.css('option:checked')).getText();
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

export class ResultadoMetereologiaDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-resultadoMetereologia-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-resultadoMetereologia'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
