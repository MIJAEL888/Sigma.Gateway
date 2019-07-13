/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { ParamentroComponentsPage, ParamentroDeleteDialog, ParamentroUpdatePage } from './paramentro.page-object';

const expect = chai.expect;

describe('Paramentro e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let paramentroUpdatePage: ParamentroUpdatePage;
  let paramentroComponentsPage: ParamentroComponentsPage;
  let paramentroDeleteDialog: ParamentroDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Paramentros', async () => {
    await navBarPage.goToEntity('paramentro');
    paramentroComponentsPage = new ParamentroComponentsPage();
    await browser.wait(ec.visibilityOf(paramentroComponentsPage.title), 5000);
    expect(await paramentroComponentsPage.getTitle()).to.eq('gatewayApp.monitoreoParamentro.home.title');
  });

  it('should load create Paramentro page', async () => {
    await paramentroComponentsPage.clickOnCreateButton();
    paramentroUpdatePage = new ParamentroUpdatePage();
    expect(await paramentroUpdatePage.getPageTitle()).to.eq('gatewayApp.monitoreoParamentro.home.createOrEditLabel');
    await paramentroUpdatePage.cancel();
  });

  it('should create and save Paramentros', async () => {
    const nbButtonsBeforeCreate = await paramentroComponentsPage.countDeleteButtons();

    await paramentroComponentsPage.clickOnCreateButton();
    await promise.all([
      paramentroUpdatePage.setNombreInput('nombre'),
      paramentroUpdatePage.setSiglasInput('siglas'),
      paramentroUpdatePage.setDescripcionInput('descripcion'),
      paramentroUpdatePage.setCostoInput('5'),
      paramentroUpdatePage.setMetodologiaInput('metodologia'),
      paramentroUpdatePage.setMetodoEnsayoInput('metodoEnsayo'),
      paramentroUpdatePage.setLimiteCuantificacionInput('5'),
      paramentroUpdatePage.tipoComponenteSelectLastOption(),
      paramentroUpdatePage.normaCalidadSelectLastOption(),
      paramentroUpdatePage.puntoMonitoreoSelectLastOption(),
      paramentroUpdatePage.unidadesSelectLastOption()
    ]);
    expect(await paramentroUpdatePage.getNombreInput()).to.eq('nombre', 'Expected Nombre value to be equals to nombre');
    expect(await paramentroUpdatePage.getSiglasInput()).to.eq('siglas', 'Expected Siglas value to be equals to siglas');
    expect(await paramentroUpdatePage.getDescripcionInput()).to.eq('descripcion', 'Expected Descripcion value to be equals to descripcion');
    expect(await paramentroUpdatePage.getCostoInput()).to.eq('5', 'Expected costo value to be equals to 5');
    expect(await paramentroUpdatePage.getMetodologiaInput()).to.eq('metodologia', 'Expected Metodologia value to be equals to metodologia');
    expect(await paramentroUpdatePage.getMetodoEnsayoInput()).to.eq(
      'metodoEnsayo',
      'Expected MetodoEnsayo value to be equals to metodoEnsayo'
    );
    expect(await paramentroUpdatePage.getLimiteCuantificacionInput()).to.eq('5', 'Expected limiteCuantificacion value to be equals to 5');
    await paramentroUpdatePage.save();
    expect(await paramentroUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await paramentroComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Paramentro', async () => {
    const nbButtonsBeforeDelete = await paramentroComponentsPage.countDeleteButtons();
    await paramentroComponentsPage.clickOnLastDeleteButton();

    paramentroDeleteDialog = new ParamentroDeleteDialog();
    expect(await paramentroDeleteDialog.getDialogTitle()).to.eq('gatewayApp.monitoreoParamentro.delete.question');
    await paramentroDeleteDialog.clickOnConfirmButton();

    expect(await paramentroComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
