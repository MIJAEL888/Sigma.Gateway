import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IServicio, Servicio } from 'app/shared/model/comercial/servicio.model';
import { ServicioService } from './servicio.service';
import { ITipoServicios } from 'app/shared/model/comercial/tipo-servicios.model';
import { TipoServiciosService } from 'app/entities/comercial/tipo-servicios';
import { ITipoSolicitud } from 'app/shared/model/comercial/tipo-solicitud.model';
import { TipoSolicitudService } from 'app/entities/comercial/tipo-solicitud';
import { ITipoInduccion } from 'app/shared/model/comercial/tipo-induccion.model';
import { TipoInduccionService } from 'app/entities/comercial/tipo-induccion';
import { IRequisitosSeguridad } from 'app/shared/model/comercial/requisitos-seguridad.model';
import { RequisitosSeguridadService } from 'app/entities/comercial/requisitos-seguridad';
import { ISede } from 'app/shared/model/comercial/sede.model';
import { SedeService } from 'app/entities/comercial/sede';
import { ICliente } from 'app/shared/model/comercial/cliente.model';
import { ClienteService } from 'app/entities/comercial/cliente';

@Component({
  selector: 'jhi-servicio-update',
  templateUrl: './servicio-update.component.html'
})
export class ServicioUpdateComponent implements OnInit {
  isSaving: boolean;
  clientes: ICliente[];
  tiposervicios: ITipoServicios[];

  tiposolicituds: ITipoSolicitud[];

  tipoinduccions: ITipoInduccion[];

  requisitosseguridads: IRequisitosSeguridad[];

  sedes: ISede[];
  fechaEntregaDp: any;

  editForm = this.fb.group({
    id: [],
    codigo: [],
    fechaEntrega: [],
    nombreSolicitante: [],
    numeroSolicitante: [],
    observacion: [],
    descripcion: [],
    estado: [],
    codigoCliente: [],
    codigoSede: [],
    tipoServicios: [],
    tipoSolicitud: [],
    tipoInduccion: [],
    requisitosSeguridad: [],
    sede: [],
    cliente: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected jhiAlertService: JhiAlertService,
    protected servicioService: ServicioService,
    protected clienteService: ClienteService,
    protected tipoServiciosService: TipoServiciosService,
    protected tipoSolicitudService: TipoSolicitudService,
    protected tipoInduccionService: TipoInduccionService,
    protected requisitosSeguridadService: RequisitosSeguridadService,
    protected sedeService: SedeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ servicio }) => {
      this.updateForm(servicio);
    });
    this.tipoServiciosService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ITipoServicios[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITipoServicios[]>) => response.body)
      )
      .subscribe((res: ITipoServicios[]) => (this.tiposervicios = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.tipoSolicitudService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ITipoSolicitud[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITipoSolicitud[]>) => response.body)
      )
      .subscribe((res: ITipoSolicitud[]) => (this.tiposolicituds = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.tipoInduccionService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ITipoInduccion[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITipoInduccion[]>) => response.body)
      )
      .subscribe((res: ITipoInduccion[]) => (this.tipoinduccions = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.requisitosSeguridadService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IRequisitosSeguridad[]>) => mayBeOk.ok),
        map((response: HttpResponse<IRequisitosSeguridad[]>) => response.body)
      )
      .subscribe((res: IRequisitosSeguridad[]) => (this.requisitosseguridads = res), (res: HttpErrorResponse) => this.onError(res.message));
    /*    this.sedeService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ISede[]>) => mayBeOk.ok),
        map((response: HttpResponse<ISede[]>) => response.body)
      )
      .subscribe((res: ISede[]) => (this.sedes = res), (res: HttpErrorResponse) => this.onError(res.message));*/
    this.clienteService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICliente[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICliente[]>) => response.body)
      )
      .subscribe((res: ICliente[]) => (this.clientes = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(servicio: IServicio) {
    this.editForm.patchValue({
      id: servicio.id,
      codigo: servicio.codigo,
      fechaEntrega: servicio.fechaEntrega,
      nombreSolicitante: servicio.nombreSolicitante,
      numeroSolicitante: servicio.numeroSolicitante,
      observacion: servicio.observacion,
      descripcion: servicio.descripcion,
      estado: servicio.estado,
      codigoCliente: servicio.codigoCliente,
      codigoSede: servicio.codigoSede,
      tipoServicios: servicio.tipoServicios,
      tipoSolicitud: servicio.tipoSolicitud,
      tipoInduccion: servicio.tipoInduccion,
      requisitosSeguridad: servicio.requisitosSeguridad,
      sede: servicio.sede
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
    const servicio = this.createFromForm();
    if (servicio.id !== undefined) {
      this.subscribeToSaveResponse(this.servicioService.update(servicio));
    } else {
      this.subscribeToSaveResponse(this.servicioService.create(servicio));
    }
  }

  changeCliente() {
    this.sedeService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ISede[]>) => mayBeOk.ok),
        map((response: HttpResponse<ISede[]>) => response.body)
      )
      .subscribe((res: ISede[]) => (this.sedes = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  private createFromForm(): IServicio {
    return {
      ...new Servicio(),
      id: this.editForm.get(['id']).value,
      codigo: this.editForm.get(['codigo']).value,
      fechaEntrega: this.editForm.get(['fechaEntrega']).value,
      nombreSolicitante: this.editForm.get(['nombreSolicitante']).value,
      numeroSolicitante: this.editForm.get(['numeroSolicitante']).value,
      observacion: this.editForm.get(['observacion']).value,
      descripcion: this.editForm.get(['descripcion']).value,
      estado: this.editForm.get(['estado']).value,
      codigoCliente: this.editForm.get(['codigoCliente']).value,
      codigoSede: this.editForm.get(['codigoSede']).value,
      tipoServicios: this.editForm.get(['tipoServicios']).value,
      tipoSolicitud: this.editForm.get(['tipoSolicitud']).value,
      tipoInduccion: this.editForm.get(['tipoInduccion']).value,
      requisitosSeguridad: this.editForm.get(['requisitosSeguridad']).value,
      sede: this.editForm.get(['sede']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IServicio>>) {
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

  trackTipoServiciosById(index: number, item: ITipoServicios) {
    return item.id;
  }

  trackTipoSolicitudById(index: number, item: ITipoSolicitud) {
    return item.id;
  }

  trackTipoInduccionById(index: number, item: ITipoInduccion) {
    return item.id;
  }

  trackRequisitosSeguridadById(index: number, item: IRequisitosSeguridad) {
    return item.id;
  }

  trackSedeById(index: number, item: ISede) {
    return item.id;
  }
}
