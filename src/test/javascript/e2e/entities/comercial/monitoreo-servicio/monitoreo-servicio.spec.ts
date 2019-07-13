/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import {
  MonitoreoServicioComponentsPage,
  MonitoreoServicioDeleteDialog,
  MonitoreoServicioUpdatePage
} from './monitoreo-servicio.page-object';

const expect = chai.expect;

describe('MonitoreoServicio e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let monitoreoServicioUpdatePage: MonitoreoServicioUpdatePage;
  let monitoreoServicioComponentsPage: MonitoreoServicioComponentsPage;
  let monitoreoServicioDeleteDialog: MonitoreoServicioDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load MonitoreoServicios', async () => {
    await navBarPage.goToEntity('monitoreo-servicio');
    monitoreoServicioComponentsPage = new MonitoreoServicioComponentsPage();
    await browser.wait(ec.visibilityOf(monitoreoServicioComponentsPage.title), 5000);
    expect(await monitoreoServicioComponentsPage.getTitle()).to.eq('gatewayApp.comercialMonitoreoServicio.home.title');
  });

  it('should load create MonitoreoServicio page', async () => {
    await monitoreoServicioComponentsPage.clickOnCreateButton();
    monitoreoServicioUpdatePage = new MonitoreoServicioUpdatePage();
    expect(await monitoreoServicioUpdatePage.getPageTitle()).to.eq('gatewayApp.comercialMonitoreoServicio.home.createOrEditLabel');
    await monitoreoServicioUpdatePage.cancel();
  });

  it('should create and save MonitoreoServicios', async () => {
    const nbButtonsBeforeCreate = await monitoreoServicioComponentsPage.countDeleteButtons();

    await monitoreoServicioComponentsPage.clickOnCreateButton();
    await promise.all([
      monitoreoServicioUpdatePage.setCantidadInput('5'),
      monitoreoServicioUpdatePage.setCostoTotalInput('5'),
      monitoreoServicioUpdatePage.servicioSelectLastOption(),
      monitoreoServicioUpdatePage.paramentroMonitoreoSelectLastOption()
    ]);
    expect(await monitoreoServicioUpdatePage.getCantidadInput()).to.eq('5', 'Expected cantidad value to be equals to 5');
    expect(await monitoreoServicioUpdatePage.getCostoTotalInput()).to.eq('5', 'Expected costoTotal value to be equals to 5');
    await monitoreoServicioUpdatePage.save();
    expect(await monitoreoServicioUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await monitoreoServicioComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last MonitoreoServicio', async () => {
    const nbButtonsBeforeDelete = await monitoreoServicioComponentsPage.countDeleteButtons();
    await monitoreoServicioComponentsPage.clickOnLastDeleteButton();

    monitoreoServicioDeleteDialog = new MonitoreoServicioDeleteDialog();
    expect(await monitoreoServicioDeleteDialog.getDialogTitle()).to.eq('gatewayApp.comercialMonitoreoServicio.delete.question');
    await monitoreoServicioDeleteDialog.clickOnConfirmButton();

    expect(await monitoreoServicioComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
