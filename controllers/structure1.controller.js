const { model } = require('mongoose');
const Structure1 = require('../models/structure1.model')


/*
 * @function Creating/saving a new unit
 * @params(req,res, next)

*/
module.exports.saveStructure1Data = async(req,res, next)=>{
    console.log(req.body)
    const unit = new Structure1(req.body);
    await unit.save((err, structure)=>{
        try{
            if(err){
                return res.status(400).json({
                    err
                })
            }
            res.json({
                structure
            })
    }catch(err){
        next({msg: "something went wrong", err});
    }})
}

/*
 * @function getting all Structure1 if exist
 * @params(req,res)

*/

module.exports.fetchStructure1s = async(req, res)=>{
    Structure1.find({}, (err, structures)=>{
        if(err){
            return res.status(400).json({success: false, error: err})
        }
        if(structures.lenght){
            return res.status(404).json({success:false, error:"Oops No structures data found"})
        }
        return res.status(200).json({success:true, data:structures})
    })
}


/*
 * @function getting a single unit if exist
 * @params(req,res)

*/
module.exports.fetchStructure1 = async(req, res)=>{
    const {id} = req.params
    Structure1.findById(id)
    try{
        const {id} = req.params
        const structure = await Structure1.findById(id)
        if(!structure) return res.status(404).json({status: "failed", msg: "unit not found"})

        res.status(200).json({status: "success", data: structure})

    }catch(err){
        next({msg: "Oops! something went wrong couldn't get Structure1's data", err})
    }
}


/*
 * @function getting all Structure1 for a particular module if exist
 * @params(req,res)

*/
module.exports.fetchUnitStruct1 = async(req, res)=>{
    const {id} = req.params
    Structure1.find({unit_id: id})
    try{
        const {id} = req.params
        const struct = await Structure1.find({unit_id: id})
        if(!unit) return res.status(404).json({status: "failed", msg: "Structure data not found"})

        res.status(200).json({status: "success", data: struct})

    }catch(err){
        next({msg: "Oops! something went wrong couldn't get Structure1's data", err})
    }
}


/* 

@function to get Structure1 of a specified model


*/

module.exports.unitStructure1s = async(req, res)=>{
    const {id} = req.params
    Structure1.find({unit_id: id}, (err, struct1s)=>{
        if(err){
            return res.status(400).json({success: false, error: err})
        }
        if(units.lenght){
            return res.status(404).json({success:false, error:"Oops No struct1s data found"})
        }
        return res.status(200).json({success:true, data:struct1s})
    })
};

/*
 * @function deleting a unit if exist
 * @params(req,res, next)
 *
*/
module.exports.deleteStructure = (req, res, next) => {
    Structure1.findByIdAndRemove(
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

  module.exports.updateStructure = async(req, res, next)=> {
    try{
        const {id} = req.params
        const struct1 = await Structure1.findById(id)
        if(!struct1) return res.status(404).json({status: "failed", msg: "Structure Data not found"})

        const updatedStruct = await Structure1.findByIdAndUpdate(id, {$set:req.body}, {new: true})
        res.status(200).json({status: "success", data: updatedStruct})

    }catch(err){
        next({msg: "something went wrong", err})
    }
  }