/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import {
  LaboratorioMonitoreoComponentsPage,
  LaboratorioMonitoreoDeleteDialog,
  LaboratorioMonitoreoUpdatePage
} from './laboratorio-monitoreo.page-object';

const expect = chai.expect;

describe('LaboratorioMonitoreo e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let laboratorioMonitoreoUpdatePage: LaboratorioMonitoreoUpdatePage;
  let laboratorioMonitoreoComponentsPage: LaboratorioMonitoreoComponentsPage;
  let laboratorioMonitoreoDeleteDialog: LaboratorioMonitoreoDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load LaboratorioMonitoreos', async () => {
    await navBarPage.goToEntity('laboratorio-monitoreo');
    laboratorioMonitoreoComponentsPage = new LaboratorioMonitoreoComponentsPage();
    await browser.wait(ec.visibilityOf(laboratorioMonitoreoComponentsPage.title), 5000);
    expect(await laboratorioMonitoreoComponentsPage.getTitle()).to.eq('gatewayApp.monitoreoLaboratorioMonitoreo.home.title');
  });

  it('should load create LaboratorioMonitoreo page', async () => {
    await laboratorioMonitoreoComponentsPage.clickOnCreateButton();
    laboratorioMonitoreoUpdatePage = new LaboratorioMonitoreoUpdatePage();
    expect(await laboratorioMonitoreoUpdatePage.getPageTitle()).to.eq('gatewayApp.monitoreoLaboratorioMonitoreo.home.createOrEditLabel');
    await laboratorioMonitoreoUpdatePage.cancel();
  });

  it('should create and save LaboratorioMonitoreos', async () => {
    const nbButtonsBeforeCreate = await laboratorioMonitoreoComponentsPage.countDeleteButtons();

    await laboratorioMonitoreoComponentsPage.clickOnCreateButton();
    await promise.all([
      laboratorioMonitoreoUpdatePage.setCodigoLaboratorioInput('codigoLaboratorio'),
      laboratorioMonitoreoUpdatePage.setFechaResevaInput('2000-12-31'),
      laboratorioMonitoreoUpdatePage.proyectoSelectLastOption()
    ]);
    expect(await laboratorioMonitoreoUpdatePage.getCodigoLaboratorioInput()).to.eq(
      'codigoLaboratorio',
      'Expected CodigoLaboratorio value to be equals to codigoLaboratorio'
    );
    expect(await laboratorioMonitoreoUpdatePage.getFechaResevaInput()).to.eq(
      '2000-12-31',
      'Expected fechaReseva value to be equals to 2000-12-31'
    );
    await laboratorioMonitoreoUpdatePage.save();
    expect(await laboratorioMonitoreoUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await laboratorioMonitoreoComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last LaboratorioMonitoreo', async () => {
    const nbButtonsBeforeDelete = await laboratorioMonitoreoComponentsPage.countDeleteButtons();
    await laboratorioMonitoreoComponentsPage.clickOnLastDeleteButton();

    laboratorioMonitoreoDeleteDialog = new LaboratorioMonitoreoDeleteDialog();
    expect(await laboratorioMonitoreoDeleteDialog.getDialogTitle()).to.eq('gatewayApp.monitoreoLaboratorioMonitoreo.delete.question');
    await laboratorioMonitoreoDeleteDialog.clickOnConfirmButton();

    expect(await laboratorioMonitoreoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
