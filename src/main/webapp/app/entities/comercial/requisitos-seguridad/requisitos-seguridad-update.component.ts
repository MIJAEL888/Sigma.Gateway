import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IRequisitosSeguridad, RequisitosSeguridad } from 'app/shared/model/comercial/requisitos-seguridad.model';
import { RequisitosSeguridadService } from './requisitos-seguridad.service';

@Component({
  selector: 'jhi-requisitos-seguridad-update',
  templateUrl: './requisitos-seguridad-update.component.html'
})
export class RequisitosSeguridadUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    nombre: [null, [Validators.required]],
    descripcion: []
  });

  constructor(
    protected requisitosSeguridadService: RequisitosSeguridadService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ requisitosSeguridad }) => {
      this.updateForm(requisitosSeguridad);
    });
  }

  updateForm(requisitosSeguridad: IRequisitosSeguridad) {
    this.editForm.patchValue({
      id: requisitosSeguridad.id,
      nombre: requisitosSeguridad.nombre,
      descripcion: requisitosSeguridad.descripcion
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const requisitosSeguridad = this.createFromForm();
    if (requisitosSeguridad.id !== undefined) {
      this.subscribeToSaveResponse(this.requisitosSeguridadService.update(requisitosSeguridad));
    } else {
      this.subscribeToSaveResponse(this.requisitosSeguridadService.create(requisitosSeguridad));
    }
  }

  private createFromForm(): IRequisitosSeguridad {
    return {
      ...new RequisitosSeguridad(),
      id: this.editForm.get(['id']).value,
      nombre: this.editForm.get(['nombre']).value,
      descripcion: this.editForm.get(['descripcion']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRequisitosSeguridad>>) {
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
