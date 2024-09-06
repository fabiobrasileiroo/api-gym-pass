import { UsersRepository } from "@/repositories/users-repository";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { compare } from "bcryptjs";
import { User } from "@prisma/client";

interface GetUserProfileUseCaseRequest {
  userId: string
}
interface GetUserProfileUseCaseResponse {
  user: User
}

export class GetUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) {

  }

  async execute({userId}: GetUserProfileUseCaseRequest):Promise<GetUserProfileUseCase> {
    const user = await this.usersRepository.findById(userId)
    if(!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, user.password_hash)

    if(!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }
    return {
      user,
    }
  }
}