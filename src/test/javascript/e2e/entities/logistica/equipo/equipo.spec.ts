/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { EquipoComponentsPage, EquipoDeleteDialog, EquipoUpdatePage } from './equipo.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('Equipo e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let equipoUpdatePage: EquipoUpdatePage;
  let equipoComponentsPage: EquipoComponentsPage;
  let equipoDeleteDialog: EquipoDeleteDialog;
  const fileNameToUpload = 'logo-jhipster.png';
  const fileToUpload = '../../../../../../../src/main/webapp/content/images/' + fileNameToUpload;
  const absolutePath = path.resolve(__dirname, fileToUpload);

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Equipos', async () => {
    await navBarPage.goToEntity('equipo');
    equipoComponentsPage = new EquipoComponentsPage();
    await browser.wait(ec.visibilityOf(equipoComponentsPage.title), 5000);
    expect(await equipoComponentsPage.getTitle()).to.eq('gatewayApp.logisticaEquipo.home.title');
  });

  it('should load create Equipo page', async () => {
    await equipoComponentsPage.clickOnCreateButton();
    equipoUpdatePage = new EquipoUpdatePage();
    expect(await equipoUpdatePage.getPageTitle()).to.eq('gatewayApp.logisticaEquipo.home.createOrEditLabel');
    await equipoUpdatePage.cancel();
  });

  it('should create and save Equipos', async () => {
    const nbButtonsBeforeCreate = await equipoComponentsPage.countDeleteButtons();

    await equipoComponentsPage.clickOnCreateButton();
    await promise.all([
      equipoUpdatePage.setCodigoEquipoInput('codigoEquipo'),
      equipoUpdatePage.setSerieInput('serie'),
      equipoUpdatePage.setCalibradoDesdeInput('2000-12-31'),
      equipoUpdatePage.setCalibradoHastaInput('2000-12-31'),
      equipoUpdatePage.setRutaDocCalibracionInput('rutaDocCalibracion'),
      equipoUpdatePage.setNombreDocCalibracionInput('nombreDocCalibracion'),
      equipoUpdatePage.setDocumentoCalibracionInput(absolutePath),
      equipoUpdatePage.estadoSelectLastOption(),
      equipoUpdatePage.setFechaCompraInput('2000-12-31'),
      equipoUpdatePage.setObservacionInput('observacion'),
      equipoUpdatePage.setComentarioInput('comentario'),
      equipoUpdatePage.setTestInput(absolutePath),
      equipoUpdatePage.modeloSelectLastOption()
    ]);
    expect(await equipoUpdatePage.getCodigoEquipoInput()).to.eq('codigoEquipo', 'Expected CodigoEquipo value to be equals to codigoEquipo');
    expect(await equipoUpdatePage.getSerieInput()).to.eq('serie', 'Expected Serie value to be equals to serie');
    expect(await equipoUpdatePage.getCalibradoDesdeInput()).to.eq('2000-12-31', 'Expected calibradoDesde value to be equals to 2000-12-31');
    expect(await equipoUpdatePage.getCalibradoHastaInput()).to.eq('2000-12-31', 'Expected calibradoHasta value to be equals to 2000-12-31');
    expect(await equipoUpdatePage.getRutaDocCalibracionInput()).to.eq(
      'rutaDocCalibracion',
      'Expected RutaDocCalibracion value to be equals to rutaDocCalibracion'
    );
    expect(await equipoUpdatePage.getNombreDocCalibracionInput()).to.eq(
      'nombreDocCalibracion',
      'Expected NombreDocCalibracion value to be equals to nombreDocCalibracion'
    );
    expect(await equipoUpdatePage.getDocumentoCalibracionInput()).to.endsWith(
      fileNameToUpload,
      'Expected DocumentoCalibracion value to be end with ' + fileNameToUpload
    );
    expect(await equipoUpdatePage.getFechaCompraInput()).to.eq('2000-12-31', 'Expected fechaCompra value to be equals to 2000-12-31');
    expect(await equipoUpdatePage.getObservacionInput()).to.eq('observacion', 'Expected Observacion value to be equals to observacion');
    expect(await equipoUpdatePage.getComentarioInput()).to.eq('comentario', 'Expected Comentario value to be equals to comentario');
    expect(await equipoUpdatePage.getTestInput()).to.endsWith(fileNameToUpload, 'Expected Test value to be end with ' + fileNameToUpload);
    await equipoUpdatePage.save();
    expect(await equipoUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await equipoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Equipo', async () => {
    const nbButtonsBeforeDelete = await equipoComponentsPage.countDeleteButtons();
    await equipoComponentsPage.clickOnLastDeleteButton();

    equipoDeleteDialog = new EquipoDeleteDialog();
    expect(await equipoDeleteDialog.getDialogTitle()).to.eq('gatewayApp.logisticaEquipo.delete.question');
    await equipoDeleteDialog.clickOnConfirmButton();

    expect(await equipoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
