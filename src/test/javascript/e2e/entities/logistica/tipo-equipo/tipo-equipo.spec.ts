/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { TipoEquipoComponentsPage, TipoEquipoDeleteDialog, TipoEquipoUpdatePage } from './tipo-equipo.page-object';

const expect = chai.expect;

describe('TipoEquipo e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let tipoEquipoUpdatePage: TipoEquipoUpdatePage;
  let tipoEquipoComponentsPage: TipoEquipoComponentsPage;
  let tipoEquipoDeleteDialog: TipoEquipoDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load TipoEquipos', async () => {
    await navBarPage.goToEntity('tipo-equipo');
    tipoEquipoComponentsPage = new TipoEquipoComponentsPage();
    await browser.wait(ec.visibilityOf(tipoEquipoComponentsPage.title), 5000);
    expect(await tipoEquipoComponentsPage.getTitle()).to.eq('gatewayApp.logisticaTipoEquipo.home.title');
  });

  it('should load create TipoEquipo page', async () => {
    await tipoEquipoComponentsPage.clickOnCreateButton();
    tipoEquipoUpdatePage = new TipoEquipoUpdatePage();
    expect(await tipoEquipoUpdatePage.getPageTitle()).to.eq('gatewayApp.logisticaTipoEquipo.home.createOrEditLabel');
    await tipoEquipoUpdatePage.cancel();
  });

  it('should create and save TipoEquipos', async () => {
    const nbButtonsBeforeCreate = await tipoEquipoComponentsPage.countDeleteButtons();

    await tipoEquipoComponentsPage.clickOnCreateButton();
    await promise.all([
      tipoEquipoUpdatePage.setNombreInput('nombre'),
      tipoEquipoUpdatePage.setCodigoInput('codigo'),
      tipoEquipoUpdatePage.setDescripcionInput('descripcion')
    ]);
    expect(await tipoEquipoUpdatePage.getNombreInput()).to.eq('nombre', 'Expected Nombre value to be equals to nombre');
    expect(await tipoEquipoUpdatePage.getCodigoInput()).to.eq('codigo', 'Expected Codigo value to be equals to codigo');
    expect(await tipoEquipoUpdatePage.getDescripcionInput()).to.eq('descripcion', 'Expected Descripcion value to be equals to descripcion');
    await tipoEquipoUpdatePage.save();
    expect(await tipoEquipoUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await tipoEquipoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last TipoEquipo', async () => {
    const nbButtonsBeforeDelete = await tipoEquipoComponentsPage.countDeleteButtons();
    await tipoEquipoComponentsPage.clickOnLastDeleteButton();

    tipoEquipoDeleteDialog = new TipoEquipoDeleteDialog();
    expect(await tipoEquipoDeleteDialog.getDialogTitle()).to.eq('gatewayApp.logisticaTipoEquipo.delete.question');
    await tipoEquipoDeleteDialog.clickOnConfirmButton();

    expect(await tipoEquipoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
