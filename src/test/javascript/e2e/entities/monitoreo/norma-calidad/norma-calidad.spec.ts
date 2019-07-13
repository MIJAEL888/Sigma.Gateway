/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { NormaCalidadComponentsPage, NormaCalidadDeleteDialog, NormaCalidadUpdatePage } from './norma-calidad.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('NormaCalidad e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let normaCalidadUpdatePage: NormaCalidadUpdatePage;
  let normaCalidadComponentsPage: NormaCalidadComponentsPage;
  let normaCalidadDeleteDialog: NormaCalidadDeleteDialog;
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

  it('should load NormaCalidads', async () => {
    await navBarPage.goToEntity('norma-calidad');
    normaCalidadComponentsPage = new NormaCalidadComponentsPage();
    await browser.wait(ec.visibilityOf(normaCalidadComponentsPage.title), 5000);
    expect(await normaCalidadComponentsPage.getTitle()).to.eq('gatewayApp.monitoreoNormaCalidad.home.title');
  });

  it('should load create NormaCalidad page', async () => {
    await normaCalidadComponentsPage.clickOnCreateButton();
    normaCalidadUpdatePage = new NormaCalidadUpdatePage();
    expect(await normaCalidadUpdatePage.getPageTitle()).to.eq('gatewayApp.monitoreoNormaCalidad.home.createOrEditLabel');
    await normaCalidadUpdatePage.cancel();
  });

  it('should create and save NormaCalidads', async () => {
    const nbButtonsBeforeCreate = await normaCalidadComponentsPage.countDeleteButtons();

    await normaCalidadComponentsPage.clickOnCreateButton();
    await promise.all([
      normaCalidadUpdatePage.setNombreInput('nombre'),
      normaCalidadUpdatePage.setCodigoInput('codigo'),
      normaCalidadUpdatePage.setFechaPublicacionInput('2000-12-31'),
      normaCalidadUpdatePage.tipoSelectLastOption(),
      normaCalidadUpdatePage.setFuenteInput('fuente'),
      normaCalidadUpdatePage.setRutaDocNormaInput('rutaDocNorma'),
      normaCalidadUpdatePage.setNombreDocNormaInput('nombreDocNorma'),
      normaCalidadUpdatePage.setDocumentoNormaInput(absolutePath)
    ]);
    expect(await normaCalidadUpdatePage.getNombreInput()).to.eq('nombre', 'Expected Nombre value to be equals to nombre');
    expect(await normaCalidadUpdatePage.getCodigoInput()).to.eq('codigo', 'Expected Codigo value to be equals to codigo');
    expect(await normaCalidadUpdatePage.getFechaPublicacionInput()).to.eq(
      '2000-12-31',
      'Expected fechaPublicacion value to be equals to 2000-12-31'
    );
    expect(await normaCalidadUpdatePage.getFuenteInput()).to.eq('fuente', 'Expected Fuente value to be equals to fuente');
    expect(await normaCalidadUpdatePage.getRutaDocNormaInput()).to.eq(
      'rutaDocNorma',
      'Expected RutaDocNorma value to be equals to rutaDocNorma'
    );
    expect(await normaCalidadUpdatePage.getNombreDocNormaInput()).to.eq(
      'nombreDocNorma',
      'Expected NombreDocNorma value to be equals to nombreDocNorma'
    );
    expect(await normaCalidadUpdatePage.getDocumentoNormaInput()).to.endsWith(
      fileNameToUpload,
      'Expected DocumentoNorma value to be end with ' + fileNameToUpload
    );
    await normaCalidadUpdatePage.save();
    expect(await normaCalidadUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await normaCalidadComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last NormaCalidad', async () => {
    const nbButtonsBeforeDelete = await normaCalidadComponentsPage.countDeleteButtons();
    await normaCalidadComponentsPage.clickOnLastDeleteButton();

    normaCalidadDeleteDialog = new NormaCalidadDeleteDialog();
    expect(await normaCalidadDeleteDialog.getDialogTitle()).to.eq('gatewayApp.monitoreoNormaCalidad.delete.question');
    await normaCalidadDeleteDialog.clickOnConfirmButton();

    expect(await normaCalidadComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
