import z from "zod";

export const FundraiserRouteParams = z.object({
  id: z.string().uuid(),
});
export type FundraiserRouteParams = z.infer<typeof FundraiserRouteParams>;

export const CreateFundraiserBody = z.object({
  name: z.string().min(1).max(255),
  description: z.string(),
  imageUrls: z.array(z.string().url()),
  startsAt: z.coerce.date(),
  endsAt: z.coerce.date(),

  organizationId: z.string().uuid(),
});
export type CreateFundraiserBody = z.infer<typeof CreateFundraiserBody>;
