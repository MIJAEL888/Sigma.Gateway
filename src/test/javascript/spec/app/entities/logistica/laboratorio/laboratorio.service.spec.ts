/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { LaboratorioService } from 'app/entities/logistica/laboratorio/laboratorio.service';
import { ILaboratorio, Laboratorio } from 'app/shared/model/logistica/laboratorio.model';

describe('Service Tests', () => {
  describe('Laboratorio Service', () => {
    let injector: TestBed;
    let service: LaboratorioService;
    let httpMock: HttpTestingController;
    let elemDefault: ILaboratorio;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(LaboratorioService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Laboratorio(
        0,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'image/png',
        'AAAAAAA',
        currentDate,
        currentDate,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        currentDate
      );
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign(
          {
            vigenciaDesde: currentDate.format(DATE_FORMAT),
            vigenciaHasta: currentDate.format(DATE_FORMAT),
            fechaCreacion: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: elemDefault });
      });

      it('should create a Laboratorio', async () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            vigenciaDesde: currentDate.format(DATE_FORMAT),
            vigenciaHasta: currentDate.format(DATE_FORMAT),
            fechaCreacion: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            vigenciaDesde: currentDate,
            vigenciaHasta: currentDate,
            fechaCreacion: currentDate
          },
          returnedFromService
        );
        service
          .create(new Laboratorio(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a Laboratorio', async () => {
        const returnedFromService = Object.assign(
          {
            razonSocial: 'BBBBBB',
            direccion: 'BBBBBB',
            ruc: 'BBBBBB',
            acreditadoPor: 'BBBBBB',
            numeroAcreditacion: 'BBBBBB',
            rutaDocAcreditacion: 'BBBBBB',
            nombreDocAcreditacion: 'BBBBBB',
            documentoAcreditacion: 'BBBBBB',
            vigenciaDesde: currentDate.format(DATE_FORMAT),
            vigenciaHasta: currentDate.format(DATE_FORMAT),
            telefono: 'BBBBBB',
            correo: 'BBBBBB',
            nombreContacto: 'BBBBBB',
            fechaCreacion: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            vigenciaDesde: currentDate,
            vigenciaHasta: currentDate,
            fechaCreacion: currentDate
          },
          returnedFromService
        );
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should return a list of Laboratorio', async () => {
        const returnedFromService = Object.assign(
          {
            razonSocial: 'BBBBBB',
            direccion: 'BBBBBB',
            ruc: 'BBBBBB',
            acreditadoPor: 'BBBBBB',
            numeroAcreditacion: 'BBBBBB',
            rutaDocAcreditacion: 'BBBBBB',
            nombreDocAcreditacion: 'BBBBBB',
            documentoAcreditacion: 'BBBBBB',
            vigenciaDesde: currentDate.format(DATE_FORMAT),
            vigenciaHasta: currentDate.format(DATE_FORMAT),
            telefono: 'BBBBBB',
            correo: 'BBBBBB',
            nombreContacto: 'BBBBBB',
            fechaCreacion: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            vigenciaDesde: currentDate,
            vigenciaHasta: currentDate,
            fechaCreacion: currentDate
          },
          returnedFromService
        );
        service
          .query(expected)
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Laboratorio', async () => {
        const rxPromise = service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
