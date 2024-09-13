import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CheckInUseCase } from './check-in'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error'
import { MaxDistanceError } from './errors/max-distance-error'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {
  beforeEach( async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    await gymsRepository.create({
      id: 'gym-01',
      title: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: -3.0507008,
      longitude: -60.0211456,
    })

    vi.useRealTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
  })
  it('should be able to check in', async () => {
    vi.setSystemTime(new Date(2024, 0, 20, 8, 0, 0))
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -3.0507008,
      userLogintude: -60.0211456,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
  it('should not be able to check in twice in the same day', async () => {
    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -3.0507008,
      userLogintude: -60.0211456,
    })

    // @-3.0507008,-60.0211456,13z

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -3.0507008,
        userLogintude: -60.0211456,
      })
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2024, 0, 21, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -3.0507008,
      userLogintude: -60.0211456,
    })

    vi.setSystemTime(new Date(2024, 0, 22, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -3.0507008,
      userLogintude: -60.0211456,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
  // @-2.8638126,-59.9354992,12.58z?
  it('should not be able to check in on distant gym', async () => {
    vi.setSystemTime(new Date(2024, 0, 20, 8, 0, 0))
    gymsRepository.items.push({
      id: 'gym-02',
      title: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: new Decimal(-2.8638126),
      longitude: new Decimal(-59.9354992),
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-02',
        userId: 'user-01',
        userLatitude: -3.0507008,
        userLogintude: -60.0211456,
      })
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
