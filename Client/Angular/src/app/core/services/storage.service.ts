import { Injectable } from '@angular/core';

export class Storage {
  constructor(private storage: any) { }

  public setItem(key: string, value: string) {
    this.storage.setItem(key, value);
  }
    
  public getItem(key: string){ 
    return this.storage.getItem(key)
  }
  public removeItem(key:string) {
    this.storage.removeItem(key);
  }
  public clear(){
    this.storage.clear(); 
  }
}

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService extends Storage {
    constructor() {
        super(localStorage);
    }
}

@Injectable({
    providedIn: 'root'
})
export class SessionStorageService extends Storage {
    constructor() {
        super(sessionStorage);
    }
}