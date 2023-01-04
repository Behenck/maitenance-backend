import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ShowMachinesUseCase } from './ShowMachinesUseCase'

class ShowMachinesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const showMachinesUseCase = container.resolve(ShowMachinesUseCase)

    const machines = await showMachinesUseCase.execute()

    return response.json(machines)
  }
}

export { ShowMachinesController }
