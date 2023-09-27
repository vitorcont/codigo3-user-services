export class ControllerSocket {}

export interface ControllerStateEnum {
  RED: 1;
  YELLOW: 2;
  GREEN: 3;
}

export type IControllerIndividual = {
  latitude: number;
  longitude: number;
};

export type IControllerMapper = {
  [K in `${string}`]: IControllerIndividual | null;
};
