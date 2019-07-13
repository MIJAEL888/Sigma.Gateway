import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IArea, Area } from 'app/shared/model/rrhh/area.model';
import { AreaService } from './area.service';

@Component({
  selector: 'jhi-area-update',
  templateUrl: './area-update.component.html'
})
export class AreaUpdateComponent implements OnInit {
  isSaving: boolean;

  areas: IArea[];

  editForm = this.fb.group({
    id: [],
    nombre: [null, [Validators.required]],
    descripcion: [],
    comentario: [],
    gerencia: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected jhiAlertService: JhiAlertService,
    protected areaService: AreaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ area }) => {
      this.updateForm(area);
    });
    this.areaService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IArea[]>) => mayBeOk.ok),
        map((response: HttpResponse<IArea[]>) => response.body)
      )
      .subscribe((res: IArea[]) => (this.areas = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(area: IArea) {
    this.editForm.patchValue({
      id: area.id,
      nombre: area.nombre,
      descripcion: area.descripcion,
      comentario: area.comentario,
      gerencia: area.gerencia
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
    const area = this.createFromForm();
    if (area.id !== undefined) {
      this.subscribeToSaveResponse(this.areaService.update(area));
    } else {
      this.subscribeToSaveResponse(this.areaService.create(area));
    }
  }

  private createFromForm(): IArea {
    return {
      ...new Area(),
      id: this.editForm.get(['id']).value,
      nombre: this.editForm.get(['nombre']).value,
      descripcion: this.editForm.get(['descripcion']).value,
      comentario: this.editForm.get(['comentario']).value,
      gerencia: this.editForm.get(['gerencia']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IArea>>) {
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

  trackAreaById(index: number, item: IArea) {
    return item.id;
  }
}
