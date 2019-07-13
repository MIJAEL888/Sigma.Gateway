import { IComponenteMonitoreo } from 'app/shared/model/comercial/componente-monitoreo.model';
import { IMonitoreoServicio } from 'app/shared/model/comercial/monitoreo-servicio.model';

export interface IParamentroMonitoreo {
  id?: number;
  nombre?: string;
  descripcion?: string;
  costo?: number;
  componenteMonitoreo?: IComponenteMonitoreo;
  monitoreoServicios?: IMonitoreoServicio[];
}

export class ParamentroMonitoreo implements IParamentroMonitoreo {
  constructor(
    public id?: number,
    public nombre?: string,
    public descripcion?: string,
    public costo?: number,
    public componenteMonitoreo?: IComponenteMonitoreo,
    public monitoreoServicios?: IMonitoreoServicio[]
  ) {}
}
