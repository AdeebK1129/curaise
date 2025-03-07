import { Request, Response } from "express-serve-static-core";
import { OrganizationRouteParams } from "./organization.types";
import {
  getOrganization,
  getOrganizationFundraisers,
} from "./organization.services";
import { BasicFundraiserSchema, CompleteOrganizationSchema } from "common";

export const getOrganizationHandler = async (
  req: Request<OrganizationRouteParams, any, {}, {}>,
  res: Response
) => {
  const organization = await getOrganization(req.params.id);
  if (!organization) {
    res.status(404).json({ message: "Organization not found" });
    return;
  }

  // remove irrelevant fields from returned order
  const parsedOrganization = CompleteOrganizationSchema.safeParse(organization);
  if (!parsedOrganization.success) {
    res.status(500).json({ message: "Internal server error" });
    return;
  }
  const cleanedOrganization = parsedOrganization.data;

  res
    .status(200)
    .json({ message: "Order retrieved", data: cleanedOrganization });
};

export const getOrganizationFundraisersHandler = async (
  req: Request<OrganizationRouteParams, any, {}, {}>,
  res: Response
) => {
  // ensure organization exists
  const organization = await getOrganization(req.params.id);
  if (!organization) {
    res.status(404).json({ message: "Organization not found" });
    return;
  }

  const fundraisers = await getOrganizationFundraisers(req.params.id);

  const parsedFundraisers =
    BasicFundraiserSchema.array().safeParse(fundraisers);
  if (!parsedFundraisers.success) {
    res.status(500).json({ message: "Internal server error" });
    return;
  }
  const cleanedFundraisers = parsedFundraisers.data;

  res
    .status(200)
    .json({ message: "Fundraisers retrieved", data: cleanedFundraisers });
};
