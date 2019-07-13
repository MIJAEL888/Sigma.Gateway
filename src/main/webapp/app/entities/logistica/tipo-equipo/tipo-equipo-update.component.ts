import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { ITipoEquipo, TipoEquipo } from 'app/shared/model/logistica/tipo-equipo.model';
import { TipoEquipoService } from './tipo-equipo.service';

@Component({
  selector: 'jhi-tipo-equipo-update',
  templateUrl: './tipo-equipo-update.component.html'
})
export class TipoEquipoUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    nombre: [null, [Validators.required]],
    codigo: [],
    descripcion: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected jhiAlertService: JhiAlertService,
    protected tipoEquipoService: TipoEquipoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ tipoEquipo }) => {
      this.updateForm(tipoEquipo);
    });
  }

  updateForm(tipoEquipo: ITipoEquipo) {
    this.editForm.patchValue({
      id: tipoEquipo.id,
      nombre: tipoEquipo.nombre,
      codigo: tipoEquipo.codigo,
      descripcion: tipoEquipo.descripcion
    });
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  setFileData(event, field: string, isImage) {
    return new Promise((resolve, reject) => {
      if (event && event.target && event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        if (isImage && !/^image\//.test(file.type)) {
          reject(`File was expected to be an image but was found to be ${file.type}`);
        } else {
          const filedContentType: string = field + 'ContentType';
          this.dataUtils.toBase64(file, base64Data => {
            this.editForm.patchValue({
              [field]: base64Data,
              [filedContentType]: file.type
            });
          });
        }
      } else {
        reject(`Base64 data was not set as file could not be extracted from passed parameter: ${event}`);
      }
    }).then(
      () => console.log('blob added'), // sucess
      this.onError
    );
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const tipoEquipo = this.createFromForm();
    if (tipoEquipo.id !== undefined) {
      this.subscribeToSaveResponse(this.tipoEquipoService.update(tipoEquipo));
    } else {
      this.subscribeToSaveResponse(this.tipoEquipoService.create(tipoEquipo));
    }
  }

  private createFromForm(): ITipoEquipo {
    return {
      ...new TipoEquipo(),
      id: this.editForm.get(['id']).value,
      nombre: this.editForm.get(['nombre']).value,
      codigo: this.editForm.get(['codigo']).value,
      descripcion: this.editForm.get(['descripcion']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITipoEquipo>>) {
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
}
