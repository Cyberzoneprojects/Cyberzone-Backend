const Exercise = require('../models/exercise.model')

/**
 * @function createExercise for creating a new exercise
 * Verify if it exist in the database else create exercise
 * @params (req, res, next)
 */
module.exports.createExercise = async(req, res, next) =>{
    try{
        const {unitId} = req.body
        
        
        const exercise = await Exercise.findOne({email: req.body.email})
        if(exercise) return res.status(404).json({status: "failed", msg: "Exercise already exits", exercise})
        
        const newExercise = await Exercise.create(req.body)
        res.status(201).json({status: "success", data: newExercise})

    }catch(err){
        next({msg: "Oops! something went wrong couldn't create exercise", err})
    }
}


/**
 * @function getExercises for getting the list of exercises
 * @params (req, res, next)
 */
module.exports.getExercises = async(req, res, next) =>{
    try{
        const exercise = await Exercise.find({})
        res.status(201).json({status: "success", data: exercise})

    }catch(err){
        next({msg: "Oops! something went wrong couldn't get exercises", err})
    }
}

/**
 * @function getExercise for getting a single exercise
 * Verify if the exercise exist in the database 
 * if true get the exercise
 * @params (req, res)
 */
module.exports.getExercise = async(req, res, next) =>{
    try{
        const {id} = req.params
        const exercise = await Exercise.findById(id)
        if(!exercise) return res.status(404).json({status: "failed", msg: "Exercise not found"})

        res.status(200).json({status: "success", data: exercise})

    }catch(err){
        next({msg: "Oops! something went wrong couldn't get exercise", err})
    }
}

/**
 * @function updateExercise for updating a exercise
 * Verify if the exercise exist in the database 
 * if true updates the exercise
 * @params (req, res, next)
 */
module.exports.updateExercise = async(req, res, next) =>{
    try{
        const {id} = req.params
        const exercise = await Exercise.findById(id)
        if(!exercise) return res.status(404).json({status: "failed", msg: "Exercise not found"})

        const updatedExercise = await Exercise.findByIdAndUpdate(id, {$set:req.body}, {new: true})
        res.status(200).json({status: "success", data: updatedExercise})

    }catch(err){
        next({msg: "Oops! something went wrong couldn't update exercise", err})
    }
}


/**
 * @function removeExercise for deleting a exercise
 * Verify if the exercise exist in the database 
 * if true delete the exercise
 * @params (req, res)
 */
module.exports.removeExercise = async(req, res, next) =>{
    try{
        const {id} = req.params
        const exercise = await Exercise.findByIdAndRemove(id)
        if(!exercise) return res.status(404).json({status: "failed", msg: "Exercise not found"})

        res.status(200).json({status: "success", data: exercise, msg: "Exercise deleted succesfully"})

    }catch(err){
        next({msg: "Oops! something went wrong couldn't remove exercise", err})
    }
}