import { Theme } from './enums';

export interface ICustomer {
    id: number;
    firstName: string;
    lastName: string;
    gender: string;
    address: string;
    city: string;
    state: IState;
    joinDate: string;
    orders?: IOrder[];
    orderTotal?: number;
    latitude?: number;
    longitude?: number;
    salesPersonId?: number;
}

export interface IState {
    abbreviation: string;
    name: string;
}

export interface IOrder {
    productName: string;
    itemCost: number;
}

export interface ISalesPerson {
    id: number;
    firstName: string;
    lastName: string;
    gender: string;
    address: string;
    city: string;
    state: IState;
}

export interface StoreState {
    userSettings: UserSettings;
}

export interface UserSettings {
    id: number;
    preferredName: string;
    email: string;
    theme: Theme;
}

export interface IApiResponse {
    status: boolean;
    error?: string;
}