import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IComponenteMonitoreo, ComponenteMonitoreo } from 'app/shared/model/comercial/componente-monitoreo.model';
import { ComponenteMonitoreoService } from './componente-monitoreo.service';

@Component({
  selector: 'jhi-componente-monitoreo-update',
  templateUrl: './componente-monitoreo-update.component.html'
})
export class ComponenteMonitoreoUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    nombre: [null, [Validators.required]],
    descripcion: []
  });

  constructor(
    protected componenteMonitoreoService: ComponenteMonitoreoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ componenteMonitoreo }) => {
      this.updateForm(componenteMonitoreo);
    });
  }

  updateForm(componenteMonitoreo: IComponenteMonitoreo) {
    this.editForm.patchValue({
      id: componenteMonitoreo.id,
      nombre: componenteMonitoreo.nombre,
      descripcion: componenteMonitoreo.descripcion
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const componenteMonitoreo = this.createFromForm();
    if (componenteMonitoreo.id !== undefined) {
      this.subscribeToSaveResponse(this.componenteMonitoreoService.update(componenteMonitoreo));
    } else {
      this.subscribeToSaveResponse(this.componenteMonitoreoService.create(componenteMonitoreo));
    }
  }

  private createFromForm(): IComponenteMonitoreo {
    return {
      ...new ComponenteMonitoreo(),
      id: this.editForm.get(['id']).value,
      nombre: this.editForm.get(['nombre']).value,
      descripcion: this.editForm.get(['descripcion']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IComponenteMonitoreo>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
