/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import {
  FotografiaMonitoreoComponentsPage,
  FotografiaMonitoreoDeleteDialog,
  FotografiaMonitoreoUpdatePage
} from './fotografia-monitoreo.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('FotografiaMonitoreo e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let fotografiaMonitoreoUpdatePage: FotografiaMonitoreoUpdatePage;
  let fotografiaMonitoreoComponentsPage: FotografiaMonitoreoComponentsPage;
  let fotografiaMonitoreoDeleteDialog: FotografiaMonitoreoDeleteDialog;
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

  it('should load FotografiaMonitoreos', async () => {
    await navBarPage.goToEntity('fotografia-monitoreo');
    fotografiaMonitoreoComponentsPage = new FotografiaMonitoreoComponentsPage();
    await browser.wait(ec.visibilityOf(fotografiaMonitoreoComponentsPage.title), 5000);
    expect(await fotografiaMonitoreoComponentsPage.getTitle()).to.eq('gatewayApp.monitoreoFotografiaMonitoreo.home.title');
  });

  it('should load create FotografiaMonitoreo page', async () => {
    await fotografiaMonitoreoComponentsPage.clickOnCreateButton();
    fotografiaMonitoreoUpdatePage = new FotografiaMonitoreoUpdatePage();
    expect(await fotografiaMonitoreoUpdatePage.getPageTitle()).to.eq('gatewayApp.monitoreoFotografiaMonitoreo.home.createOrEditLabel');
    await fotografiaMonitoreoUpdatePage.cancel();
  });

  it('should create and save FotografiaMonitoreos', async () => {
    const nbButtonsBeforeCreate = await fotografiaMonitoreoComponentsPage.countDeleteButtons();

    await fotografiaMonitoreoComponentsPage.clickOnCreateButton();
    await promise.all([
      fotografiaMonitoreoUpdatePage.setNombreInput('nombre'),
      fotografiaMonitoreoUpdatePage.setRutaInput('ruta'),
      fotografiaMonitoreoUpdatePage.setExtensionInput('extension'),
      fotografiaMonitoreoUpdatePage.setFotografiaInput(absolutePath),
      fotografiaMonitoreoUpdatePage.puntoMonitoreoObsSelectLastOption()
    ]);
    expect(await fotografiaMonitoreoUpdatePage.getNombreInput()).to.eq('nombre', 'Expected Nombre value to be equals to nombre');
    expect(await fotografiaMonitoreoUpdatePage.getRutaInput()).to.eq('ruta', 'Expected Ruta value to be equals to ruta');
    expect(await fotografiaMonitoreoUpdatePage.getExtensionInput()).to.eq(
      'extension',
      'Expected Extension value to be equals to extension'
    );
    expect(await fotografiaMonitoreoUpdatePage.getFotografiaInput()).to.endsWith(
      fileNameToUpload,
      'Expected Fotografia value to be end with ' + fileNameToUpload
    );
    await fotografiaMonitoreoUpdatePage.save();
    expect(await fotografiaMonitoreoUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await fotografiaMonitoreoComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last FotografiaMonitoreo', async () => {
    const nbButtonsBeforeDelete = await fotografiaMonitoreoComponentsPage.countDeleteButtons();
    await fotografiaMonitoreoComponentsPage.clickOnLastDeleteButton();

    fotografiaMonitoreoDeleteDialog = new FotografiaMonitoreoDeleteDialog();
    expect(await fotografiaMonitoreoDeleteDialog.getDialogTitle()).to.eq('gatewayApp.monitoreoFotografiaMonitoreo.delete.question');
    await fotografiaMonitoreoDeleteDialog.clickOnConfirmButton();

    expect(await fotografiaMonitoreoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
