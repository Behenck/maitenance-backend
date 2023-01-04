import 'reflect-metadata'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ShowMaintenancesUseCase } from './ShowMaintenancesUseCase'

class ShowMaintenancesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const showMaintenancesUseCase = container.resolve(ShowMaintenancesUseCase)

    const maintenances = await showMaintenancesUseCase.execute()

    return response.json(maintenances)
  }
}

export { ShowMaintenancesController }
