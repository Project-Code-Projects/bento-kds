import { Component, OnInit } from '@angular/core';

import { OrdersService } from '../../services/orders/orders.service';
import { OrderItemInterface } from '../../interfaces/order.interface';
import { IUser } from '../../interfaces/user.interface';
import { LoadingService } from '../../services/loading/loading.service';
import { ChefService } from '../../services/chef/chef.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css',
})
export class DashboardPageComponent implements OnInit {
Number(arg0: number) {
throw new Error('Method not implemented.');
}
  totalOrders: number = 0;
  pendingOrders: number = 0;
  preparingOrders: number = 0;
  servedOrders: number = 0;
  servedOnTime: number = 0;
  servedOutOfTime: number = 0;
  loading: boolean = false;

  currentChefs: IUser[] = [];
  chefStats: { chef: IUser, totalServed: number, servedOnTime: number, servedOutOfTime: number }[] = [];
totalServed: any;

  constructor(
    private ordersService: OrdersService,
    private loadingService: LoadingService,
    private chefService: ChefService
  ) {}

  ngOnInit(): void {
    const orders = this.ordersService.orders;

    this.setOrders(this.ordersService.orders);
    this.loading = this.loadingService.orderLoading;
    this.loadingService.orderLoadingEvent.subscribe((value) => {
      this.loading = value;
      this.setOrders(this.ordersService.orders);
    });

    this.currentChefs = this.chefService.chefs;
    this.chefService.chefChange.subscribe(data => this.currentChefs = data);

    this.ordersService.newOrder.subscribe(() => this.pendingOrders++);
  }

  setOrders(orders: OrderItemInterface[]) {
    this.totalOrders = orders.length;
    this.pendingOrders = orders.filter(
      (order) => order.status === 'pending'
    ).length;
    this.preparingOrders = orders.filter(
      (order) => order.status === 'preparing'
    ).length;
    this.servedOrders = orders.filter(
      (order) => (order.status === 'complete' || order.status === 'ready')
    ).length;
    const targetDeliveryTime = new Date();

    this.servedOnTime = orders.filter((order) => {
      if (!order.preparingTimestamp || !order.readyTimestamp) return false;
      if (order.status !== "complete" && order.status !== "ready") return false;
      const totalPrepTime = order.items.reduce((total, item) => item.itemPreparationTime + total, 0);
      const prepTime = ((new Date(order.readyTimestamp)).getTime() - (new Date(order.preparingTimestamp)).getTime()) / 60000;
      return prepTime < totalPrepTime;
    }).length;

    this.servedOutOfTime = this.servedOrders - this.servedOnTime;
    this.chefStats = this.getChefsFromOrders(orders);
  }


  getChefsFromOrders (orders: OrderItemInterface[]) {
    const chefs : {
      chef: IUser,
      totalServed: number,
      servedOnTime: number,
      servedOutOfTime: number
    }[] = [];

    for (let i = 0; i < orders.length; i++) {
      const order = orders[i];
      if (order.chef) {
        const index = chefs.findIndex(item => order.chef && item.chef.employeeInformation.id === order.chef.employeeInformation.id);
        if (index === -1) {
          const chef = order.chef!;
          const totalServedOrders = orders.filter(order => ((order.status === "ready" || order.status === "complete") && order.chef && order.chef.employeeInformation.id === chef.employeeInformation.id));

          const totalServed = totalServedOrders.length;
          const servedOnTime = totalServedOrders.filter(order => {
            if (!order.preparingTimestamp || !order.readyTimestamp) return true;
            const serviceTime = ((new Date(order.readyTimestamp).getTime()) - (new Date(order.preparingTimestamp)).getTime()) /  60000;
            const totalPrepTime = order.items.reduce((total, item) => total + item.itemPreparationTime, 0);

            return serviceTime < totalPrepTime;
          }).length;

          const servedOutOfTime = totalServed - servedOnTime;

          chefs.push({ chef, totalServed, servedOutOfTime, servedOnTime })
        }
      }      
    }

    return chefs;
  }


  getChefIsOnline (chef: IUser) {
    return this.currentChefs.findIndex(item => item.employeeInformation.id === chef.employeeInformation.id) !== -1;
  }
}

  
