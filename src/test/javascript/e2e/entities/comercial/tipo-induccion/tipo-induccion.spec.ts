/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { TipoInduccionComponentsPage, TipoInduccionDeleteDialog, TipoInduccionUpdatePage } from './tipo-induccion.page-object';

const expect = chai.expect;

describe('TipoInduccion e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let tipoInduccionUpdatePage: TipoInduccionUpdatePage;
  let tipoInduccionComponentsPage: TipoInduccionComponentsPage;
  let tipoInduccionDeleteDialog: TipoInduccionDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load TipoInduccions', async () => {
    await navBarPage.goToEntity('tipo-induccion');
    tipoInduccionComponentsPage = new TipoInduccionComponentsPage();
    await browser.wait(ec.visibilityOf(tipoInduccionComponentsPage.title), 5000);
    expect(await tipoInduccionComponentsPage.getTitle()).to.eq('gatewayApp.comercialTipoInduccion.home.title');
  });

  it('should load create TipoInduccion page', async () => {
    await tipoInduccionComponentsPage.clickOnCreateButton();
    tipoInduccionUpdatePage = new TipoInduccionUpdatePage();
    expect(await tipoInduccionUpdatePage.getPageTitle()).to.eq('gatewayApp.comercialTipoInduccion.home.createOrEditLabel');
    await tipoInduccionUpdatePage.cancel();
  });

  it('should create and save TipoInduccions', async () => {
    const nbButtonsBeforeCreate = await tipoInduccionComponentsPage.countDeleteButtons();

    await tipoInduccionComponentsPage.clickOnCreateButton();
    await promise.all([tipoInduccionUpdatePage.setNombreInput('nombre'), tipoInduccionUpdatePage.setDescripcionInput('descripcion')]);
    expect(await tipoInduccionUpdatePage.getNombreInput()).to.eq('nombre', 'Expected Nombre value to be equals to nombre');
    expect(await tipoInduccionUpdatePage.getDescripcionInput()).to.eq(
      'descripcion',
      'Expected Descripcion value to be equals to descripcion'
    );
    await tipoInduccionUpdatePage.save();
    expect(await tipoInduccionUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await tipoInduccionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last TipoInduccion', async () => {
    const nbButtonsBeforeDelete = await tipoInduccionComponentsPage.countDeleteButtons();
    await tipoInduccionComponentsPage.clickOnLastDeleteButton();

    tipoInduccionDeleteDialog = new TipoInduccionDeleteDialog();
    expect(await tipoInduccionDeleteDialog.getDialogTitle()).to.eq('gatewayApp.comercialTipoInduccion.delete.question');
    await tipoInduccionDeleteDialog.clickOnConfirmButton();

    expect(await tipoInduccionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
