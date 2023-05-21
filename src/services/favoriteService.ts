import { Favorite } from "../models"

export const favoriteService = {
  findByUserId: async (userId: number) => {
    const favorites = await Favorite.findAll({
      attributes: [['user_id', 'userId']],
      where: { userId: userId },
      include: {
        association: 'Course',
        attributes: [
          'id',
          'name',
          'synopsis',
          ['thumbnail_url', 'thumbnailUrl']
        ]
      }
    })

    return {
      userId,
      // favorite.Course vem do model Favorite linhas: 11, 12, 13
      courses: favorites.map(favorite => favorite.Course)
    }
  },

  create: async (userId: number, courseId: number) => {
    const favorite = Favorite.create({
      courseId,
      userId
    })

    return favorite
  },

  delete: async (userId: number, courseId: number) => {
    await Favorite.destroy({
      where: {
        userId: userId,
        courseId: courseId
      }
    })
  }
}