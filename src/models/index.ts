import { Category } from "./Category"
import { Course } from "./Courses"
import { Episode } from "./Episode"
import { User } from "./User"
import { Favorite } from "./Favorite"
import { Like } from "./Like"
import { WatchTime } from "./WatchTime"

// Categoria tem muitos cursos e um curso pertence a uma categoria
Category.hasMany(Course, { as: 'courses' })
Course.belongsTo(Category)

// Curso tem muitos episodios e um episodio pertence a um curso
Course.hasMany(Episode, { as: 'episodes'}) // Episodes, forma padrao do sequelize
Episode.belongsTo(Course)

// Cada usuario pode marcar muitos cursos como favorito, o adicionando na tabela favorite, linhas
// Muitos cursos podem ser marcados como favorito por muitos usuarios, o adicionando na tabela favorite, linhas 
// A tabela favorite tem como associacao a tabela course e a tabela user, linhas: 22, 23
Course.belongsToMany(User, { through: Favorite})
User.belongsToMany(Course, { through: Favorite})
Course.hasMany(Favorite, { as: 'FavoritesUsers', foreignKey: 'course_id'})
Favorite.belongsTo(Course)
Favorite.belongsTo(User)
User.hasMany(Favorite, { as: 'FavoritesCourses', foreignKey: 'user_id'})

// Cada usuario pode marcar muitos cursos como favorito, o adicionando na tabela like
// Cada curso pode ter muitos usuarios que o marcaram como favorito, o adicionando na tabela like
Course.belongsToMany(User, { through: Like })
User.belongsToMany(Course, { through: Like })


// Cada usuario pode ter muitos episodios assistidos em determinado segundo, o qual, sera adicionado na tabela watchtime
// Cada episodio pode ter muitos usuarios que os viram e pararam em determinado segundo, o qual, sera adicionado na tabela watchtime
Episode.belongsToMany(User, { through: WatchTime})
User.belongsToMany(Episode, { through: WatchTime})

export {
  Category,
  Course,
  Episode,
  Favorite,
  Like,
  User,
  WatchTime
}