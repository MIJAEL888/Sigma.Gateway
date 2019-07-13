/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { ServicioService } from 'app/entities/comercial/servicio/servicio.service';
import { IServicio, Servicio, EstadoServicio } from 'app/shared/model/comercial/servicio.model';

describe('Service Tests', () => {
  describe('Servicio Service', () => {
    let injector: TestBed;
    let service: ServicioService;
    let httpMock: HttpTestingController;
    let elemDefault: IServicio;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(ServicioService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Servicio(
        0,
        'AAAAAAA',
        currentDate,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        EstadoServicio.REGISTRADO,
        'AAAAAAA',
        'AAAAAAA'
      );
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign(
          {
            fechaEntrega: currentDate.format(DATE_FORMAT)
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

      it('should create a Servicio', async () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            fechaEntrega: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            fechaEntrega: currentDate
          },
          returnedFromService
        );
        service
          .create(new Servicio(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a Servicio', async () => {
        const returnedFromService = Object.assign(
          {
            codigo: 'BBBBBB',
            fechaEntrega: currentDate.format(DATE_FORMAT),
            nombreSolicitante: 'BBBBBB',
            numeroSolicitante: 'BBBBBB',
            observacion: 'BBBBBB',
            descripcion: 'BBBBBB',
            estado: 'BBBBBB',
            codigoCliente: 'BBBBBB',
            codigoSede: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fechaEntrega: currentDate
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

      it('should return a list of Servicio', async () => {
        const returnedFromService = Object.assign(
          {
            codigo: 'BBBBBB',
            fechaEntrega: currentDate.format(DATE_FORMAT),
            nombreSolicitante: 'BBBBBB',
            numeroSolicitante: 'BBBBBB',
            observacion: 'BBBBBB',
            descripcion: 'BBBBBB',
            estado: 'BBBBBB',
            codigoCliente: 'BBBBBB',
            codigoSede: 'BBBBBB'
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            fechaEntrega: currentDate
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

      it('should delete a Servicio', async () => {
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
