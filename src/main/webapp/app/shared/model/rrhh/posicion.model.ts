import { IEmpleado } from 'app/shared/model/rrhh/empleado.model';
import { IArea } from 'app/shared/model/rrhh/area.model';

export interface IPosicion {
  id?: number;
  nombre?: string;
  descripcion?: any;
  funciones?: any;
  empleados?: IEmpleado[];
  area?: IArea;
}

export class Posicion implements IPosicion {
  constructor(
    public id?: number,
    public nombre?: string,
    public descripcion?: any,
    public funciones?: any,
    public empleados?: IEmpleado[],
    public area?: IArea
  ) {}
}
