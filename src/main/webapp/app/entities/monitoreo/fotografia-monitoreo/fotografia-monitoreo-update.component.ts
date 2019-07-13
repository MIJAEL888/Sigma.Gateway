import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IFotografiaMonitoreo, FotografiaMonitoreo } from 'app/shared/model/monitoreo/fotografia-monitoreo.model';
import { FotografiaMonitoreoService } from './fotografia-monitoreo.service';
import { IPuntoMonitoreoObs } from 'app/shared/model/monitoreo/punto-monitoreo-obs.model';
import { PuntoMonitoreoObsService } from 'app/entities/monitoreo/punto-monitoreo-obs';

@Component({
  selector: 'jhi-fotografia-monitoreo-update',
  templateUrl: './fotografia-monitoreo-update.component.html'
})
export class FotografiaMonitoreoUpdateComponent implements OnInit {
  isSaving: boolean;

  puntomonitoreoobs: IPuntoMonitoreoObs[];

  editForm = this.fb.group({
    id: [],
    nombre: [null, [Validators.required]],
    ruta: [],
    extension: [],
    fotografia: [],
    fotografiaContentType: [],
    puntoMonitoreoObs: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected jhiAlertService: JhiAlertService,
    protected fotografiaMonitoreoService: FotografiaMonitoreoService,
    protected puntoMonitoreoObsService: PuntoMonitoreoObsService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ fotografiaMonitoreo }) => {
      this.updateForm(fotografiaMonitoreo);
    });
    this.puntoMonitoreoObsService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IPuntoMonitoreoObs[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPuntoMonitoreoObs[]>) => response.body)
      )
      .subscribe((res: IPuntoMonitoreoObs[]) => (this.puntomonitoreoobs = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(fotografiaMonitoreo: IFotografiaMonitoreo) {
    this.editForm.patchValue({
      id: fotografiaMonitoreo.id,
      nombre: fotografiaMonitoreo.nombre,
      ruta: fotografiaMonitoreo.ruta,
      extension: fotografiaMonitoreo.extension,
      fotografia: fotografiaMonitoreo.fotografia,
      fotografiaContentType: fotografiaMonitoreo.fotografiaContentType,
      puntoMonitoreoObs: fotografiaMonitoreo.puntoMonitoreoObs
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

  clearInputImage(field: string, fieldContentType: string, idInput: string) {
    this.editForm.patchValue({
      [field]: null,
      [fieldContentType]: null
    });
    if (this.elementRef && idInput && this.elementRef.nativeElement.querySelector('#' + idInput)) {
      this.elementRef.nativeElement.querySelector('#' + idInput).value = null;
    }
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const fotografiaMonitoreo = this.createFromForm();
    if (fotografiaMonitoreo.id !== undefined) {
      this.subscribeToSaveResponse(this.fotografiaMonitoreoService.update(fotografiaMonitoreo));
    } else {
      this.subscribeToSaveResponse(this.fotografiaMonitoreoService.create(fotografiaMonitoreo));
    }
  }

  private createFromForm(): IFotografiaMonitoreo {
    return {
      ...new FotografiaMonitoreo(),
      id: this.editForm.get(['id']).value,
      nombre: this.editForm.get(['nombre']).value,
      ruta: this.editForm.get(['ruta']).value,
      extension: this.editForm.get(['extension']).value,
      fotografiaContentType: this.editForm.get(['fotografiaContentType']).value,
      fotografia: this.editForm.get(['fotografia']).value,
      puntoMonitoreoObs: this.editForm.get(['puntoMonitoreoObs']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFotografiaMonitoreo>>) {
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

  trackPuntoMonitoreoObsById(index: number, item: IPuntoMonitoreoObs) {
    return item.id;
  }
}
