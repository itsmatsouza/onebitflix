import { Category } from "./Category"
import { Course } from "./Courses"
import { Episode } from "./Episode"
import { User } from "./User"

Category.hasMany(Course, { as: 'courses' })
Course.belongsTo(Category)

Course.hasMany(Episode) // Episodes, forma padrao 
Episode.belongsTo(Course)

export {
  Category,
  Course,
  Episode,
  User
}