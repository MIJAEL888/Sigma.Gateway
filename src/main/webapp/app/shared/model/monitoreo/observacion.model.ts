import { IProyecto } from 'app/shared/model/monitoreo/proyecto.model';
import { IComponente } from 'app/shared/model/monitoreo/componente.model';

export interface IObservacion {
  id?: number;
  descripcion?: any;
  comentario?: any;
  codigoMonitorista?: string;
  proyecto?: IProyecto;
  componente?: IComponente;
}

export class Observacion implements IObservacion {
  constructor(
    public id?: number,
    public descripcion?: any,
    public comentario?: any,
    public codigoMonitorista?: string,
    public proyecto?: IProyecto,
    public componente?: IComponente
  ) {}
}
