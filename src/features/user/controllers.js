const Boom = require('boom')
const Validator = require('fastest-validator')
const services = require('./services')
const servicesAuth = require('../auth/services')

const v = new Validator()

module.exports = {
    create: async ctx => {
        const { request: { body }, response } = ctx

        const schema = {
            nome: { max:80, min: 1, type: 'string' },
            cnpj: { max:14, min: 1, type: 'string' },
            senha_site: { max:20, min: 4, type: 'string' },
        }
        const errors = v.validate(body, schema)

        const userCnpj = await servicesAuth.auth(body.cnpj)
            if (userCnpj){
                return response.body = Boom.badRequest(null, errors)
            }

        if (Array.isArray(errors) && errors.length) {
            response.status = 400
            return response.body = Boom.badRequest(null, errors)
        }

        const user = await services.create(body)
        response.body = user
    }
}