import { Moment } from 'moment';
import { IMonitorista } from 'app/shared/model/logistica/monitorista.model';

export interface ILaboratorio {
  id?: number;
  razonSocial?: string;
  direccion?: string;
  ruc?: string;
  acreditadoPor?: string;
  numeroAcreditacion?: string;
  rutaDocAcreditacion?: string;
  nombreDocAcreditacion?: string;
  documentoAcreditacionContentType?: string;
  documentoAcreditacion?: any;
  vigenciaDesde?: Moment;
  vigenciaHasta?: Moment;
  telefono?: string;
  correo?: string;
  nombreContacto?: string;
  fechaCreacion?: Moment;
  laboratorios?: IMonitorista[];
}

export class Laboratorio implements ILaboratorio {
  constructor(
    public id?: number,
    public razonSocial?: string,
    public direccion?: string,
    public ruc?: string,
    public acreditadoPor?: string,
    public numeroAcreditacion?: string,
    public rutaDocAcreditacion?: string,
    public nombreDocAcreditacion?: string,
    public documentoAcreditacionContentType?: string,
    public documentoAcreditacion?: any,
    public vigenciaDesde?: Moment,
    public vigenciaHasta?: Moment,
    public telefono?: string,
    public correo?: string,
    public nombreContacto?: string,
    public fechaCreacion?: Moment,
    public laboratorios?: IMonitorista[]
  ) {}
}
