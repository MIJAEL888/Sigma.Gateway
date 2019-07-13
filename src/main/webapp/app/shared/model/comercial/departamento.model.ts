import { IProvincia } from 'app/shared/model/comercial/provincia.model';

export interface IDepartamento {
  id?: number;
  nombre?: string;
  ubigeo?: string;
  descripcion?: string;
  provincias?: IProvincia[];
}

export class Departamento implements IDepartamento {
  constructor(
    public id?: number,
    public nombre?: string,
    public ubigeo?: string,
    public descripcion?: string,
    public provincias?: IProvincia[]
  ) {}
}
