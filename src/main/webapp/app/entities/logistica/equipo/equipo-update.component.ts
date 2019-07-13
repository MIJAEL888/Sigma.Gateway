import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IEquipo, Equipo } from 'app/shared/model/logistica/equipo.model';
import { EquipoService } from './equipo.service';
import { IModelo } from 'app/shared/model/logistica/modelo.model';
import { ModeloService } from 'app/entities/logistica/modelo';

@Component({
  selector: 'jhi-equipo-update',
  templateUrl: './equipo-update.component.html'
})
export class EquipoUpdateComponent implements OnInit {
  isSaving: boolean;

  modelos: IModelo[];
  calibradoDesdeDp: any;
  calibradoHastaDp: any;
  fechaCompraDp: any;

  editForm = this.fb.group({
    id: [],
    codigoEquipo: [null, [Validators.required]],
    serie: [null, [Validators.required]],
    calibradoDesde: [],
    calibradoHasta: [],
    rutaDocCalibracion: [],
    nombreDocCalibracion: [],
    documentoCalibracion: [],
    documentoCalibracionContentType: [],
    estado: [],
    fechaCompra: [],
    observacion: [],
    comentario: [],
    test: [],
    testContentType: [],
    modelo: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected jhiAlertService: JhiAlertService,
    protected equipoService: EquipoService,
    protected modeloService: ModeloService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ equipo }) => {
      this.updateForm(equipo);
    });
    this.modeloService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IModelo[]>) => mayBeOk.ok),
        map((response: HttpResponse<IModelo[]>) => response.body)
      )
      .subscribe((res: IModelo[]) => (this.modelos = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(equipo: IEquipo) {
    this.editForm.patchValue({
      id: equipo.id,
      codigoEquipo: equipo.codigoEquipo,
      serie: equipo.serie,
      calibradoDesde: equipo.calibradoDesde,
      calibradoHasta: equipo.calibradoHasta,
      rutaDocCalibracion: equipo.rutaDocCalibracion,
      nombreDocCalibracion: equipo.nombreDocCalibracion,
      documentoCalibracion: equipo.documentoCalibracion,
      documentoCalibracionContentType: equipo.documentoCalibracionContentType,
      estado: equipo.estado,
      fechaCompra: equipo.fechaCompra,
      observacion: equipo.observacion,
      comentario: equipo.comentario,
      test: equipo.test,
      testContentType: equipo.testContentType,
      modelo: equipo.modelo
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
    const equipo = this.createFromForm();
    if (equipo.id !== undefined) {
      this.subscribeToSaveResponse(this.equipoService.update(equipo));
    } else {
      this.subscribeToSaveResponse(this.equipoService.create(equipo));
    }
  }

  private createFromForm(): IEquipo {
    return {
      ...new Equipo(),
      id: this.editForm.get(['id']).value,
      codigoEquipo: this.editForm.get(['codigoEquipo']).value,
      serie: this.editForm.get(['serie']).value,
      calibradoDesde: this.editForm.get(['calibradoDesde']).value,
      calibradoHasta: this.editForm.get(['calibradoHasta']).value,
      rutaDocCalibracion: this.editForm.get(['rutaDocCalibracion']).value,
      nombreDocCalibracion: this.editForm.get(['nombreDocCalibracion']).value,
      documentoCalibracionContentType: this.editForm.get(['documentoCalibracionContentType']).value,
      documentoCalibracion: this.editForm.get(['documentoCalibracion']).value,
      estado: this.editForm.get(['estado']).value,
      fechaCompra: this.editForm.get(['fechaCompra']).value,
      observacion: this.editForm.get(['observacion']).value,
      comentario: this.editForm.get(['comentario']).value,
      testContentType: this.editForm.get(['testContentType']).value,
      test: this.editForm.get(['test']).value,
      modelo: this.editForm.get(['modelo']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEquipo>>) {
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

  trackModeloById(index: number, item: IModelo) {
    return item.id;
  }
}
