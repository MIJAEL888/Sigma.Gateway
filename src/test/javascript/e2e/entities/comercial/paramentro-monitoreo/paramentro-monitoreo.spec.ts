/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import {
  ParamentroMonitoreoComponentsPage,
  ParamentroMonitoreoDeleteDialog,
  ParamentroMonitoreoUpdatePage
} from './paramentro-monitoreo.page-object';

const expect = chai.expect;

describe('ParamentroMonitoreo e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let paramentroMonitoreoUpdatePage: ParamentroMonitoreoUpdatePage;
  let paramentroMonitoreoComponentsPage: ParamentroMonitoreoComponentsPage;
  let paramentroMonitoreoDeleteDialog: ParamentroMonitoreoDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load ParamentroMonitoreos', async () => {
    await navBarPage.goToEntity('paramentro-monitoreo');
    paramentroMonitoreoComponentsPage = new ParamentroMonitoreoComponentsPage();
    await browser.wait(ec.visibilityOf(paramentroMonitoreoComponentsPage.title), 5000);
    expect(await paramentroMonitoreoComponentsPage.getTitle()).to.eq('gatewayApp.comercialParamentroMonitoreo.home.title');
  });

  it('should load create ParamentroMonitoreo page', async () => {
    await paramentroMonitoreoComponentsPage.clickOnCreateButton();
    paramentroMonitoreoUpdatePage = new ParamentroMonitoreoUpdatePage();
    expect(await paramentroMonitoreoUpdatePage.getPageTitle()).to.eq('gatewayApp.comercialParamentroMonitoreo.home.createOrEditLabel');
    await paramentroMonitoreoUpdatePage.cancel();
  });

  it('should create and save ParamentroMonitoreos', async () => {
    const nbButtonsBeforeCreate = await paramentroMonitoreoComponentsPage.countDeleteButtons();

    await paramentroMonitoreoComponentsPage.clickOnCreateButton();
    await promise.all([
      paramentroMonitoreoUpdatePage.setNombreInput('nombre'),
      paramentroMonitoreoUpdatePage.setDescripcionInput('descripcion'),
      paramentroMonitoreoUpdatePage.setCostoInput('5'),
      paramentroMonitoreoUpdatePage.componenteMonitoreoSelectLastOption()
    ]);
    expect(await paramentroMonitoreoUpdatePage.getNombreInput()).to.eq('nombre', 'Expected Nombre value to be equals to nombre');
    expect(await paramentroMonitoreoUpdatePage.getDescripcionInput()).to.eq(
      'descripcion',
      'Expected Descripcion value to be equals to descripcion'
    );
    expect(await paramentroMonitoreoUpdatePage.getCostoInput()).to.eq('5', 'Expected costo value to be equals to 5');
    await paramentroMonitoreoUpdatePage.save();
    expect(await paramentroMonitoreoUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await paramentroMonitoreoComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last ParamentroMonitoreo', async () => {
    const nbButtonsBeforeDelete = await paramentroMonitoreoComponentsPage.countDeleteButtons();
    await paramentroMonitoreoComponentsPage.clickOnLastDeleteButton();

    paramentroMonitoreoDeleteDialog = new ParamentroMonitoreoDeleteDialog();
    expect(await paramentroMonitoreoDeleteDialog.getDialogTitle()).to.eq('gatewayApp.comercialParamentroMonitoreo.delete.question');
    await paramentroMonitoreoDeleteDialog.clickOnConfirmButton();

    expect(await paramentroMonitoreoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
