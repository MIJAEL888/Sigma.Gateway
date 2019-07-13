import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { ISede, Sede } from 'app/shared/model/comercial/sede.model';
import { SedeService } from './sede.service';
import { ICliente } from 'app/shared/model/comercial/cliente.model';
import { ClienteService } from 'app/entities/comercial/cliente';
import { IDistrito } from 'app/shared/model/comercial/distrito.model';
import { DistritoService } from 'app/entities/comercial/distrito';

@Component({
  selector: 'jhi-sede-update',
  templateUrl: './sede-update.component.html'
})
export class SedeUpdateComponent implements OnInit {
  isSaving: boolean;

  clientes: ICliente[];

  distritos: IDistrito[];

  editForm = this.fb.group({
    id: [],
    direccion: [null, [Validators.required]],
    referencia: [],
    latitud: [],
    longitud: [],
    actividad: [],
    telefono: [],
    descripcion: [],
    comentario: [],
    rutaDocEstudio: [],
    nombreDocEstudio: [],
    documentoEstudio: [],
    documentoEstudioContentType: [],
    cliente: [],
    distrito: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected jhiAlertService: JhiAlertService,
    protected sedeService: SedeService,
    protected clienteService: ClienteService,
    protected distritoService: DistritoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ sede }) => {
      this.updateForm(sede);
    });
    this.clienteService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICliente[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICliente[]>) => response.body)
      )
      .subscribe((res: ICliente[]) => (this.clientes = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.distritoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IDistrito[]>) => mayBeOk.ok),
        map((response: HttpResponse<IDistrito[]>) => response.body)
      )
      .subscribe((res: IDistrito[]) => (this.distritos = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(sede: ISede) {
    this.editForm.patchValue({
      id: sede.id,
      direccion: sede.direccion,
      referencia: sede.referencia,
      latitud: sede.latitud,
      longitud: sede.longitud,
      actividad: sede.actividad,
      telefono: sede.telefono,
      descripcion: sede.descripcion,
      comentario: sede.comentario,
      rutaDocEstudio: sede.rutaDocEstudio,
      nombreDocEstudio: sede.nombreDocEstudio,
      documentoEstudio: sede.documentoEstudio,
      documentoEstudioContentType: sede.documentoEstudioContentType,
      cliente: sede.cliente,
      distrito: sede.distrito
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
    const sede = this.createFromForm();
    if (sede.id !== undefined) {
      this.subscribeToSaveResponse(this.sedeService.update(sede));
    } else {
      this.subscribeToSaveResponse(this.sedeService.create(sede));
    }
  }

  private createFromForm(): ISede {
    return {
      ...new Sede(),
      id: this.editForm.get(['id']).value,
      direccion: this.editForm.get(['direccion']).value,
      referencia: this.editForm.get(['referencia']).value,
      latitud: this.editForm.get(['latitud']).value,
      longitud: this.editForm.get(['longitud']).value,
      actividad: this.editForm.get(['actividad']).value,
      telefono: this.editForm.get(['telefono']).value,
      descripcion: this.editForm.get(['descripcion']).value,
      comentario: this.editForm.get(['comentario']).value,
      rutaDocEstudio: this.editForm.get(['rutaDocEstudio']).value,
      nombreDocEstudio: this.editForm.get(['nombreDocEstudio']).value,
      documentoEstudioContentType: this.editForm.get(['documentoEstudioContentType']).value,
      documentoEstudio: this.editForm.get(['documentoEstudio']).value,
      cliente: this.editForm.get(['cliente']).value,
      distrito: this.editForm.get(['distrito']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISede>>) {
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

  trackClienteById(index: number, item: ICliente) {
    return item.id;
  }

  trackDistritoById(index: number, item: IDistrito) {
    return item.id;
  }
}
