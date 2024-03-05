import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()



export const getEmployees = async () => {
    const users = await prisma.hr_employees_table.findMany()
    return users
  }

export const getEmployeeById = async (id:number)=> {
  const user = await prisma.hr_employees_table.findUnique({
    where: {  
     id
    }
  })
  return user
}

export const addNewEmployee = async (data:any) => {
  const user = await prisma.hr_employees_table.create({
    data,
  })
  return user
}


export const deleteEmployeeById = async (id:number) => {
  const user = await prisma.hr_employees_table.delete({
    where: { id }
  })
  return user
}

export const patchEmployeeById = async (id:number, data: any) => {
  const user = await prisma.hr_employees_table.update({
    where: { id },
    data
  })
  return user
}

