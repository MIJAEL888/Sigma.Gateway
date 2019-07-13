/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import {
  ResultadoEmisionesComponentsPage,
  ResultadoEmisionesDeleteDialog,
  ResultadoEmisionesUpdatePage
} from './resultado-emisiones.page-object';

const expect = chai.expect;

describe('ResultadoEmisiones e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let resultadoEmisionesUpdatePage: ResultadoEmisionesUpdatePage;
  let resultadoEmisionesComponentsPage: ResultadoEmisionesComponentsPage;
  let resultadoEmisionesDeleteDialog: ResultadoEmisionesDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load ResultadoEmisiones', async () => {
    await navBarPage.goToEntity('resultado-emisiones');
    resultadoEmisionesComponentsPage = new ResultadoEmisionesComponentsPage();
    await browser.wait(ec.visibilityOf(resultadoEmisionesComponentsPage.title), 5000);
    expect(await resultadoEmisionesComponentsPage.getTitle()).to.eq('gatewayApp.monitoreoResultadoEmisiones.home.title');
  });

  it('should load create ResultadoEmisiones page', async () => {
    await resultadoEmisionesComponentsPage.clickOnCreateButton();
    resultadoEmisionesUpdatePage = new ResultadoEmisionesUpdatePage();
    expect(await resultadoEmisionesUpdatePage.getPageTitle()).to.eq('gatewayApp.monitoreoResultadoEmisiones.home.createOrEditLabel');
    await resultadoEmisionesUpdatePage.cancel();
  });

  it('should create and save ResultadoEmisiones', async () => {
    const nbButtonsBeforeCreate = await resultadoEmisionesComponentsPage.countDeleteButtons();

    await resultadoEmisionesComponentsPage.clickOnCreateButton();
    await promise.all([
      resultadoEmisionesUpdatePage.setTipoEquipoInput('tipoEquipo'),
      resultadoEmisionesUpdatePage.setCombustibleInput('combustible'),
      resultadoEmisionesUpdatePage.setConsumoInput('5'),
      resultadoEmisionesUpdatePage.setHoraPorMesInput('5'),
      resultadoEmisionesUpdatePage.setAlturaInput('5'),
      resultadoEmisionesUpdatePage.setDiametroInput('5'),
      resultadoEmisionesUpdatePage.setSeccionInput('seccion'),
      resultadoEmisionesUpdatePage.resultadoSelectLastOption()
    ]);
    expect(await resultadoEmisionesUpdatePage.getTipoEquipoInput()).to.eq(
      'tipoEquipo',
      'Expected TipoEquipo value to be equals to tipoEquipo'
    );
    expect(await resultadoEmisionesUpdatePage.getCombustibleInput()).to.eq(
      'combustible',
      'Expected Combustible value to be equals to combustible'
    );
    expect(await resultadoEmisionesUpdatePage.getConsumoInput()).to.eq('5', 'Expected consumo value to be equals to 5');
    expect(await resultadoEmisionesUpdatePage.getHoraPorMesInput()).to.eq('5', 'Expected horaPorMes value to be equals to 5');
    expect(await resultadoEmisionesUpdatePage.getAlturaInput()).to.eq('5', 'Expected altura value to be equals to 5');
    expect(await resultadoEmisionesUpdatePage.getDiametroInput()).to.eq('5', 'Expected diametro value to be equals to 5');
    expect(await resultadoEmisionesUpdatePage.getSeccionInput()).to.eq('seccion', 'Expected Seccion value to be equals to seccion');
    await resultadoEmisionesUpdatePage.save();
    expect(await resultadoEmisionesUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await resultadoEmisionesComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last ResultadoEmisiones', async () => {
    const nbButtonsBeforeDelete = await resultadoEmisionesComponentsPage.countDeleteButtons();
    await resultadoEmisionesComponentsPage.clickOnLastDeleteButton();

    resultadoEmisionesDeleteDialog = new ResultadoEmisionesDeleteDialog();
    expect(await resultadoEmisionesDeleteDialog.getDialogTitle()).to.eq('gatewayApp.monitoreoResultadoEmisiones.delete.question');
    await resultadoEmisionesDeleteDialog.clickOnConfirmButton();

    expect(await resultadoEmisionesComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
