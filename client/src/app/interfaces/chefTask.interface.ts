import { ItemInterface } from "./item.interface";
import { OrderItemInterface } from "./order.interface";

export interface ChefTaskInterface {
  task: ItemInterface,
  order: OrderItemInterface
}