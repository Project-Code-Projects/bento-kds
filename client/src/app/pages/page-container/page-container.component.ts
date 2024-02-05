import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { ApiService } from '../../services/api/api.service';
import { IUser } from '../../interfaces/user.interface';
import { RuleService } from '../../services/rule/rule.service';
import { LoadingService } from '../../services/loading/loading.service';
import { OrdersService } from '../../services/orders/orders.service';
import { SocketService } from '../../services/socket/socket.service';
import { ChefService } from '../../services/chef/chef.service';
import { ChefTaskService } from '../../services/chef-task/chef-task.service';

@Component({
  selector: 'app-page-container',
  templateUrl: './page-container.component.html',
  styleUrl: './page-container.component.css'
  
})
export class PageContainerComponent implements OnInit {
  paths = ['dashboard','display','rule-setter'];
  currentPath:string = '/dashboard'

  constructor(
    private route: Router, 
    private api: ApiService,
    private rule: RuleService,
    private ordersService: OrdersService,
    private chefTaskService: ChefTaskService,
    private loadingService: LoadingService,
    private chefService: ChefService,
    private socket: SocketService,
    ){

  }

  user: IUser | undefined;

  ngOnInit(): void {
    this.currentPath = this.route.routerState.snapshot.url;
    this.route.events.subscribe(event => event instanceof NavigationStart ? this.currentPath=event.url : null);
    this.api.getUser().subscribe(data => {
      console.log(data.user);
      this.user = data.user;
      this.socket.connect();
      this.socket.joinRestaurantRoom(data.user.employeeInformation.restaurantId);
    });
    this.fetchRules();
    this.fetchOrders();

    this.api.getActiveChefs().subscribe(res => {
      const chefs = res.data.map(chef => ({ employeeInformation: chef.employee}));
      this.chefService.emitActiveChefs(chefs);
    });

    this.socket.getIncomingOrders().subscribe(data => {
      this.ordersService.emitIncomingOrder(data);
    });


    this.socket.getServedOrders().subscribe(data => {
      console.log('Served order:', data);
      this.ordersService.emitServedOrder(data.order);
    });


    this.socket.getChefCheckIn().subscribe(data => this.chefService.checkIn(data.chef));
    this.socket.getChefCheckOut().subscribe(data => this.chefService.checkOut(data.chef));
  }

  fetchOrders () {
    this.loadingService.setOrderLoading(true);
    this.api.getOrders().subscribe(data => {
      this.ordersService.orders = data.data;
      const tasks = data.data.flatMap(order => {
        const items = order.items.map(item => ({ task: item, order }));
        return items;
      });

      this.chefTaskService.tasks = tasks;
      this.loadingService.setOrderLoading(false);
    });
  }

  fetchRules () {
    this.loadingService.setRuleLoading(true);
    this.api.getRules().subscribe(data => {
      this.loadingService.setRuleLoading(false);
      if (data) {
        const { baseRules, overrideRules, efficiency } = data;
        this.rule.setRule({ baseRules, overrideRules, efficiency });
      }
    }); 
  }

  parseName (path: string) {
    return path.split("-").map(word => word[0].toUpperCase() + word.slice(1)).join(" ");
  }
  isSelected (path: string) {
    return this.currentPath.slice(1) === path
  }


}
