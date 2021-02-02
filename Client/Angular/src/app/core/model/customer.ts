import { Order } from "./order";

export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  address: string;
  city: string;
  state: State;
  orders?: Order[];
  orderTotal?: number;
  latitude?: number;
  longitude?: number;
}

export interface State {
  abbreviation: string;
  name: string;
}