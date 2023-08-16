import { FindRoute } from '../modules/routes/dto/find-route.dtos';

export interface Point {
  latitude: number;
  longitude: number;
}

export interface RoundedPoint {
  center: Point;
  minusOffset: Point;
  plusOffset: Point;
}

export const maskCoordinates = (data: FindRoute) => {
  return `/${data.originLongitude},${data.originLatitude};${data.destinationLongitude},${data.destinationLatitude}`;
};

export const isPointInside = (
  checkPoint: Point,
  centerPoint: Point,
  km: number,
) => {
  const ky = 40000 / 360;
  const kx = Math.cos((Math.PI * centerPoint.latitude) / 180.0) * ky;
  const dx = Math.abs(centerPoint.longitude - checkPoint.longitude) * kx;
  const dy = Math.abs(centerPoint.latitude - checkPoint.latitude) * ky;
  return Math.sqrt(dx * dx + dy * dy) <= km;
};

export const getCenterCoordinates = (points: Point[]) => {
  const latSum = points.reduce((prev, current) => ({
    latitude: prev.latitude + current.latitude,
    longitude: prev.longitude + current.longitude,
  }));

  const markerCoords = {
    latitude: latSum.latitude / points.length ?? 1,
    longitude: latSum.longitude / points.length ?? 1,
  };

  return markerCoords;
};

export const addDistance = (point: number, km: number, longitude?: boolean) => {
  //fórmula haversine
  const earthRad = 6371;
  const latRad = point * (Math.PI / 180);
  const longRad = point * (Math.PI / 180);

  if (longitude) {
    const newLongRad = longRad + km / earthRad / Math.cos(latRad);
    const newLong = newLongRad * (180 / Math.PI);

    return newLong;
  }

  const newLatRad = latRad + km / earthRad;
  const newLat = newLatRad * (180 / Math.PI);

  return newLat;
};

export const calculateBearing = (pointInitial: Point, pointFinal: Point) => {
  const lat1 = pointInitial.latitude * (Math.PI / 180);
  const lon1 = pointInitial.longitude * (Math.PI / 180);
  const lat2 = pointFinal.latitude * (Math.PI / 180);
  const lon2 = pointFinal.longitude * (Math.PI / 180);

  const y = Math.sin(lon2 - lon1) * Math.cos(lat2);
  const x =
    Math.cos(lat1) * Math.sin(lat2) -
    Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1);
  const angle = Math.atan2(y, x);

  const bearing = ((angle * 180) / Math.PI + 360) % 360;

  return bearing;
};

export const isPointInRoute = (
  point: Point,
  pointInitial: RoundedPoint,
  pointFinal: RoundedPoint,
) => {
  const isInsideWidth =
    point.latitude < pointInitial.plusOffset.latitude &&
    point.latitude > pointInitial.minusOffset.latitude;

  const isInsideHeight =
    point.longitude < pointInitial.minusOffset.longitude &&
    point.longitude > pointInitial.minusOffset.latitude;
};
