import { describe, it, expect, beforeEach } from "vitest";
import { hash } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { AuthenticateUseCase } from "./authenticate";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { GetUserProfileUseCase } from "./get-user-profile";

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase
describe("Get User Profile Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(usersRepository)
  })
  it("should not be able to authenticate with wrong email ", async () => {

    const createdUser = await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await sut.execute({
      userId: createdUser.id

    });

    expect(user.id).toEqual(expect.any(String));
  });
  it('should not be able to authenticate with wrong email', async () => {

    expect(() => 
      sut.execute({
        email: 'johndoe@example.com',
        password: '123456'
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
  it('should not be able to authenticate with password', async () => {

    await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    });

    expect(() => 
      sut.execute({
        email: 'johndoe@example.com',
        password: 'wrong'
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
});
