export interface IUserRepository {
    findById(id: number): Promise<any>;
    findByEmail(email: string): Promise<any>;
    create(userData: any): Promise<any>;
    update(id: number, updateData: any): Promise<any>;
    delete(id: number): Promise<void>;
    listSpecialties(): Promise<any[]>;
}