/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { EquipoMonitoreoComponentsPage, EquipoMonitoreoDeleteDialog, EquipoMonitoreoUpdatePage } from './equipo-monitoreo.page-object';

const expect = chai.expect;

describe('EquipoMonitoreo e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let equipoMonitoreoUpdatePage: EquipoMonitoreoUpdatePage;
  let equipoMonitoreoComponentsPage: EquipoMonitoreoComponentsPage;
  let equipoMonitoreoDeleteDialog: EquipoMonitoreoDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load EquipoMonitoreos', async () => {
    await navBarPage.goToEntity('equipo-monitoreo');
    equipoMonitoreoComponentsPage = new EquipoMonitoreoComponentsPage();
    await browser.wait(ec.visibilityOf(equipoMonitoreoComponentsPage.title), 5000);
    expect(await equipoMonitoreoComponentsPage.getTitle()).to.eq('gatewayApp.monitoreoEquipoMonitoreo.home.title');
  });

  it('should load create EquipoMonitoreo page', async () => {
    await equipoMonitoreoComponentsPage.clickOnCreateButton();
    equipoMonitoreoUpdatePage = new EquipoMonitoreoUpdatePage();
    expect(await equipoMonitoreoUpdatePage.getPageTitle()).to.eq('gatewayApp.monitoreoEquipoMonitoreo.home.createOrEditLabel');
    await equipoMonitoreoUpdatePage.cancel();
  });

  it('should create and save EquipoMonitoreos', async () => {
    const nbButtonsBeforeCreate = await equipoMonitoreoComponentsPage.countDeleteButtons();

    await equipoMonitoreoComponentsPage.clickOnCreateButton();
    await promise.all([
      equipoMonitoreoUpdatePage.setCodigoEquipoInput('codigoEquipo'),
      equipoMonitoreoUpdatePage.setReservadoDesdeInput('2000-12-31'),
      equipoMonitoreoUpdatePage.setReservadoHastaInput('2000-12-31'),
      equipoMonitoreoUpdatePage.setDocumentoCalibracionInput('documentoCalibracion'),
      equipoMonitoreoUpdatePage.proyectoSelectLastOption()
    ]);
    expect(await equipoMonitoreoUpdatePage.getCodigoEquipoInput()).to.eq(
      'codigoEquipo',
      'Expected CodigoEquipo value to be equals to codigoEquipo'
    );
    expect(await equipoMonitoreoUpdatePage.getReservadoDesdeInput()).to.eq(
      '2000-12-31',
      'Expected reservadoDesde value to be equals to 2000-12-31'
    );
    expect(await equipoMonitoreoUpdatePage.getReservadoHastaInput()).to.eq(
      '2000-12-31',
      'Expected reservadoHasta value to be equals to 2000-12-31'
    );
    expect(await equipoMonitoreoUpdatePage.getDocumentoCalibracionInput()).to.eq(
      'documentoCalibracion',
      'Expected DocumentoCalibracion value to be equals to documentoCalibracion'
    );
    await equipoMonitoreoUpdatePage.save();
    expect(await equipoMonitoreoUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await equipoMonitoreoComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last EquipoMonitoreo', async () => {
    const nbButtonsBeforeDelete = await equipoMonitoreoComponentsPage.countDeleteButtons();
    await equipoMonitoreoComponentsPage.clickOnLastDeleteButton();

    equipoMonitoreoDeleteDialog = new EquipoMonitoreoDeleteDialog();
    expect(await equipoMonitoreoDeleteDialog.getDialogTitle()).to.eq('gatewayApp.monitoreoEquipoMonitoreo.delete.question');
    await equipoMonitoreoDeleteDialog.clickOnConfirmButton();

    expect(await equipoMonitoreoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
