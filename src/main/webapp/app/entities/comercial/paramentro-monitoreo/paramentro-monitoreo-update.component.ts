import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IParamentroMonitoreo, ParamentroMonitoreo } from 'app/shared/model/comercial/paramentro-monitoreo.model';
import { ParamentroMonitoreoService } from './paramentro-monitoreo.service';
import { IComponenteMonitoreo } from 'app/shared/model/comercial/componente-monitoreo.model';
import { ComponenteMonitoreoService } from 'app/entities/comercial/componente-monitoreo';

@Component({
  selector: 'jhi-paramentro-monitoreo-update',
  templateUrl: './paramentro-monitoreo-update.component.html'
})
export class ParamentroMonitoreoUpdateComponent implements OnInit {
  isSaving: boolean;

  componentemonitoreos: IComponenteMonitoreo[];

  editForm = this.fb.group({
    id: [],
    nombre: [null, [Validators.required]],
    descripcion: [],
    costo: [],
    componenteMonitoreo: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected paramentroMonitoreoService: ParamentroMonitoreoService,
    protected componenteMonitoreoService: ComponenteMonitoreoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ paramentroMonitoreo }) => {
      this.updateForm(paramentroMonitoreo);
    });
    this.componenteMonitoreoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IComponenteMonitoreo[]>) => mayBeOk.ok),
        map((response: HttpResponse<IComponenteMonitoreo[]>) => response.body)
      )
      .subscribe((res: IComponenteMonitoreo[]) => (this.componentemonitoreos = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(paramentroMonitoreo: IParamentroMonitoreo) {
    this.editForm.patchValue({
      id: paramentroMonitoreo.id,
      nombre: paramentroMonitoreo.nombre,
      descripcion: paramentroMonitoreo.descripcion,
      costo: paramentroMonitoreo.costo,
      componenteMonitoreo: paramentroMonitoreo.componenteMonitoreo
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const paramentroMonitoreo = this.createFromForm();
    if (paramentroMonitoreo.id !== undefined) {
      this.subscribeToSaveResponse(this.paramentroMonitoreoService.update(paramentroMonitoreo));
    } else {
      this.subscribeToSaveResponse(this.paramentroMonitoreoService.create(paramentroMonitoreo));
    }
  }

  private createFromForm(): IParamentroMonitoreo {
    return {
      ...new ParamentroMonitoreo(),
      id: this.editForm.get(['id']).value,
      nombre: this.editForm.get(['nombre']).value,
      descripcion: this.editForm.get(['descripcion']).value,
      costo: this.editForm.get(['costo']).value,
      componenteMonitoreo: this.editForm.get(['componenteMonitoreo']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IParamentroMonitoreo>>) {
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

  trackComponenteMonitoreoById(index: number, item: IComponenteMonitoreo) {
    return item.id;
  }
}
