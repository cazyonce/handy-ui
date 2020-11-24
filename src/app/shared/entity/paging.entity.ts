export class PagingEntity<T> {
    
    pageSize = 25;
    pageIndex = 1;
    total: number = 0;
    list: Array<T> = [];
    sizeOption = [25, 50, 100, 250, 500];
    loading: boolean;
}