import { Request, Response, NextFunction } from 'express'
import { PurchaseOrderRequest } from '../model/purchase-order.model'
import { PurchaseOrderService } from '../service/purchase-order.service'

export class PurchaseOrderController {
    static async createPurchaseOrder(req: Request, res: Response, next: NextFunction) {
        try {
            const request: PurchaseOrderRequest = req.body as PurchaseOrderRequest
            const response = await PurchaseOrderService.createPurchaseOrder(request)

            res.status(200).json({
                data: response,
            })
        } catch (e) {
            next(e)
        }
    }
}
