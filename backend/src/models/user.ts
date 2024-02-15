import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken';

class User extends Model {
    public id!: number;
    public name!: string;
    public email!: string;
    public password!: string;
    public registrationSource!: string;

    public getJwtToken() {
        return jwt.sign({ id: this.id }, process.env.JWT_SECRET as string, {
            expiresIn: process.env.JWT_EXPIRES_TIME
        });
    };

    public static async generatePasswordHash(password: string) {
        return await bcrypt.hash(password, 10)
    };

    public async comparePassword(enteredPassword: string) {
        return await bcrypt.compare(enteredPassword, this.password)
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        registrationSource: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'email'
        }
    },
    {
        sequelize,
        tableName: 'users',
        modelName: 'User',
    },
);

export { User };
