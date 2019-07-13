/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import {
  PuntoMonitoreoObsComponentsPage,
  PuntoMonitoreoObsDeleteDialog,
  PuntoMonitoreoObsUpdatePage
} from './punto-monitoreo-obs.page-object';

const expect = chai.expect;

describe('PuntoMonitoreoObs e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let puntoMonitoreoObsUpdatePage: PuntoMonitoreoObsUpdatePage;
  let puntoMonitoreoObsComponentsPage: PuntoMonitoreoObsComponentsPage;
  let puntoMonitoreoObsDeleteDialog: PuntoMonitoreoObsDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load PuntoMonitoreoObs', async () => {
    await navBarPage.goToEntity('punto-monitoreo-obs');
    puntoMonitoreoObsComponentsPage = new PuntoMonitoreoObsComponentsPage();
    await browser.wait(ec.visibilityOf(puntoMonitoreoObsComponentsPage.title), 5000);
    expect(await puntoMonitoreoObsComponentsPage.getTitle()).to.eq('gatewayApp.monitoreoPuntoMonitoreoObs.home.title');
  });

  it('should load create PuntoMonitoreoObs page', async () => {
    await puntoMonitoreoObsComponentsPage.clickOnCreateButton();
    puntoMonitoreoObsUpdatePage = new PuntoMonitoreoObsUpdatePage();
    expect(await puntoMonitoreoObsUpdatePage.getPageTitle()).to.eq('gatewayApp.monitoreoPuntoMonitoreoObs.home.createOrEditLabel');
    await puntoMonitoreoObsUpdatePage.cancel();
  });

  it('should create and save PuntoMonitoreoObs', async () => {
    const nbButtonsBeforeCreate = await puntoMonitoreoObsComponentsPage.countDeleteButtons();

    await puntoMonitoreoObsComponentsPage.clickOnCreateButton();
    await promise.all([
      puntoMonitoreoObsUpdatePage.setCodigoInput('codigo'),
      puntoMonitoreoObsUpdatePage.setDescripcionInput('descripcion'),
      puntoMonitoreoObsUpdatePage.setComentarioInput('comentario'),
      puntoMonitoreoObsUpdatePage.setObservacionInput('observacion'),
      puntoMonitoreoObsUpdatePage.puntoMonitoreoSelectLastOption(),
      puntoMonitoreoObsUpdatePage.resultadoSelectLastOption(),
      puntoMonitoreoObsUpdatePage.proyectoSelectLastOption()
    ]);
    expect(await puntoMonitoreoObsUpdatePage.getCodigoInput()).to.eq('codigo', 'Expected Codigo value to be equals to codigo');
    expect(await puntoMonitoreoObsUpdatePage.getDescripcionInput()).to.eq(
      'descripcion',
      'Expected Descripcion value to be equals to descripcion'
    );
    expect(await puntoMonitoreoObsUpdatePage.getComentarioInput()).to.eq(
      'comentario',
      'Expected Comentario value to be equals to comentario'
    );
    expect(await puntoMonitoreoObsUpdatePage.getObservacionInput()).to.eq(
      'observacion',
      'Expected Observacion value to be equals to observacion'
    );
    await puntoMonitoreoObsUpdatePage.save();
    expect(await puntoMonitoreoObsUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await puntoMonitoreoObsComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last PuntoMonitoreoObs', async () => {
    const nbButtonsBeforeDelete = await puntoMonitoreoObsComponentsPage.countDeleteButtons();
    await puntoMonitoreoObsComponentsPage.clickOnLastDeleteButton();

    puntoMonitoreoObsDeleteDialog = new PuntoMonitoreoObsDeleteDialog();
    expect(await puntoMonitoreoObsDeleteDialog.getDialogTitle()).to.eq('gatewayApp.monitoreoPuntoMonitoreoObs.delete.question');
    await puntoMonitoreoObsDeleteDialog.clickOnConfirmButton();

    expect(await puntoMonitoreoObsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
