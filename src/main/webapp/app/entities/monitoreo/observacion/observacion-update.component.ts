import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IObservacion, Observacion } from 'app/shared/model/monitoreo/observacion.model';
import { ObservacionService } from './observacion.service';
import { IProyecto } from 'app/shared/model/monitoreo/proyecto.model';
import { ProyectoService } from 'app/entities/monitoreo/proyecto';
import { IComponente } from 'app/shared/model/monitoreo/componente.model';
import { ComponenteService } from 'app/entities/monitoreo/componente';

@Component({
  selector: 'jhi-observacion-update',
  templateUrl: './observacion-update.component.html'
})
export class ObservacionUpdateComponent implements OnInit {
  isSaving: boolean;

  proyectos: IProyecto[];

  componentes: IComponente[];

  editForm = this.fb.group({
    id: [],
    descripcion: [],
    comentario: [],
    codigoMonitorista: [],
    proyecto: [],
    componente: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected jhiAlertService: JhiAlertService,
    protected observacionService: ObservacionService,
    protected proyectoService: ProyectoService,
    protected componenteService: ComponenteService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ observacion }) => {
      this.updateForm(observacion);
    });
    this.proyectoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IProyecto[]>) => mayBeOk.ok),
        map((response: HttpResponse<IProyecto[]>) => response.body)
      )
      .subscribe((res: IProyecto[]) => (this.proyectos = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.componenteService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IComponente[]>) => mayBeOk.ok),
        map((response: HttpResponse<IComponente[]>) => response.body)
      )
      .subscribe((res: IComponente[]) => (this.componentes = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(observacion: IObservacion) {
    this.editForm.patchValue({
      id: observacion.id,
      descripcion: observacion.descripcion,
      comentario: observacion.comentario,
      codigoMonitorista: observacion.codigoMonitorista,
      proyecto: observacion.proyecto,
      componente: observacion.componente
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
    const observacion = this.createFromForm();
    if (observacion.id !== undefined) {
      this.subscribeToSaveResponse(this.observacionService.update(observacion));
    } else {
      this.subscribeToSaveResponse(this.observacionService.create(observacion));
    }
  }

  private createFromForm(): IObservacion {
    return {
      ...new Observacion(),
      id: this.editForm.get(['id']).value,
      descripcion: this.editForm.get(['descripcion']).value,
      comentario: this.editForm.get(['comentario']).value,
      codigoMonitorista: this.editForm.get(['codigoMonitorista']).value,
      proyecto: this.editForm.get(['proyecto']).value,
      componente: this.editForm.get(['componente']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IObservacion>>) {
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

  trackProyectoById(index: number, item: IProyecto) {
    return item.id;
  }

  trackComponenteById(index: number, item: IComponente) {
    return item.id;
  }
}
