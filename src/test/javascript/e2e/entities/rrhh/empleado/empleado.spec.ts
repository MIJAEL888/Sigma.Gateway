/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { EmpleadoComponentsPage, EmpleadoDeleteDialog, EmpleadoUpdatePage } from './empleado.page-object';

const expect = chai.expect;

describe('Empleado e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let empleadoUpdatePage: EmpleadoUpdatePage;
  let empleadoComponentsPage: EmpleadoComponentsPage;
  let empleadoDeleteDialog: EmpleadoDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Empleados', async () => {
    await navBarPage.goToEntity('empleado');
    empleadoComponentsPage = new EmpleadoComponentsPage();
    await browser.wait(ec.visibilityOf(empleadoComponentsPage.title), 5000);
    expect(await empleadoComponentsPage.getTitle()).to.eq('gatewayApp.rrhhEmpleado.home.title');
  });

  it('should load create Empleado page', async () => {
    await empleadoComponentsPage.clickOnCreateButton();
    empleadoUpdatePage = new EmpleadoUpdatePage();
    expect(await empleadoUpdatePage.getPageTitle()).to.eq('gatewayApp.rrhhEmpleado.home.createOrEditLabel');
    await empleadoUpdatePage.cancel();
  });

  it('should create and save Empleados', async () => {
    const nbButtonsBeforeCreate = await empleadoComponentsPage.countDeleteButtons();

    await empleadoComponentsPage.clickOnCreateButton();
    await promise.all([
      empleadoUpdatePage.setNombreInput('nombre'),
      empleadoUpdatePage.setApellidoPaternoInput('apellidoPaterno'),
      empleadoUpdatePage.setApellidoMaternoInput('apellidoMaterno'),
      empleadoUpdatePage.tipoDocumentoSelectLastOption(),
      empleadoUpdatePage.setNumeroDocumentoInput('numeroDocumento'),
      empleadoUpdatePage.setFechaNacimientoInput('2000-12-31'),
      empleadoUpdatePage.setFechaIngresoInput('2000-12-31'),
      empleadoUpdatePage.tipoContratoSelectLastOption(),
      empleadoUpdatePage.tipoAportacionSelectLastOption(),
      empleadoUpdatePage.estadoSelectLastOption(),
      empleadoUpdatePage.setFechaCreacionInput('2000-12-31'),
      empleadoUpdatePage.setFechaActualizacionInput('2000-12-31'),
      empleadoUpdatePage.setDireccionInput('direccion'),
      empleadoUpdatePage.estadoCivilSelectLastOption(),
      empleadoUpdatePage.posicionSelectLastOption()
    ]);
    expect(await empleadoUpdatePage.getNombreInput()).to.eq('nombre', 'Expected Nombre value to be equals to nombre');
    expect(await empleadoUpdatePage.getApellidoPaternoInput()).to.eq(
      'apellidoPaterno',
      'Expected ApellidoPaterno value to be equals to apellidoPaterno'
    );
    expect(await empleadoUpdatePage.getApellidoMaternoInput()).to.eq(
      'apellidoMaterno',
      'Expected ApellidoMaterno value to be equals to apellidoMaterno'
    );
    expect(await empleadoUpdatePage.getNumeroDocumentoInput()).to.eq(
      'numeroDocumento',
      'Expected NumeroDocumento value to be equals to numeroDocumento'
    );
    expect(await empleadoUpdatePage.getFechaNacimientoInput()).to.eq(
      '2000-12-31',
      'Expected fechaNacimiento value to be equals to 2000-12-31'
    );
    expect(await empleadoUpdatePage.getFechaIngresoInput()).to.eq('2000-12-31', 'Expected fechaIngreso value to be equals to 2000-12-31');
    expect(await empleadoUpdatePage.getFechaCreacionInput()).to.eq('2000-12-31', 'Expected fechaCreacion value to be equals to 2000-12-31');
    expect(await empleadoUpdatePage.getFechaActualizacionInput()).to.eq(
      '2000-12-31',
      'Expected fechaActualizacion value to be equals to 2000-12-31'
    );
    expect(await empleadoUpdatePage.getDireccionInput()).to.eq('direccion', 'Expected Direccion value to be equals to direccion');
    await empleadoUpdatePage.save();
    expect(await empleadoUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await empleadoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Empleado', async () => {
    const nbButtonsBeforeDelete = await empleadoComponentsPage.countDeleteButtons();
    await empleadoComponentsPage.clickOnLastDeleteButton();

    empleadoDeleteDialog = new EmpleadoDeleteDialog();
    expect(await empleadoDeleteDialog.getDialogTitle()).to.eq('gatewayApp.rrhhEmpleado.delete.question');
    await empleadoDeleteDialog.clickOnConfirmButton();

    expect(await empleadoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
