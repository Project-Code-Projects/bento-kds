import { OrderItemInterface } from "./chef-task/order.interface";
import { IUser } from "./user.interface";

export interface IChefQueue {
  chef: IUser;
  queue: {
      order: OrderItemInterface;
      prepTime: number;
  }[];
}