import { GetAllSwapiInput } from '../swapi-service/SwapiInput';

export class GetAllHomeworldInput implements GetAllSwapiInput {
    endpoint: string = 'planets';
    filter?: string
    take?: number;
    page?: number;
    saveKey?: string;
}
