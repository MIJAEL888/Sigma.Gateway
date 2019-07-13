import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { ILaboratorioMonitoreo, LaboratorioMonitoreo } from 'app/shared/model/monitoreo/laboratorio-monitoreo.model';
import { LaboratorioMonitoreoService } from './laboratorio-monitoreo.service';
import { IProyecto } from 'app/shared/model/monitoreo/proyecto.model';
import { ProyectoService } from 'app/entities/monitoreo/proyecto';

@Component({
  selector: 'jhi-laboratorio-monitoreo-update',
  templateUrl: './laboratorio-monitoreo-update.component.html'
})
export class LaboratorioMonitoreoUpdateComponent implements OnInit {
  isSaving: boolean;

  proyectos: IProyecto[];
  fechaResevaDp: any;

  editForm = this.fb.group({
    id: [],
    codigoLaboratorio: [],
    fechaReseva: [],
    proyecto: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected laboratorioMonitoreoService: LaboratorioMonitoreoService,
    protected proyectoService: ProyectoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ laboratorioMonitoreo }) => {
      this.updateForm(laboratorioMonitoreo);
    });
    this.proyectoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IProyecto[]>) => mayBeOk.ok),
        map((response: HttpResponse<IProyecto[]>) => response.body)
      )
      .subscribe((res: IProyecto[]) => (this.proyectos = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(laboratorioMonitoreo: ILaboratorioMonitoreo) {
    this.editForm.patchValue({
      id: laboratorioMonitoreo.id,
      codigoLaboratorio: laboratorioMonitoreo.codigoLaboratorio,
      fechaReseva: laboratorioMonitoreo.fechaReseva,
      proyecto: laboratorioMonitoreo.proyecto
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const laboratorioMonitoreo = this.createFromForm();
    if (laboratorioMonitoreo.id !== undefined) {
      this.subscribeToSaveResponse(this.laboratorioMonitoreoService.update(laboratorioMonitoreo));
    } else {
      this.subscribeToSaveResponse(this.laboratorioMonitoreoService.create(laboratorioMonitoreo));
    }
  }

  private createFromForm(): ILaboratorioMonitoreo {
    return {
      ...new LaboratorioMonitoreo(),
      id: this.editForm.get(['id']).value,
      codigoLaboratorio: this.editForm.get(['codigoLaboratorio']).value,
      fechaReseva: this.editForm.get(['fechaReseva']).value,
      proyecto: this.editForm.get(['proyecto']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILaboratorioMonitoreo>>) {
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

  trackProyectoById(index: number, item: IProyecto) {
    return item.id;
  }
}
