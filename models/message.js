'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    
    static associate(models) {
     Message.belongsTo(models.User,{
      foreignKey:"sender"
     })
     Message.belongsTo(models.User,{
      foreignKey:"receiver"
     })
    }
  }
  Message.init({
    msg: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg:"Message can't be null!"},
        notEmpty:{msg:"Message can't be empty !"}
      }
    },
    msg_date: {
      type:DataTypes.DATE,
      allowNull:false,
      validate:{
        notNull:{msg:"Message can't be null!"},
        notEmpty:{msg:"Message can't be empty !"}
      }
    }
  }, {
    sequelize,
    modelName: 'Message',
    tableName : "messages"
  });
  return Message;
};