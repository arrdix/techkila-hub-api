import { Branch } from '@prisma/client'
import { prismaClient } from '../application/database'
import { ResponseError } from '../error/response-error'
import { PurchaseOrderRequest, toPurchaseOrderResponse } from '../model/purchase-order.model'
import { PurchaseOrderValidation } from '../validation/purchase-order-validation'
import { Validation } from '../validation/validation'

export class PurchaseOrderService {
    static async createPurchaseOrder(request: PurchaseOrderRequest) {
        const purchaseOrderRequest = Validation.validate(
            PurchaseOrderValidation.CREATE_PURCHASE_ORDER,
            request
        )

        const totalValidPurchaseOrder = await prismaClient.purchaseOrder.count({})

        if (purchaseOrderRequest.category === 'Inventory' && purchaseOrderRequest.qty) {
            const selectedProduct = await prismaClient.product.findUnique({
                where: {
                    id: purchaseOrderRequest.productId,
                },
            })

            if (!selectedProduct) {
                throw new ResponseError(400, 'Product not found.')
            }

            const updatedProduct = await prismaClient.product.update({
                where: {
                    id: purchaseOrderRequest.productId,
                },
                data: {
                    qty: selectedProduct.qty + purchaseOrderRequest.qty,
                },
            })

            purchaseOrderRequest.item = `Pembelian ${updatedProduct.name}`

            const { item, price, qty, branch, note, category } = purchaseOrderRequest

            const purchaseOrder = await prismaClient.purchaseOrder.create({
                data: {
                    no: 'PO-BDG-0124-0123',
                    item,
                    price,
                    qty,
                    branch,
                    note,
                    category,
                },
            })

            return toPurchaseOrderResponse(purchaseOrder)
        }

        const { item, price, qty, branch, note, category } = purchaseOrderRequest

        const purchaseOrder = await prismaClient.purchaseOrder.create({
            data: {
                no: 'PO-BDG-0124-0123',
                item,
                price,
                qty,
                branch,
                note,
                category,
            },
        })

        return toPurchaseOrderResponse(purchaseOrder)
    }
}
