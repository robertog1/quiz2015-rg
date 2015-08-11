var models = require('../models/models.js');

// GET /quizes/:quizId/comments/new
exports.new = function(req, res){
  res.render('comments/new.ejs',
            {quizid: req.params.quizId, errors: []});
};

// POST /quizes/:quizId/comments
exports.create = function (req, res){
  console.log("-----------------------------Antes");
  var comment = models.Comment.build(
       {texto: req.body.comment.texto,
        QuizId: req.params.quizId
      });
  console.log("-----------------------------comment definido. texto="+comment.texto+", QuizId="+comment.QuizId+".");
  comment
  .validate()
  .then(
    function(err){
      if (err) {
        console.log("-----------------------------ERROR!!!");
        res.render('comments/new.ejs', {comment: comment, error: err.errors});
      } else {
        console.log("-----------------------------OK");
        comment // save: guarda en BD campo texto de comment
        .save()
        .then( function() {res.redirect('/quizes/'+req.params.quizId)})
      }   // res.redirect: redireccion HTTP a lista de preguntas
    }
  ).catch(function(error){next(error)});
};