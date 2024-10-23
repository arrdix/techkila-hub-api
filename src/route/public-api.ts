import express from 'express'
import { UserController } from '../controller/user.controller'
import { PurchaseOrderController } from '../controller/purchase-order.controller'

export const publicRouter = express.Router()
publicRouter.post('/api/users', UserController.register)
publicRouter.post('/api/purchases', PurchaseOrderController.createPurchaseOrder)
