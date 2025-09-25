import { UpdateUserDto } from "src/application/dtos/update-user.dto";
import { IUserRepository } from "src/domain/interfaces/Iuser.repository";
import * as bcrypt from 'bcrypt';


export class UpdateUserUseCase {
    constructor(
        private readonly userRepository: IUserRepository,
    ) {}

    async update(id: number, updateUserDto: UpdateUserDto) {
    const data: any = { ...updateUserDto };

    // If password is provided, hash it before updating
    if (updateUserDto.password) {
      data.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    // If specialties is provided, updates them
    if (updateUserDto.specialties) {
      data.specialties = {
        set: updateUserDto.specialties.map((id) => ({ id })),
      };
    }

    //Updates user
    const updatedUser = await this.userRepository.update(id, data);

    // Return the updated data with no password
    return {
      ...updatedUser,
      password: undefined,
    };
  }
}