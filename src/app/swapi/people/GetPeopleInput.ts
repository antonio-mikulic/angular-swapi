import { GetAllSwapiInput } from '../swapi-service/SwapiInput';

export class GetPeopleInput implements GetAllSwapiInput {
    endpoint: string = 'people';
    filter?: string
    take?: number;
    page?: number;
    saveKey: string = 'get-all-people';
}
