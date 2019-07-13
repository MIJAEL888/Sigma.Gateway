import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IResultadoEmisiones, ResultadoEmisiones } from 'app/shared/model/monitoreo/resultado-emisiones.model';
import { ResultadoEmisionesService } from './resultado-emisiones.service';
import { IResultado } from 'app/shared/model/monitoreo/resultado.model';
import { ResultadoService } from 'app/entities/monitoreo/resultado';

@Component({
  selector: 'jhi-resultado-emisiones-update',
  templateUrl: './resultado-emisiones-update.component.html'
})
export class ResultadoEmisionesUpdateComponent implements OnInit {
  isSaving: boolean;

  resultados: IResultado[];

  editForm = this.fb.group({
    id: [],
    tipoEquipo: [],
    combustible: [],
    consumo: [],
    horaPorMes: [],
    altura: [],
    diametro: [],
    seccion: [],
    resultado: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected resultadoEmisionesService: ResultadoEmisionesService,
    protected resultadoService: ResultadoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ resultadoEmisiones }) => {
      this.updateForm(resultadoEmisiones);
    });
    this.resultadoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IResultado[]>) => mayBeOk.ok),
        map((response: HttpResponse<IResultado[]>) => response.body)
      )
      .subscribe((res: IResultado[]) => (this.resultados = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(resultadoEmisiones: IResultadoEmisiones) {
    this.editForm.patchValue({
      id: resultadoEmisiones.id,
      tipoEquipo: resultadoEmisiones.tipoEquipo,
      combustible: resultadoEmisiones.combustible,
      consumo: resultadoEmisiones.consumo,
      horaPorMes: resultadoEmisiones.horaPorMes,
      altura: resultadoEmisiones.altura,
      diametro: resultadoEmisiones.diametro,
      seccion: resultadoEmisiones.seccion,
      resultado: resultadoEmisiones.resultado
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const resultadoEmisiones = this.createFromForm();
    if (resultadoEmisiones.id !== undefined) {
      this.subscribeToSaveResponse(this.resultadoEmisionesService.update(resultadoEmisiones));
    } else {
      this.subscribeToSaveResponse(this.resultadoEmisionesService.create(resultadoEmisiones));
    }
  }

  private createFromForm(): IResultadoEmisiones {
    return {
      ...new ResultadoEmisiones(),
      id: this.editForm.get(['id']).value,
      tipoEquipo: this.editForm.get(['tipoEquipo']).value,
      combustible: this.editForm.get(['combustible']).value,
      consumo: this.editForm.get(['consumo']).value,
      horaPorMes: this.editForm.get(['horaPorMes']).value,
      altura: this.editForm.get(['altura']).value,
      diametro: this.editForm.get(['diametro']).value,
      seccion: this.editForm.get(['seccion']).value,
      resultado: this.editForm.get(['resultado']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IResultadoEmisiones>>) {
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

  trackResultadoById(index: number, item: IResultado) {
    return item.id;
  }
}
