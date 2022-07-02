const { model } = require('mongoose');
const Units = require('../models/unit.model')


/*
 * @function Creating/saving a new unit
 * @params(req,res, next)

*/
module.exports.saveUnit = async(req,res, next)=>{
    console.log(req.body)
    const unit = new Units(req.body);
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

/*
 * @function getting all units if exist
 * @params(req,res)

*/

module.exports.fetchUnits = async(req, res)=>{
    Units.find({}, (err, units)=>{
        if(err){
            return res.status(400).json({success: false, error: err})
        }
        if(units.lenght){
            return res.status(404).json({success:false, error:"Oops No modules found"})
        }
        return res.status(200).json({success:true, data:units})
    })
}


/*
 * @function getting a single unit if exist
 * @params(req,res)

*/
module.exports.fetchUnit = async(req, res)=>{
    const {id} = req.params
    Units.findById(id)
    try{
        const {id} = req.params
        const unit = await Units.findById(id)
        if(!unit) return res.status(404).json({status: "failed", msg: "unit not found"})

        res.status(200).json({status: "success", data: unit})

    }catch(err){
        next({msg: "Oops! something went wrong couldn't get units", err})
    }
}


/*
 * @function getting all units for a particular module if exist
 * @params(req,res)

*/
module.exports.fetchModuleUnit = async(req, res)=>{
    const {id} = req.params
    Units.find({module_id: id})
    try{
        const {id} = req.params
        const unit = await Units.find({module_id: id})
        if(!unit) return res.status(404).json({status: "failed", msg: "Exercise not found"})

        res.status(200).json({status: "success", data: unit})

    }catch(err){
        next({msg: "Oops! something went wrong couldn't get units", err})
    }
}


/* 

@function to get units of a specified model


*/

module.exports.moduleUnits = async(req, res)=>{
    const {id} = req.params
    Units.find({moduleID: id}, (err, units)=>{
        if(err){
            return res.status(400).json({success: false, error: err})
        }
        if(units.lenght){
            return res.status(404).json({success:false, error:"Oops No Units found"})
        }
        return res.status(200).json({success:true, data:units})
    })
};

/*
 * @function deleting a unit if exist
 * @params(req,res, next)
 *
*/
module.exports.deleteUnit = (req, res, next) => {
    Units.findByIdAndRemove(
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
 * @function updating a unit if exist
 * @params(req,res, next)

*/

  module.exports.updateUnit = async(req, res, next)=> {
    try{
        const {id} = req.params
        const unit = await Units.findById(id)
        if(!unit) return res.status(404).json({status: "failed", msg: "Unit not found"})

        const updatedUser = await Units.findByIdAndUpdate(id, {$set:req.body}, {new: true})
        res.status(200).json({status: "success", data: updatedUser})

    }catch(err){
        next({msg: "something went wrong", err})
    }
  }