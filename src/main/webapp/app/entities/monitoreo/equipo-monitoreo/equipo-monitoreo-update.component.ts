import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IEquipoMonitoreo, EquipoMonitoreo } from 'app/shared/model/monitoreo/equipo-monitoreo.model';
import { EquipoMonitoreoService } from './equipo-monitoreo.service';
import { IProyecto } from 'app/shared/model/monitoreo/proyecto.model';
import { ProyectoService } from 'app/entities/monitoreo/proyecto';

@Component({
  selector: 'jhi-equipo-monitoreo-update',
  templateUrl: './equipo-monitoreo-update.component.html'
})
export class EquipoMonitoreoUpdateComponent implements OnInit {
  isSaving: boolean;

  proyectos: IProyecto[];
  reservadoDesdeDp: any;
  reservadoHastaDp: any;

  editForm = this.fb.group({
    id: [],
    codigoEquipo: [],
    reservadoDesde: [],
    reservadoHasta: [],
    documentoCalibracion: [],
    proyecto: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected equipoMonitoreoService: EquipoMonitoreoService,
    protected proyectoService: ProyectoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ equipoMonitoreo }) => {
      this.updateForm(equipoMonitoreo);
    });
    this.proyectoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IProyecto[]>) => mayBeOk.ok),
        map((response: HttpResponse<IProyecto[]>) => response.body)
      )
      .subscribe((res: IProyecto[]) => (this.proyectos = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(equipoMonitoreo: IEquipoMonitoreo) {
    this.editForm.patchValue({
      id: equipoMonitoreo.id,
      codigoEquipo: equipoMonitoreo.codigoEquipo,
      reservadoDesde: equipoMonitoreo.reservadoDesde,
      reservadoHasta: equipoMonitoreo.reservadoHasta,
      documentoCalibracion: equipoMonitoreo.documentoCalibracion,
      proyecto: equipoMonitoreo.proyecto
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const equipoMonitoreo = this.createFromForm();
    if (equipoMonitoreo.id !== undefined) {
      this.subscribeToSaveResponse(this.equipoMonitoreoService.update(equipoMonitoreo));
    } else {
      this.subscribeToSaveResponse(this.equipoMonitoreoService.create(equipoMonitoreo));
    }
  }

  private createFromForm(): IEquipoMonitoreo {
    return {
      ...new EquipoMonitoreo(),
      id: this.editForm.get(['id']).value,
      codigoEquipo: this.editForm.get(['codigoEquipo']).value,
      reservadoDesde: this.editForm.get(['reservadoDesde']).value,
      reservadoHasta: this.editForm.get(['reservadoHasta']).value,
      documentoCalibracion: this.editForm.get(['documentoCalibracion']).value,
      proyecto: this.editForm.get(['proyecto']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEquipoMonitoreo>>) {
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
}
