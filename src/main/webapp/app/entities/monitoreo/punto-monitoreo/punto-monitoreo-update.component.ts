import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IPuntoMonitoreo, PuntoMonitoreo } from 'app/shared/model/monitoreo/punto-monitoreo.model';
import { PuntoMonitoreoService } from './punto-monitoreo.service';

@Component({
  selector: 'jhi-punto-monitoreo-update',
  templateUrl: './punto-monitoreo-update.component.html'
})
export class PuntoMonitoreoUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    codigo: [null, [Validators.required]],
    codigoSede: [null, [Validators.required]],
    codigoCliente: [null, [Validators.required]],
    coordenadaNorte: [null, [Validators.required]],
    coordenadaEste: [null, [Validators.required]],
    descripcion: [],
    comentario: [],
    latitud: [],
    longitud: [],
    observacion: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected jhiAlertService: JhiAlertService,
    protected puntoMonitoreoService: PuntoMonitoreoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ puntoMonitoreo }) => {
      this.updateForm(puntoMonitoreo);
    });
  }

  updateForm(puntoMonitoreo: IPuntoMonitoreo) {
    this.editForm.patchValue({
      id: puntoMonitoreo.id,
      codigo: puntoMonitoreo.codigo,
      codigoSede: puntoMonitoreo.codigoSede,
      codigoCliente: puntoMonitoreo.codigoCliente,
      coordenadaNorte: puntoMonitoreo.coordenadaNorte,
      coordenadaEste: puntoMonitoreo.coordenadaEste,
      descripcion: puntoMonitoreo.descripcion,
      comentario: puntoMonitoreo.comentario,
      latitud: puntoMonitoreo.latitud,
      longitud: puntoMonitoreo.longitud,
      observacion: puntoMonitoreo.observacion
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
    const puntoMonitoreo = this.createFromForm();
    if (puntoMonitoreo.id !== undefined) {
      this.subscribeToSaveResponse(this.puntoMonitoreoService.update(puntoMonitoreo));
    } else {
      this.subscribeToSaveResponse(this.puntoMonitoreoService.create(puntoMonitoreo));
    }
  }

  private createFromForm(): IPuntoMonitoreo {
    return {
      ...new PuntoMonitoreo(),
      id: this.editForm.get(['id']).value,
      codigo: this.editForm.get(['codigo']).value,
      codigoSede: this.editForm.get(['codigoSede']).value,
      codigoCliente: this.editForm.get(['codigoCliente']).value,
      coordenadaNorte: this.editForm.get(['coordenadaNorte']).value,
      coordenadaEste: this.editForm.get(['coordenadaEste']).value,
      descripcion: this.editForm.get(['descripcion']).value,
      comentario: this.editForm.get(['comentario']).value,
      latitud: this.editForm.get(['latitud']).value,
      longitud: this.editForm.get(['longitud']).value,
      observacion: this.editForm.get(['observacion']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPuntoMonitoreo>>) {
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
