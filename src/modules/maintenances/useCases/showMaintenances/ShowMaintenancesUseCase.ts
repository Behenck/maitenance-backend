import { Maintenance } from '@modules/maintenances/infra/prisma/entities/Maintenance'
import { IMaintenancesRepository } from '@modules/maintenances/repositories/IMaintenancesRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
class ShowMaintenancesUseCase {
  /* eslint-disable */
  constructor(
    @inject('MaintenancesRepository')
    private maintenancesRepository: IMaintenancesRepository,
  ) {}
  /* eslint-enable */

  async execute(take?: string): Promise<Maintenance[]> {
    const maintenances = await this.maintenancesRepository.show(take)
    return maintenances
  }
}

export { ShowMaintenancesUseCase }
