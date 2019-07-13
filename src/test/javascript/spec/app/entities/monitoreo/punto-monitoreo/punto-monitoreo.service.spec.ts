/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { PuntoMonitoreoService } from 'app/entities/monitoreo/punto-monitoreo/punto-monitoreo.service';
import { IPuntoMonitoreo, PuntoMonitoreo } from 'app/shared/model/monitoreo/punto-monitoreo.model';

describe('Service Tests', () => {
  describe('PuntoMonitoreo Service', () => {
    let injector: TestBed;
    let service: PuntoMonitoreoService;
    let httpMock: HttpTestingController;
    let elemDefault: IPuntoMonitoreo;
    let expectedResult;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(PuntoMonitoreoService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new PuntoMonitoreo(0, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 0, 0, 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign({}, elemDefault);
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: elemDefault });
      });

      it('should create a PuntoMonitoreo', async () => {
        const returnedFromService = Object.assign(
          {
            id: 0
          },
          elemDefault
        );
        const expected = Object.assign({}, returnedFromService);
        service
          .create(new PuntoMonitoreo(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a PuntoMonitoreo', async () => {
        const returnedFromService = Object.assign(
          {
            codigo: 'BBBBBB',
            codigoSede: 'BBBBBB',
            codigoCliente: 'BBBBBB',
            coordenadaNorte: 'BBBBBB',
            coordenadaEste: 'BBBBBB',
            descripcion: 'BBBBBB',
            comentario: 'BBBBBB',
            latitud: 1,
            longitud: 1,
            observacion: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should return a list of PuntoMonitoreo', async () => {
        const returnedFromService = Object.assign(
          {
            codigo: 'BBBBBB',
            codigoSede: 'BBBBBB',
            codigoCliente: 'BBBBBB',
            coordenadaNorte: 'BBBBBB',
            coordenadaEste: 'BBBBBB',
            descripcion: 'BBBBBB',
            comentario: 'BBBBBB',
            latitud: 1,
            longitud: 1,
            observacion: 'BBBBBB'
          },
          elemDefault
        );
        const expected = Object.assign({}, returnedFromService);
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

      it('should delete a PuntoMonitoreo', async () => {
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
