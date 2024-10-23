import { Branch } from '@prisma/client'
import dayjs from 'dayjs'

interface GenerateParams {
    type: string
    branch: Branch
    totalOrder: number
}

export class OrderNumberGenerator {
    static branchList = {
        Bandung: 'BDG',
        Jakarta: 'JKT',
    }

    static generate({ type, branch, totalOrder }: GenerateParams) {
        const orderCode = {
            type,
            branch: this.branchList[branch],
            date: dayjs().format('MMYY'),
            number: this.formatNumber(totalOrder),
        }

        return `${orderCode.type}-${orderCode.branch}-${orderCode.date}-${orderCode.number}`
    }

    static formatNumber(totalOrder: number) {
        const maxDigits = 4
        const currentNumber = ++totalOrder

        return currentNumber.toString().padStart(maxDigits, '0')
    }
}
