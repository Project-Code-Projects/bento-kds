import { Injectable } from '@angular/core';
import { ChefTaskInterface } from '../../interfaces/chefTask.interface';

@Injectable({
  providedIn: 'root'
})
export class ChefTaskService {

  constructor() { }

  tasks : ChefTaskInterface[] = [];

}
