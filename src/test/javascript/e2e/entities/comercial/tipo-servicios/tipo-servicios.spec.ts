/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { TipoServiciosComponentsPage, TipoServiciosDeleteDialog, TipoServiciosUpdatePage } from './tipo-servicios.page-object';

const expect = chai.expect;

describe('TipoServicios e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let tipoServiciosUpdatePage: TipoServiciosUpdatePage;
  let tipoServiciosComponentsPage: TipoServiciosComponentsPage;
  let tipoServiciosDeleteDialog: TipoServiciosDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load TipoServicios', async () => {
    await navBarPage.goToEntity('tipo-servicios');
    tipoServiciosComponentsPage = new TipoServiciosComponentsPage();
    await browser.wait(ec.visibilityOf(tipoServiciosComponentsPage.title), 5000);
    expect(await tipoServiciosComponentsPage.getTitle()).to.eq('gatewayApp.comercialTipoServicios.home.title');
  });

  it('should load create TipoServicios page', async () => {
    await tipoServiciosComponentsPage.clickOnCreateButton();
    tipoServiciosUpdatePage = new TipoServiciosUpdatePage();
    expect(await tipoServiciosUpdatePage.getPageTitle()).to.eq('gatewayApp.comercialTipoServicios.home.createOrEditLabel');
    await tipoServiciosUpdatePage.cancel();
  });

  it('should create and save TipoServicios', async () => {
    const nbButtonsBeforeCreate = await tipoServiciosComponentsPage.countDeleteButtons();

    await tipoServiciosComponentsPage.clickOnCreateButton();
    await promise.all([tipoServiciosUpdatePage.setNombreInput('nombre'), tipoServiciosUpdatePage.setDescripcionInput('descripcion')]);
    expect(await tipoServiciosUpdatePage.getNombreInput()).to.eq('nombre', 'Expected Nombre value to be equals to nombre');
    expect(await tipoServiciosUpdatePage.getDescripcionInput()).to.eq(
      'descripcion',
      'Expected Descripcion value to be equals to descripcion'
    );
    await tipoServiciosUpdatePage.save();
    expect(await tipoServiciosUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await tipoServiciosComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last TipoServicios', async () => {
    const nbButtonsBeforeDelete = await tipoServiciosComponentsPage.countDeleteButtons();
    await tipoServiciosComponentsPage.clickOnLastDeleteButton();

    tipoServiciosDeleteDialog = new TipoServiciosDeleteDialog();
    expect(await tipoServiciosDeleteDialog.getDialogTitle()).to.eq('gatewayApp.comercialTipoServicios.delete.question');
    await tipoServiciosDeleteDialog.clickOnConfirmButton();

    expect(await tipoServiciosComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
