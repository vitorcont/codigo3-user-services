import { FindRoute } from '../modules/routes/dto/find-route.dtos';

export const maskCoordinates = (data: FindRoute) => {
  return `/${data.originLongitude},${data.originLatitude};${data.destinationLongitude},${data.destinationLatitude}`;
};
