/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { PuntoMonitoreoComponentsPage, PuntoMonitoreoDeleteDialog, PuntoMonitoreoUpdatePage } from './punto-monitoreo.page-object';

const expect = chai.expect;

describe('PuntoMonitoreo e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let puntoMonitoreoUpdatePage: PuntoMonitoreoUpdatePage;
  let puntoMonitoreoComponentsPage: PuntoMonitoreoComponentsPage;
  let puntoMonitoreoDeleteDialog: PuntoMonitoreoDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load PuntoMonitoreos', async () => {
    await navBarPage.goToEntity('punto-monitoreo');
    puntoMonitoreoComponentsPage = new PuntoMonitoreoComponentsPage();
    await browser.wait(ec.visibilityOf(puntoMonitoreoComponentsPage.title), 5000);
    expect(await puntoMonitoreoComponentsPage.getTitle()).to.eq('gatewayApp.monitoreoPuntoMonitoreo.home.title');
  });

  it('should load create PuntoMonitoreo page', async () => {
    await puntoMonitoreoComponentsPage.clickOnCreateButton();
    puntoMonitoreoUpdatePage = new PuntoMonitoreoUpdatePage();
    expect(await puntoMonitoreoUpdatePage.getPageTitle()).to.eq('gatewayApp.monitoreoPuntoMonitoreo.home.createOrEditLabel');
    await puntoMonitoreoUpdatePage.cancel();
  });

  it('should create and save PuntoMonitoreos', async () => {
    const nbButtonsBeforeCreate = await puntoMonitoreoComponentsPage.countDeleteButtons();

    await puntoMonitoreoComponentsPage.clickOnCreateButton();
    await promise.all([
      puntoMonitoreoUpdatePage.setCodigoInput('codigo'),
      puntoMonitoreoUpdatePage.setCodigoSedeInput('codigoSede'),
      puntoMonitoreoUpdatePage.setCodigoClienteInput('codigoCliente'),
      puntoMonitoreoUpdatePage.setCoordenadaNorteInput('coordenadaNorte'),
      puntoMonitoreoUpdatePage.setCoordenadaEsteInput('coordenadaEste'),
      puntoMonitoreoUpdatePage.setDescripcionInput('descripcion'),
      puntoMonitoreoUpdatePage.setComentarioInput('comentario'),
      puntoMonitoreoUpdatePage.setLatitudInput('5'),
      puntoMonitoreoUpdatePage.setLongitudInput('5'),
      puntoMonitoreoUpdatePage.setObservacionInput('observacion')
    ]);
    expect(await puntoMonitoreoUpdatePage.getCodigoInput()).to.eq('codigo', 'Expected Codigo value to be equals to codigo');
    expect(await puntoMonitoreoUpdatePage.getCodigoSedeInput()).to.eq('codigoSede', 'Expected CodigoSede value to be equals to codigoSede');
    expect(await puntoMonitoreoUpdatePage.getCodigoClienteInput()).to.eq(
      'codigoCliente',
      'Expected CodigoCliente value to be equals to codigoCliente'
    );
    expect(await puntoMonitoreoUpdatePage.getCoordenadaNorteInput()).to.eq(
      'coordenadaNorte',
      'Expected CoordenadaNorte value to be equals to coordenadaNorte'
    );
    expect(await puntoMonitoreoUpdatePage.getCoordenadaEsteInput()).to.eq(
      'coordenadaEste',
      'Expected CoordenadaEste value to be equals to coordenadaEste'
    );
    expect(await puntoMonitoreoUpdatePage.getDescripcionInput()).to.eq(
      'descripcion',
      'Expected Descripcion value to be equals to descripcion'
    );
    expect(await puntoMonitoreoUpdatePage.getComentarioInput()).to.eq('comentario', 'Expected Comentario value to be equals to comentario');
    expect(await puntoMonitoreoUpdatePage.getLatitudInput()).to.eq('5', 'Expected latitud value to be equals to 5');
    expect(await puntoMonitoreoUpdatePage.getLongitudInput()).to.eq('5', 'Expected longitud value to be equals to 5');
    expect(await puntoMonitoreoUpdatePage.getObservacionInput()).to.eq(
      'observacion',
      'Expected Observacion value to be equals to observacion'
    );
    await puntoMonitoreoUpdatePage.save();
    expect(await puntoMonitoreoUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await puntoMonitoreoComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last PuntoMonitoreo', async () => {
    const nbButtonsBeforeDelete = await puntoMonitoreoComponentsPage.countDeleteButtons();
    await puntoMonitoreoComponentsPage.clickOnLastDeleteButton();

    puntoMonitoreoDeleteDialog = new PuntoMonitoreoDeleteDialog();
    expect(await puntoMonitoreoDeleteDialog.getDialogTitle()).to.eq('gatewayApp.monitoreoPuntoMonitoreo.delete.question');
    await puntoMonitoreoDeleteDialog.clickOnConfirmButton();

    expect(await puntoMonitoreoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
