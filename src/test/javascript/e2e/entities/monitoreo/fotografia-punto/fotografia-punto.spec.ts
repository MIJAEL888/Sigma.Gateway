/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { FotografiaPuntoComponentsPage, FotografiaPuntoDeleteDialog, FotografiaPuntoUpdatePage } from './fotografia-punto.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('FotografiaPunto e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let fotografiaPuntoUpdatePage: FotografiaPuntoUpdatePage;
  let fotografiaPuntoComponentsPage: FotografiaPuntoComponentsPage;
  let fotografiaPuntoDeleteDialog: FotografiaPuntoDeleteDialog;
  const fileNameToUpload = 'logo-jhipster.png';
  const fileToUpload = '../../../../../../../src/main/webapp/content/images/' + fileNameToUpload;
  const absolutePath = path.resolve(__dirname, fileToUpload);

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load FotografiaPuntos', async () => {
    await navBarPage.goToEntity('fotografia-punto');
    fotografiaPuntoComponentsPage = new FotografiaPuntoComponentsPage();
    await browser.wait(ec.visibilityOf(fotografiaPuntoComponentsPage.title), 5000);
    expect(await fotografiaPuntoComponentsPage.getTitle()).to.eq('gatewayApp.monitoreoFotografiaPunto.home.title');
  });

  it('should load create FotografiaPunto page', async () => {
    await fotografiaPuntoComponentsPage.clickOnCreateButton();
    fotografiaPuntoUpdatePage = new FotografiaPuntoUpdatePage();
    expect(await fotografiaPuntoUpdatePage.getPageTitle()).to.eq('gatewayApp.monitoreoFotografiaPunto.home.createOrEditLabel');
    await fotografiaPuntoUpdatePage.cancel();
  });

  it('should create and save FotografiaPuntos', async () => {
    const nbButtonsBeforeCreate = await fotografiaPuntoComponentsPage.countDeleteButtons();

    await fotografiaPuntoComponentsPage.clickOnCreateButton();
    await promise.all([
      fotografiaPuntoUpdatePage.setNombreInput('nombre'),
      fotografiaPuntoUpdatePage.setRutaInput('ruta'),
      fotografiaPuntoUpdatePage.setExtensionInput('extension'),
      fotografiaPuntoUpdatePage.setFotografiaInput(absolutePath),
      fotografiaPuntoUpdatePage.puntoMonitoreoSelectLastOption()
    ]);
    expect(await fotografiaPuntoUpdatePage.getNombreInput()).to.eq('nombre', 'Expected Nombre value to be equals to nombre');
    expect(await fotografiaPuntoUpdatePage.getRutaInput()).to.eq('ruta', 'Expected Ruta value to be equals to ruta');
    expect(await fotografiaPuntoUpdatePage.getExtensionInput()).to.eq('extension', 'Expected Extension value to be equals to extension');
    expect(await fotografiaPuntoUpdatePage.getFotografiaInput()).to.endsWith(
      fileNameToUpload,
      'Expected Fotografia value to be end with ' + fileNameToUpload
    );
    await fotografiaPuntoUpdatePage.save();
    expect(await fotografiaPuntoUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await fotografiaPuntoComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last FotografiaPunto', async () => {
    const nbButtonsBeforeDelete = await fotografiaPuntoComponentsPage.countDeleteButtons();
    await fotografiaPuntoComponentsPage.clickOnLastDeleteButton();

    fotografiaPuntoDeleteDialog = new FotografiaPuntoDeleteDialog();
    expect(await fotografiaPuntoDeleteDialog.getDialogTitle()).to.eq('gatewayApp.monitoreoFotografiaPunto.delete.question');
    await fotografiaPuntoDeleteDialog.clickOnConfirmButton();

    expect(await fotografiaPuntoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
