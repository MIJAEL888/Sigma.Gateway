import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { INormaCalidad, NormaCalidad } from 'app/shared/model/monitoreo/norma-calidad.model';
import { NormaCalidadService } from './norma-calidad.service';

@Component({
  selector: 'jhi-norma-calidad-update',
  templateUrl: './norma-calidad-update.component.html'
})
export class NormaCalidadUpdateComponent implements OnInit {
  isSaving: boolean;
  fechaPublicacionDp: any;

  editForm = this.fb.group({
    id: [],
    nombre: [null, [Validators.required]],
    codigo: [],
    fechaPublicacion: [],
    tipo: [],
    fuente: [],
    rutaDocNorma: [],
    nombreDocNorma: [],
    documentoNorma: [],
    documentoNormaContentType: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected jhiAlertService: JhiAlertService,
    protected normaCalidadService: NormaCalidadService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ normaCalidad }) => {
      this.updateForm(normaCalidad);
    });
  }

  updateForm(normaCalidad: INormaCalidad) {
    this.editForm.patchValue({
      id: normaCalidad.id,
      nombre: normaCalidad.nombre,
      codigo: normaCalidad.codigo,
      fechaPublicacion: normaCalidad.fechaPublicacion,
      tipo: normaCalidad.tipo,
      fuente: normaCalidad.fuente,
      rutaDocNorma: normaCalidad.rutaDocNorma,
      nombreDocNorma: normaCalidad.nombreDocNorma,
      documentoNorma: normaCalidad.documentoNorma,
      documentoNormaContentType: normaCalidad.documentoNormaContentType
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
    const normaCalidad = this.createFromForm();
    if (normaCalidad.id !== undefined) {
      this.subscribeToSaveResponse(this.normaCalidadService.update(normaCalidad));
    } else {
      this.subscribeToSaveResponse(this.normaCalidadService.create(normaCalidad));
    }
  }

  private createFromForm(): INormaCalidad {
    return {
      ...new NormaCalidad(),
      id: this.editForm.get(['id']).value,
      nombre: this.editForm.get(['nombre']).value,
      codigo: this.editForm.get(['codigo']).value,
      fechaPublicacion: this.editForm.get(['fechaPublicacion']).value,
      tipo: this.editForm.get(['tipo']).value,
      fuente: this.editForm.get(['fuente']).value,
      rutaDocNorma: this.editForm.get(['rutaDocNorma']).value,
      nombreDocNorma: this.editForm.get(['nombreDocNorma']).value,
      documentoNormaContentType: this.editForm.get(['documentoNormaContentType']).value,
      documentoNorma: this.editForm.get(['documentoNorma']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INormaCalidad>>) {
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
