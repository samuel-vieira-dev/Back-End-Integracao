const Boom = require('boom')
const Validator = require('fastest-validator')
const services = require('./services')
const jwt = require('jsonwebtoken')

const v = new Validator()

module.exports = {
    auth: async ctx => {
        const { request: { body }, response } = ctx

        const schema = {
            cnpj: { max:14, min: 10, type: 'string' },
            senha_site: { max:20, min: 4, type: 'string' },
        }
        const errors = v.validate(body, schema)

        if (Array.isArray(errors) && errors.length) {
            response.status = 400
            return response.body = Boom.badRequest(null, errors)
        }

        const user = await services.auth(body)

        if (user) {
            response.body = {
                result: jwt.sign({ email: user.email }, 'meusegredo')
            }
            //jwt.verify(token, 'meusegredo')
        } else {
            response.status = 401
            response.body = { result: Boom.unauthorized() }
        }
    }
}