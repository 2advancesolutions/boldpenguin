import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ICustomer {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class TestService {

  private customers = new BehaviorSubject([{id: 1, name: 'Reginald'}]);
  public readonly $customers = this.customers.asObservable();

  getCutomers(): Observable<Array<ICustomer>> {
    return this.$customers;
  }

  addCustomer(): void {
    const customers = this.customers.getValue();
    customers.push({id: 2, name: 'Test'});
    return this.customers.next(customers);
  }

  deleteCustomer(id: number): void {
    const idx = this.customers.getValue().findIndex(c => c.id = id);
    this.customers.getValue().splice(idx, 1);
    return this.customers.next(this.customers.getValue());
  }

}
