import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IEmpleado, Empleado } from 'app/shared/model/rrhh/empleado.model';
import { EmpleadoService } from './empleado.service';
import { IPosicion } from 'app/shared/model/rrhh/posicion.model';
import { PosicionService } from 'app/entities/rrhh/posicion';

@Component({
  selector: 'jhi-empleado-update',
  templateUrl: './empleado-update.component.html'
})
export class EmpleadoUpdateComponent implements OnInit {
  isSaving: boolean;

  posicions: IPosicion[];
  fechaNacimientoDp: any;
  fechaIngresoDp: any;
  fechaCreacionDp: any;
  fechaActualizacionDp: any;

  editForm = this.fb.group({
    id: [],
    nombre: [null, [Validators.required]],
    apellidoPaterno: [null, [Validators.required]],
    apellidoMaterno: [null, [Validators.required]],
    tipoDocumento: [],
    numeroDocumento: [null, [Validators.maxLength(15)]],
    fechaNacimiento: [],
    fechaIngreso: [],
    tipoContrato: [],
    tipoAportacion: [],
    estado: [],
    fechaCreacion: [],
    fechaActualizacion: [],
    direccion: [],
    estadoCivil: [],
    posicion: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected empleadoService: EmpleadoService,
    protected posicionService: PosicionService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ empleado }) => {
      this.updateForm(empleado);
    });
    this.posicionService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IPosicion[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPosicion[]>) => response.body)
      )
      .subscribe((res: IPosicion[]) => (this.posicions = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(empleado: IEmpleado) {
    this.editForm.patchValue({
      id: empleado.id,
      nombre: empleado.nombre,
      apellidoPaterno: empleado.apellidoPaterno,
      apellidoMaterno: empleado.apellidoMaterno,
      tipoDocumento: empleado.tipoDocumento,
      numeroDocumento: empleado.numeroDocumento,
      fechaNacimiento: empleado.fechaNacimiento,
      fechaIngreso: empleado.fechaIngreso,
      tipoContrato: empleado.tipoContrato,
      tipoAportacion: empleado.tipoAportacion,
      estado: empleado.estado,
      fechaCreacion: empleado.fechaCreacion,
      fechaActualizacion: empleado.fechaActualizacion,
      direccion: empleado.direccion,
      estadoCivil: empleado.estadoCivil,
      posicion: empleado.posicion
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const empleado = this.createFromForm();
    if (empleado.id !== undefined) {
      this.subscribeToSaveResponse(this.empleadoService.update(empleado));
    } else {
      this.subscribeToSaveResponse(this.empleadoService.create(empleado));
    }
  }

  private createFromForm(): IEmpleado {
    return {
      ...new Empleado(),
      id: this.editForm.get(['id']).value,
      nombre: this.editForm.get(['nombre']).value,
      apellidoPaterno: this.editForm.get(['apellidoPaterno']).value,
      apellidoMaterno: this.editForm.get(['apellidoMaterno']).value,
      tipoDocumento: this.editForm.get(['tipoDocumento']).value,
      numeroDocumento: this.editForm.get(['numeroDocumento']).value,
      fechaNacimiento: this.editForm.get(['fechaNacimiento']).value,
      fechaIngreso: this.editForm.get(['fechaIngreso']).value,
      tipoContrato: this.editForm.get(['tipoContrato']).value,
      tipoAportacion: this.editForm.get(['tipoAportacion']).value,
      estado: this.editForm.get(['estado']).value,
      fechaCreacion: this.editForm.get(['fechaCreacion']).value,
      fechaActualizacion: this.editForm.get(['fechaActualizacion']).value,
      direccion: this.editForm.get(['direccion']).value,
      estadoCivil: this.editForm.get(['estadoCivil']).value,
      posicion: this.editForm.get(['posicion']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEmpleado>>) {
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

  trackPosicionById(index: number, item: IPosicion) {
    return item.id;
  }
}
