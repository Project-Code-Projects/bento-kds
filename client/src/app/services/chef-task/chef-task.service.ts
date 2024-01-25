import { Injectable } from '@angular/core';
import { ChefTaskInterface } from '../../interfaces/chef-task/chefTask.interface';
import { Subject } from 'rxjs';
import { OrderItemInterface } from '../../interfaces/chef-task/order.interface';

@Injectable({
  providedIn: 'root'
})
export class ChefTaskService {

  constructor() { }

  chefTasks : ChefTaskInterface[] = [];
  newOrderItems = new Subject<ChefTaskInterface[]>();
  updatedItemsOrder = new Subject<ChefTaskInterface[]>();

  emitIncomingOrderItems (order: OrderItemInterface) {
    const { items } = order;

    const newTasks = items.map(item => {
      return { item, order }
    });

    this.chefTasks = this.chefTasks.filter(task => task.order._id !== order._id);
    this.chefTasks.push(...newTasks);

    this.updatedItemsOrder.next(this.chefTasks);
  }
}
