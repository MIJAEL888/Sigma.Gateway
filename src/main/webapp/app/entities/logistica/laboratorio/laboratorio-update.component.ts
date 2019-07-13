import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { ILaboratorio, Laboratorio } from 'app/shared/model/logistica/laboratorio.model';
import { LaboratorioService } from './laboratorio.service';

@Component({
  selector: 'jhi-laboratorio-update',
  templateUrl: './laboratorio-update.component.html'
})
export class LaboratorioUpdateComponent implements OnInit {
  isSaving: boolean;
  vigenciaDesdeDp: any;
  vigenciaHastaDp: any;
  fechaCreacionDp: any;

  editForm = this.fb.group({
    id: [],
    razonSocial: [null, [Validators.required]],
    direccion: [null, [Validators.required]],
    ruc: [null, [Validators.required]],
    acreditadoPor: [],
    numeroAcreditacion: [],
    rutaDocAcreditacion: [],
    nombreDocAcreditacion: [],
    documentoAcreditacion: [],
    documentoAcreditacionContentType: [],
    vigenciaDesde: [],
    vigenciaHasta: [],
    telefono: [],
    correo: [],
    nombreContacto: [],
    fechaCreacion: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected jhiAlertService: JhiAlertService,
    protected laboratorioService: LaboratorioService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ laboratorio }) => {
      this.updateForm(laboratorio);
    });
  }

  updateForm(laboratorio: ILaboratorio) {
    this.editForm.patchValue({
      id: laboratorio.id,
      razonSocial: laboratorio.razonSocial,
      direccion: laboratorio.direccion,
      ruc: laboratorio.ruc,
      acreditadoPor: laboratorio.acreditadoPor,
      numeroAcreditacion: laboratorio.numeroAcreditacion,
      rutaDocAcreditacion: laboratorio.rutaDocAcreditacion,
      nombreDocAcreditacion: laboratorio.nombreDocAcreditacion,
      documentoAcreditacion: laboratorio.documentoAcreditacion,
      documentoAcreditacionContentType: laboratorio.documentoAcreditacionContentType,
      vigenciaDesde: laboratorio.vigenciaDesde,
      vigenciaHasta: laboratorio.vigenciaHasta,
      telefono: laboratorio.telefono,
      correo: laboratorio.correo,
      nombreContacto: laboratorio.nombreContacto,
      fechaCreacion: laboratorio.fechaCreacion
    });
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  setFileData(event, field: string, isImage) {
    return new Promise((resolve, reject) => {
      if (event && event.target && event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        if (isImage && !/^image\//.test(file.type)) {
          reject(`File was expected to be an image but was found to be ${file.type}`);
        } else {
          const filedContentType: string = field + 'ContentType';
          this.dataUtils.toBase64(file, base64Data => {
            this.editForm.patchValue({
              [field]: base64Data,
              [filedContentType]: file.type
            });
          });
        }
      } else {
        reject(`Base64 data was not set as file could not be extracted from passed parameter: ${event}`);
      }
    }).then(
      () => console.log('blob added'), // sucess
      this.onError
    );
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const laboratorio = this.createFromForm();
    if (laboratorio.id !== undefined) {
      this.subscribeToSaveResponse(this.laboratorioService.update(laboratorio));
    } else {
      this.subscribeToSaveResponse(this.laboratorioService.create(laboratorio));
    }
  }

  private createFromForm(): ILaboratorio {
    return {
      ...new Laboratorio(),
      id: this.editForm.get(['id']).value,
      razonSocial: this.editForm.get(['razonSocial']).value,
      direccion: this.editForm.get(['direccion']).value,
      ruc: this.editForm.get(['ruc']).value,
      acreditadoPor: this.editForm.get(['acreditadoPor']).value,
      numeroAcreditacion: this.editForm.get(['numeroAcreditacion']).value,
      rutaDocAcreditacion: this.editForm.get(['rutaDocAcreditacion']).value,
      nombreDocAcreditacion: this.editForm.get(['nombreDocAcreditacion']).value,
      documentoAcreditacionContentType: this.editForm.get(['documentoAcreditacionContentType']).value,
      documentoAcreditacion: this.editForm.get(['documentoAcreditacion']).value,
      vigenciaDesde: this.editForm.get(['vigenciaDesde']).value,
      vigenciaHasta: this.editForm.get(['vigenciaHasta']).value,
      telefono: this.editForm.get(['telefono']).value,
      correo: this.editForm.get(['correo']).value,
      nombreContacto: this.editForm.get(['nombreContacto']).value,
      fechaCreacion: this.editForm.get(['fechaCreacion']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILaboratorio>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
