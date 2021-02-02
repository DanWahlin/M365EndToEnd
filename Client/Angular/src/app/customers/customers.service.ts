import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

import { Customer } from '../core/model';

@Injectable({
    providedIn: 'root'
})
export class CustomersService {

    apiUrl = 'api/customers/';

    constructor(private http: HttpClient) { 

    }

    getAll() {
        return this.http.get<Customer[]>(this.apiUrl)
            .pipe(
                map(customers => {
                    return customers;
                }),
                catchError(this.handleError)
            );
    }

    get(id) {
        return this.http.get<Customer>(this.apiUrl + id)
        .pipe(
            map(customer => {
                return customer;
            }),
            catchError(this.handleError)
        );
    }

    add(customer: Customer) {
        return this.http.post(this.apiUrl, customer)
            .pipe(
                switchMap(cust => {
                    // update local store with added customer data
                    // not required of course unless the store cache is needed 
                    // (it is for the customer list component in this example)
                    return this.getAll();
                }),
                catchError(this.handleError)
            );
    }

    update(customer: Customer) {
        return this.http.put(this.apiUrl + customer.id, customer)
            .pipe(
                switchMap(cust => {
                    return this.getAll();
                }),
                catchError(this.handleError)
            );
    }

    delete(id: number) {
        return this.http.delete(this.apiUrl + id)
            .pipe(
                switchMap(() => {         
                    return this.getAll();
                }),
                catchError(this.handleError)
            );
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
