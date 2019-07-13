import { Moment } from 'moment';
import { IProyecto } from 'app/shared/model/monitoreo/proyecto.model';

export interface ILaboratorioMonitoreo {
  id?: number;
  codigoLaboratorio?: string;
  fechaReseva?: Moment;
  proyecto?: IProyecto;
}

export class LaboratorioMonitoreo implements ILaboratorioMonitoreo {
  constructor(public id?: number, public codigoLaboratorio?: string, public fechaReseva?: Moment, public proyecto?: IProyecto) {}
}
