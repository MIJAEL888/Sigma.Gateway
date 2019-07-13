/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import {
  RequisitosSeguridadComponentsPage,
  RequisitosSeguridadDeleteDialog,
  RequisitosSeguridadUpdatePage
} from './requisitos-seguridad.page-object';

const expect = chai.expect;

describe('RequisitosSeguridad e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let requisitosSeguridadUpdatePage: RequisitosSeguridadUpdatePage;
  let requisitosSeguridadComponentsPage: RequisitosSeguridadComponentsPage;
  let requisitosSeguridadDeleteDialog: RequisitosSeguridadDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load RequisitosSeguridads', async () => {
    await navBarPage.goToEntity('requisitos-seguridad');
    requisitosSeguridadComponentsPage = new RequisitosSeguridadComponentsPage();
    await browser.wait(ec.visibilityOf(requisitosSeguridadComponentsPage.title), 5000);
    expect(await requisitosSeguridadComponentsPage.getTitle()).to.eq('gatewayApp.comercialRequisitosSeguridad.home.title');
  });

  it('should load create RequisitosSeguridad page', async () => {
    await requisitosSeguridadComponentsPage.clickOnCreateButton();
    requisitosSeguridadUpdatePage = new RequisitosSeguridadUpdatePage();
    expect(await requisitosSeguridadUpdatePage.getPageTitle()).to.eq('gatewayApp.comercialRequisitosSeguridad.home.createOrEditLabel');
    await requisitosSeguridadUpdatePage.cancel();
  });

  it('should create and save RequisitosSeguridads', async () => {
    const nbButtonsBeforeCreate = await requisitosSeguridadComponentsPage.countDeleteButtons();

    await requisitosSeguridadComponentsPage.clickOnCreateButton();
    await promise.all([
      requisitosSeguridadUpdatePage.setNombreInput('nombre'),
      requisitosSeguridadUpdatePage.setDescripcionInput('descripcion')
    ]);
    expect(await requisitosSeguridadUpdatePage.getNombreInput()).to.eq('nombre', 'Expected Nombre value to be equals to nombre');
    expect(await requisitosSeguridadUpdatePage.getDescripcionInput()).to.eq(
      'descripcion',
      'Expected Descripcion value to be equals to descripcion'
    );
    await requisitosSeguridadUpdatePage.save();
    expect(await requisitosSeguridadUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await requisitosSeguridadComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last RequisitosSeguridad', async () => {
    const nbButtonsBeforeDelete = await requisitosSeguridadComponentsPage.countDeleteButtons();
    await requisitosSeguridadComponentsPage.clickOnLastDeleteButton();

    requisitosSeguridadDeleteDialog = new RequisitosSeguridadDeleteDialog();
    expect(await requisitosSeguridadDeleteDialog.getDialogTitle()).to.eq('gatewayApp.comercialRequisitosSeguridad.delete.question');
    await requisitosSeguridadDeleteDialog.clickOnConfirmButton();

    expect(await requisitosSeguridadComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
