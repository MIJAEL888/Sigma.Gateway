import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IComponente, Componente } from 'app/shared/model/monitoreo/componente.model';
import { ComponenteService } from './componente.service';

@Component({
  selector: 'jhi-componente-update',
  templateUrl: './componente-update.component.html'
})
export class ComponenteUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    nombre: [null, [Validators.required]],
    descripcion: [],
    protocolo: [],
    guia: [],
    iso: [],
    objetivos: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected jhiAlertService: JhiAlertService,
    protected componenteService: ComponenteService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ componente }) => {
      this.updateForm(componente);
    });
  }

  updateForm(componente: IComponente) {
    this.editForm.patchValue({
      id: componente.id,
      nombre: componente.nombre,
      descripcion: componente.descripcion,
      protocolo: componente.protocolo,
      guia: componente.guia,
      iso: componente.iso,
      objetivos: componente.objetivos
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
    const componente = this.createFromForm();
    if (componente.id !== undefined) {
      this.subscribeToSaveResponse(this.componenteService.update(componente));
    } else {
      this.subscribeToSaveResponse(this.componenteService.create(componente));
    }
  }

  private createFromForm(): IComponente {
    return {
      ...new Componente(),
      id: this.editForm.get(['id']).value,
      nombre: this.editForm.get(['nombre']).value,
      descripcion: this.editForm.get(['descripcion']).value,
      protocolo: this.editForm.get(['protocolo']).value,
      guia: this.editForm.get(['guia']).value,
      iso: this.editForm.get(['iso']).value,
      objetivos: this.editForm.get(['objetivos']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IComponente>>) {
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
