import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ITipoComponente, TipoComponente } from 'app/shared/model/monitoreo/tipo-componente.model';
import { TipoComponenteService } from './tipo-componente.service';
import { IComponente } from 'app/shared/model/monitoreo/componente.model';
import { ComponenteService } from 'app/entities/monitoreo/componente';

@Component({
  selector: 'jhi-tipo-componente-update',
  templateUrl: './tipo-componente-update.component.html'
})
export class TipoComponenteUpdateComponent implements OnInit {
  isSaving: boolean;

  componentes: IComponente[];

  editForm = this.fb.group({
    id: [],
    nombre: [null, [Validators.required]],
    descripcion: [],
    componente: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected tipoComponenteService: TipoComponenteService,
    protected componenteService: ComponenteService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ tipoComponente }) => {
      this.updateForm(tipoComponente);
    });
    this.componenteService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IComponente[]>) => mayBeOk.ok),
        map((response: HttpResponse<IComponente[]>) => response.body)
      )
      .subscribe((res: IComponente[]) => (this.componentes = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(tipoComponente: ITipoComponente) {
    this.editForm.patchValue({
      id: tipoComponente.id,
      nombre: tipoComponente.nombre,
      descripcion: tipoComponente.descripcion,
      componente: tipoComponente.componente
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const tipoComponente = this.createFromForm();
    if (tipoComponente.id !== undefined) {
      this.subscribeToSaveResponse(this.tipoComponenteService.update(tipoComponente));
    } else {
      this.subscribeToSaveResponse(this.tipoComponenteService.create(tipoComponente));
    }
  }

  private createFromForm(): ITipoComponente {
    return {
      ...new TipoComponente(),
      id: this.editForm.get(['id']).value,
      nombre: this.editForm.get(['nombre']).value,
      descripcion: this.editForm.get(['descripcion']).value,
      componente: this.editForm.get(['componente']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITipoComponente>>) {
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

  trackComponenteById(index: number, item: IComponente) {
    return item.id;
  }
}
