const db = require("../models/index"),
Parttime = db.parttime,
Op = db.Sequelize.Op;

const getPtlist = async (id) => {
    try {
        const ptlist = await Parttime.findAll({
            attributes : ['parttimeName' , 'parttimeId'],
            where : {
                ptMemberId : id
            }
        })
        console.log(ptlist); 
        return ptlist; 

    }catch (err) {
        return err; 
    }

};

exports.getAllParttimes = async (req, res) => {
    try {
        data = await Parttime.findAll();
        console.log(data);
        res.render("jobinfo");
    } catch (err) {
        res.status(500).send({
            message: err.message
        });
    }
};

exports.editJob = async (req, res) => {
    getPtlist(req.session.idx).then (
        ptlist => {     
            console.log(ptlist); 
            res.render("jobEdit", { pt : ptlist});}
    );
}


exports.jobEditClear = async (req, res) => {    
    try {
        Parttime.update(
            {
            weekPay: req.body.weekPay,
            tax: req.body.tax,
            color : req.body.color
        },
        {
            where : {
                parttimeId : req.body.parttimeId,
                ptMemberId : req.session.idx
            }
        }
        )
        console.log("데이터 편집 완료");
        res.render("clear");
    } catch (err) {
        res.status(500).send({
            message: err.message
        });
    }
}


exports.jobDelete = async (req, res) => {
    getPtlist(req.session.idx).then (
        ptlist => {     
            console.log(ptlist); 
            res.render("jobDelete", { pt : ptlist});}
    );
}

exports.jobDeleteClear = async (req, res) => {
    try {
        await Parttime.destroy({
            where : { 
                parttimeId : req.body.parttimeId,
                ptMemberId : req.session.idx            
            }
        });
        res.render("clear");
    } catch (err) {
        res.status(500).send({
            message: err.message
        });
    }
}