import { Entity } from './Entity';

export class PagedResult<T extends Entity> {
    items?: T[];
    totalCount?: number;

    constructor(items?: T[], totalCount?: number) {
        this.items = items;
        this.totalCount = totalCount;
    }
}