import { HttpClient } from '@angular/common/http';
import { IGenericDatasourceRequest } from '@app/shared/datasource/GenericDatasourceRequest';
import { PagedResult } from '@app/shared/datasource/PagedResult';
import { map, Observable } from 'rxjs';

import { GetSwapiResponse } from './SwapiResponse';

const swapiBaseUrl = 'https://swapi.dev/api';
const swapiPageSize = 10;

export function ValidateSwapiTake(input: IGenericDatasourceRequest) {
    if (!input.take) { return }

    if (input.take > swapiPageSize) {
        throw new Error('Take cannot be less than page size');
    }

    if (input.take > swapiPageSize) {
        throw new Error('Take cannot be greater than page size');
    }

    if (swapiPageSize % input.take !== 0) {
        throw new Error('Take must be a multiple of page size');
    }
}

export function GetAllFromSwapi<T>(http: HttpClient, url: string): Observable<PagedResult<T>> {
    return http.get<GetSwapiResponse>(url).pipe(map((response: GetSwapiResponse) => {
        let parsedItems = response.results;
        return new PagedResult<T>(parsedItems, response.count);
    }));
}

export function GetAllSwapiUrl(page: number, entity: string, search?: string) {
    const entityUrl = `${swapiBaseUrl}/${entity}`;
    let url = !page ? entityUrl : `${entityUrl}?page=${page}`;
    url = !search ? url : url.includes('?') ? `${url}&search=${search}` : `${url}?search=${search}`;
    return url;
}

export function GetSingleFromSwapi<T>(http: HttpClient, url: string): Observable<T> {
    return http.get<T>(url);
}

export function GetSingleSwapiUrl(id: number, endpoint: string) {
    return `${swapiBaseUrl}/${endpoint}/${id}`;
}

export function GetIdsFromUrls(urls: string[]) {
    return urls.map((url) => GetIdFromUrl(url));
}

export function GetIdFromUrl(url: string) {
    const idString = url.slice(0, -1).split('/').pop();
    return Number(idString);
}

export function CapitalizeFirstLetter(word: string) {
    if (!word) {
        return '';
    }

    return word.charAt(0).toUpperCase() + word.slice(1);
}


