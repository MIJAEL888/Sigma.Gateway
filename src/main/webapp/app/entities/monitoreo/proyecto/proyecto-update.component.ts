import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IProyecto, Proyecto } from 'app/shared/model/monitoreo/proyecto.model';
import { ProyectoService } from './proyecto.service';

@Component({
  selector: 'jhi-proyecto-update',
  templateUrl: './proyecto-update.component.html'
})
export class ProyectoUpdateComponent implements OnInit {
  isSaving: boolean;
  fechaIncioDp: any;
  fechaFinaDp: any;

  editForm = this.fb.group({
    id: [],
    codigo: [],
    codigoSolicitud: [],
    codigoResponsable: [],
    estado: [],
    fechaIncio: [],
    fechaFina: [],
    descripcion: [],
    comentario: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected jhiAlertService: JhiAlertService,
    protected proyectoService: ProyectoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ proyecto }) => {
      this.updateForm(proyecto);
    });
  }

  updateForm(proyecto: IProyecto) {
    this.editForm.patchValue({
      id: proyecto.id,
      codigo: proyecto.codigo,
      codigoSolicitud: proyecto.codigoSolicitud,
      codigoResponsable: proyecto.codigoResponsable,
      estado: proyecto.estado,
      fechaIncio: proyecto.fechaIncio,
      fechaFina: proyecto.fechaFina,
      descripcion: proyecto.descripcion,
      comentario: proyecto.comentario
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
    const proyecto = this.createFromForm();
    if (proyecto.id !== undefined) {
      this.subscribeToSaveResponse(this.proyectoService.update(proyecto));
    } else {
      this.subscribeToSaveResponse(this.proyectoService.create(proyecto));
    }
  }

  private createFromForm(): IProyecto {
    return {
      ...new Proyecto(),
      id: this.editForm.get(['id']).value,
      codigo: this.editForm.get(['codigo']).value,
      codigoSolicitud: this.editForm.get(['codigoSolicitud']).value,
      codigoResponsable: this.editForm.get(['codigoResponsable']).value,
      estado: this.editForm.get(['estado']).value,
      fechaIncio: this.editForm.get(['fechaIncio']).value,
      fechaFina: this.editForm.get(['fechaFina']).value,
      descripcion: this.editForm.get(['descripcion']).value,
      comentario: this.editForm.get(['comentario']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProyecto>>) {
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
