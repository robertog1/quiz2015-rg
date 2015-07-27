var path = require('path');

// Cargar Modelo ORM
var Sequelize = require ('sequelize');

// Usar BBDD SQLite
var sequelize = new Sequelize(null, null, null,
                {dialect: "sqlite", storage: "quiz.sqlite"}
              );

// Importar la definición de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname, "quiz"));

exports.Quiz = Quiz;  // exportar definición de la tabla Quiz

// sequelize.sync() crea e inicializa la tabla de preguntas en BD
sequelize.sync().then(function(){
  // success(..)  ejecuta el manejador una vez creada la tabla
  //   (se modifica a then(..) por problemas de versión de sequelize)
  Quiz.count().then(function (count){
      if (count === 0){
        Quiz.create({ pregunta:  'Capital de Italia',
                      respuesta: 'Roma'
                   }).then(function(){console.log('Base de datos inicializada')});
      };
  });
});
