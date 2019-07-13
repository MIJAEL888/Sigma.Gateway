/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { ResultadoComponentsPage, ResultadoDeleteDialog, ResultadoUpdatePage } from './resultado.page-object';

const expect = chai.expect;

describe('Resultado e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let resultadoUpdatePage: ResultadoUpdatePage;
  let resultadoComponentsPage: ResultadoComponentsPage;
  let resultadoDeleteDialog: ResultadoDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Resultados', async () => {
    await navBarPage.goToEntity('resultado');
    resultadoComponentsPage = new ResultadoComponentsPage();
    await browser.wait(ec.visibilityOf(resultadoComponentsPage.title), 5000);
    expect(await resultadoComponentsPage.getTitle()).to.eq('gatewayApp.monitoreoResultado.home.title');
  });

  it('should load create Resultado page', async () => {
    await resultadoComponentsPage.clickOnCreateButton();
    resultadoUpdatePage = new ResultadoUpdatePage();
    expect(await resultadoUpdatePage.getPageTitle()).to.eq('gatewayApp.monitoreoResultado.home.createOrEditLabel');
    await resultadoUpdatePage.cancel();
  });

  it('should create and save Resultados', async () => {
    const nbButtonsBeforeCreate = await resultadoComponentsPage.countDeleteButtons();

    await resultadoComponentsPage.clickOnCreateButton();
    await promise.all([
      resultadoUpdatePage.setFechaInicioInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      resultadoUpdatePage.setFehcaFinInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      resultadoUpdatePage.setValorMinimoInput('valorMinimo'),
      resultadoUpdatePage.setValorMaximoInput('valorMaximo'),
      resultadoUpdatePage.setValorFinalInput('valorFinal'),
      resultadoUpdatePage.setValorFinalNumInput('5'),
      resultadoUpdatePage.setCodigoLaboratorioInput('codigoLaboratorio'),
      resultadoUpdatePage.setCodigoEquipoInput('codigoEquipo')
    ]);
    expect(await resultadoUpdatePage.getFechaInicioInput()).to.contain(
      '2001-01-01T02:30',
      'Expected fechaInicio value to be equals to 2000-12-31'
    );
    expect(await resultadoUpdatePage.getFehcaFinInput()).to.contain(
      '2001-01-01T02:30',
      'Expected fehcaFin value to be equals to 2000-12-31'
    );
    expect(await resultadoUpdatePage.getValorMinimoInput()).to.eq('valorMinimo', 'Expected ValorMinimo value to be equals to valorMinimo');
    expect(await resultadoUpdatePage.getValorMaximoInput()).to.eq('valorMaximo', 'Expected ValorMaximo value to be equals to valorMaximo');
    expect(await resultadoUpdatePage.getValorFinalInput()).to.eq('valorFinal', 'Expected ValorFinal value to be equals to valorFinal');
    expect(await resultadoUpdatePage.getValorFinalNumInput()).to.eq('5', 'Expected valorFinalNum value to be equals to 5');
    expect(await resultadoUpdatePage.getCodigoLaboratorioInput()).to.eq(
      'codigoLaboratorio',
      'Expected CodigoLaboratorio value to be equals to codigoLaboratorio'
    );
    expect(await resultadoUpdatePage.getCodigoEquipoInput()).to.eq(
      'codigoEquipo',
      'Expected CodigoEquipo value to be equals to codigoEquipo'
    );
    await resultadoUpdatePage.save();
    expect(await resultadoUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await resultadoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Resultado', async () => {
    const nbButtonsBeforeDelete = await resultadoComponentsPage.countDeleteButtons();
    await resultadoComponentsPage.clickOnLastDeleteButton();

    resultadoDeleteDialog = new ResultadoDeleteDialog();
    expect(await resultadoDeleteDialog.getDialogTitle()).to.eq('gatewayApp.monitoreoResultado.delete.question');
    await resultadoDeleteDialog.clickOnConfirmButton();

    expect(await resultadoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
