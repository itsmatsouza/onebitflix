import { Op } from "sequelize"
import { Course } from "../models"

export const courseService = {
  findByIdWithEpisodes: async (id: string) => {
    const courseWithEpisodes = await Course.findByPk(id, {
      attributes: [
        'id',
        'name',
        'synopsis',
        ['thumbnail_url', 'thumbnailUrl']
      ],
      include: {
        association: 'episodes',
        attributes: [
          'id',
          'name',
          'synopsis',
          'order',
          ['video_url', 'videoUrl'],
          ['seconds_long', 'secondsLong']
        ],
        order: [['order', 'ASC']],
        separate: true
      }
    })

    return courseWithEpisodes
  },

  getRandomFeaturedCourses: async () => {
    const featuredCourses = await Course.findAll({
      attributes: [
        'id',
        'name',
        'synopsis',
        ['thumbnail_url', 'thumbnailUrl']
      ],
      where: {
        featured: true,
      }
    })

    // Pegando 3 cursos que estao com o featured ( true ) de forma aleatoria
    const randomFeaturedCourses = featuredCourses.sort(() => 0.5 - Math.random())

    return randomFeaturedCourses.slice(0, 3)
  },

  getTopTenNewest: async () => {
    const courses = await Course.findAll({
      limit: 10,
      order: [['created_at', 'DESC']]
    })

    return courses
  },

  findByName: async (name: string, page: number, perPage: number) => {
    const offset = (page - 1) * perPage
    const { count, rows } = await Course.findAndCountAll({
      attributes: [
        'id',
        'name',
        'synopsis',
        ['thumbnail_url', 'thumbnailUrl']
      ],
      where: {
        name: {
          // Op.iLike ( so funciona no postgres ) tras resultados de pesquisa que contenham o termo, sem diferenciar letras minusculas e maiusculas
          [Op.iLike]: `%${name}%`
        }
      },
      limit: perPage,
      offset: offset
    })

    return {
      courses: rows,
      page: page,
      perPage: perPage,
      total: count
    }
  }
}