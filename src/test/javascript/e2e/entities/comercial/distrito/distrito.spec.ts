/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { DistritoComponentsPage, DistritoDeleteDialog, DistritoUpdatePage } from './distrito.page-object';

const expect = chai.expect;

describe('Distrito e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let distritoUpdatePage: DistritoUpdatePage;
  let distritoComponentsPage: DistritoComponentsPage;
  let distritoDeleteDialog: DistritoDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Distritos', async () => {
    await navBarPage.goToEntity('distrito');
    distritoComponentsPage = new DistritoComponentsPage();
    await browser.wait(ec.visibilityOf(distritoComponentsPage.title), 5000);
    expect(await distritoComponentsPage.getTitle()).to.eq('gatewayApp.comercialDistrito.home.title');
  });

  it('should load create Distrito page', async () => {
    await distritoComponentsPage.clickOnCreateButton();
    distritoUpdatePage = new DistritoUpdatePage();
    expect(await distritoUpdatePage.getPageTitle()).to.eq('gatewayApp.comercialDistrito.home.createOrEditLabel');
    await distritoUpdatePage.cancel();
  });

  it('should create and save Distritos', async () => {
    const nbButtonsBeforeCreate = await distritoComponentsPage.countDeleteButtons();

    await distritoComponentsPage.clickOnCreateButton();
    await promise.all([
      distritoUpdatePage.setNombreInput('nombre'),
      distritoUpdatePage.setUbigeoInput('ubigeo'),
      distritoUpdatePage.setDescripcionInput('descripcion'),
      distritoUpdatePage.provinciaSelectLastOption()
    ]);
    expect(await distritoUpdatePage.getNombreInput()).to.eq('nombre', 'Expected Nombre value to be equals to nombre');
    expect(await distritoUpdatePage.getUbigeoInput()).to.eq('ubigeo', 'Expected Ubigeo value to be equals to ubigeo');
    expect(await distritoUpdatePage.getDescripcionInput()).to.eq('descripcion', 'Expected Descripcion value to be equals to descripcion');
    await distritoUpdatePage.save();
    expect(await distritoUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await distritoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Distrito', async () => {
    const nbButtonsBeforeDelete = await distritoComponentsPage.countDeleteButtons();
    await distritoComponentsPage.clickOnLastDeleteButton();

    distritoDeleteDialog = new DistritoDeleteDialog();
    expect(await distritoDeleteDialog.getDialogTitle()).to.eq('gatewayApp.comercialDistrito.delete.question');
    await distritoDeleteDialog.clickOnConfirmButton();

    expect(await distritoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
