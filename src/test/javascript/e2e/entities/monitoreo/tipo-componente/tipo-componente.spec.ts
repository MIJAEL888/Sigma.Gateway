/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { TipoComponenteComponentsPage, TipoComponenteDeleteDialog, TipoComponenteUpdatePage } from './tipo-componente.page-object';

const expect = chai.expect;

describe('TipoComponente e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let tipoComponenteUpdatePage: TipoComponenteUpdatePage;
  let tipoComponenteComponentsPage: TipoComponenteComponentsPage;
  let tipoComponenteDeleteDialog: TipoComponenteDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load TipoComponentes', async () => {
    await navBarPage.goToEntity('tipo-componente');
    tipoComponenteComponentsPage = new TipoComponenteComponentsPage();
    await browser.wait(ec.visibilityOf(tipoComponenteComponentsPage.title), 5000);
    expect(await tipoComponenteComponentsPage.getTitle()).to.eq('gatewayApp.monitoreoTipoComponente.home.title');
  });

  it('should load create TipoComponente page', async () => {
    await tipoComponenteComponentsPage.clickOnCreateButton();
    tipoComponenteUpdatePage = new TipoComponenteUpdatePage();
    expect(await tipoComponenteUpdatePage.getPageTitle()).to.eq('gatewayApp.monitoreoTipoComponente.home.createOrEditLabel');
    await tipoComponenteUpdatePage.cancel();
  });

  it('should create and save TipoComponentes', async () => {
    const nbButtonsBeforeCreate = await tipoComponenteComponentsPage.countDeleteButtons();

    await tipoComponenteComponentsPage.clickOnCreateButton();
    await promise.all([
      tipoComponenteUpdatePage.setNombreInput('nombre'),
      tipoComponenteUpdatePage.setDescripcionInput('descripcion'),
      tipoComponenteUpdatePage.componenteSelectLastOption()
    ]);
    expect(await tipoComponenteUpdatePage.getNombreInput()).to.eq('nombre', 'Expected Nombre value to be equals to nombre');
    expect(await tipoComponenteUpdatePage.getDescripcionInput()).to.eq(
      'descripcion',
      'Expected Descripcion value to be equals to descripcion'
    );
    await tipoComponenteUpdatePage.save();
    expect(await tipoComponenteUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await tipoComponenteComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last TipoComponente', async () => {
    const nbButtonsBeforeDelete = await tipoComponenteComponentsPage.countDeleteButtons();
    await tipoComponenteComponentsPage.clickOnLastDeleteButton();

    tipoComponenteDeleteDialog = new TipoComponenteDeleteDialog();
    expect(await tipoComponenteDeleteDialog.getDialogTitle()).to.eq('gatewayApp.monitoreoTipoComponente.delete.question');
    await tipoComponenteDeleteDialog.clickOnConfirmButton();

    expect(await tipoComponenteComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
