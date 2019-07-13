import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class ResultadoEmisionesComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-resultado-emisiones div table .btn-danger'));
  title = element.all(by.css('jhi-resultado-emisiones div h2#page-heading span')).first();

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

export class ResultadoEmisionesUpdatePage {
  pageTitle = element(by.id('jhi-resultado-emisiones-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  tipoEquipoInput = element(by.id('field_tipoEquipo'));
  combustibleInput = element(by.id('field_combustible'));
  consumoInput = element(by.id('field_consumo'));
  horaPorMesInput = element(by.id('field_horaPorMes'));
  alturaInput = element(by.id('field_altura'));
  diametroInput = element(by.id('field_diametro'));
  seccionInput = element(by.id('field_seccion'));
  resultadoSelect = element(by.id('field_resultado'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setTipoEquipoInput(tipoEquipo) {
    await this.tipoEquipoInput.sendKeys(tipoEquipo);
  }

  async getTipoEquipoInput() {
    return await this.tipoEquipoInput.getAttribute('value');
  }

  async setCombustibleInput(combustible) {
    await this.combustibleInput.sendKeys(combustible);
  }

  async getCombustibleInput() {
    return await this.combustibleInput.getAttribute('value');
  }

  async setConsumoInput(consumo) {
    await this.consumoInput.sendKeys(consumo);
  }

  async getConsumoInput() {
    return await this.consumoInput.getAttribute('value');
  }

  async setHoraPorMesInput(horaPorMes) {
    await this.horaPorMesInput.sendKeys(horaPorMes);
  }

  async getHoraPorMesInput() {
    return await this.horaPorMesInput.getAttribute('value');
  }

  async setAlturaInput(altura) {
    await this.alturaInput.sendKeys(altura);
  }

  async getAlturaInput() {
    return await this.alturaInput.getAttribute('value');
  }

  async setDiametroInput(diametro) {
    await this.diametroInput.sendKeys(diametro);
  }

  async getDiametroInput() {
    return await this.diametroInput.getAttribute('value');
  }

  async setSeccionInput(seccion) {
    await this.seccionInput.sendKeys(seccion);
  }

  async getSeccionInput() {
    return await this.seccionInput.getAttribute('value');
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

export class ResultadoEmisionesDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-resultadoEmisiones-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-resultadoEmisiones'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
