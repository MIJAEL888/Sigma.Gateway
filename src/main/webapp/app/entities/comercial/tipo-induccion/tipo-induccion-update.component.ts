import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ITipoInduccion, TipoInduccion } from 'app/shared/model/comercial/tipo-induccion.model';
import { TipoInduccionService } from './tipo-induccion.service';

@Component({
  selector: 'jhi-tipo-induccion-update',
  templateUrl: './tipo-induccion-update.component.html'
})
export class TipoInduccionUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    nombre: [null, [Validators.required]],
    descripcion: []
  });

  constructor(protected tipoInduccionService: TipoInduccionService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ tipoInduccion }) => {
      this.updateForm(tipoInduccion);
    });
  }

  updateForm(tipoInduccion: ITipoInduccion) {
    this.editForm.patchValue({
      id: tipoInduccion.id,
      nombre: tipoInduccion.nombre,
      descripcion: tipoInduccion.descripcion
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const tipoInduccion = this.createFromForm();
    if (tipoInduccion.id !== undefined) {
      this.subscribeToSaveResponse(this.tipoInduccionService.update(tipoInduccion));
    } else {
      this.subscribeToSaveResponse(this.tipoInduccionService.create(tipoInduccion));
    }
  }

  private createFromForm(): ITipoInduccion {
    return {
      ...new TipoInduccion(),
      id: this.editForm.get(['id']).value,
      nombre: this.editForm.get(['nombre']).value,
      descripcion: this.editForm.get(['descripcion']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITipoInduccion>>) {
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
