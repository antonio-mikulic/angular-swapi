import { IGenericDatasourceRequest } from '@app/shared/datasource/GenericDatasourceRequest';

export class GetAllSwapiInput implements IGenericDatasourceRequest {
    endpoint: string = '';
    filter?: string
    take?: number;
    page?: number;
    saveKey?: string;
}
