/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { ProvinciaComponentsPage, ProvinciaDeleteDialog, ProvinciaUpdatePage } from './provincia.page-object';

const expect = chai.expect;

describe('Provincia e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let provinciaUpdatePage: ProvinciaUpdatePage;
  let provinciaComponentsPage: ProvinciaComponentsPage;
  let provinciaDeleteDialog: ProvinciaDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Provincias', async () => {
    await navBarPage.goToEntity('provincia');
    provinciaComponentsPage = new ProvinciaComponentsPage();
    await browser.wait(ec.visibilityOf(provinciaComponentsPage.title), 5000);
    expect(await provinciaComponentsPage.getTitle()).to.eq('gatewayApp.comercialProvincia.home.title');
  });

  it('should load create Provincia page', async () => {
    await provinciaComponentsPage.clickOnCreateButton();
    provinciaUpdatePage = new ProvinciaUpdatePage();
    expect(await provinciaUpdatePage.getPageTitle()).to.eq('gatewayApp.comercialProvincia.home.createOrEditLabel');
    await provinciaUpdatePage.cancel();
  });

  it('should create and save Provincias', async () => {
    const nbButtonsBeforeCreate = await provinciaComponentsPage.countDeleteButtons();

    await provinciaComponentsPage.clickOnCreateButton();
    await promise.all([
      provinciaUpdatePage.setNombreInput('nombre'),
      provinciaUpdatePage.setUbigeoInput('ubigeo'),
      provinciaUpdatePage.setDescripcionInput('descripcion'),
      provinciaUpdatePage.departamentoSelectLastOption()
    ]);
    expect(await provinciaUpdatePage.getNombreInput()).to.eq('nombre', 'Expected Nombre value to be equals to nombre');
    expect(await provinciaUpdatePage.getUbigeoInput()).to.eq('ubigeo', 'Expected Ubigeo value to be equals to ubigeo');
    expect(await provinciaUpdatePage.getDescripcionInput()).to.eq('descripcion', 'Expected Descripcion value to be equals to descripcion');
    await provinciaUpdatePage.save();
    expect(await provinciaUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await provinciaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Provincia', async () => {
    const nbButtonsBeforeDelete = await provinciaComponentsPage.countDeleteButtons();
    await provinciaComponentsPage.clickOnLastDeleteButton();

    provinciaDeleteDialog = new ProvinciaDeleteDialog();
    expect(await provinciaDeleteDialog.getDialogTitle()).to.eq('gatewayApp.comercialProvincia.delete.question');
    await provinciaDeleteDialog.clickOnConfirmButton();

    expect(await provinciaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
