import { Request} from 'express';
import { User } from 'src/domain/entities/user.entity';


export interface AuthRequest extends Request {
    user: User;
}