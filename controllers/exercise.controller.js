// const Unit = require('../models/unit.model')
const Exercise = require('../models/exercise.model')


module.exports.createExercise = async(req,res, next)=>{
    console.log(req.body)
    const unit = new Exercise(req.body);
    await unit.save((err, unit)=>{
        try{
            if(err){
                return res.status(400).json({
                    err
                })
            }
            res.json({
                unit
            })
    }catch(err){
        next({msg: "something went wrong", err});
    }})
}

/**
 * @function createExercise for creating a new exercise
 * Verify if it exist in the database else create exercise
 * @params (req, res, next)
 */
// module.exports.createExercise = async(req, res, next) =>{
//     try{
//         const {unitId} = req.body

//         const exercise = await Exercise.findOne({email: req.body.email})
//         if(exercise) return res.status(404).json({status: "failed", msg: "Exercise already exits", exercise})
        
//         const newExercise = await Exercise.create(req.body)
//         await Unit.findByIdAndUpdate(unitId, {$addToSet: {exercises: newExercise._id}})

//         res.status(201).json({status: "success", data: newExercise})

//     }catch(err){
//         next({msg: "Oops! something went wrong couldn't create exercise", err})
//     }
// }


/**
 * @function getExercises for getting the list of exercises
 * @params (req, res, next)
 */
// module.exports.getExercises = async(req, res, next) =>{
//     try{
//         const exercise = await Exercise.find({})
//         res.status(201).json({status: "success", data: exercise})

//     }catch(err){
//         next({msg: "Oops! something went wrong couldn't get exercises", err})
//     }
// }



/*
 * @function getting all units for a particular module if exist
 * @params(req,res)

*/
module.exports.getExercises = async(req, res)=>{
    const {id} = req.params
    Exercise.find({module_id: id})
    try{
        const {id} = req.params
        const unit = await Exercise.find({module_id: id})
        if(!unit) return res.status(404).json({status: "failed", msg: "Exercise not found"})

        res.status(200).json({status: "success", data: unit})

    }catch(err){
        next({msg: "Oops! something went wrong couldn't get units", err})
    }
}

/**
 * @function getExercise for getting a single exercise
 * Verify if the exercise exist in the database 
 * if true get the exercise
 * @params (req, res)
 */
// module.exports.getExercise = async(req, res, next) =>{
//     try{
//         const {id} = req.params
//         const exercise = await Exercise.findById(id)
//         if(!exercise) return res.status(404).json({status: "failed", msg: "Exercise not found"})

//         res.status(200).json({status: "success", data: exercise})

//     }catch(err){
//         next({msg: "Oops! something went wrong couldn't get exercise", err})
//     }
// }

/**
 * @function updateExercise for updating a exercise
 * Verify if the exercise exist in the database 
 * if true updates the exercise
 * @params (req, res, next)
 */
// module.exports.updateExercise = async(req, res, next) =>{
//     try{
//         const {id} = req.params
//         const exercise = await Exercise.findById(id)
//         if(!exercise) return res.status(404).json({status: "failed", msg: "Exercise not found"})

//         const updatedExercise = await Exercise.findByIdAndUpdate(id, {$set:req.body}, {new: true})
//         res.status(200).json({status: "success", data: updatedExercise})

//     }catch(err){
//         next({msg: "Oops! something went wrong couldn't update exercise", err})
//     }
// }


/**
 * @function removeExercise for deleting a exercise
 * Verify if the exercise exist in the database 
 * if true delete the exercise
 * @params (req, res)
 */
// module.exports.removeExercise = async(req, res, next) =>{
//     try{
//         const {id} = req.params
//         const exercise = await Exercise.findByIdAndRemove(id)
//         if(!exercise) return res.status(404).json({status: "failed", msg: "Exercise not found"})

//         res.status(200).json({status: "success", data: exercise, msg: "Exercise deleted succesfully"})

//     }catch(err){
//         next({msg: "Oops! something went wrong couldn't remove exercise", err})
//     }
// }