import { Component, Input } from '@angular/core';
import { ChefTaskInterface } from '../../../interfaces/chefTask.interface';
import { stringToHexColor } from '../../../utils/color.helper';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css'
})
export class TaskCardComponent {

  @Input() chefTask!: ChefTaskInterface;
  @Input() loading!: boolean;
  
  getDisplayTitle() {
    return this.chefTask.order._id;
  }

  getChefColor () {
    return this.chefTask.order.chef ? stringToHexColor(this.chefTask.order.chef.employeeInformation.name) : '#FFFFFF';
  }

  getRibbonText () {
    if (this.chefTask.order.type === 'delivery' && this.chefTask.order.deliveryServiceArriveTime) {

      const current = Date.now();
      const gap = new Date(this.chefTask.order.deliveryServiceArriveTime).getTime() - current;
      const mins = gap > 0 ? (gap / 60000).toFixed() : 0; 

      return this.chefTask.order.type.toUpperCase() + ': ' + mins + ' min';
    } else return this.chefTask.order.type.toUpperCase();
  }

  getOrderTypeColor() {
    switch (this.chefTask.order.type) {
      case 'in-house':
          return '#3b5999';
      case 'delivery':
          return '#f50';
      case 'pick-up':
          return '#87d068';     
      default:
          return 'black';
    } 
  }

}
