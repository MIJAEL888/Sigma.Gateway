/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { ComponenteComponentsPage, ComponenteDeleteDialog, ComponenteUpdatePage } from './componente.page-object';

const expect = chai.expect;

describe('Componente e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let componenteUpdatePage: ComponenteUpdatePage;
  let componenteComponentsPage: ComponenteComponentsPage;
  let componenteDeleteDialog: ComponenteDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Componentes', async () => {
    await navBarPage.goToEntity('componente');
    componenteComponentsPage = new ComponenteComponentsPage();
    await browser.wait(ec.visibilityOf(componenteComponentsPage.title), 5000);
    expect(await componenteComponentsPage.getTitle()).to.eq('gatewayApp.monitoreoComponente.home.title');
  });

  it('should load create Componente page', async () => {
    await componenteComponentsPage.clickOnCreateButton();
    componenteUpdatePage = new ComponenteUpdatePage();
    expect(await componenteUpdatePage.getPageTitle()).to.eq('gatewayApp.monitoreoComponente.home.createOrEditLabel');
    await componenteUpdatePage.cancel();
  });

  it('should create and save Componentes', async () => {
    const nbButtonsBeforeCreate = await componenteComponentsPage.countDeleteButtons();

    await componenteComponentsPage.clickOnCreateButton();
    await promise.all([
      componenteUpdatePage.setNombreInput('nombre'),
      componenteUpdatePage.setDescripcionInput('descripcion'),
      componenteUpdatePage.setProtocoloInput('protocolo'),
      componenteUpdatePage.setGuiaInput('guia'),
      componenteUpdatePage.setIsoInput('iso'),
      componenteUpdatePage.setObjetivosInput('objetivos')
    ]);
    expect(await componenteUpdatePage.getNombreInput()).to.eq('nombre', 'Expected Nombre value to be equals to nombre');
    expect(await componenteUpdatePage.getDescripcionInput()).to.eq('descripcion', 'Expected Descripcion value to be equals to descripcion');
    expect(await componenteUpdatePage.getProtocoloInput()).to.eq('protocolo', 'Expected Protocolo value to be equals to protocolo');
    expect(await componenteUpdatePage.getGuiaInput()).to.eq('guia', 'Expected Guia value to be equals to guia');
    expect(await componenteUpdatePage.getIsoInput()).to.eq('iso', 'Expected Iso value to be equals to iso');
    expect(await componenteUpdatePage.getObjetivosInput()).to.eq('objetivos', 'Expected Objetivos value to be equals to objetivos');
    await componenteUpdatePage.save();
    expect(await componenteUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await componenteComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Componente', async () => {
    const nbButtonsBeforeDelete = await componenteComponentsPage.countDeleteButtons();
    await componenteComponentsPage.clickOnLastDeleteButton();

    componenteDeleteDialog = new ComponenteDeleteDialog();
    expect(await componenteDeleteDialog.getDialogTitle()).to.eq('gatewayApp.monitoreoComponente.delete.question');
    await componenteDeleteDialog.clickOnConfirmButton();

    expect(await componenteComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
