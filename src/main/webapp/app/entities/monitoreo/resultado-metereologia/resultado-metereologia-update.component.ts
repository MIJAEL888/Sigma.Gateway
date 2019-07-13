import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IResultadoMetereologia, ResultadoMetereologia } from 'app/shared/model/monitoreo/resultado-metereologia.model';
import { ResultadoMetereologiaService } from './resultado-metereologia.service';
import { IResultado } from 'app/shared/model/monitoreo/resultado.model';
import { ResultadoService } from 'app/entities/monitoreo/resultado';

@Component({
  selector: 'jhi-resultado-metereologia-update',
  templateUrl: './resultado-metereologia-update.component.html'
})
export class ResultadoMetereologiaUpdateComponent implements OnInit {
  isSaving: boolean;

  resultados: IResultado[];

  editForm = this.fb.group({
    id: [],
    fecha: [],
    valor: [],
    valorDecimal: [],
    resultado: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected resultadoMetereologiaService: ResultadoMetereologiaService,
    protected resultadoService: ResultadoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ resultadoMetereologia }) => {
      this.updateForm(resultadoMetereologia);
    });
    this.resultadoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IResultado[]>) => mayBeOk.ok),
        map((response: HttpResponse<IResultado[]>) => response.body)
      )
      .subscribe((res: IResultado[]) => (this.resultados = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(resultadoMetereologia: IResultadoMetereologia) {
    this.editForm.patchValue({
      id: resultadoMetereologia.id,
      fecha: resultadoMetereologia.fecha != null ? resultadoMetereologia.fecha.format(DATE_TIME_FORMAT) : null,
      valor: resultadoMetereologia.valor,
      valorDecimal: resultadoMetereologia.valorDecimal,
      resultado: resultadoMetereologia.resultado
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const resultadoMetereologia = this.createFromForm();
    if (resultadoMetereologia.id !== undefined) {
      this.subscribeToSaveResponse(this.resultadoMetereologiaService.update(resultadoMetereologia));
    } else {
      this.subscribeToSaveResponse(this.resultadoMetereologiaService.create(resultadoMetereologia));
    }
  }

  private createFromForm(): IResultadoMetereologia {
    return {
      ...new ResultadoMetereologia(),
      id: this.editForm.get(['id']).value,
      fecha: this.editForm.get(['fecha']).value != null ? moment(this.editForm.get(['fecha']).value, DATE_TIME_FORMAT) : undefined,
      valor: this.editForm.get(['valor']).value,
      valorDecimal: this.editForm.get(['valorDecimal']).value,
      resultado: this.editForm.get(['resultado']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IResultadoMetereologia>>) {
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
