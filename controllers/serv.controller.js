const { model } = require('mongoose');
const Servs = require('../models/serv.model')


/*
 * @function Creating/saving a serv
 * @params(req,res, next)
*/

module.exports.saveServ = async(req,res, next)=>{
    try{
        const ServExist = await Servs.findOne({title: req.body.title})
        if(ServExist) return res.status(404).json({status: "failed", msg: "serves already exits", ServExist})

        const newServs = await Servs.create(req.body)
        res.status(201).json({status: "success", data: newServs})

    }catch(err){
        next({msg: "Oops! something went wrong couldn't create serves", err})
    }
}







/*
 * @function getting all units if exist
 * @params(req,res)

*/

module.exports.fetchServs = async (req, res) => {
    Servs.find({}, (err, units) => {
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
 * @function deleting a unit if exist
 * @params(req,res, next)
 *
*/
module.exports.deleteServ = (req, res, next) => {
    Servs.findByIdAndRemove(
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

module.exports.updateServ = async (req, res, next) => {
    try {
        const { id } = req.params
        const serv = await Servs.findById(id)
        if (!serv) return res.status(404).json({ status: "failed", msg: "Unit not found" })

        const updatedUser = await Servs.findByIdAndUpdate(id, { $set: req.body }, { new: true })
        res.status(200).json({ status: "success", data: updatedUser })

    } catch (err) {
        next({ msg: "something went wrong", err })
    }
}


/*
* @function getting a single unit method 2
* @params(req,res)

*/
module.exports.fetchServsData = async (req, res, next) => {
    const { id } = req.params
    Servs.find({ _id: id })
    try {
        const { id } = req.params
        const serv = await Servs.find({ _id: id })
        if (!serv) return res.status(404).json({ status: "failed", msg: "Exercise not found" })

        res.status(200).json({ status: "success", data: serv })

    } catch (err) {
        next({ msg: "Oops! something went wrong couldn't get units ccc", err })
    }
}