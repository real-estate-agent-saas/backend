import { IUserRepository } from "src/domain/interfaces/Iuser.repository";

export class ListUserSpecialtiesUseCase {
    constructor(
        private readonly userRepository: IUserRepository,
    ) {}

    async listSpecialties() {
    return this.userRepository.listSpecialties();
  }
}