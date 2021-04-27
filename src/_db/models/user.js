'use strict';
const {
  Model
} = require('sequelize'); const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    nome: DataTypes.STRING,
    cnpj: DataTypes.STRING,
    senha_site: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    instanceMethods: {
    },
    hooks: {
      beforeCreate: function(user, options) {
          return new Promise((resolve, reject) => {
            bcrypt.hash(user.senha_site, 8, (err, data) => {
              if (err) reject(err);
              user.senha_site = data;
              resolve();
            })
          });
        },
      }    

  });


  return User;
};




// hooks: {
//   beforeCreate: function(user, options) {
//       return new Promise((resolve, reject) => {
//         bcrypt.hash(user.senha_site, 8, (err, data) => {
//           if (err) reject(err);
//           user.senha_site = data;
//           resolve();
//         })
//       });
//     },
//   }