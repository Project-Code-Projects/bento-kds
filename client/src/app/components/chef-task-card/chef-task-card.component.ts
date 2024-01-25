import { Component, Input } from '@angular/core';
import { ChefTaskInterface } from '../../interfaces/chef-task/chefTask.interface';
import { stringToHexColor } from '../../utils/color.helper';

@Component({
  selector: 'app-chef-task-card',
  templateUrl: './chef-task-card.component.html',
  styleUrl: './chef-task-card.component.css'
})
export class ChefTaskCardComponent {

  @Input() task!: ChefTaskInterface;
  @Input() index?: number;
  @Input() loading!: boolean;

  getListIndex() {
    return this.index ? this.index + 1 : null;
  }
  
  getDisplayTitle() {
    return this.task.order._id;
  }

  getChefColor () {
    return this.task.item.chef ? stringToHexColor(this.task.item.chef.employeeInformation.name) : '#FFFFFF';
  }

}
