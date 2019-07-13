/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { PosicionComponentsPage, PosicionDeleteDialog, PosicionUpdatePage } from './posicion.page-object';

const expect = chai.expect;

describe('Posicion e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let posicionUpdatePage: PosicionUpdatePage;
  let posicionComponentsPage: PosicionComponentsPage;
  let posicionDeleteDialog: PosicionDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Posicions', async () => {
    await navBarPage.goToEntity('posicion');
    posicionComponentsPage = new PosicionComponentsPage();
    await browser.wait(ec.visibilityOf(posicionComponentsPage.title), 5000);
    expect(await posicionComponentsPage.getTitle()).to.eq('gatewayApp.rrhhPosicion.home.title');
  });

  it('should load create Posicion page', async () => {
    await posicionComponentsPage.clickOnCreateButton();
    posicionUpdatePage = new PosicionUpdatePage();
    expect(await posicionUpdatePage.getPageTitle()).to.eq('gatewayApp.rrhhPosicion.home.createOrEditLabel');
    await posicionUpdatePage.cancel();
  });

  it('should create and save Posicions', async () => {
    const nbButtonsBeforeCreate = await posicionComponentsPage.countDeleteButtons();

    await posicionComponentsPage.clickOnCreateButton();
    await promise.all([
      posicionUpdatePage.setNombreInput('nombre'),
      posicionUpdatePage.setDescripcionInput('descripcion'),
      posicionUpdatePage.setFuncionesInput('funciones'),
      posicionUpdatePage.areaSelectLastOption()
    ]);
    expect(await posicionUpdatePage.getNombreInput()).to.eq('nombre', 'Expected Nombre value to be equals to nombre');
    expect(await posicionUpdatePage.getDescripcionInput()).to.eq('descripcion', 'Expected Descripcion value to be equals to descripcion');
    expect(await posicionUpdatePage.getFuncionesInput()).to.eq('funciones', 'Expected Funciones value to be equals to funciones');
    await posicionUpdatePage.save();
    expect(await posicionUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await posicionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Posicion', async () => {
    const nbButtonsBeforeDelete = await posicionComponentsPage.countDeleteButtons();
    await posicionComponentsPage.clickOnLastDeleteButton();

    posicionDeleteDialog = new PosicionDeleteDialog();
    expect(await posicionDeleteDialog.getDialogTitle()).to.eq('gatewayApp.rrhhPosicion.delete.question');
    await posicionDeleteDialog.clickOnConfirmButton();

    expect(await posicionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
