import { IDistrito } from 'app/shared/model/comercial/distrito.model';
import { IDepartamento } from 'app/shared/model/comercial/departamento.model';

export interface IProvincia {
  id?: number;
  nombre?: string;
  ubigeo?: string;
  descripcion?: string;
  distritos?: IDistrito[];
  departamento?: IDepartamento;
}

export class Provincia implements IProvincia {
  constructor(
    public id?: number,
    public nombre?: string,
    public ubigeo?: string,
    public descripcion?: string,
    public distritos?: IDistrito[],
    public departamento?: IDepartamento
  ) {}
}
