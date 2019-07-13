import { ISede } from 'app/shared/model/comercial/sede.model';

export interface IContactoSede {
  id?: number;
  nombre?: string;
  telefono?: string;
  correo?: string;
  posicion?: string;
  sede?: ISede;
}

export class ContactoSede implements IContactoSede {
  constructor(
    public id?: number,
    public nombre?: string,
    public telefono?: string,
    public correo?: string,
    public posicion?: string,
    public sede?: ISede
  ) {}
}
