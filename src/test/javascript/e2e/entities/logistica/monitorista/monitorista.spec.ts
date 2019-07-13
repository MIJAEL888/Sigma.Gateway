/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { MonitoristaComponentsPage, MonitoristaDeleteDialog, MonitoristaUpdatePage } from './monitorista.page-object';

const expect = chai.expect;

describe('Monitorista e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let monitoristaUpdatePage: MonitoristaUpdatePage;
  let monitoristaComponentsPage: MonitoristaComponentsPage;
  let monitoristaDeleteDialog: MonitoristaDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Monitoristas', async () => {
    await navBarPage.goToEntity('monitorista');
    monitoristaComponentsPage = new MonitoristaComponentsPage();
    await browser.wait(ec.visibilityOf(monitoristaComponentsPage.title), 5000);
    expect(await monitoristaComponentsPage.getTitle()).to.eq('gatewayApp.logisticaMonitorista.home.title');
  });

  it('should load create Monitorista page', async () => {
    await monitoristaComponentsPage.clickOnCreateButton();
    monitoristaUpdatePage = new MonitoristaUpdatePage();
    expect(await monitoristaUpdatePage.getPageTitle()).to.eq('gatewayApp.logisticaMonitorista.home.createOrEditLabel');
    await monitoristaUpdatePage.cancel();
  });

  it('should create and save Monitoristas', async () => {
    const nbButtonsBeforeCreate = await monitoristaComponentsPage.countDeleteButtons();

    await monitoristaComponentsPage.clickOnCreateButton();
    await promise.all([
      monitoristaUpdatePage.setNombreInput('nombre'),
      monitoristaUpdatePage.setApellidoPaternoInput('apellidoPaterno'),
      monitoristaUpdatePage.setApellidoMaternoInput('apellidoMaterno'),
      monitoristaUpdatePage.setDniInput('dni'),
      monitoristaUpdatePage.setFechaNacimientoInput('2000-12-31'),
      monitoristaUpdatePage.laboratorioSelectLastOption()
      // monitoristaUpdatePage.tipoSeguroSelectLastOption(),
    ]);
    expect(await monitoristaUpdatePage.getNombreInput()).to.eq('nombre', 'Expected Nombre value to be equals to nombre');
    expect(await monitoristaUpdatePage.getApellidoPaternoInput()).to.eq(
      'apellidoPaterno',
      'Expected ApellidoPaterno value to be equals to apellidoPaterno'
    );
    expect(await monitoristaUpdatePage.getApellidoMaternoInput()).to.eq(
      'apellidoMaterno',
      'Expected ApellidoMaterno value to be equals to apellidoMaterno'
    );
    expect(await monitoristaUpdatePage.getDniInput()).to.eq('dni', 'Expected Dni value to be equals to dni');
    expect(await monitoristaUpdatePage.getFechaNacimientoInput()).to.eq(
      '2000-12-31',
      'Expected fechaNacimiento value to be equals to 2000-12-31'
    );
    await monitoristaUpdatePage.save();
    expect(await monitoristaUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await monitoristaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Monitorista', async () => {
    const nbButtonsBeforeDelete = await monitoristaComponentsPage.countDeleteButtons();
    await monitoristaComponentsPage.clickOnLastDeleteButton();

    monitoristaDeleteDialog = new MonitoristaDeleteDialog();
    expect(await monitoristaDeleteDialog.getDialogTitle()).to.eq('gatewayApp.logisticaMonitorista.delete.question');
    await monitoristaDeleteDialog.clickOnConfirmButton();

    expect(await monitoristaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
