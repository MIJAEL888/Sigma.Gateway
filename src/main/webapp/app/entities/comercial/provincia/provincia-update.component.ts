import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IProvincia, Provincia } from 'app/shared/model/comercial/provincia.model';
import { ProvinciaService } from './provincia.service';
import { IDepartamento } from 'app/shared/model/comercial/departamento.model';
import { DepartamentoService } from 'app/entities/comercial/departamento';

@Component({
  selector: 'jhi-provincia-update',
  templateUrl: './provincia-update.component.html'
})
export class ProvinciaUpdateComponent implements OnInit {
  isSaving: boolean;

  departamentos: IDepartamento[];

  editForm = this.fb.group({
    id: [],
    nombre: [null, [Validators.required]],
    ubigeo: [null, [Validators.required]],
    descripcion: [],
    departamento: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected provinciaService: ProvinciaService,
    protected departamentoService: DepartamentoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ provincia }) => {
      this.updateForm(provincia);
    });
    this.departamentoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IDepartamento[]>) => mayBeOk.ok),
        map((response: HttpResponse<IDepartamento[]>) => response.body)
      )
      .subscribe((res: IDepartamento[]) => (this.departamentos = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(provincia: IProvincia) {
    this.editForm.patchValue({
      id: provincia.id,
      nombre: provincia.nombre,
      ubigeo: provincia.ubigeo,
      descripcion: provincia.descripcion,
      departamento: provincia.departamento
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const provincia = this.createFromForm();
    if (provincia.id !== undefined) {
      this.subscribeToSaveResponse(this.provinciaService.update(provincia));
    } else {
      this.subscribeToSaveResponse(this.provinciaService.create(provincia));
    }
  }

  private createFromForm(): IProvincia {
    return {
      ...new Provincia(),
      id: this.editForm.get(['id']).value,
      nombre: this.editForm.get(['nombre']).value,
      ubigeo: this.editForm.get(['ubigeo']).value,
      descripcion: this.editForm.get(['descripcion']).value,
      departamento: this.editForm.get(['departamento']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProvincia>>) {
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

  trackDepartamentoById(index: number, item: IDepartamento) {
    return item.id;
  }
}
