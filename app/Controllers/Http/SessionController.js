'use strict'

const User = use('App/Models/User')
class SessionController {
  async store ({ request, response, auth }) {
    const { email, password } = request.all()
    const user = await User.findBy('email', email)

    if (!user) {
      return response
        .status(400)
        .send({ error: { message: 'User not found!' } })
    }

    const token = auth.attempt(email, password)

    return token
  }
}

module.exports = SessionController
