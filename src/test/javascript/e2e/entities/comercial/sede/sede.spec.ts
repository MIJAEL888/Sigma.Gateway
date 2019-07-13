/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { SedeComponentsPage, SedeDeleteDialog, SedeUpdatePage } from './sede.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('Sede e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let sedeUpdatePage: SedeUpdatePage;
  let sedeComponentsPage: SedeComponentsPage;
  let sedeDeleteDialog: SedeDeleteDialog;
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

  it('should load Sedes', async () => {
    await navBarPage.goToEntity('sede');
    sedeComponentsPage = new SedeComponentsPage();
    await browser.wait(ec.visibilityOf(sedeComponentsPage.title), 5000);
    expect(await sedeComponentsPage.getTitle()).to.eq('gatewayApp.comercialSede.home.title');
  });

  it('should load create Sede page', async () => {
    await sedeComponentsPage.clickOnCreateButton();
    sedeUpdatePage = new SedeUpdatePage();
    expect(await sedeUpdatePage.getPageTitle()).to.eq('gatewayApp.comercialSede.home.createOrEditLabel');
    await sedeUpdatePage.cancel();
  });

  it('should create and save Sedes', async () => {
    const nbButtonsBeforeCreate = await sedeComponentsPage.countDeleteButtons();

    await sedeComponentsPage.clickOnCreateButton();
    await promise.all([
      sedeUpdatePage.setDireccionInput('direccion'),
      sedeUpdatePage.setReferenciaInput('referencia'),
      sedeUpdatePage.setLatitudInput('latitud'),
      sedeUpdatePage.setLongitudInput('longitud'),
      sedeUpdatePage.setActividadInput('actividad'),
      sedeUpdatePage.setTelefonoInput('telefono'),
      sedeUpdatePage.setDescripcionInput('descripcion'),
      sedeUpdatePage.setComentarioInput('comentario'),
      sedeUpdatePage.setRutaDocEstudioInput('rutaDocEstudio'),
      sedeUpdatePage.setNombreDocEstudioInput('nombreDocEstudio'),
      sedeUpdatePage.setDocumentoEstudioInput(absolutePath),
      sedeUpdatePage.clienteSelectLastOption(),
      sedeUpdatePage.distritoSelectLastOption()
    ]);
    expect(await sedeUpdatePage.getDireccionInput()).to.eq('direccion', 'Expected Direccion value to be equals to direccion');
    expect(await sedeUpdatePage.getReferenciaInput()).to.eq('referencia', 'Expected Referencia value to be equals to referencia');
    expect(await sedeUpdatePage.getLatitudInput()).to.eq('latitud', 'Expected Latitud value to be equals to latitud');
    expect(await sedeUpdatePage.getLongitudInput()).to.eq('longitud', 'Expected Longitud value to be equals to longitud');
    expect(await sedeUpdatePage.getActividadInput()).to.eq('actividad', 'Expected Actividad value to be equals to actividad');
    expect(await sedeUpdatePage.getTelefonoInput()).to.eq('telefono', 'Expected Telefono value to be equals to telefono');
    expect(await sedeUpdatePage.getDescripcionInput()).to.eq('descripcion', 'Expected Descripcion value to be equals to descripcion');
    expect(await sedeUpdatePage.getComentarioInput()).to.eq('comentario', 'Expected Comentario value to be equals to comentario');
    expect(await sedeUpdatePage.getRutaDocEstudioInput()).to.eq(
      'rutaDocEstudio',
      'Expected RutaDocEstudio value to be equals to rutaDocEstudio'
    );
    expect(await sedeUpdatePage.getNombreDocEstudioInput()).to.eq(
      'nombreDocEstudio',
      'Expected NombreDocEstudio value to be equals to nombreDocEstudio'
    );
    expect(await sedeUpdatePage.getDocumentoEstudioInput()).to.endsWith(
      fileNameToUpload,
      'Expected DocumentoEstudio value to be end with ' + fileNameToUpload
    );
    await sedeUpdatePage.save();
    expect(await sedeUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await sedeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Sede', async () => {
    const nbButtonsBeforeDelete = await sedeComponentsPage.countDeleteButtons();
    await sedeComponentsPage.clickOnLastDeleteButton();

    sedeDeleteDialog = new SedeDeleteDialog();
    expect(await sedeDeleteDialog.getDialogTitle()).to.eq('gatewayApp.comercialSede.delete.question');
    await sedeDeleteDialog.clickOnConfirmButton();

    expect(await sedeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
