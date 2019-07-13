import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IResultado, Resultado } from 'app/shared/model/monitoreo/resultado.model';
import { ResultadoService } from './resultado.service';
import { IPuntoMonitoreoObs } from 'app/shared/model/monitoreo/punto-monitoreo-obs.model';
import { PuntoMonitoreoObsService } from 'app/entities/monitoreo/punto-monitoreo-obs';

@Component({
  selector: 'jhi-resultado-update',
  templateUrl: './resultado-update.component.html'
})
export class ResultadoUpdateComponent implements OnInit {
  isSaving: boolean;

  puntomonitoreoobs: IPuntoMonitoreoObs[];

  editForm = this.fb.group({
    id: [],
    fechaInicio: [],
    fehcaFin: [],
    valorMinimo: [],
    valorMaximo: [],
    valorFinal: [],
    valorFinalNum: [],
    codigoLaboratorio: [],
    codigoEquipo: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected resultadoService: ResultadoService,
    protected puntoMonitoreoObsService: PuntoMonitoreoObsService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ resultado }) => {
      this.updateForm(resultado);
    });
    this.puntoMonitoreoObsService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IPuntoMonitoreoObs[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPuntoMonitoreoObs[]>) => response.body)
      )
      .subscribe((res: IPuntoMonitoreoObs[]) => (this.puntomonitoreoobs = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(resultado: IResultado) {
    this.editForm.patchValue({
      id: resultado.id,
      fechaInicio: resultado.fechaInicio != null ? resultado.fechaInicio.format(DATE_TIME_FORMAT) : null,
      fehcaFin: resultado.fehcaFin != null ? resultado.fehcaFin.format(DATE_TIME_FORMAT) : null,
      valorMinimo: resultado.valorMinimo,
      valorMaximo: resultado.valorMaximo,
      valorFinal: resultado.valorFinal,
      valorFinalNum: resultado.valorFinalNum,
      codigoLaboratorio: resultado.codigoLaboratorio,
      codigoEquipo: resultado.codigoEquipo
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const resultado = this.createFromForm();
    if (resultado.id !== undefined) {
      this.subscribeToSaveResponse(this.resultadoService.update(resultado));
    } else {
      this.subscribeToSaveResponse(this.resultadoService.create(resultado));
    }
  }

  private createFromForm(): IResultado {
    return {
      ...new Resultado(),
      id: this.editForm.get(['id']).value,
      fechaInicio:
        this.editForm.get(['fechaInicio']).value != null ? moment(this.editForm.get(['fechaInicio']).value, DATE_TIME_FORMAT) : undefined,
      fehcaFin: this.editForm.get(['fehcaFin']).value != null ? moment(this.editForm.get(['fehcaFin']).value, DATE_TIME_FORMAT) : undefined,
      valorMinimo: this.editForm.get(['valorMinimo']).value,
      valorMaximo: this.editForm.get(['valorMaximo']).value,
      valorFinal: this.editForm.get(['valorFinal']).value,
      valorFinalNum: this.editForm.get(['valorFinalNum']).value,
      codigoLaboratorio: this.editForm.get(['codigoLaboratorio']).value,
      codigoEquipo: this.editForm.get(['codigoEquipo']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IResultado>>) {
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

  trackPuntoMonitoreoObsById(index: number, item: IPuntoMonitoreoObs) {
    return item.id;
  }
}
