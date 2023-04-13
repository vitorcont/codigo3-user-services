import { FindRoute } from '../modules/routes/dto/find-route.dtos';

export const maskCoordinates = (data: FindRoute) => {
  return `/${data.originLatitude},${data.originLongitude};${data.destinationLatitude},${data.destinationLongitude}`;
};
