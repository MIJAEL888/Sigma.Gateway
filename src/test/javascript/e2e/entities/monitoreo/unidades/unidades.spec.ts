/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { UnidadesComponentsPage, UnidadesDeleteDialog, UnidadesUpdatePage } from './unidades.page-object';

const expect = chai.expect;

describe('Unidades e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let unidadesUpdatePage: UnidadesUpdatePage;
  let unidadesComponentsPage: UnidadesComponentsPage;
  let unidadesDeleteDialog: UnidadesDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Unidades', async () => {
    await navBarPage.goToEntity('unidades');
    unidadesComponentsPage = new UnidadesComponentsPage();
    await browser.wait(ec.visibilityOf(unidadesComponentsPage.title), 5000);
    expect(await unidadesComponentsPage.getTitle()).to.eq('gatewayApp.monitoreoUnidades.home.title');
  });

  it('should load create Unidades page', async () => {
    await unidadesComponentsPage.clickOnCreateButton();
    unidadesUpdatePage = new UnidadesUpdatePage();
    expect(await unidadesUpdatePage.getPageTitle()).to.eq('gatewayApp.monitoreoUnidades.home.createOrEditLabel');
    await unidadesUpdatePage.cancel();
  });

  it('should create and save Unidades', async () => {
    const nbButtonsBeforeCreate = await unidadesComponentsPage.countDeleteButtons();

    await unidadesComponentsPage.clickOnCreateButton();
    await promise.all([
      unidadesUpdatePage.setNombreInput('nombre'),
      unidadesUpdatePage.setCodigoInput('codigo'),
      unidadesUpdatePage.setDescripcionInput('descripcion')
    ]);
    expect(await unidadesUpdatePage.getNombreInput()).to.eq('nombre', 'Expected Nombre value to be equals to nombre');
    expect(await unidadesUpdatePage.getCodigoInput()).to.eq('codigo', 'Expected Codigo value to be equals to codigo');
    expect(await unidadesUpdatePage.getDescripcionInput()).to.eq('descripcion', 'Expected Descripcion value to be equals to descripcion');
    await unidadesUpdatePage.save();
    expect(await unidadesUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await unidadesComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Unidades', async () => {
    const nbButtonsBeforeDelete = await unidadesComponentsPage.countDeleteButtons();
    await unidadesComponentsPage.clickOnLastDeleteButton();

    unidadesDeleteDialog = new UnidadesDeleteDialog();
    expect(await unidadesDeleteDialog.getDialogTitle()).to.eq('gatewayApp.monitoreoUnidades.delete.question');
    await unidadesDeleteDialog.clickOnConfirmButton();

    expect(await unidadesComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
