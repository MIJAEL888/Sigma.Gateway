import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IMonitorista, Monitorista } from 'app/shared/model/logistica/monitorista.model';
import { MonitoristaService } from './monitorista.service';
import { ILaboratorio } from 'app/shared/model/logistica/laboratorio.model';
import { LaboratorioService } from 'app/entities/logistica/laboratorio';
import { ITipoSeguro } from 'app/shared/model/logistica/tipo-seguro.model';
import { TipoSeguroService } from 'app/entities/logistica/tipo-seguro';

@Component({
  selector: 'jhi-monitorista-update',
  templateUrl: './monitorista-update.component.html'
})
export class MonitoristaUpdateComponent implements OnInit {
  isSaving: boolean;

  laboratorios: ILaboratorio[];

  tiposeguros: ITipoSeguro[];
  fechaNacimientoDp: any;

  editForm = this.fb.group({
    id: [],
    nombre: [null, [Validators.required]],
    apellidoPaterno: [null, [Validators.required]],
    apellidoMaterno: [null, [Validators.required]],
    dni: [null, [Validators.required]],
    fechaNacimiento: [],
    laboratorio: [],
    tipoSeguros: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected monitoristaService: MonitoristaService,
    protected laboratorioService: LaboratorioService,
    protected tipoSeguroService: TipoSeguroService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ monitorista }) => {
      this.updateForm(monitorista);
    });
    this.laboratorioService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ILaboratorio[]>) => mayBeOk.ok),
        map((response: HttpResponse<ILaboratorio[]>) => response.body)
      )
      .subscribe((res: ILaboratorio[]) => (this.laboratorios = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.tipoSeguroService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ITipoSeguro[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITipoSeguro[]>) => response.body)
      )
      .subscribe((res: ITipoSeguro[]) => (this.tiposeguros = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(monitorista: IMonitorista) {
    this.editForm.patchValue({
      id: monitorista.id,
      nombre: monitorista.nombre,
      apellidoPaterno: monitorista.apellidoPaterno,
      apellidoMaterno: monitorista.apellidoMaterno,
      dni: monitorista.dni,
      fechaNacimiento: monitorista.fechaNacimiento,
      laboratorio: monitorista.laboratorio,
      tipoSeguros: monitorista.tipoSeguros
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const monitorista = this.createFromForm();
    if (monitorista.id !== undefined) {
      this.subscribeToSaveResponse(this.monitoristaService.update(monitorista));
    } else {
      this.subscribeToSaveResponse(this.monitoristaService.create(monitorista));
    }
  }

  private createFromForm(): IMonitorista {
    return {
      ...new Monitorista(),
      id: this.editForm.get(['id']).value,
      nombre: this.editForm.get(['nombre']).value,
      apellidoPaterno: this.editForm.get(['apellidoPaterno']).value,
      apellidoMaterno: this.editForm.get(['apellidoMaterno']).value,
      dni: this.editForm.get(['dni']).value,
      fechaNacimiento: this.editForm.get(['fechaNacimiento']).value,
      laboratorio: this.editForm.get(['laboratorio']).value,
      tipoSeguros: this.editForm.get(['tipoSeguros']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMonitorista>>) {
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

  trackLaboratorioById(index: number, item: ILaboratorio) {
    return item.id;
  }

  trackTipoSeguroById(index: number, item: ITipoSeguro) {
    return item.id;
  }

  getSelected(selectedVals: Array<any>, option: any) {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
