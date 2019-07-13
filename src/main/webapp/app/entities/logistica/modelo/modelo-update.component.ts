import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IModelo, Modelo } from 'app/shared/model/logistica/modelo.model';
import { ModeloService } from './modelo.service';
import { ITipoEquipo } from 'app/shared/model/logistica/tipo-equipo.model';
import { TipoEquipoService } from 'app/entities/logistica/tipo-equipo';
import { IMarca } from 'app/shared/model/logistica/marca.model';
import { MarcaService } from 'app/entities/logistica/marca';

@Component({
  selector: 'jhi-modelo-update',
  templateUrl: './modelo-update.component.html'
})
export class ModeloUpdateComponent implements OnInit {
  isSaving: boolean;

  tipoequipos: ITipoEquipo[];

  marcas: IMarca[];

  editForm = this.fb.group({
    id: [],
    nombre: [null, [Validators.required]],
    descripcion: [],
    tipoEuipo: [],
    marca: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected jhiAlertService: JhiAlertService,
    protected modeloService: ModeloService,
    protected tipoEquipoService: TipoEquipoService,
    protected marcaService: MarcaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ modelo }) => {
      this.updateForm(modelo);
    });
    this.tipoEquipoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ITipoEquipo[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITipoEquipo[]>) => response.body)
      )
      .subscribe((res: ITipoEquipo[]) => (this.tipoequipos = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.marcaService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IMarca[]>) => mayBeOk.ok),
        map((response: HttpResponse<IMarca[]>) => response.body)
      )
      .subscribe((res: IMarca[]) => (this.marcas = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(modelo: IModelo) {
    this.editForm.patchValue({
      id: modelo.id,
      nombre: modelo.nombre,
      descripcion: modelo.descripcion,
      tipoEuipo: modelo.tipoEuipo,
      marca: modelo.marca
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
    const modelo = this.createFromForm();
    if (modelo.id !== undefined) {
      this.subscribeToSaveResponse(this.modeloService.update(modelo));
    } else {
      this.subscribeToSaveResponse(this.modeloService.create(modelo));
    }
  }

  private createFromForm(): IModelo {
    return {
      ...new Modelo(),
      id: this.editForm.get(['id']).value,
      nombre: this.editForm.get(['nombre']).value,
      descripcion: this.editForm.get(['descripcion']).value,
      tipoEuipo: this.editForm.get(['tipoEuipo']).value,
      marca: this.editForm.get(['marca']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IModelo>>) {
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

  trackTipoEquipoById(index: number, item: ITipoEquipo) {
    return item.id;
  }

  trackMarcaById(index: number, item: IMarca) {
    return item.id;
  }
}
