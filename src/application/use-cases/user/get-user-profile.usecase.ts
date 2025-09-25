import { BadRequestException } from "@nestjs/common";
import { IUserRepository } from "src/domain/interfaces/Iuser.repository";
import { PrismaService } from "src/prisma/prisma.service";

export class GetUserProfileUseCase {
    constructor(
        private readonly userRepository: IUserRepository,
    ) {}

  async getProfile(id: number) {

    const profile = await this.userRepository.findById(id);
    if (!profile) {
      throw new BadRequestException('User not found');
    }

    return profile;
    // return this.prisma.user.findUnique({
    //   where: { id },
    //   include: {
    //     specialties: {
    //       select: {
    //         id: true,
    //         name: true,
    //       },
    //     },
    //   },
    // });
  }

}