import { IUser } from "../user.interface";
import { ItemInterface } from "./item.interface";
import { OrderItemInterface } from "./order.interface";

export interface ChefTaskInterface {
  item: ItemInterface;
  order: OrderItemInterface;
}