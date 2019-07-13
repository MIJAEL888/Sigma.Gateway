import { IParamentroMonitoreo } from 'app/shared/model/comercial/paramentro-monitoreo.model';

export interface IComponenteMonitoreo {
  id?: number;
  nombre?: string;
  descripcion?: string;
  paramentroMonitoreos?: IParamentroMonitoreo[];
}

export class ComponenteMonitoreo implements IComponenteMonitoreo {
  constructor(
    public id?: number,
    public nombre?: string,
    public descripcion?: string,
    public paramentroMonitoreos?: IParamentroMonitoreo[]
  ) {}
}
