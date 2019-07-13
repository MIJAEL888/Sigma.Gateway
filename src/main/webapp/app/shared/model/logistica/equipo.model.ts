import { Moment } from 'moment';
import { IModelo } from 'app/shared/model/logistica/modelo.model';

export const enum EstadoEquipo {
  CALIBRADO = 'CALIBRADO',
  MANTENIMIENTO = 'MANTENIMIENTO',
  BAJA = 'BAJA'
}

export interface IEquipo {
  id?: number;
  codigoEquipo?: string;
  serie?: string;
  calibradoDesde?: Moment;
  calibradoHasta?: Moment;
  rutaDocCalibracion?: string;
  nombreDocCalibracion?: string;
  documentoCalibracionContentType?: string;
  documentoCalibracion?: any;
  estado?: EstadoEquipo;
  fechaCompra?: Moment;
  observacion?: any;
  comentario?: any;
  testContentType?: string;
  test?: any;
  modelo?: IModelo;
}

export class Equipo implements IEquipo {
  constructor(
    public id?: number,
    public codigoEquipo?: string,
    public serie?: string,
    public calibradoDesde?: Moment,
    public calibradoHasta?: Moment,
    public rutaDocCalibracion?: string,
    public nombreDocCalibracion?: string,
    public documentoCalibracionContentType?: string,
    public documentoCalibracion?: any,
    public estado?: EstadoEquipo,
    public fechaCompra?: Moment,
    public observacion?: any,
    public comentario?: any,
    public testContentType?: string,
    public test?: any,
    public modelo?: IModelo
  ) {}
}
