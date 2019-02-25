'use strict'

class ProjectController {
  async index ({ request }) {
    const projects = await request.team.projects().fetch()

    return projects
  }

  async store ({ request }) {
    const data = request.only(['title'])
    const projects = await request.team.projects().create(data)

    return projects
  }

  async show ({ params, request }) {
    const projects = await request.team
      .projects()
      .where('id', params.id)
      .first()

    return projects
  }

  async update ({ params, request }) {
    const data = request.only(['title'])
    const projects = await request.team
      .projects()
      .where('id', params.id)
      .first()

    projects.merge(data)
    await projects.save()

    return projects
  }

  async destroy ({ params, request, response }) {
    const projects = await request.team
      .projects()
      .where('id', params.id)
      .first()

    await projects.delete()
  }
}

module.exports = ProjectController
