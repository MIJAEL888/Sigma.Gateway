/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { TipoSolicitudComponentsPage, TipoSolicitudDeleteDialog, TipoSolicitudUpdatePage } from './tipo-solicitud.page-object';

const expect = chai.expect;

describe('TipoSolicitud e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let tipoSolicitudUpdatePage: TipoSolicitudUpdatePage;
  let tipoSolicitudComponentsPage: TipoSolicitudComponentsPage;
  let tipoSolicitudDeleteDialog: TipoSolicitudDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load TipoSolicituds', async () => {
    await navBarPage.goToEntity('tipo-solicitud');
    tipoSolicitudComponentsPage = new TipoSolicitudComponentsPage();
    await browser.wait(ec.visibilityOf(tipoSolicitudComponentsPage.title), 5000);
    expect(await tipoSolicitudComponentsPage.getTitle()).to.eq('gatewayApp.comercialTipoSolicitud.home.title');
  });

  it('should load create TipoSolicitud page', async () => {
    await tipoSolicitudComponentsPage.clickOnCreateButton();
    tipoSolicitudUpdatePage = new TipoSolicitudUpdatePage();
    expect(await tipoSolicitudUpdatePage.getPageTitle()).to.eq('gatewayApp.comercialTipoSolicitud.home.createOrEditLabel');
    await tipoSolicitudUpdatePage.cancel();
  });

  it('should create and save TipoSolicituds', async () => {
    const nbButtonsBeforeCreate = await tipoSolicitudComponentsPage.countDeleteButtons();

    await tipoSolicitudComponentsPage.clickOnCreateButton();
    await promise.all([tipoSolicitudUpdatePage.setNombreInput('nombre'), tipoSolicitudUpdatePage.setDescripcionInput('descripcion')]);
    expect(await tipoSolicitudUpdatePage.getNombreInput()).to.eq('nombre', 'Expected Nombre value to be equals to nombre');
    expect(await tipoSolicitudUpdatePage.getDescripcionInput()).to.eq(
      'descripcion',
      'Expected Descripcion value to be equals to descripcion'
    );
    await tipoSolicitudUpdatePage.save();
    expect(await tipoSolicitudUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await tipoSolicitudComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last TipoSolicitud', async () => {
    const nbButtonsBeforeDelete = await tipoSolicitudComponentsPage.countDeleteButtons();
    await tipoSolicitudComponentsPage.clickOnLastDeleteButton();

    tipoSolicitudDeleteDialog = new TipoSolicitudDeleteDialog();
    expect(await tipoSolicitudDeleteDialog.getDialogTitle()).to.eq('gatewayApp.comercialTipoSolicitud.delete.question');
    await tipoSolicitudDeleteDialog.clickOnConfirmButton();

    expect(await tipoSolicitudComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
