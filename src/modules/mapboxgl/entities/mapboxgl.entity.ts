export class MapboxglRouteList {
  routes: MapboxglRoute[];
  waypoints: any[];
  code: string;
  uuid: string;
}

export class Geometry {
  coordinates: number[][];
  type: string;
}

export class Maneuver {
  instruction: string;
  type: string;
  modifier: string;
  location: number[];
}

export class Steps {
  name: string;
  weight: number;
  duration: number;
  distance: number;
  driving_side: string;
  geometry: Geometry;
  intersections: [];
  maneuver: [];
}

export class Legs {
  via_waypoints: number[];
  weight_typical: number;
  duration_typical: number;
  weight: number;
  duration: number;
  distance: number;
  summary: string;
  annotation: {
    distance: number[];
  };
  steps: [];
}

export class MapboxglRoute {
  weight_typical: number;
  duration_typical: number;
  weight_name: string;
  weight: number;
  duration: number;
  distance: number;
  legs: [];
  geometry: Geometry;
}
