"use server"

import { httpClient } from "@/lib/axios/httpClient"
import { type ICreateSpecialtyPayload, type ISpecialty } from "@/types/specialty.types"

export const getAllSpecialties = async () => {
  try {
    return await httpClient.get<ISpecialty[]>("/specialties")
  } catch (error) {
    console.log("Error fetching specialties:", error)
    throw error
  }
}

export const createSpecialty = async (payload: ICreateSpecialtyPayload) => {
  try {
    return await httpClient.post<ISpecialty>("/specialties", payload)
  } catch (error) {
    console.log("Error creating specialty:", error)
    throw error
  }
}

export const deleteSpecialty = async (id: string) => {
  try {
    return await httpClient.delete<{ message: string }>(`/specialties/${id}`)
  } catch (error) {
    console.log("Error deleting specialty:", error)
    throw error
  }
}
