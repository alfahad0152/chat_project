'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
   
    static associate(models) {
      
    }
  }
  User.init({
    name: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg:"Name can not be Null !"},
        notEmpty:{msg:"Name can not be Empty"}
      }
    },
    email: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg:"Email can not be Null !"},
        notEmpty:{msg:"Email can not be Empty"},
        isEmail:{msg:"Wrong Email Format !"}
      }
    },
    password: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg:"Password can not be Null !"},
        notEmpty:{msg:"Password can not be Empty"}
      }
    },
    phone: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg:"Phone No. can not be Null !"},
        notEmpty:{msg:"Phone No. can not be Empty"},
        len:{args:[10,10],msg:" Wrong Phone No. format !"}
      }
    },
    image: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg:"Image can not be Null !"},
        notEmpty:{msg:"Image can not be Empty"}
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName:"user_info"
  });
  return User;
};