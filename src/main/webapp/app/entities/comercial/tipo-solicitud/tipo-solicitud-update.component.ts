import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ITipoSolicitud, TipoSolicitud } from 'app/shared/model/comercial/tipo-solicitud.model';
import { TipoSolicitudService } from './tipo-solicitud.service';

@Component({
  selector: 'jhi-tipo-solicitud-update',
  templateUrl: './tipo-solicitud-update.component.html'
})
export class TipoSolicitudUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    nombre: [null, [Validators.required]],
    descripcion: []
  });

  constructor(protected tipoSolicitudService: TipoSolicitudService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ tipoSolicitud }) => {
      this.updateForm(tipoSolicitud);
    });
  }

  updateForm(tipoSolicitud: ITipoSolicitud) {
    this.editForm.patchValue({
      id: tipoSolicitud.id,
      nombre: tipoSolicitud.nombre,
      descripcion: tipoSolicitud.descripcion
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const tipoSolicitud = this.createFromForm();
    if (tipoSolicitud.id !== undefined) {
      this.subscribeToSaveResponse(this.tipoSolicitudService.update(tipoSolicitud));
    } else {
      this.subscribeToSaveResponse(this.tipoSolicitudService.create(tipoSolicitud));
    }
  }

  private createFromForm(): ITipoSolicitud {
    return {
      ...new TipoSolicitud(),
      id: this.editForm.get(['id']).value,
      nombre: this.editForm.get(['nombre']).value,
      descripcion: this.editForm.get(['descripcion']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITipoSolicitud>>) {
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
