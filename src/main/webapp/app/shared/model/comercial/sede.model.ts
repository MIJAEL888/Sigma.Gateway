import { IContactoSede } from 'app/shared/model/comercial/contacto-sede.model';
import { IServicio } from 'app/shared/model/comercial/servicio.model';
import { ICliente } from 'app/shared/model/comercial/cliente.model';
import { IDistrito } from 'app/shared/model/comercial/distrito.model';

export interface ISede {
  id?: number;
  direccion?: string;
  referencia?: string;
  latitud?: string;
  longitud?: string;
  actividad?: any;
  telefono?: string;
  descripcion?: any;
  comentario?: any;
  rutaDocEstudio?: string;
  nombreDocEstudio?: string;
  documentoEstudioContentType?: string;
  documentoEstudio?: any;
  contactoSedes?: IContactoSede[];
  servicios?: IServicio[];
  cliente?: ICliente;
  distrito?: IDistrito;
}

export class Sede implements ISede {
  constructor(
    public id?: number,
    public direccion?: string,
    public referencia?: string,
    public latitud?: string,
    public longitud?: string,
    public actividad?: any,
    public telefono?: string,
    public descripcion?: any,
    public comentario?: any,
    public rutaDocEstudio?: string,
    public nombreDocEstudio?: string,
    public documentoEstudioContentType?: string,
    public documentoEstudio?: any,
    public contactoSedes?: IContactoSede[],
    public servicios?: IServicio[],
    public cliente?: ICliente,
    public distrito?: IDistrito
  ) {}
}
