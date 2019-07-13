import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IPosicion, Posicion } from 'app/shared/model/rrhh/posicion.model';
import { PosicionService } from './posicion.service';
import { IArea } from 'app/shared/model/rrhh/area.model';
import { AreaService } from 'app/entities/rrhh/area';

@Component({
  selector: 'jhi-posicion-update',
  templateUrl: './posicion-update.component.html'
})
export class PosicionUpdateComponent implements OnInit {
  isSaving: boolean;

  areas: IArea[];

  editForm = this.fb.group({
    id: [],
    nombre: [null, [Validators.required]],
    descripcion: [],
    funciones: [],
    area: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected jhiAlertService: JhiAlertService,
    protected posicionService: PosicionService,
    protected areaService: AreaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ posicion }) => {
      this.updateForm(posicion);
    });
    this.areaService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IArea[]>) => mayBeOk.ok),
        map((response: HttpResponse<IArea[]>) => response.body)
      )
      .subscribe((res: IArea[]) => (this.areas = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(posicion: IPosicion) {
    this.editForm.patchValue({
      id: posicion.id,
      nombre: posicion.nombre,
      descripcion: posicion.descripcion,
      funciones: posicion.funciones,
      area: posicion.area
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
    const posicion = this.createFromForm();
    if (posicion.id !== undefined) {
      this.subscribeToSaveResponse(this.posicionService.update(posicion));
    } else {
      this.subscribeToSaveResponse(this.posicionService.create(posicion));
    }
  }

  private createFromForm(): IPosicion {
    return {
      ...new Posicion(),
      id: this.editForm.get(['id']).value,
      nombre: this.editForm.get(['nombre']).value,
      descripcion: this.editForm.get(['descripcion']).value,
      funciones: this.editForm.get(['funciones']).value,
      area: this.editForm.get(['area']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPosicion>>) {
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
