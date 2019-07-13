/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { ContactoSedeComponentsPage, ContactoSedeDeleteDialog, ContactoSedeUpdatePage } from './contacto-sede.page-object';

const expect = chai.expect;

describe('ContactoSede e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let contactoSedeUpdatePage: ContactoSedeUpdatePage;
  let contactoSedeComponentsPage: ContactoSedeComponentsPage;
  let contactoSedeDeleteDialog: ContactoSedeDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load ContactoSedes', async () => {
    await navBarPage.goToEntity('contacto-sede');
    contactoSedeComponentsPage = new ContactoSedeComponentsPage();
    await browser.wait(ec.visibilityOf(contactoSedeComponentsPage.title), 5000);
    expect(await contactoSedeComponentsPage.getTitle()).to.eq('gatewayApp.comercialContactoSede.home.title');
  });

  it('should load create ContactoSede page', async () => {
    await contactoSedeComponentsPage.clickOnCreateButton();
    contactoSedeUpdatePage = new ContactoSedeUpdatePage();
    expect(await contactoSedeUpdatePage.getPageTitle()).to.eq('gatewayApp.comercialContactoSede.home.createOrEditLabel');
    await contactoSedeUpdatePage.cancel();
  });

  it('should create and save ContactoSedes', async () => {
    const nbButtonsBeforeCreate = await contactoSedeComponentsPage.countDeleteButtons();

    await contactoSedeComponentsPage.clickOnCreateButton();
    await promise.all([
      contactoSedeUpdatePage.setNombreInput('nombre'),
      contactoSedeUpdatePage.setTelefonoInput('telefono'),
      contactoSedeUpdatePage.setCorreoInput('correo'),
      contactoSedeUpdatePage.setPosicionInput('posicion'),
      contactoSedeUpdatePage.sedeSelectLastOption()
    ]);
    expect(await contactoSedeUpdatePage.getNombreInput()).to.eq('nombre', 'Expected Nombre value to be equals to nombre');
    expect(await contactoSedeUpdatePage.getTelefonoInput()).to.eq('telefono', 'Expected Telefono value to be equals to telefono');
    expect(await contactoSedeUpdatePage.getCorreoInput()).to.eq('correo', 'Expected Correo value to be equals to correo');
    expect(await contactoSedeUpdatePage.getPosicionInput()).to.eq('posicion', 'Expected Posicion value to be equals to posicion');
    await contactoSedeUpdatePage.save();
    expect(await contactoSedeUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await contactoSedeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last ContactoSede', async () => {
    const nbButtonsBeforeDelete = await contactoSedeComponentsPage.countDeleteButtons();
    await contactoSedeComponentsPage.clickOnLastDeleteButton();

    contactoSedeDeleteDialog = new ContactoSedeDeleteDialog();
    expect(await contactoSedeDeleteDialog.getDialogTitle()).to.eq('gatewayApp.comercialContactoSede.delete.question');
    await contactoSedeDeleteDialog.clickOnConfirmButton();

    expect(await contactoSedeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
