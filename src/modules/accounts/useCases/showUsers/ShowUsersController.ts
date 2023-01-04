import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ShowUsersUseCase } from './ShowUsersUseCase'

class ShowUsersController {
  async handle(request: Request, response: Response) {
    const showUsersUseCase = container.resolve(ShowUsersUseCase)

    const users = await showUsersUseCase.execute()

    return response.json(users)
  }
}
export { ShowUsersController }
