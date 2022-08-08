const Answer = require('../models/answers.model')


/*
 * @function Creating/saving a new unit
 * @params(req,res, next)

*/
module.exports.saveAnswers = async(req,res, next)=>{
    console.log(req.body)
    const answer = new Answer(req.body);
    await answer.save((err, answer)=>{
        try{
            if(err){
                return res.status(400).json({
                    err
                })
            }
            res.json({
                answer
            })
    }catch(err){
        next({msg: "something went wrong", err});
    }})
}


/*
 * @function getting all units for a particular module if exist
 * @params(req,res)

*/
module.exports.getAnswers = async(req, res)=>{
    const {id} = req.params
    Answer.find({unit_id: id})
    try{
        const {id} = req.params
        const answer = await Answer.find({unit_id: id})
        if(!answer) return res.status(404).json({status: "failed", msg: "Exercise not found"})

        res.status(200).json({status: "success", data: answer})

    }catch(err){
        next({msg: "Oops! something went wrong couldn't get units", err})
    }
}


/* delete questions */

module.exports.deleteQuestion = (req, res, next) => {
    Answer.findByIdAndRemove(
        req.params.id, (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.status(200).json({
          msg: data,
        });
      }
    });
  };


/*
 * @function Updates a module if exist
 * @params(req,res, next)
*/

module.exports.updateQuestion = async(req, res, next)=> {
    try{
        const {id} = req.params
        const answer = await Answer.findById(id)
        if(!answer) return res.status(404).json({status: "failed", msg: "Module not found"})

        const updatedAnswer = await Answer.findByIdAndUpdate(id, {$set:req.body}, {new: true})
        res.status(200).json({status: "success", data: updatedAnswer})

    }catch(err){
        next({msg: "something went wrong", err})
    }
  }