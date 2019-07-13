/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { ServicioComponentsPage, ServicioDeleteDialog, ServicioUpdatePage } from './servicio.page-object';

const expect = chai.expect;

describe('Servicio e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let servicioUpdatePage: ServicioUpdatePage;
  let servicioComponentsPage: ServicioComponentsPage;
  let servicioDeleteDialog: ServicioDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Servicios', async () => {
    await navBarPage.goToEntity('servicio');
    servicioComponentsPage = new ServicioComponentsPage();
    await browser.wait(ec.visibilityOf(servicioComponentsPage.title), 5000);
    expect(await servicioComponentsPage.getTitle()).to.eq('gatewayApp.comercialServicio.home.title');
  });

  it('should load create Servicio page', async () => {
    await servicioComponentsPage.clickOnCreateButton();
    servicioUpdatePage = new ServicioUpdatePage();
    expect(await servicioUpdatePage.getPageTitle()).to.eq('gatewayApp.comercialServicio.home.createOrEditLabel');
    await servicioUpdatePage.cancel();
  });

  it('should create and save Servicios', async () => {
    const nbButtonsBeforeCreate = await servicioComponentsPage.countDeleteButtons();

    await servicioComponentsPage.clickOnCreateButton();
    await promise.all([
      servicioUpdatePage.setCodigoInput('codigo'),
      servicioUpdatePage.setFechaEntregaInput('2000-12-31'),
      servicioUpdatePage.setNombreSolicitanteInput('nombreSolicitante'),
      servicioUpdatePage.setNumeroSolicitanteInput('numeroSolicitante'),
      servicioUpdatePage.setObservacionInput('observacion'),
      servicioUpdatePage.setDescripcionInput('descripcion'),
      servicioUpdatePage.estadoSelectLastOption(),
      servicioUpdatePage.setCodigoClienteInput('codigoCliente'),
      servicioUpdatePage.setCodigoSedeInput('codigoSede'),
      servicioUpdatePage.tipoServiciosSelectLastOption(),
      servicioUpdatePage.tipoSolicitudSelectLastOption(),
      servicioUpdatePage.tipoInduccionSelectLastOption(),
      servicioUpdatePage.requisitosSeguridadSelectLastOption(),
      servicioUpdatePage.sedeSelectLastOption()
    ]);
    expect(await servicioUpdatePage.getCodigoInput()).to.eq('codigo', 'Expected Codigo value to be equals to codigo');
    expect(await servicioUpdatePage.getFechaEntregaInput()).to.eq('2000-12-31', 'Expected fechaEntrega value to be equals to 2000-12-31');
    expect(await servicioUpdatePage.getNombreSolicitanteInput()).to.eq(
      'nombreSolicitante',
      'Expected NombreSolicitante value to be equals to nombreSolicitante'
    );
    expect(await servicioUpdatePage.getNumeroSolicitanteInput()).to.eq(
      'numeroSolicitante',
      'Expected NumeroSolicitante value to be equals to numeroSolicitante'
    );
    expect(await servicioUpdatePage.getObservacionInput()).to.eq('observacion', 'Expected Observacion value to be equals to observacion');
    expect(await servicioUpdatePage.getDescripcionInput()).to.eq('descripcion', 'Expected Descripcion value to be equals to descripcion');
    expect(await servicioUpdatePage.getCodigoClienteInput()).to.eq(
      'codigoCliente',
      'Expected CodigoCliente value to be equals to codigoCliente'
    );
    expect(await servicioUpdatePage.getCodigoSedeInput()).to.eq('codigoSede', 'Expected CodigoSede value to be equals to codigoSede');
    await servicioUpdatePage.save();
    expect(await servicioUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await servicioComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Servicio', async () => {
    const nbButtonsBeforeDelete = await servicioComponentsPage.countDeleteButtons();
    await servicioComponentsPage.clickOnLastDeleteButton();

    servicioDeleteDialog = new ServicioDeleteDialog();
    expect(await servicioDeleteDialog.getDialogTitle()).to.eq('gatewayApp.comercialServicio.delete.question');
    await servicioDeleteDialog.clickOnConfirmButton();

    expect(await servicioComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
