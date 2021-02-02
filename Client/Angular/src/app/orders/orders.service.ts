import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Order } from '../core/model';

@Injectable({
    providedIn: 'root'
})
export class OrdersService {

    apiUrl = 'api/orders/';

    constructor(private http: HttpClient) { 

     }

    getAll() {
        return this.http.get<Order[]>(this.apiUrl)
            .pipe(
                map(orders => {
                    return orders;
                }),
                catchError(this.handleError)
            );
    }

    get(id: number) {
        return this.getAll()
            .pipe(
                map(orders => {
                    return this.filterOrders(id, orders);
                })
            );
    }

    filterOrders(id: number, orders : Order[]) {
       return orders.filter(order => +order.customerId === id);
    }
    

    private handleError(error: any) {
        console.error('server error:', error);
        if (error.error instanceof Error) {
            const errMessage = error.error.message;
            return Observable.throw(errMessage);
        }
        return Observable.throw(error || 'Server error');
    }
}

export enum OrdersStoreActions {
    GetOrders = 'GET_ORDERS'
}