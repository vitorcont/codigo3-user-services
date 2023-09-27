import { FindRoute } from 'src/modules/navigation-socket/dto/route';

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

export const isPointInsideRadius = (
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

export const isPointInsideRoute = (
  pointSearched: Point,
  pointA: Point,
  pointB: Point,
) => {
  const bearing = calculateBearing(pointA, pointB);

  let latitudeFlag = false;
  let longitudeFlag = false;

  if ((bearing > 315 && bearing < 45) || (bearing > 134 && bearing < 225)) {
    //NORTE OU SUL
    const pointInitial = {
      center: {
        latitude: pointA.latitude,
        longitude: pointA.longitude,
      },
      minusOffset: {
        latitude: addDistance(pointA.latitude, -0.02),
        longitude: pointA.longitude,
      },
      plusOffset: {
        latitude: addDistance(pointA.latitude, 0.02),
        longitude: pointA.longitude,
      },
    };
    const pointFinal = {
      center: {
        latitude: pointB.latitude,
        longitude: pointB.longitude,
      },
      minusOffset: {
        latitude: addDistance(pointB.latitude, -0.02),
        longitude: pointB.longitude,
      },
      plusOffset: {
        latitude: addDistance(pointB.latitude, 0.02),
        longitude: pointB.longitude,
      },
    };

    if (
      pointSearched.latitude <= pointInitial.plusOffset.latitude &&
      pointSearched.latitude >= pointInitial.minusOffset.latitude
    ) {
      latitudeFlag = true;
    }

    if (
      pointSearched.longitude <= pointInitial.plusOffset.longitude &&
      pointSearched.longitude >= pointFinal.plusOffset.longitude
    ) {
      longitudeFlag = true;
    }

    if (
      pointSearched.longitude <= pointInitial.plusOffset.longitude &&
      pointSearched.longitude >= pointFinal.plusOffset.longitude
    ) {
      longitudeFlag = true;
    }
  } else {
    //LESTE OU OESTE
    const pointInitial = {
      center: {
        latitude: pointA.latitude,
        longitude: pointA.longitude,
      },
      minusOffset: {
        latitude: pointA.latitude,
        longitude: addDistance(pointA.longitude, -0.02, true),
      },
      plusOffset: {
        latitude: pointA.latitude,
        longitude: addDistance(pointA.longitude, 0.02, true),
      },
    };
    const pointFinal = {
      center: {
        latitude: pointB.latitude,
        longitude: pointB.longitude,
      },
      minusOffset: {
        latitude: pointA.latitude,
        longitude: addDistance(pointB.longitude, -0.02, true),
      },
      plusOffset: {
        latitude: pointA.latitude,
        longitude: addDistance(pointB.longitude, 0.02, true),
      },
    };

    if (
      pointSearched.longitude <= pointInitial.plusOffset.longitude &&
      pointSearched.longitude >= pointInitial.minusOffset.longitude
    ) {
      longitudeFlag = true;
    }

    if (
      pointSearched.latitude <= pointInitial.plusOffset.latitude &&
      pointSearched.latitude >= pointFinal.plusOffset.latitude
    ) {
      latitudeFlag = true;
    }

    if (
      pointSearched.latitude <= pointInitial.plusOffset.latitude &&
      pointSearched.latitude >= pointFinal.plusOffset.latitude
    ) {
      latitudeFlag = true;
    }
  }

  return longitudeFlag && latitudeFlag;
};
