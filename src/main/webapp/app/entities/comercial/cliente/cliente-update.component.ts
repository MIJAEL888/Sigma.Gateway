import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { ICliente, Cliente } from 'app/shared/model/comercial/cliente.model';
import { ClienteService } from './cliente.service';

@Component({
  selector: 'jhi-cliente-update',
  templateUrl: './cliente-update.component.html'
})
export class ClienteUpdateComponent implements OnInit {
  isSaving: boolean;
  fechaCreacionDp: any;

  editForm = this.fb.group({
    id: [],
    razonSocial: [null, [Validators.required]],
    direccion: [null, [Validators.required]],
    ruc: [null, [Validators.required]],
    telefono: [],
    correo: [],
    nombreContacto: [],
    actividad: [],
    comentario: [],
    fechaCreacion: [],
    codigoZona: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected jhiAlertService: JhiAlertService,
    protected clienteService: ClienteService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ cliente }) => {
      this.updateForm(cliente);
    });
  }

  updateForm(cliente: ICliente) {
    this.editForm.patchValue({
      id: cliente.id,
      razonSocial: cliente.razonSocial,
      direccion: cliente.direccion,
      ruc: cliente.ruc,
      telefono: cliente.telefono,
      correo: cliente.correo,
      nombreContacto: cliente.nombreContacto,
      actividad: cliente.actividad,
      comentario: cliente.comentario,
      fechaCreacion: cliente.fechaCreacion,
      codigoZona: cliente.codigoZona
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
    const cliente = this.createFromForm();
    if (cliente.id !== undefined) {
      this.subscribeToSaveResponse(this.clienteService.update(cliente));
    } else {
      this.subscribeToSaveResponse(this.clienteService.create(cliente));
    }
  }

  private createFromForm(): ICliente {
    return {
      ...new Cliente(),
      id: this.editForm.get(['id']).value,
      razonSocial: this.editForm.get(['razonSocial']).value,
      direccion: this.editForm.get(['direccion']).value,
      ruc: this.editForm.get(['ruc']).value,
      telefono: this.editForm.get(['telefono']).value,
      correo: this.editForm.get(['correo']).value,
      nombreContacto: this.editForm.get(['nombreContacto']).value,
      actividad: this.editForm.get(['actividad']).value,
      comentario: this.editForm.get(['comentario']).value,
      fechaCreacion: this.editForm.get(['fechaCreacion']).value,
      codigoZona: this.editForm.get(['codigoZona']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICliente>>) {
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
