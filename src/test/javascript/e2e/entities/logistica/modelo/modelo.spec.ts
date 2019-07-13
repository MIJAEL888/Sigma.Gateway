/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { ModeloComponentsPage, ModeloDeleteDialog, ModeloUpdatePage } from './modelo.page-object';

const expect = chai.expect;

describe('Modelo e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let modeloUpdatePage: ModeloUpdatePage;
  let modeloComponentsPage: ModeloComponentsPage;
  let modeloDeleteDialog: ModeloDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Modelos', async () => {
    await navBarPage.goToEntity('modelo');
    modeloComponentsPage = new ModeloComponentsPage();
    await browser.wait(ec.visibilityOf(modeloComponentsPage.title), 5000);
    expect(await modeloComponentsPage.getTitle()).to.eq('gatewayApp.logisticaModelo.home.title');
  });

  it('should load create Modelo page', async () => {
    await modeloComponentsPage.clickOnCreateButton();
    modeloUpdatePage = new ModeloUpdatePage();
    expect(await modeloUpdatePage.getPageTitle()).to.eq('gatewayApp.logisticaModelo.home.createOrEditLabel');
    await modeloUpdatePage.cancel();
  });

  it('should create and save Modelos', async () => {
    const nbButtonsBeforeCreate = await modeloComponentsPage.countDeleteButtons();

    await modeloComponentsPage.clickOnCreateButton();
    await promise.all([
      modeloUpdatePage.setNombreInput('nombre'),
      modeloUpdatePage.setDescripcionInput('descripcion'),
      modeloUpdatePage.tipoEuipoSelectLastOption(),
      modeloUpdatePage.marcaSelectLastOption()
    ]);
    expect(await modeloUpdatePage.getNombreInput()).to.eq('nombre', 'Expected Nombre value to be equals to nombre');
    expect(await modeloUpdatePage.getDescripcionInput()).to.eq('descripcion', 'Expected Descripcion value to be equals to descripcion');
    await modeloUpdatePage.save();
    expect(await modeloUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await modeloComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Modelo', async () => {
    const nbButtonsBeforeDelete = await modeloComponentsPage.countDeleteButtons();
    await modeloComponentsPage.clickOnLastDeleteButton();

    modeloDeleteDialog = new ModeloDeleteDialog();
    expect(await modeloDeleteDialog.getDialogTitle()).to.eq('gatewayApp.logisticaModelo.delete.question');
    await modeloDeleteDialog.clickOnConfirmButton();

    expect(await modeloComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
