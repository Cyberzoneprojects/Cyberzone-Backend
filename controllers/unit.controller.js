const { model } = require('mongoose');
const Units = require('../models/unit.model')


/*
 * @function Creating/saving a new unit
 * @params(req,res, next)
*/

module.exports.saveUnit = async(req,res, next)=>{
    try{
        const unitExist = await Units.findOne({title: req.body.title})
        if(unitExist) return res.status(404).json({status: "failed", msg: "unit already exits", unitExist})

        const newUnit = await Units.create(req.body)
        res.status(201).json({status: "success", data: newUnit})

    }catch(err){
        next({msg: "Oops! something went wrong couldn't create Module", err})
    }
}







/*
 * @function getting all units if exist
 * @params(req,res)

*/

module.exports.fetchUnits = async (req, res) => {
    Units.find({}, (err, units) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (units.lenght) {
            return res.status(404).json({ success: false, error: "Oops No modules found" })
        }
        return res.status(200).json({ success: true, data: units })
    })
}


/*
 * @function getting a single unit if exist
 * @params(req,res)

*/
module.exports.fetchUnit = async (req, res) => {
    const { id } = req.params
    Units.findById(id)
    try {
        const { id } = req.params
        const unit = await Units.findById(id)
        if (!unit) return res.status(404).json({ status: "failed", msg: "unit not found" })

        res.status(200).json({ status: "success", data: unit })

    } catch (err) {
        next({ msg: "Oops! something went wrong couldn't get units bbb", err })
    }
}


/*
 * @function getting all units for a particular module if exist
 * @params(req,res)

*/
module.exports.fetchModuleUnit = async (req, res) => {
    const { id } = req.params
    Units.find({ module_id: id })
    try {
        const { id } = req.params
        const unit = await Units.find({ module_id: id })
        if (!unit) return res.status(404).json({ status: "failed", msg: "Exercise not found" })

        res.status(200).json({ status: "success", data: unit })

    } catch (err) {
        next({ msg: "Oops! something went wrong couldn't get units ffff", err })
    }
}


/* 

@function to get units of a specified model


*/

module.exports.moduleUnits = async (req, res) => {
    const { id } = req.params
    Units.find({ moduleID: id }, (err, units) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (units.lenght) {
            return res.status(404).json({ success: false, error: "Oops No Units found" })
        }
        return res.status(200).json({ success: true, data: units })
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

module.exports.updateUnit = async (req, res, next) => {
    try {
        const { id } = req.params
        console.log(req.body)
        const unit = await Units.findById(id)
        if (!unit) return res.status(404).json({ status: "failed", msg: "Unit not found" })

        const updatedUser = await Units.findByIdAndUpdate(id, { $set: req.body }, { new: true })
        res.status(200).json({ status: "success", data: updatedUser })

    } catch (err) {
        next({ msg: "something went wrong", err })
    }
}


/*
* @function getting a single unit method 2
* @params(req,res)

*/
module.exports.fetchUnitsData = async (req, res, next) => {
    const { id } = req.params
    Units.find({ _id: id })
    try {
        const { id } = req.params
        const unit = await Units.find({ _id: id })
        if (!unit) return res.status(404).json({ status: "failed", msg: "Exercise not found" })

        res.status(200).json({ status: "success", data: unit })

    } catch (err) {
        next({ msg: "Oops! something went wrong couldn't get units ccc", err })
    }
}