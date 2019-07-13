import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ITipoServicios, TipoServicios } from 'app/shared/model/comercial/tipo-servicios.model';
import { TipoServiciosService } from './tipo-servicios.service';

@Component({
  selector: 'jhi-tipo-servicios-update',
  templateUrl: './tipo-servicios-update.component.html'
})
export class TipoServiciosUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    nombre: [null, [Validators.required]],
    descripcion: []
  });

  constructor(protected tipoServiciosService: TipoServiciosService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ tipoServicios }) => {
      this.updateForm(tipoServicios);
    });
  }

  updateForm(tipoServicios: ITipoServicios) {
    this.editForm.patchValue({
      id: tipoServicios.id,
      nombre: tipoServicios.nombre,
      descripcion: tipoServicios.descripcion
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const tipoServicios = this.createFromForm();
    if (tipoServicios.id !== undefined) {
      this.subscribeToSaveResponse(this.tipoServiciosService.update(tipoServicios));
    } else {
      this.subscribeToSaveResponse(this.tipoServiciosService.create(tipoServicios));
    }
  }

  private createFromForm(): ITipoServicios {
    return {
      ...new TipoServicios(),
      id: this.editForm.get(['id']).value,
      nombre: this.editForm.get(['nombre']).value,
      descripcion: this.editForm.get(['descripcion']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITipoServicios>>) {
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
