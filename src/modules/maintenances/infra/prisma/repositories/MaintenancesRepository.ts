import { ICreateMaintenancesDTO } from '@modules/maintenances/dtos/ICreateMaintenancesDTO'
import {
  IMaintenancesRepository,
  IResponseGetLast,
} from '@modules/maintenances/repositories/IMaintenancesRepository'
import { prisma } from '@shared/infra/prisma'
import { Maintenance } from '../entities/Maintenance'

class MaintenancesRepository implements IMaintenancesRepository {
  async create(data: ICreateMaintenancesDTO): Promise<void> {
    await prisma.maintenance.create({
      data: {
        userId: data.userId,
        departmentId: data.departmentId,
        machineId: data.machineId,
        maintenanceDate: data.maintenanceDate,
        description: data.description,
      },
    })
  }

  async show(): Promise<Maintenance[]> {
    const maintenances = await prisma.maintenance.findMany({
      take: 10,
      orderBy: {
        maintenanceDate: 'desc',
      },
      include: {
        user: true,
        department: true,
        machine: true,
      },
    })

    return maintenances
  }

  async delete(id: string): Promise<void> {
    await prisma.maintenance.delete({
      where: {
        id,
      },
    })
  }

  async update(
    maintenanceId: string,
    data: ICreateMaintenancesDTO,
  ): Promise<void> {
    await prisma.maintenance.update({
      where: {
        id: maintenanceId,
      },
      data: {
        departmentId: data.departmentId,
        machineId: data.machineId,
        maintenanceDate: data.maintenanceDate,
        description: data?.description,
      },
    })
  }

  async findById(id: string): Promise<Maintenance> {
    const maintenance = await prisma.maintenance.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
        department: true,
        machine: true,
      },
    })

    return maintenance
  }

  async getLast(): Promise<IResponseGetLast> {
    const maintenance = await prisma.maintenance.findMany({
      orderBy: {
        maintenanceDate: 'desc',
      },
      take: 1,
      include: {
        user: true,
        department: true,
      },
    })

    const lastMaintenance = {
      id: maintenance[0].id,
      name: maintenance[0].user.name,
      department: maintenance[0].department.name,
      maintenanceDate: maintenance[0].maintenanceDate,
    }

    return lastMaintenance
  }
}

export { MaintenancesRepository }
