const Instructor = require('../models/instructor.model')

/**
 * @function createInstructor for creating a new instructor
 * Verify if the instructor exist in the database else create instructor
 * @params (req, res)
 */
module.exports.createInstructor = async(req, res, next) =>{
    try{
        const instructor = await Instructor.findOne({email: req.body.email})
        if(instructor) return res.status(404).json({status: "failed", msg: "instructor already exits", Instructor})
        
        const newInstructor = await Instructor.create(req.body)
        res.status(201).json({status: "success", data: newInstructor})

    }catch(err){
        next({msg: "Oops! something went wrong couldn't create instructor", err})
    }
}


/**
 * @function getInstructors for getting the list of instructors
 * @params (req, res)
 */
module.exports.getInstructors = async(req, res, next) =>{
    try{
        const instructor = await Instructor.find({})
        res.status(201).json({status: "success", data: instructor})

    }catch(err){
        next({msg: "Oops! something went wrong couldn't get the instructors", err})
    }
}

/**
 * @function getInstructor for getting a single instructor
 * Verify if the instructor exist in the database 
 * if true get the instructor
 * @params (req, res)
 */
module.exports.getInstructor = async(req, res, next) =>{
    try{
        const {id} = req.params
        const instructor = await Instructor.findById(id)
        if(!instructor) return res.status(404).json({status: "failed", msg: "Instructor not found"})

        res.status(200).json({status: "success", data: instructor})

    }catch(err){
        next({msg: "Oops! something went wrong couldn't get instructor", err})
    }
}

/**
 * @function updateInstructor for updating an instructor
 * Verify if the instructor exist in the database 
 * if true update the instructor
 * @params (req, res)
 */
module.exports.updateInstructor = async(req, res, next) =>{
    try{
        const {id} = req.params
        const instructor = await Instructor.findById(id)
        if(!instructor) return res.status(404).json({status: "failed", msg: "Instructor not found"})

        const updatedInstructor = await Instructor.findByIdAndUpdate(id, {$set:req.body}, {new: true})
        res.status(200).json({status: "success", data: updatedInstructor})

    }catch(err){
        next({msg: "Oops! something went wrong couldn't update instructor", err})
    }
}


/**
 * @function removeInstructor for deleting an instructor
 * Verify if the instructor exist in the database 
 * if true delete the instructor
 * @params (req, res)
 */
module.exports.removeInstructor = async(req, res, next) =>{
    try{
        const {id} = req.params
        const instructor = await Instructor.findByIdAndRemove(id)
        if(!instructor) return res.status(404).json({status: "failed", msg: "Instructor not found"})

        res.status(200).json({status: "success", data: instructor, msg: "Instructor deleted succesfully"})

    }catch(err){
        next({msg: "Oops! something went wrong couldn't remove instructor", err})
    }
}