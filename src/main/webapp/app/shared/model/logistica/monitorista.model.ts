import { Moment } from 'moment';
import { ILaboratorio } from 'app/shared/model/logistica/laboratorio.model';
import { ITipoSeguro } from 'app/shared/model/logistica/tipo-seguro.model';

export interface IMonitorista {
  id?: number;
  nombre?: string;
  apellidoPaterno?: string;
  apellidoMaterno?: string;
  dni?: string;
  fechaNacimiento?: Moment;
  laboratorio?: ILaboratorio;
  tipoSeguros?: ITipoSeguro[];
}

export class Monitorista implements IMonitorista {
  constructor(
    public id?: number,
    public nombre?: string,
    public apellidoPaterno?: string,
    public apellidoMaterno?: string,
    public dni?: string,
    public fechaNacimiento?: Moment,
    public laboratorio?: ILaboratorio,
    public tipoSeguros?: ITipoSeguro[]
  ) {}
}
