import { PurchaseOrder, Branch, PurchaseOrderCategory } from '@prisma/client'

export type PurchaseOrderResponse = {
    no: string
    item: string
    price: number
    qty: number
    branch: Branch
    category: PurchaseOrderCategory
    note: String | null
}

export type PurchaseOrderRequest = {
    item: string
    price: number
    productId?: string
    qty?: number
    branch: Branch
    note: string | null | undefined
    category: PurchaseOrderCategory
}

export function toPurchaseOrderResponse(purchaseOrder: PurchaseOrder): PurchaseOrderResponse {
    const { no, item, price, qty, branch, category, note } = purchaseOrder

    return {
        no,
        item,
        price,
        qty,
        branch,
        category,
        note,
    }
}
