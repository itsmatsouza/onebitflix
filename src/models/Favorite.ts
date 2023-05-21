import { DataTypes, Model } from "sequelize"
import { CourseInstance } from "./Courses"
import { UserInstance } from "./User"
import { sequelize } from "../database"

export interface Favorite {
  userId: number
  courseId: number
}

export interface favoriteInstance extends Model<Favorite>, Favorite {
  Course?: CourseInstance
  User?: UserInstance
}

export const Favorite = sequelize.define<favoriteInstance, Favorite>('Favorite', {
  userId: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
    references: {
      model: 'User', 
      key: 'id'
    },
    onUpdate : 'CASCADE',
    onDelete: 'CASCADE'
  },
  courseId: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
    references: {
      model: 'Courses', 
      key: 'id'
    },
    onUpdate : 'CASCADE',
    onDelete: 'CASCADE'
  }
})