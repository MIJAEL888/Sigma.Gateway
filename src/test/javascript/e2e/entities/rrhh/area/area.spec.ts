/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { AreaComponentsPage, AreaDeleteDialog, AreaUpdatePage } from './area.page-object';

const expect = chai.expect;

describe('Area e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let areaUpdatePage: AreaUpdatePage;
  let areaComponentsPage: AreaComponentsPage;
  let areaDeleteDialog: AreaDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Areas', async () => {
    await navBarPage.goToEntity('area');
    areaComponentsPage = new AreaComponentsPage();
    await browser.wait(ec.visibilityOf(areaComponentsPage.title), 5000);
    expect(await areaComponentsPage.getTitle()).to.eq('gatewayApp.rrhhArea.home.title');
  });

  it('should load create Area page', async () => {
    await areaComponentsPage.clickOnCreateButton();
    areaUpdatePage = new AreaUpdatePage();
    expect(await areaUpdatePage.getPageTitle()).to.eq('gatewayApp.rrhhArea.home.createOrEditLabel');
    await areaUpdatePage.cancel();
  });

  it('should create and save Areas', async () => {
    const nbButtonsBeforeCreate = await areaComponentsPage.countDeleteButtons();

    await areaComponentsPage.clickOnCreateButton();
    await promise.all([
      areaUpdatePage.setNombreInput('nombre'),
      areaUpdatePage.setDescripcionInput('descripcion'),
      areaUpdatePage.setComentarioInput('comentario'),
      areaUpdatePage.gerenciaSelectLastOption()
    ]);
    expect(await areaUpdatePage.getNombreInput()).to.eq('nombre', 'Expected Nombre value to be equals to nombre');
    expect(await areaUpdatePage.getDescripcionInput()).to.eq('descripcion', 'Expected Descripcion value to be equals to descripcion');
    expect(await areaUpdatePage.getComentarioInput()).to.eq('comentario', 'Expected Comentario value to be equals to comentario');
    await areaUpdatePage.save();
    expect(await areaUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await areaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Area', async () => {
    const nbButtonsBeforeDelete = await areaComponentsPage.countDeleteButtons();
    await areaComponentsPage.clickOnLastDeleteButton();

    areaDeleteDialog = new AreaDeleteDialog();
    expect(await areaDeleteDialog.getDialogTitle()).to.eq('gatewayApp.rrhhArea.delete.question');
    await areaDeleteDialog.clickOnConfirmButton();

    expect(await areaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
