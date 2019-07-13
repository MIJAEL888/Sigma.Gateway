/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { LaboratorioComponentsPage, LaboratorioDeleteDialog, LaboratorioUpdatePage } from './laboratorio.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('Laboratorio e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let laboratorioUpdatePage: LaboratorioUpdatePage;
  let laboratorioComponentsPage: LaboratorioComponentsPage;
  let laboratorioDeleteDialog: LaboratorioDeleteDialog;
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

  it('should load Laboratorios', async () => {
    await navBarPage.goToEntity('laboratorio');
    laboratorioComponentsPage = new LaboratorioComponentsPage();
    await browser.wait(ec.visibilityOf(laboratorioComponentsPage.title), 5000);
    expect(await laboratorioComponentsPage.getTitle()).to.eq('gatewayApp.logisticaLaboratorio.home.title');
  });

  it('should load create Laboratorio page', async () => {
    await laboratorioComponentsPage.clickOnCreateButton();
    laboratorioUpdatePage = new LaboratorioUpdatePage();
    expect(await laboratorioUpdatePage.getPageTitle()).to.eq('gatewayApp.logisticaLaboratorio.home.createOrEditLabel');
    await laboratorioUpdatePage.cancel();
  });

  it('should create and save Laboratorios', async () => {
    const nbButtonsBeforeCreate = await laboratorioComponentsPage.countDeleteButtons();

    await laboratorioComponentsPage.clickOnCreateButton();
    await promise.all([
      laboratorioUpdatePage.setRazonSocialInput('razonSocial'),
      laboratorioUpdatePage.setDireccionInput('direccion'),
      laboratorioUpdatePage.setRucInput('ruc'),
      laboratorioUpdatePage.setAcreditadoPorInput('acreditadoPor'),
      laboratorioUpdatePage.setNumeroAcreditacionInput('numeroAcreditacion'),
      laboratorioUpdatePage.setRutaDocAcreditacionInput('rutaDocAcreditacion'),
      laboratorioUpdatePage.setNombreDocAcreditacionInput('nombreDocAcreditacion'),
      laboratorioUpdatePage.setDocumentoAcreditacionInput(absolutePath),
      laboratorioUpdatePage.setVigenciaDesdeInput('2000-12-31'),
      laboratorioUpdatePage.setVigenciaHastaInput('2000-12-31'),
      laboratorioUpdatePage.setTelefonoInput('telefono'),
      laboratorioUpdatePage.setCorreoInput('correo'),
      laboratorioUpdatePage.setNombreContactoInput('nombreContacto'),
      laboratorioUpdatePage.setFechaCreacionInput('2000-12-31')
    ]);
    expect(await laboratorioUpdatePage.getRazonSocialInput()).to.eq(
      'razonSocial',
      'Expected RazonSocial value to be equals to razonSocial'
    );
    expect(await laboratorioUpdatePage.getDireccionInput()).to.eq('direccion', 'Expected Direccion value to be equals to direccion');
    expect(await laboratorioUpdatePage.getRucInput()).to.eq('ruc', 'Expected Ruc value to be equals to ruc');
    expect(await laboratorioUpdatePage.getAcreditadoPorInput()).to.eq(
      'acreditadoPor',
      'Expected AcreditadoPor value to be equals to acreditadoPor'
    );
    expect(await laboratorioUpdatePage.getNumeroAcreditacionInput()).to.eq(
      'numeroAcreditacion',
      'Expected NumeroAcreditacion value to be equals to numeroAcreditacion'
    );
    expect(await laboratorioUpdatePage.getRutaDocAcreditacionInput()).to.eq(
      'rutaDocAcreditacion',
      'Expected RutaDocAcreditacion value to be equals to rutaDocAcreditacion'
    );
    expect(await laboratorioUpdatePage.getNombreDocAcreditacionInput()).to.eq(
      'nombreDocAcreditacion',
      'Expected NombreDocAcreditacion value to be equals to nombreDocAcreditacion'
    );
    expect(await laboratorioUpdatePage.getDocumentoAcreditacionInput()).to.endsWith(
      fileNameToUpload,
      'Expected DocumentoAcreditacion value to be end with ' + fileNameToUpload
    );
    expect(await laboratorioUpdatePage.getVigenciaDesdeInput()).to.eq(
      '2000-12-31',
      'Expected vigenciaDesde value to be equals to 2000-12-31'
    );
    expect(await laboratorioUpdatePage.getVigenciaHastaInput()).to.eq(
      '2000-12-31',
      'Expected vigenciaHasta value to be equals to 2000-12-31'
    );
    expect(await laboratorioUpdatePage.getTelefonoInput()).to.eq('telefono', 'Expected Telefono value to be equals to telefono');
    expect(await laboratorioUpdatePage.getCorreoInput()).to.eq('correo', 'Expected Correo value to be equals to correo');
    expect(await laboratorioUpdatePage.getNombreContactoInput()).to.eq(
      'nombreContacto',
      'Expected NombreContacto value to be equals to nombreContacto'
    );
    expect(await laboratorioUpdatePage.getFechaCreacionInput()).to.eq(
      '2000-12-31',
      'Expected fechaCreacion value to be equals to 2000-12-31'
    );
    await laboratorioUpdatePage.save();
    expect(await laboratorioUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await laboratorioComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Laboratorio', async () => {
    const nbButtonsBeforeDelete = await laboratorioComponentsPage.countDeleteButtons();
    await laboratorioComponentsPage.clickOnLastDeleteButton();

    laboratorioDeleteDialog = new LaboratorioDeleteDialog();
    expect(await laboratorioDeleteDialog.getDialogTitle()).to.eq('gatewayApp.logisticaLaboratorio.delete.question');
    await laboratorioDeleteDialog.clickOnConfirmButton();

    expect(await laboratorioComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
