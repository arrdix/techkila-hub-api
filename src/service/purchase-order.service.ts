import { prismaClient } from '../application/database'
import { ResponseError } from '../error/response-error'
import { OrderNumberGenerator } from '../utils/order-number-generator'
import { PurchaseOrderValidation } from '../validation/purchase-order-validation'
import { Validation } from '../validation/validation'
import {
    PurchaseOrderRequest,
    toPurchaseOrderResponse,
    PurchaseOrderResponse,
} from '../model/purchase-order.model'

export class PurchaseOrderService {
    static async createPurchaseOrder(
        request: PurchaseOrderRequest
    ): Promise<PurchaseOrderResponse> {
        const purchaseOrderRequest = Validation.validate(
            PurchaseOrderValidation.CREATE_PURCHASE_ORDER,
            request
        )

        const totalValidPurchaseOrder = await prismaClient.purchaseOrder.count({})

        if (purchaseOrderRequest.qty && purchaseOrderRequest.category === 'Inventory') {
            const selectedProduct = await prismaClient.product.findUnique({
                where: {
                    id: purchaseOrderRequest.productId,
                },
            })

            if (!selectedProduct) {
                throw new ResponseError(400, 'Product not found.')
            }

            const currentProductPrice = purchaseOrderRequest.price
            const currentProductQty = selectedProduct.qty + purchaseOrderRequest.qty
            const currentProductAmount = currentProductQty * currentProductPrice

            const updatedProduct = await prismaClient.product.update({
                where: {
                    id: purchaseOrderRequest.productId,
                },
                data: {
                    qty: currentProductQty,
                    amount: currentProductAmount,
                    price: currentProductPrice,
                },
            })

            purchaseOrderRequest.item = `Pembelian ${updatedProduct.name}`

            const { item, price, qty, branch, note, category } = purchaseOrderRequest

            const purchaseOrder = await prismaClient.purchaseOrder.create({
                data: {
                    no: OrderNumberGenerator.generate({
                        type: 'PO',
                        totalOrder: totalValidPurchaseOrder,
                        branch,
                    }),
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
                no: OrderNumberGenerator.generate({
                    type: 'PO',
                    totalOrder: totalValidPurchaseOrder,
                    branch,
                }),
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
