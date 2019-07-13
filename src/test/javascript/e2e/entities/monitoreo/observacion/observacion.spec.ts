/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { ObservacionComponentsPage, ObservacionDeleteDialog, ObservacionUpdatePage } from './observacion.page-object';

const expect = chai.expect;

describe('Observacion e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let observacionUpdatePage: ObservacionUpdatePage;
  let observacionComponentsPage: ObservacionComponentsPage;
  let observacionDeleteDialog: ObservacionDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Observacions', async () => {
    await navBarPage.goToEntity('observacion');
    observacionComponentsPage = new ObservacionComponentsPage();
    await browser.wait(ec.visibilityOf(observacionComponentsPage.title), 5000);
    expect(await observacionComponentsPage.getTitle()).to.eq('gatewayApp.monitoreoObservacion.home.title');
  });

  it('should load create Observacion page', async () => {
    await observacionComponentsPage.clickOnCreateButton();
    observacionUpdatePage = new ObservacionUpdatePage();
    expect(await observacionUpdatePage.getPageTitle()).to.eq('gatewayApp.monitoreoObservacion.home.createOrEditLabel');
    await observacionUpdatePage.cancel();
  });

  it('should create and save Observacions', async () => {
    const nbButtonsBeforeCreate = await observacionComponentsPage.countDeleteButtons();

    await observacionComponentsPage.clickOnCreateButton();
    await promise.all([
      observacionUpdatePage.setDescripcionInput('descripcion'),
      observacionUpdatePage.setComentarioInput('comentario'),
      observacionUpdatePage.setCodigoMonitoristaInput('codigoMonitorista'),
      observacionUpdatePage.proyectoSelectLastOption(),
      observacionUpdatePage.componenteSelectLastOption()
    ]);
    expect(await observacionUpdatePage.getDescripcionInput()).to.eq(
      'descripcion',
      'Expected Descripcion value to be equals to descripcion'
    );
    expect(await observacionUpdatePage.getComentarioInput()).to.eq('comentario', 'Expected Comentario value to be equals to comentario');
    expect(await observacionUpdatePage.getCodigoMonitoristaInput()).to.eq(
      'codigoMonitorista',
      'Expected CodigoMonitorista value to be equals to codigoMonitorista'
    );
    await observacionUpdatePage.save();
    expect(await observacionUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await observacionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Observacion', async () => {
    const nbButtonsBeforeDelete = await observacionComponentsPage.countDeleteButtons();
    await observacionComponentsPage.clickOnLastDeleteButton();

    observacionDeleteDialog = new ObservacionDeleteDialog();
    expect(await observacionDeleteDialog.getDialogTitle()).to.eq('gatewayApp.monitoreoObservacion.delete.question');
    await observacionDeleteDialog.clickOnConfirmButton();

    expect(await observacionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
