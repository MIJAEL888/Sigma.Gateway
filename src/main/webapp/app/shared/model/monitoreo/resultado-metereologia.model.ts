import { Moment } from 'moment';
import { IResultado } from 'app/shared/model/monitoreo/resultado.model';

export interface IResultadoMetereologia {
  id?: number;
  fecha?: Moment;
  valor?: string;
  valorDecimal?: number;
  resultado?: IResultado;
}

export class ResultadoMetereologia implements IResultadoMetereologia {
  constructor(
    public id?: number,
    public fecha?: Moment,
    public valor?: string,
    public valorDecimal?: number,
    public resultado?: IResultado
  ) {}
}
