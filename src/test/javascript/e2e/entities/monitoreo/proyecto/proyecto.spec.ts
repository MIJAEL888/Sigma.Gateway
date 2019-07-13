/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { ProyectoComponentsPage, ProyectoDeleteDialog, ProyectoUpdatePage } from './proyecto.page-object';

const expect = chai.expect;

describe('Proyecto e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let proyectoUpdatePage: ProyectoUpdatePage;
  let proyectoComponentsPage: ProyectoComponentsPage;
  let proyectoDeleteDialog: ProyectoDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Proyectos', async () => {
    await navBarPage.goToEntity('proyecto');
    proyectoComponentsPage = new ProyectoComponentsPage();
    await browser.wait(ec.visibilityOf(proyectoComponentsPage.title), 5000);
    expect(await proyectoComponentsPage.getTitle()).to.eq('gatewayApp.monitoreoProyecto.home.title');
  });

  it('should load create Proyecto page', async () => {
    await proyectoComponentsPage.clickOnCreateButton();
    proyectoUpdatePage = new ProyectoUpdatePage();
    expect(await proyectoUpdatePage.getPageTitle()).to.eq('gatewayApp.monitoreoProyecto.home.createOrEditLabel');
    await proyectoUpdatePage.cancel();
  });

  it('should create and save Proyectos', async () => {
    const nbButtonsBeforeCreate = await proyectoComponentsPage.countDeleteButtons();

    await proyectoComponentsPage.clickOnCreateButton();
    await promise.all([
      proyectoUpdatePage.setCodigoInput('codigo'),
      proyectoUpdatePage.setCodigoSolicitudInput('codigoSolicitud'),
      proyectoUpdatePage.setCodigoResponsableInput('codigoResponsable'),
      proyectoUpdatePage.estadoSelectLastOption(),
      proyectoUpdatePage.setFechaIncioInput('2000-12-31'),
      proyectoUpdatePage.setFechaFinaInput('2000-12-31'),
      proyectoUpdatePage.setDescripcionInput('descripcion'),
      proyectoUpdatePage.setComentarioInput('comentario')
    ]);
    expect(await proyectoUpdatePage.getCodigoInput()).to.eq('codigo', 'Expected Codigo value to be equals to codigo');
    expect(await proyectoUpdatePage.getCodigoSolicitudInput()).to.eq(
      'codigoSolicitud',
      'Expected CodigoSolicitud value to be equals to codigoSolicitud'
    );
    expect(await proyectoUpdatePage.getCodigoResponsableInput()).to.eq(
      'codigoResponsable',
      'Expected CodigoResponsable value to be equals to codigoResponsable'
    );
    expect(await proyectoUpdatePage.getFechaIncioInput()).to.eq('2000-12-31', 'Expected fechaIncio value to be equals to 2000-12-31');
    expect(await proyectoUpdatePage.getFechaFinaInput()).to.eq('2000-12-31', 'Expected fechaFina value to be equals to 2000-12-31');
    expect(await proyectoUpdatePage.getDescripcionInput()).to.eq('descripcion', 'Expected Descripcion value to be equals to descripcion');
    expect(await proyectoUpdatePage.getComentarioInput()).to.eq('comentario', 'Expected Comentario value to be equals to comentario');
    await proyectoUpdatePage.save();
    expect(await proyectoUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await proyectoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Proyecto', async () => {
    const nbButtonsBeforeDelete = await proyectoComponentsPage.countDeleteButtons();
    await proyectoComponentsPage.clickOnLastDeleteButton();

    proyectoDeleteDialog = new ProyectoDeleteDialog();
    expect(await proyectoDeleteDialog.getDialogTitle()).to.eq('gatewayApp.monitoreoProyecto.delete.question');
    await proyectoDeleteDialog.clickOnConfirmButton();

    expect(await proyectoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
