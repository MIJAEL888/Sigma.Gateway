import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class ResultadoComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-resultado div table .btn-danger'));
  title = element.all(by.css('jhi-resultado div h2#page-heading span')).first();

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

export class ResultadoUpdatePage {
  pageTitle = element(by.id('jhi-resultado-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  fechaInicioInput = element(by.id('field_fechaInicio'));
  fehcaFinInput = element(by.id('field_fehcaFin'));
  valorMinimoInput = element(by.id('field_valorMinimo'));
  valorMaximoInput = element(by.id('field_valorMaximo'));
  valorFinalInput = element(by.id('field_valorFinal'));
  valorFinalNumInput = element(by.id('field_valorFinalNum'));
  codigoLaboratorioInput = element(by.id('field_codigoLaboratorio'));
  codigoEquipoInput = element(by.id('field_codigoEquipo'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setFechaInicioInput(fechaInicio) {
    await this.fechaInicioInput.sendKeys(fechaInicio);
  }

  async getFechaInicioInput() {
    return await this.fechaInicioInput.getAttribute('value');
  }

  async setFehcaFinInput(fehcaFin) {
    await this.fehcaFinInput.sendKeys(fehcaFin);
  }

  async getFehcaFinInput() {
    return await this.fehcaFinInput.getAttribute('value');
  }

  async setValorMinimoInput(valorMinimo) {
    await this.valorMinimoInput.sendKeys(valorMinimo);
  }

  async getValorMinimoInput() {
    return await this.valorMinimoInput.getAttribute('value');
  }

  async setValorMaximoInput(valorMaximo) {
    await this.valorMaximoInput.sendKeys(valorMaximo);
  }

  async getValorMaximoInput() {
    return await this.valorMaximoInput.getAttribute('value');
  }

  async setValorFinalInput(valorFinal) {
    await this.valorFinalInput.sendKeys(valorFinal);
  }

  async getValorFinalInput() {
    return await this.valorFinalInput.getAttribute('value');
  }

  async setValorFinalNumInput(valorFinalNum) {
    await this.valorFinalNumInput.sendKeys(valorFinalNum);
  }

  async getValorFinalNumInput() {
    return await this.valorFinalNumInput.getAttribute('value');
  }

  async setCodigoLaboratorioInput(codigoLaboratorio) {
    await this.codigoLaboratorioInput.sendKeys(codigoLaboratorio);
  }

  async getCodigoLaboratorioInput() {
    return await this.codigoLaboratorioInput.getAttribute('value');
  }

  async setCodigoEquipoInput(codigoEquipo) {
    await this.codigoEquipoInput.sendKeys(codigoEquipo);
  }

  async getCodigoEquipoInput() {
    return await this.codigoEquipoInput.getAttribute('value');
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

export class ResultadoDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-resultado-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-resultado'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
