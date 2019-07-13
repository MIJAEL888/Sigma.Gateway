import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class ParamentroComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-paramentro div table .btn-danger'));
  title = element.all(by.css('jhi-paramentro div h2#page-heading span')).first();

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

export class ParamentroUpdatePage {
  pageTitle = element(by.id('jhi-paramentro-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  nombreInput = element(by.id('field_nombre'));
  siglasInput = element(by.id('field_siglas'));
  descripcionInput = element(by.id('field_descripcion'));
  costoInput = element(by.id('field_costo'));
  metodologiaInput = element(by.id('field_metodologia'));
  metodoEnsayoInput = element(by.id('field_metodoEnsayo'));
  limiteCuantificacionInput = element(by.id('field_limiteCuantificacion'));
  tipoComponenteSelect = element(by.id('field_tipoComponente'));
  normaCalidadSelect = element(by.id('field_normaCalidad'));
  puntoMonitoreoSelect = element(by.id('field_puntoMonitoreo'));
  unidadesSelect = element(by.id('field_unidades'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNombreInput(nombre) {
    await this.nombreInput.sendKeys(nombre);
  }

  async getNombreInput() {
    return await this.nombreInput.getAttribute('value');
  }

  async setSiglasInput(siglas) {
    await this.siglasInput.sendKeys(siglas);
  }

  async getSiglasInput() {
    return await this.siglasInput.getAttribute('value');
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

  async setMetodologiaInput(metodologia) {
    await this.metodologiaInput.sendKeys(metodologia);
  }

  async getMetodologiaInput() {
    return await this.metodologiaInput.getAttribute('value');
  }

  async setMetodoEnsayoInput(metodoEnsayo) {
    await this.metodoEnsayoInput.sendKeys(metodoEnsayo);
  }

  async getMetodoEnsayoInput() {
    return await this.metodoEnsayoInput.getAttribute('value');
  }

  async setLimiteCuantificacionInput(limiteCuantificacion) {
    await this.limiteCuantificacionInput.sendKeys(limiteCuantificacion);
  }

  async getLimiteCuantificacionInput() {
    return await this.limiteCuantificacionInput.getAttribute('value');
  }

  async tipoComponenteSelectLastOption(timeout?: number) {
    await this.tipoComponenteSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async tipoComponenteSelectOption(option) {
    await this.tipoComponenteSelect.sendKeys(option);
  }

  getTipoComponenteSelect(): ElementFinder {
    return this.tipoComponenteSelect;
  }

  async getTipoComponenteSelectedOption() {
    return await this.tipoComponenteSelect.element(by.css('option:checked')).getText();
  }

  async normaCalidadSelectLastOption(timeout?: number) {
    await this.normaCalidadSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async normaCalidadSelectOption(option) {
    await this.normaCalidadSelect.sendKeys(option);
  }

  getNormaCalidadSelect(): ElementFinder {
    return this.normaCalidadSelect;
  }

  async getNormaCalidadSelectedOption() {
    return await this.normaCalidadSelect.element(by.css('option:checked')).getText();
  }

  async puntoMonitoreoSelectLastOption(timeout?: number) {
    await this.puntoMonitoreoSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async puntoMonitoreoSelectOption(option) {
    await this.puntoMonitoreoSelect.sendKeys(option);
  }

  getPuntoMonitoreoSelect(): ElementFinder {
    return this.puntoMonitoreoSelect;
  }

  async getPuntoMonitoreoSelectedOption() {
    return await this.puntoMonitoreoSelect.element(by.css('option:checked')).getText();
  }

  async unidadesSelectLastOption(timeout?: number) {
    await this.unidadesSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async unidadesSelectOption(option) {
    await this.unidadesSelect.sendKeys(option);
  }

  getUnidadesSelect(): ElementFinder {
    return this.unidadesSelect;
  }

  async getUnidadesSelectedOption() {
    return await this.unidadesSelect.element(by.css('option:checked')).getText();
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

export class ParamentroDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-paramentro-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-paramentro'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
