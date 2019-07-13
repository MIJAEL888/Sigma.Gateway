import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IParamentro, Paramentro } from 'app/shared/model/monitoreo/paramentro.model';
import { ParamentroService } from './paramentro.service';
import { ITipoComponente } from 'app/shared/model/monitoreo/tipo-componente.model';
import { TipoComponenteService } from 'app/entities/monitoreo/tipo-componente';
import { INormaCalidad } from 'app/shared/model/monitoreo/norma-calidad.model';
import { NormaCalidadService } from 'app/entities/monitoreo/norma-calidad';
import { IPuntoMonitoreo } from 'app/shared/model/monitoreo/punto-monitoreo.model';
import { PuntoMonitoreoService } from 'app/entities/monitoreo/punto-monitoreo';
import { IUnidades } from 'app/shared/model/monitoreo/unidades.model';
import { UnidadesService } from 'app/entities/monitoreo/unidades';

@Component({
  selector: 'jhi-paramentro-update',
  templateUrl: './paramentro-update.component.html'
})
export class ParamentroUpdateComponent implements OnInit {
  isSaving: boolean;

  tipocomponentes: ITipoComponente[];

  normacalidads: INormaCalidad[];

  puntomonitoreos: IPuntoMonitoreo[];

  unidades: IUnidades[];

  editForm = this.fb.group({
    id: [],
    nombre: [null, [Validators.required]],
    siglas: [null, [Validators.required]],
    descripcion: [],
    costo: [],
    metodologia: [],
    metodoEnsayo: [],
    limiteCuantificacion: [],
    tipoComponente: [],
    normaCalidad: [],
    puntoMonitoreo: [],
    unidades: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected jhiAlertService: JhiAlertService,
    protected paramentroService: ParamentroService,
    protected tipoComponenteService: TipoComponenteService,
    protected normaCalidadService: NormaCalidadService,
    protected puntoMonitoreoService: PuntoMonitoreoService,
    protected unidadesService: UnidadesService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ paramentro }) => {
      this.updateForm(paramentro);
    });
    this.tipoComponenteService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ITipoComponente[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITipoComponente[]>) => response.body)
      )
      .subscribe((res: ITipoComponente[]) => (this.tipocomponentes = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.normaCalidadService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<INormaCalidad[]>) => mayBeOk.ok),
        map((response: HttpResponse<INormaCalidad[]>) => response.body)
      )
      .subscribe((res: INormaCalidad[]) => (this.normacalidads = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.puntoMonitoreoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IPuntoMonitoreo[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPuntoMonitoreo[]>) => response.body)
      )
      .subscribe((res: IPuntoMonitoreo[]) => (this.puntomonitoreos = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.unidadesService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IUnidades[]>) => mayBeOk.ok),
        map((response: HttpResponse<IUnidades[]>) => response.body)
      )
      .subscribe((res: IUnidades[]) => (this.unidades = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(paramentro: IParamentro) {
    this.editForm.patchValue({
      id: paramentro.id,
      nombre: paramentro.nombre,
      siglas: paramentro.siglas,
      descripcion: paramentro.descripcion,
      costo: paramentro.costo,
      metodologia: paramentro.metodologia,
      metodoEnsayo: paramentro.metodoEnsayo,
      limiteCuantificacion: paramentro.limiteCuantificacion,
      tipoComponente: paramentro.tipoComponente,
      normaCalidad: paramentro.normaCalidad,
      puntoMonitoreo: paramentro.puntoMonitoreo,
      unidades: paramentro.unidades
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
    const paramentro = this.createFromForm();
    if (paramentro.id !== undefined) {
      this.subscribeToSaveResponse(this.paramentroService.update(paramentro));
    } else {
      this.subscribeToSaveResponse(this.paramentroService.create(paramentro));
    }
  }

  private createFromForm(): IParamentro {
    return {
      ...new Paramentro(),
      id: this.editForm.get(['id']).value,
      nombre: this.editForm.get(['nombre']).value,
      siglas: this.editForm.get(['siglas']).value,
      descripcion: this.editForm.get(['descripcion']).value,
      costo: this.editForm.get(['costo']).value,
      metodologia: this.editForm.get(['metodologia']).value,
      metodoEnsayo: this.editForm.get(['metodoEnsayo']).value,
      limiteCuantificacion: this.editForm.get(['limiteCuantificacion']).value,
      tipoComponente: this.editForm.get(['tipoComponente']).value,
      normaCalidad: this.editForm.get(['normaCalidad']).value,
      puntoMonitoreo: this.editForm.get(['puntoMonitoreo']).value,
      unidades: this.editForm.get(['unidades']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IParamentro>>) {
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

  trackTipoComponenteById(index: number, item: ITipoComponente) {
    return item.id;
  }

  trackNormaCalidadById(index: number, item: INormaCalidad) {
    return item.id;
  }

  trackPuntoMonitoreoById(index: number, item: IPuntoMonitoreo) {
    return item.id;
  }

  trackUnidadesById(index: number, item: IUnidades) {
    return item.id;
  }
}
