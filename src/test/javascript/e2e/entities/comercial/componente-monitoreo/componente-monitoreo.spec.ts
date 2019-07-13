/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import {
  ComponenteMonitoreoComponentsPage,
  ComponenteMonitoreoDeleteDialog,
  ComponenteMonitoreoUpdatePage
} from './componente-monitoreo.page-object';

const expect = chai.expect;

describe('ComponenteMonitoreo e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let componenteMonitoreoUpdatePage: ComponenteMonitoreoUpdatePage;
  let componenteMonitoreoComponentsPage: ComponenteMonitoreoComponentsPage;
  let componenteMonitoreoDeleteDialog: ComponenteMonitoreoDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load ComponenteMonitoreos', async () => {
    await navBarPage.goToEntity('componente-monitoreo');
    componenteMonitoreoComponentsPage = new ComponenteMonitoreoComponentsPage();
    await browser.wait(ec.visibilityOf(componenteMonitoreoComponentsPage.title), 5000);
    expect(await componenteMonitoreoComponentsPage.getTitle()).to.eq('gatewayApp.comercialComponenteMonitoreo.home.title');
  });

  it('should load create ComponenteMonitoreo page', async () => {
    await componenteMonitoreoComponentsPage.clickOnCreateButton();
    componenteMonitoreoUpdatePage = new ComponenteMonitoreoUpdatePage();
    expect(await componenteMonitoreoUpdatePage.getPageTitle()).to.eq('gatewayApp.comercialComponenteMonitoreo.home.createOrEditLabel');
    await componenteMonitoreoUpdatePage.cancel();
  });

  it('should create and save ComponenteMonitoreos', async () => {
    const nbButtonsBeforeCreate = await componenteMonitoreoComponentsPage.countDeleteButtons();

    await componenteMonitoreoComponentsPage.clickOnCreateButton();
    await promise.all([
      componenteMonitoreoUpdatePage.setNombreInput('nombre'),
      componenteMonitoreoUpdatePage.setDescripcionInput('descripcion')
    ]);
    expect(await componenteMonitoreoUpdatePage.getNombreInput()).to.eq('nombre', 'Expected Nombre value to be equals to nombre');
    expect(await componenteMonitoreoUpdatePage.getDescripcionInput()).to.eq(
      'descripcion',
      'Expected Descripcion value to be equals to descripcion'
    );
    await componenteMonitoreoUpdatePage.save();
    expect(await componenteMonitoreoUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await componenteMonitoreoComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last ComponenteMonitoreo', async () => {
    const nbButtonsBeforeDelete = await componenteMonitoreoComponentsPage.countDeleteButtons();
    await componenteMonitoreoComponentsPage.clickOnLastDeleteButton();

    componenteMonitoreoDeleteDialog = new ComponenteMonitoreoDeleteDialog();
    expect(await componenteMonitoreoDeleteDialog.getDialogTitle()).to.eq('gatewayApp.comercialComponenteMonitoreo.delete.question');
    await componenteMonitoreoDeleteDialog.clickOnConfirmButton();

    expect(await componenteMonitoreoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
