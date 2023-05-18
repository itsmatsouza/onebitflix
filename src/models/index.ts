import { Category } from "./Category"
import { Course } from "./Courses"
import { Episode } from "./Episode"
import { User } from "./User"
import { Favorite } from "./Favorite"

Category.hasMany(Course, { as: 'courses' })
Course.belongsTo(Category)

Course.hasMany(Episode, { as: 'episodes'}) // Episodes, forma padrao do sequelize
Episode.belongsTo(Course)

Course.belongsToMany(User, { through: Favorite})
User.belongsToMany(Course, { through: Favorite})
Course.hasMany(Favorite, { as: 'FavoritesUsers', foreignKey: 'course_id'})
Favorite.belongsTo(Course)
Favorite.belongsTo(User)
User.hasMany(Favorite, { as: 'FavoritesCourses', foreignKey: 'user_id'})

export {
  Category,
  Course,
  Episode,
  Favorite,
  User
}