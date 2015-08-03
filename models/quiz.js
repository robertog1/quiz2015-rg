// Definición del modelo Quiz

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'Quiz',
    { pregunta: {
        type: DataTypes.STRING,
        validate: {notEmpty: {msg: "--> falta Pregunta"}}
    },
      respuesta: {
        type: DataTypes.STRING,
        validate: {notEmpty: {msg: "--> falta Respuesta"}}
      }
    }
  );
}
