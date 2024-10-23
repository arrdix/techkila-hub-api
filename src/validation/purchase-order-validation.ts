import { Branch, PurchaseOrderCategory } from '@prisma/client'
import { z, ZodType } from 'zod'

export class PurchaseOrderValidation {
    static readonly CREATE_PURCHASE_ORDER: ZodType = z.object({
        item: z.string().min(1),
        price: z.number(),
        productId: z.string().optional(),
        qty: z.number().optional(),
        branch: z.enum(Object.values(Branch) as [Branch, ...Branch[]]),
        category: z.enum(
            Object.values(PurchaseOrderCategory) as [
                PurchaseOrderCategory,
                ...PurchaseOrderCategory[]
            ]
        ),
        note: z.string().optional(),
    })
}
