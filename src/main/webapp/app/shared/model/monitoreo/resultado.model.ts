import { Moment } from 'moment';
import { IResultadoEmisiones } from 'app/shared/model/monitoreo/resultado-emisiones.model';
import { IResultadoMetereologia } from 'app/shared/model/monitoreo/resultado-metereologia.model';
import { IPuntoMonitoreoObs } from 'app/shared/model/monitoreo/punto-monitoreo-obs.model';

export interface IResultado {
  id?: number;
  fechaInicio?: Moment;
  fehcaFin?: Moment;
  valorMinimo?: string;
  valorMaximo?: string;
  valorFinal?: string;
  valorFinalNum?: number;
  codigoLaboratorio?: string;
  codigoEquipo?: string;
  resultadoEmisiones?: IResultadoEmisiones[];
  resultadoMetereologias?: IResultadoMetereologia[];
  puntoMonitoreoObs?: IPuntoMonitoreoObs;
}

export class Resultado implements IResultado {
  constructor(
    public id?: number,
    public fechaInicio?: Moment,
    public fehcaFin?: Moment,
    public valorMinimo?: string,
    public valorMaximo?: string,
    public valorFinal?: string,
    public valorFinalNum?: number,
    public codigoLaboratorio?: string,
    public codigoEquipo?: string,
    public resultadoEmisiones?: IResultadoEmisiones[],
    public resultadoMetereologias?: IResultadoMetereologia[],
    public puntoMonitoreoObs?: IPuntoMonitoreoObs
  ) {}
}
