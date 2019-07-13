import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IDistrito, Distrito } from 'app/shared/model/comercial/distrito.model';
import { DistritoService } from './distrito.service';
import { IProvincia } from 'app/shared/model/comercial/provincia.model';
import { ProvinciaService } from 'app/entities/comercial/provincia';

@Component({
  selector: 'jhi-distrito-update',
  templateUrl: './distrito-update.component.html'
})
export class DistritoUpdateComponent implements OnInit {
  isSaving: boolean;

  provincias: IProvincia[];

  editForm = this.fb.group({
    id: [],
    nombre: [null, [Validators.required]],
    ubigeo: [],
    descripcion: [],
    provincia: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected distritoService: DistritoService,
    protected provinciaService: ProvinciaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ distrito }) => {
      this.updateForm(distrito);
    });
    this.provinciaService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IProvincia[]>) => mayBeOk.ok),
        map((response: HttpResponse<IProvincia[]>) => response.body)
      )
      .subscribe((res: IProvincia[]) => (this.provincias = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(distrito: IDistrito) {
    this.editForm.patchValue({
      id: distrito.id,
      nombre: distrito.nombre,
      ubigeo: distrito.ubigeo,
      descripcion: distrito.descripcion,
      provincia: distrito.provincia
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const distrito = this.createFromForm();
    if (distrito.id !== undefined) {
      this.subscribeToSaveResponse(this.distritoService.update(distrito));
    } else {
      this.subscribeToSaveResponse(this.distritoService.create(distrito));
    }
  }

  private createFromForm(): IDistrito {
    return {
      ...new Distrito(),
      id: this.editForm.get(['id']).value,
      nombre: this.editForm.get(['nombre']).value,
      ubigeo: this.editForm.get(['ubigeo']).value,
      descripcion: this.editForm.get(['descripcion']).value,
      provincia: this.editForm.get(['provincia']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDistrito>>) {
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

  trackProvinciaById(index: number, item: IProvincia) {
    return item.id;
  }
}
