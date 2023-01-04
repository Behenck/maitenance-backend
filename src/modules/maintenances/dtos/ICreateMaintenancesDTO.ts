interface ICreateMaintenancesDTO {
  userId: string
  departmentId: string
  machineId: string
  maintenanceDate: Date
  description?: string
}

export { ICreateMaintenancesDTO }
