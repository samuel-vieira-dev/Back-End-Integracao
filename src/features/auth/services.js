const db = require('../../_db/models/index')

module.exports = {

    
    auth:payload => db.User.findOne({ where: {cnpj:payload} })
}