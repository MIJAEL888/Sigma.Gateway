import { IComponente } from 'app/shared/model/monitoreo/componente.model';
import { IParamentro } from 'app/shared/model/monitoreo/paramentro.model';

export interface ITipoComponente {
  id?: number;
  nombre?: string;
  descripcion?: string;
  componente?: IComponente;
  paramentros?: IParamentro[];
}

export class TipoComponente implements ITipoComponente {
  constructor(
    public id?: number,
    public nombre?: string,
    public descripcion?: string,
    public componente?: IComponente,
    public paramentros?: IParamentro[]
  ) {}
}
