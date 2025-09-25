import { IUserRepository } from "src/domain/interfaces/Iuser.repository";
import { PrismaService } from "src/prisma/prisma.service";

export class UserRepository implements IUserRepository {
    constructor(private readonly prisma: PrismaService) {}

    async findById(id: number): Promise<any> {
        return this.prisma.user.findUnique({ where: { id } });
    }

    async findByEmail(email: string): Promise<any> {
        return this.prisma.user.findUnique({ where: { email } });
    }

    async create(userData: any): Promise<any> {
        return this.prisma.user.create({ data: userData });
    }

    async update(id: number, updateData: any): Promise<any> {
        return this.prisma.user.update({ where: { id }, data: updateData });
    }

    async delete(id: number): Promise<void> {
        await this.prisma.user.delete({ where: { id } });
    }

    async listSpecialties(): Promise<any[]> {
        return this.prisma.specialty.findMany({
            select: {
                id: true,
                name: true,
            },
        });
    }
}