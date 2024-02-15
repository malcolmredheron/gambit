import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";

class Ballot extends Model {
  public id!: number;
  public name!: string;
  public value!: String;
  public user_id!: number;
}

Ballot.init(
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
    value: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "ballots",
    modelName: "Ballot",
  }
);

export { Ballot };
