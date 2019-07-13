import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IContactoSede, ContactoSede } from 'app/shared/model/comercial/contacto-sede.model';
import { ContactoSedeService } from './contacto-sede.service';
import { ISede } from 'app/shared/model/comercial/sede.model';
import { SedeService } from 'app/entities/comercial/sede';

@Component({
  selector: 'jhi-contacto-sede-update',
  templateUrl: './contacto-sede-update.component.html'
})
export class ContactoSedeUpdateComponent implements OnInit {
  isSaving: boolean;

  sedes: ISede[];

  editForm = this.fb.group({
    id: [],
    nombre: [null, [Validators.required]],
    telefono: [null, [Validators.required]],
    correo: [],
    posicion: [],
    sede: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected contactoSedeService: ContactoSedeService,
    protected sedeService: SedeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ contactoSede }) => {
      this.updateForm(contactoSede);
    });
    this.sedeService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ISede[]>) => mayBeOk.ok),
        map((response: HttpResponse<ISede[]>) => response.body)
      )
      .subscribe((res: ISede[]) => (this.sedes = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(contactoSede: IContactoSede) {
    this.editForm.patchValue({
      id: contactoSede.id,
      nombre: contactoSede.nombre,
      telefono: contactoSede.telefono,
      correo: contactoSede.correo,
      posicion: contactoSede.posicion,
      sede: contactoSede.sede
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const contactoSede = this.createFromForm();
    if (contactoSede.id !== undefined) {
      this.subscribeToSaveResponse(this.contactoSedeService.update(contactoSede));
    } else {
      this.subscribeToSaveResponse(this.contactoSedeService.create(contactoSede));
    }
  }

  private createFromForm(): IContactoSede {
    return {
      ...new ContactoSede(),
      id: this.editForm.get(['id']).value,
      nombre: this.editForm.get(['nombre']).value,
      telefono: this.editForm.get(['telefono']).value,
      correo: this.editForm.get(['correo']).value,
      posicion: this.editForm.get(['posicion']).value,
      sede: this.editForm.get(['sede']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IContactoSede>>) {
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

  trackSedeById(index: number, item: ISede) {
    return item.id;
  }
}
