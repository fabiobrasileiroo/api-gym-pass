import type { GymsRepository } from '@/repositories/gyms-repository'
import type { Gym } from '@prisma/client'

interface FetchNearbyGymsUseCaseRequest {
  userLatitude: number
  userLogngitude: number
}
interface FetchNearbyGymsUseCaseResponse {
  gyms: Gym[]
}

export class FetchNearbyGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    userLatitude,
    userLogngitude,
  }: FetchNearbyGymsUseCaseRequest): Promise<FetchNearbyGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLogngitude,
    })

    return {
      gyms,
    }
  }
}
