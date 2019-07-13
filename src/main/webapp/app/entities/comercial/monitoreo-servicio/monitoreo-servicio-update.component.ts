import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IMonitoreoServicio, MonitoreoServicio } from 'app/shared/model/comercial/monitoreo-servicio.model';
import { MonitoreoServicioService } from './monitoreo-servicio.service';
import { IServicio } from 'app/shared/model/comercial/servicio.model';
import { ServicioService } from 'app/entities/comercial/servicio';
import { IParamentroMonitoreo } from 'app/shared/model/comercial/paramentro-monitoreo.model';
import { ParamentroMonitoreoService } from 'app/entities/comercial/paramentro-monitoreo';

@Component({
  selector: 'jhi-monitoreo-servicio-update',
  templateUrl: './monitoreo-servicio-update.component.html'
})
export class MonitoreoServicioUpdateComponent implements OnInit {
  isSaving: boolean;

  servicios: IServicio[];

  paramentromonitoreos: IParamentroMonitoreo[];

  editForm = this.fb.group({
    id: [],
    cantidad: [],
    costoTotal: [],
    servicio: [],
    paramentroMonitoreo: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected monitoreoServicioService: MonitoreoServicioService,
    protected servicioService: ServicioService,
    protected paramentroMonitoreoService: ParamentroMonitoreoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ monitoreoServicio }) => {
      this.updateForm(monitoreoServicio);
    });
    this.servicioService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IServicio[]>) => mayBeOk.ok),
        map((response: HttpResponse<IServicio[]>) => response.body)
      )
      .subscribe((res: IServicio[]) => (this.servicios = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.paramentroMonitoreoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IParamentroMonitoreo[]>) => mayBeOk.ok),
        map((response: HttpResponse<IParamentroMonitoreo[]>) => response.body)
      )
      .subscribe((res: IParamentroMonitoreo[]) => (this.paramentromonitoreos = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(monitoreoServicio: IMonitoreoServicio) {
    this.editForm.patchValue({
      id: monitoreoServicio.id,
      cantidad: monitoreoServicio.cantidad,
      costoTotal: monitoreoServicio.costoTotal,
      servicio: monitoreoServicio.servicio,
      paramentroMonitoreo: monitoreoServicio.paramentroMonitoreo
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const monitoreoServicio = this.createFromForm();
    if (monitoreoServicio.id !== undefined) {
      this.subscribeToSaveResponse(this.monitoreoServicioService.update(monitoreoServicio));
    } else {
      this.subscribeToSaveResponse(this.monitoreoServicioService.create(monitoreoServicio));
    }
  }

  private createFromForm(): IMonitoreoServicio {
    return {
      ...new MonitoreoServicio(),
      id: this.editForm.get(['id']).value,
      cantidad: this.editForm.get(['cantidad']).value,
      costoTotal: this.editForm.get(['costoTotal']).value,
      servicio: this.editForm.get(['servicio']).value,
      paramentroMonitoreo: this.editForm.get(['paramentroMonitoreo']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMonitoreoServicio>>) {
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

  trackServicioById(index: number, item: IServicio) {
    return item.id;
  }

  trackParamentroMonitoreoById(index: number, item: IParamentroMonitoreo) {
    return item.id;
  }
}
