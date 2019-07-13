/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { ClienteComponentsPage, ClienteDeleteDialog, ClienteUpdatePage } from './cliente.page-object';

const expect = chai.expect;

describe('Cliente e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let clienteUpdatePage: ClienteUpdatePage;
  let clienteComponentsPage: ClienteComponentsPage;
  let clienteDeleteDialog: ClienteDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Clientes', async () => {
    await navBarPage.goToEntity('cliente');
    clienteComponentsPage = new ClienteComponentsPage();
    await browser.wait(ec.visibilityOf(clienteComponentsPage.title), 5000);
    expect(await clienteComponentsPage.getTitle()).to.eq('gatewayApp.comercialCliente.home.title');
  });

  it('should load create Cliente page', async () => {
    await clienteComponentsPage.clickOnCreateButton();
    clienteUpdatePage = new ClienteUpdatePage();
    expect(await clienteUpdatePage.getPageTitle()).to.eq('gatewayApp.comercialCliente.home.createOrEditLabel');
    await clienteUpdatePage.cancel();
  });

  it('should create and save Clientes', async () => {
    const nbButtonsBeforeCreate = await clienteComponentsPage.countDeleteButtons();

    await clienteComponentsPage.clickOnCreateButton();
    await promise.all([
      clienteUpdatePage.setRazonSocialInput('razonSocial'),
      clienteUpdatePage.setDireccionInput('direccion'),
      clienteUpdatePage.setRucInput('ruc'),
      clienteUpdatePage.setTelefonoInput('telefono'),
      clienteUpdatePage.setCorreoInput('correo'),
      clienteUpdatePage.setNombreContactoInput('nombreContacto'),
      clienteUpdatePage.setActividadInput('actividad'),
      clienteUpdatePage.setComentarioInput('comentario'),
      clienteUpdatePage.setFechaCreacionInput('2000-12-31'),
      clienteUpdatePage.setCodigoZonaInput('codigoZona')
    ]);
    expect(await clienteUpdatePage.getRazonSocialInput()).to.eq('razonSocial', 'Expected RazonSocial value to be equals to razonSocial');
    expect(await clienteUpdatePage.getDireccionInput()).to.eq('direccion', 'Expected Direccion value to be equals to direccion');
    expect(await clienteUpdatePage.getRucInput()).to.eq('ruc', 'Expected Ruc value to be equals to ruc');
    expect(await clienteUpdatePage.getTelefonoInput()).to.eq('telefono', 'Expected Telefono value to be equals to telefono');
    expect(await clienteUpdatePage.getCorreoInput()).to.eq('correo', 'Expected Correo value to be equals to correo');
    expect(await clienteUpdatePage.getNombreContactoInput()).to.eq(
      'nombreContacto',
      'Expected NombreContacto value to be equals to nombreContacto'
    );
    expect(await clienteUpdatePage.getActividadInput()).to.eq('actividad', 'Expected Actividad value to be equals to actividad');
    expect(await clienteUpdatePage.getComentarioInput()).to.eq('comentario', 'Expected Comentario value to be equals to comentario');
    expect(await clienteUpdatePage.getFechaCreacionInput()).to.eq('2000-12-31', 'Expected fechaCreacion value to be equals to 2000-12-31');
    expect(await clienteUpdatePage.getCodigoZonaInput()).to.eq('codigoZona', 'Expected CodigoZona value to be equals to codigoZona');
    await clienteUpdatePage.save();
    expect(await clienteUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await clienteComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Cliente', async () => {
    const nbButtonsBeforeDelete = await clienteComponentsPage.countDeleteButtons();
    await clienteComponentsPage.clickOnLastDeleteButton();

    clienteDeleteDialog = new ClienteDeleteDialog();
    expect(await clienteDeleteDialog.getDialogTitle()).to.eq('gatewayApp.comercialCliente.delete.question');
    await clienteDeleteDialog.clickOnConfirmButton();

    expect(await clienteComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
