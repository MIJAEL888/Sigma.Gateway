import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IDepartamento, Departamento } from 'app/shared/model/comercial/departamento.model';
import { DepartamentoService } from './departamento.service';

@Component({
  selector: 'jhi-departamento-update',
  templateUrl: './departamento-update.component.html'
})
export class DepartamentoUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    nombre: [null, [Validators.required]],
    ubigeo: [null, [Validators.required]],
    descripcion: []
  });

  constructor(protected departamentoService: DepartamentoService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ departamento }) => {
      this.updateForm(departamento);
    });
  }

  updateForm(departamento: IDepartamento) {
    this.editForm.patchValue({
      id: departamento.id,
      nombre: departamento.nombre,
      ubigeo: departamento.ubigeo,
      descripcion: departamento.descripcion
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const departamento = this.createFromForm();
    if (departamento.id !== undefined) {
      this.subscribeToSaveResponse(this.departamentoService.update(departamento));
    } else {
      this.subscribeToSaveResponse(this.departamentoService.create(departamento));
    }
  }

  private createFromForm(): IDepartamento {
    return {
      ...new Departamento(),
      id: this.editForm.get(['id']).value,
      nombre: this.editForm.get(['nombre']).value,
      ubigeo: this.editForm.get(['ubigeo']).value,
      descripcion: this.editForm.get(['descripcion']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDepartamento>>) {
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
