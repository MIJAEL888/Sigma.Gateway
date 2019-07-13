import { ISede } from 'app/shared/model/comercial/sede.model';
import { IProvincia } from 'app/shared/model/comercial/provincia.model';

export interface IDistrito {
  id?: number;
  nombre?: string;
  ubigeo?: string;
  descripcion?: string;
  sedes?: ISede[];
  provincia?: IProvincia;
}

export class Distrito implements IDistrito {
  constructor(
    public id?: number,
    public nombre?: string,
    public ubigeo?: string,
    public descripcion?: string,
    public sedes?: ISede[],
    public provincia?: IProvincia
  ) {}
}
