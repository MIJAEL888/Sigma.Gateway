import { ITipoComponente } from 'app/shared/model/monitoreo/tipo-componente.model';
import { INormaCalidad } from 'app/shared/model/monitoreo/norma-calidad.model';
import { IPuntoMonitoreo } from 'app/shared/model/monitoreo/punto-monitoreo.model';
import { IUnidades } from 'app/shared/model/monitoreo/unidades.model';

export interface IParamentro {
  id?: number;
  nombre?: string;
  siglas?: string;
  descripcion?: string;
  costo?: number;
  metodologia?: any;
  metodoEnsayo?: any;
  limiteCuantificacion?: number;
  tipoComponente?: ITipoComponente;
  normaCalidad?: INormaCalidad;
  puntoMonitoreo?: IPuntoMonitoreo;
  unidades?: IUnidades;
}

export class Paramentro implements IParamentro {
  constructor(
    public id?: number,
    public nombre?: string,
    public siglas?: string,
    public descripcion?: string,
    public costo?: number,
    public metodologia?: any,
    public metodoEnsayo?: any,
    public limiteCuantificacion?: number,
    public tipoComponente?: ITipoComponente,
    public normaCalidad?: INormaCalidad,
    public puntoMonitoreo?: IPuntoMonitoreo,
    public unidades?: IUnidades
  ) {}
}
