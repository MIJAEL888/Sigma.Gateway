import { IParamentro } from 'app/shared/model/monitoreo/paramentro.model';

export interface IUnidades {
  id?: number;
  nombre?: string;
  codigo?: string;
  descripcion?: any;
  paramentros?: IParamentro[];
}

export class Unidades implements IUnidades {
  constructor(
    public id?: number,
    public nombre?: string,
    public codigo?: string,
    public descripcion?: any,
    public paramentros?: IParamentro[]
  ) {}
}
