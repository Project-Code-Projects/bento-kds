import { Response } from "express";
import { AuthRequest } from "../interfaces/authRequest.interface";
import {
  getRestaurantUtilizationFromSkeleton,
  postRestaurantUtilizationToSkeleton,
} from "../services/skeleton.service";

export async function postRestaurantUtilization(
  req: AuthRequest,
  res: Response
) {
  try {
    const { user, token } = req;
    if (!user || !token)
      return res.status(401).send({ message: "Unauthorized" });
    const { restaurantUtilizationData } = req.body;
    await postRestaurantUtilizationToSkeleton(token, restaurantUtilizationData);
    res
      .status(200)
      .json({ message: "Order pending, and restaurantUtilization updated." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        error:
          "Error in marking the order as pending and updating restaurantUtilization.",
      });
  }
}

export async function getRestaurantUtilization(
  req: AuthRequest,
  res: Response
) {
  try {
    const { user, token } = req;
    if (!user || !token)
      return res.status(401).send({ message: "Unauthorized" });

    const result = await getRestaurantUtilizationFromSkeleton(
      token,
      user.employeeInformation.restaurantId
    );
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: (error as Error).message });
  }
}