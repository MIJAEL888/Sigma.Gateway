/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import {
  ResultadoMetereologiaComponentsPage,
  ResultadoMetereologiaDeleteDialog,
  ResultadoMetereologiaUpdatePage
} from './resultado-metereologia.page-object';

const expect = chai.expect;

describe('ResultadoMetereologia e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let resultadoMetereologiaUpdatePage: ResultadoMetereologiaUpdatePage;
  let resultadoMetereologiaComponentsPage: ResultadoMetereologiaComponentsPage;
  let resultadoMetereologiaDeleteDialog: ResultadoMetereologiaDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load ResultadoMetereologias', async () => {
    await navBarPage.goToEntity('resultado-metereologia');
    resultadoMetereologiaComponentsPage = new ResultadoMetereologiaComponentsPage();
    await browser.wait(ec.visibilityOf(resultadoMetereologiaComponentsPage.title), 5000);
    expect(await resultadoMetereologiaComponentsPage.getTitle()).to.eq('gatewayApp.monitoreoResultadoMetereologia.home.title');
  });

  it('should load create ResultadoMetereologia page', async () => {
    await resultadoMetereologiaComponentsPage.clickOnCreateButton();
    resultadoMetereologiaUpdatePage = new ResultadoMetereologiaUpdatePage();
    expect(await resultadoMetereologiaUpdatePage.getPageTitle()).to.eq('gatewayApp.monitoreoResultadoMetereologia.home.createOrEditLabel');
    await resultadoMetereologiaUpdatePage.cancel();
  });

  it('should create and save ResultadoMetereologias', async () => {
    const nbButtonsBeforeCreate = await resultadoMetereologiaComponentsPage.countDeleteButtons();

    await resultadoMetereologiaComponentsPage.clickOnCreateButton();
    await promise.all([
      resultadoMetereologiaUpdatePage.setFechaInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      resultadoMetereologiaUpdatePage.setValorInput('valor'),
      resultadoMetereologiaUpdatePage.setValorDecimalInput('5'),
      resultadoMetereologiaUpdatePage.resultadoSelectLastOption()
    ]);
    expect(await resultadoMetereologiaUpdatePage.getFechaInput()).to.contain(
      '2001-01-01T02:30',
      'Expected fecha value to be equals to 2000-12-31'
    );
    expect(await resultadoMetereologiaUpdatePage.getValorInput()).to.eq('valor', 'Expected Valor value to be equals to valor');
    expect(await resultadoMetereologiaUpdatePage.getValorDecimalInput()).to.eq('5', 'Expected valorDecimal value to be equals to 5');
    await resultadoMetereologiaUpdatePage.save();
    expect(await resultadoMetereologiaUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await resultadoMetereologiaComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last ResultadoMetereologia', async () => {
    const nbButtonsBeforeDelete = await resultadoMetereologiaComponentsPage.countDeleteButtons();
    await resultadoMetereologiaComponentsPage.clickOnLastDeleteButton();

    resultadoMetereologiaDeleteDialog = new ResultadoMetereologiaDeleteDialog();
    expect(await resultadoMetereologiaDeleteDialog.getDialogTitle()).to.eq('gatewayApp.monitoreoResultadoMetereologia.delete.question');
    await resultadoMetereologiaDeleteDialog.clickOnConfirmButton();

    expect(await resultadoMetereologiaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
