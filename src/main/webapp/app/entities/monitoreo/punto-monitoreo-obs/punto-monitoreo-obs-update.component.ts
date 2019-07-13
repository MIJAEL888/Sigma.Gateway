import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IPuntoMonitoreoObs, PuntoMonitoreoObs } from 'app/shared/model/monitoreo/punto-monitoreo-obs.model';
import { PuntoMonitoreoObsService } from './punto-monitoreo-obs.service';
import { IPuntoMonitoreo } from 'app/shared/model/monitoreo/punto-monitoreo.model';
import { PuntoMonitoreoService } from 'app/entities/monitoreo/punto-monitoreo';
import { IResultado } from 'app/shared/model/monitoreo/resultado.model';
import { ResultadoService } from 'app/entities/monitoreo/resultado';
import { IProyecto } from 'app/shared/model/monitoreo/proyecto.model';
import { ProyectoService } from 'app/entities/monitoreo/proyecto';

@Component({
  selector: 'jhi-punto-monitoreo-obs-update',
  templateUrl: './punto-monitoreo-obs-update.component.html'
})
export class PuntoMonitoreoObsUpdateComponent implements OnInit {
  isSaving: boolean;

  puntomonitoreos: IPuntoMonitoreo[];

  resultados: IResultado[];

  proyectos: IProyecto[];

  editForm = this.fb.group({
    id: [],
    codigo: [null, [Validators.required]],
    descripcion: [],
    comentario: [],
    observacion: [],
    puntoMonitoreo: [],
    resultado: [],
    proyecto: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected jhiAlertService: JhiAlertService,
    protected puntoMonitoreoObsService: PuntoMonitoreoObsService,
    protected puntoMonitoreoService: PuntoMonitoreoService,
    protected resultadoService: ResultadoService,
    protected proyectoService: ProyectoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ puntoMonitoreoObs }) => {
      this.updateForm(puntoMonitoreoObs);
    });
    this.puntoMonitoreoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IPuntoMonitoreo[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPuntoMonitoreo[]>) => response.body)
      )
      .subscribe((res: IPuntoMonitoreo[]) => (this.puntomonitoreos = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.resultadoService
      .query({ filter: 'puntomonitoreoobs-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IResultado[]>) => mayBeOk.ok),
        map((response: HttpResponse<IResultado[]>) => response.body)
      )
      .subscribe(
        (res: IResultado[]) => {
          if (!this.editForm.get('resultado').value || !this.editForm.get('resultado').value.id) {
            this.resultados = res;
          } else {
            this.resultadoService
              .find(this.editForm.get('resultado').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IResultado>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IResultado>) => subResponse.body)
              )
              .subscribe(
                (subRes: IResultado) => (this.resultados = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.proyectoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IProyecto[]>) => mayBeOk.ok),
        map((response: HttpResponse<IProyecto[]>) => response.body)
      )
      .subscribe((res: IProyecto[]) => (this.proyectos = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(puntoMonitoreoObs: IPuntoMonitoreoObs) {
    this.editForm.patchValue({
      id: puntoMonitoreoObs.id,
      codigo: puntoMonitoreoObs.codigo,
      descripcion: puntoMonitoreoObs.descripcion,
      comentario: puntoMonitoreoObs.comentario,
      observacion: puntoMonitoreoObs.observacion,
      puntoMonitoreo: puntoMonitoreoObs.puntoMonitoreo,
      resultado: puntoMonitoreoObs.resultado,
      proyecto: puntoMonitoreoObs.proyecto
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
    const puntoMonitoreoObs = this.createFromForm();
    if (puntoMonitoreoObs.id !== undefined) {
      this.subscribeToSaveResponse(this.puntoMonitoreoObsService.update(puntoMonitoreoObs));
    } else {
      this.subscribeToSaveResponse(this.puntoMonitoreoObsService.create(puntoMonitoreoObs));
    }
  }

  private createFromForm(): IPuntoMonitoreoObs {
    return {
      ...new PuntoMonitoreoObs(),
      id: this.editForm.get(['id']).value,
      codigo: this.editForm.get(['codigo']).value,
      descripcion: this.editForm.get(['descripcion']).value,
      comentario: this.editForm.get(['comentario']).value,
      observacion: this.editForm.get(['observacion']).value,
      puntoMonitoreo: this.editForm.get(['puntoMonitoreo']).value,
      resultado: this.editForm.get(['resultado']).value,
      proyecto: this.editForm.get(['proyecto']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPuntoMonitoreoObs>>) {
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

  trackPuntoMonitoreoById(index: number, item: IPuntoMonitoreo) {
    return item.id;
  }

  trackResultadoById(index: number, item: IResultado) {
    return item.id;
  }

  trackProyectoById(index: number, item: IProyecto) {
    return item.id;
  }
}
