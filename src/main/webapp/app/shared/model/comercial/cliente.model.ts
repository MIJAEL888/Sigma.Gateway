import { Moment } from 'moment';
import { ISede } from 'app/shared/model/comercial/sede.model';

export interface ICliente {
  id?: number;
  razonSocial?: string;
  direccion?: string;
  ruc?: string;
  telefono?: string;
  correo?: string;
  nombreContacto?: string;
  actividad?: any;
  comentario?: any;
  fechaCreacion?: Moment;
  codigoZona?: string;
  sedes?: ISede[];
}

export class Cliente implements ICliente {
  constructor(
    public id?: number,
    public razonSocial?: string,
    public direccion?: string,
    public ruc?: string,
    public telefono?: string,
    public correo?: string,
    public nombreContacto?: string,
    public actividad?: any,
    public comentario?: any,
    public fechaCreacion?: Moment,
    public codigoZona?: string,
    public sedes?: ISede[]
  ) {}
}
