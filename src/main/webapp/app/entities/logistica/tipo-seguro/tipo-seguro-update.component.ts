import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { ITipoSeguro, TipoSeguro } from 'app/shared/model/logistica/tipo-seguro.model';
import { TipoSeguroService } from './tipo-seguro.service';
import { IMonitorista } from 'app/shared/model/logistica/monitorista.model';
import { MonitoristaService } from 'app/entities/logistica/monitorista';

@Component({
  selector: 'jhi-tipo-seguro-update',
  templateUrl: './tipo-seguro-update.component.html'
})
export class TipoSeguroUpdateComponent implements OnInit {
  isSaving: boolean;

  monitoristas: IMonitorista[];
  fechaCaudicidadDp: any;

  editForm = this.fb.group({
    id: [],
    nombre: [null, [Validators.required]],
    descripcion: [],
    fechaCaudicidad: [],
    codigoTipoSeguro: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected jhiAlertService: JhiAlertService,
    protected tipoSeguroService: TipoSeguroService,
    protected monitoristaService: MonitoristaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ tipoSeguro }) => {
      this.updateForm(tipoSeguro);
    });
    this.monitoristaService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IMonitorista[]>) => mayBeOk.ok),
        map((response: HttpResponse<IMonitorista[]>) => response.body)
      )
      .subscribe((res: IMonitorista[]) => (this.monitoristas = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(tipoSeguro: ITipoSeguro) {
    this.editForm.patchValue({
      id: tipoSeguro.id,
      nombre: tipoSeguro.nombre,
      descripcion: tipoSeguro.descripcion,
      fechaCaudicidad: tipoSeguro.fechaCaudicidad,
      codigoTipoSeguro: tipoSeguro.codigoTipoSeguro
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
    const tipoSeguro = this.createFromForm();
    if (tipoSeguro.id !== undefined) {
      this.subscribeToSaveResponse(this.tipoSeguroService.update(tipoSeguro));
    } else {
      this.subscribeToSaveResponse(this.tipoSeguroService.create(tipoSeguro));
    }
  }

  private createFromForm(): ITipoSeguro {
    return {
      ...new TipoSeguro(),
      id: this.editForm.get(['id']).value,
      nombre: this.editForm.get(['nombre']).value,
      descripcion: this.editForm.get(['descripcion']).value,
      fechaCaudicidad: this.editForm.get(['fechaCaudicidad']).value,
      codigoTipoSeguro: this.editForm.get(['codigoTipoSeguro']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITipoSeguro>>) {
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

  trackMonitoristaById(index: number, item: IMonitorista) {
    return item.id;
  }

  getSelected(selectedVals: Array<any>, option: any) {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
