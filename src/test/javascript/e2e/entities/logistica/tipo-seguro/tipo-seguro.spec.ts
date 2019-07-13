/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { TipoSeguroComponentsPage, TipoSeguroDeleteDialog, TipoSeguroUpdatePage } from './tipo-seguro.page-object';

const expect = chai.expect;

describe('TipoSeguro e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let tipoSeguroUpdatePage: TipoSeguroUpdatePage;
  let tipoSeguroComponentsPage: TipoSeguroComponentsPage;
  let tipoSeguroDeleteDialog: TipoSeguroDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load TipoSeguros', async () => {
    await navBarPage.goToEntity('tipo-seguro');
    tipoSeguroComponentsPage = new TipoSeguroComponentsPage();
    await browser.wait(ec.visibilityOf(tipoSeguroComponentsPage.title), 5000);
    expect(await tipoSeguroComponentsPage.getTitle()).to.eq('gatewayApp.logisticaTipoSeguro.home.title');
  });

  it('should load create TipoSeguro page', async () => {
    await tipoSeguroComponentsPage.clickOnCreateButton();
    tipoSeguroUpdatePage = new TipoSeguroUpdatePage();
    expect(await tipoSeguroUpdatePage.getPageTitle()).to.eq('gatewayApp.logisticaTipoSeguro.home.createOrEditLabel');
    await tipoSeguroUpdatePage.cancel();
  });

  it('should create and save TipoSeguros', async () => {
    const nbButtonsBeforeCreate = await tipoSeguroComponentsPage.countDeleteButtons();

    await tipoSeguroComponentsPage.clickOnCreateButton();
    await promise.all([
      tipoSeguroUpdatePage.setNombreInput('nombre'),
      tipoSeguroUpdatePage.setDescripcionInput('descripcion'),
      tipoSeguroUpdatePage.setFechaCaudicidadInput('2000-12-31'),
      tipoSeguroUpdatePage.setCodigoTipoSeguroInput('5')
    ]);
    expect(await tipoSeguroUpdatePage.getNombreInput()).to.eq('nombre', 'Expected Nombre value to be equals to nombre');
    expect(await tipoSeguroUpdatePage.getDescripcionInput()).to.eq('descripcion', 'Expected Descripcion value to be equals to descripcion');
    expect(await tipoSeguroUpdatePage.getFechaCaudicidadInput()).to.eq(
      '2000-12-31',
      'Expected fechaCaudicidad value to be equals to 2000-12-31'
    );
    expect(await tipoSeguroUpdatePage.getCodigoTipoSeguroInput()).to.eq('5', 'Expected codigoTipoSeguro value to be equals to 5');
    await tipoSeguroUpdatePage.save();
    expect(await tipoSeguroUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await tipoSeguroComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last TipoSeguro', async () => {
    const nbButtonsBeforeDelete = await tipoSeguroComponentsPage.countDeleteButtons();
    await tipoSeguroComponentsPage.clickOnLastDeleteButton();

    tipoSeguroDeleteDialog = new TipoSeguroDeleteDialog();
    expect(await tipoSeguroDeleteDialog.getDialogTitle()).to.eq('gatewayApp.logisticaTipoSeguro.delete.question');
    await tipoSeguroDeleteDialog.clickOnConfirmButton();

    expect(await tipoSeguroComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
