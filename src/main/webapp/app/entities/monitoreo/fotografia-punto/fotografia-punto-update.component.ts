import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IFotografiaPunto, FotografiaPunto } from 'app/shared/model/monitoreo/fotografia-punto.model';
import { FotografiaPuntoService } from './fotografia-punto.service';
import { IPuntoMonitoreo } from 'app/shared/model/monitoreo/punto-monitoreo.model';
import { PuntoMonitoreoService } from 'app/entities/monitoreo/punto-monitoreo';

@Component({
  selector: 'jhi-fotografia-punto-update',
  templateUrl: './fotografia-punto-update.component.html'
})
export class FotografiaPuntoUpdateComponent implements OnInit {
  isSaving: boolean;

  puntomonitoreos: IPuntoMonitoreo[];

  editForm = this.fb.group({
    id: [],
    nombre: [null, [Validators.required]],
    ruta: [],
    extension: [],
    fotografia: [],
    fotografiaContentType: [],
    puntoMonitoreo: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected jhiAlertService: JhiAlertService,
    protected fotografiaPuntoService: FotografiaPuntoService,
    protected puntoMonitoreoService: PuntoMonitoreoService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ fotografiaPunto }) => {
      this.updateForm(fotografiaPunto);
    });
    this.puntoMonitoreoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IPuntoMonitoreo[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPuntoMonitoreo[]>) => response.body)
      )
      .subscribe((res: IPuntoMonitoreo[]) => (this.puntomonitoreos = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(fotografiaPunto: IFotografiaPunto) {
    this.editForm.patchValue({
      id: fotografiaPunto.id,
      nombre: fotografiaPunto.nombre,
      ruta: fotografiaPunto.ruta,
      extension: fotografiaPunto.extension,
      fotografia: fotografiaPunto.fotografia,
      fotografiaContentType: fotografiaPunto.fotografiaContentType,
      puntoMonitoreo: fotografiaPunto.puntoMonitoreo
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
    const fotografiaPunto = this.createFromForm();
    if (fotografiaPunto.id !== undefined) {
      this.subscribeToSaveResponse(this.fotografiaPuntoService.update(fotografiaPunto));
    } else {
      this.subscribeToSaveResponse(this.fotografiaPuntoService.create(fotografiaPunto));
    }
  }

  private createFromForm(): IFotografiaPunto {
    return {
      ...new FotografiaPunto(),
      id: this.editForm.get(['id']).value,
      nombre: this.editForm.get(['nombre']).value,
      ruta: this.editForm.get(['ruta']).value,
      extension: this.editForm.get(['extension']).value,
      fotografiaContentType: this.editForm.get(['fotografiaContentType']).value,
      fotografia: this.editForm.get(['fotografia']).value,
      puntoMonitoreo: this.editForm.get(['puntoMonitoreo']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFotografiaPunto>>) {
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

  trackPuntoMonitoreoById(index: number, item: IPuntoMonitoreo) {
    return item.id;
  }
}
