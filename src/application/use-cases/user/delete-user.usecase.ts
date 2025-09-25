import { IUserRepository } from "src/domain/interfaces/Iuser.repository";
import { PrismaService } from "src/prisma/prisma.service";

export class DeleteUserUseCase {
    constructor(
        private readonly userRepository: IUserRepository,
    ) {}

    async delete(id: number) {
        return this.userRepository.delete(id);
  }

}