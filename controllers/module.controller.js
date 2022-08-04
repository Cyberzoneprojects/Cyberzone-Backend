const Modules = require('../models/module.model')


/*
 * @function Creating/saving a new modules
 * @params(req,res, next)

*/
module.exports.saveModule = async(req,res, next)=>{

    try{
        const mod = await Modules.findOne({title: req.body.title})
        if(mod) return res.status(404).json({status: "failed", msg: "Exercise already exits", mod})
        
        const newModule = await Modules.create(req.body)
        res.status(201).json({status: "success", data: newModule})

    }catch(err){
        next({msg: "Oops! something went wrong couldn't create Module", err})
    }
}


/*
 * @function getting all modules
 * @params(req,res)

*/
module.exports.fetchModules = (req, res)=>{
     Modules.find({}, (err, modules)=>{
        if(err){
            return res.status(400).json({success: false, error: er})
        }
        if(!modules.length){
            return res.status(404).json({success:false, error:"Oops No modules found"})
        }
        return res.status(200).json({success:true, data:modules})
    })
}


/*
 * @function getting a single module if exist
 * @params(req,res)

*/
module.exports.fetchModule = async(req, res, next)=>{
    const {id} = req.params
    Modules.findById(id)
    try{
        const {id} = req.params
        const modul = await Modules.findById(id)
        if(!modul) return res.status(404).json({status: "failed", msg: "Exercise not found"})

        res.status(200).json({status: "success", data: modul})
    }catch(err){
        next({msg: "Oops! something went wrong couldn't get modules", err})
    }
}


/*
 * @function fetch modules for a particular service
 * @params(req,res)

*/
module.exports.fetchModuleOfService = async(req, res, next)=>{
    const {id} = req.params
    Modules.find({service_id: id}, (err, modules)=>{
        if(err){
            return res.status(400).json({success: false, error: er})
        }
        if(!modules.length){
            return res.status(404).json({success:false, error:"Oops No modules found"})
        }
        return res.status(200).json({success:true, data:modules})
    })
}


/*
 * @function Delete a module if exist
 * @params(req,res, next)

*/
module.exports.deleteModul = (req, res, next) => {
    Modules.findByIdAndRemove(
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
  module.exports.updateModule = async(req, res, next)=> {
    try{
        const {id} = req.params
        const modul = await Modules.findById(id)
        if(!modul) return res.status(404).json({status: "failed", msg: "Module not found"})

        const updatedUser = await Modules.findByIdAndUpdate(id, {$set:req.body}, {new: true})
        res.status(200).json({status: "success", data: updatedUser})

    }catch(err){
        next({msg: "something went wrong", err})
    }
  }