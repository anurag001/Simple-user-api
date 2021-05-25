const userModel = require('../models/users');
const bcrypt = require('bcryptjs');	
const jwt = require('jsonwebtoken');				

module.exports = {
	create: function(req, res, next) {
		let user = {
			email: req.body.email, 
			password: req.body.password
		}
		userModel.create(user, function (err, result) {
			if (err) {
			  	res.status(400);
			}else{
			  	res.status(201).send(user);
			}
		});
	},
	authenticate: function(req, res, next) {
		userModel.findOne({email:req.body.email}, function(err, userInfo){
			if (err) {
				next(err);
			} else {
				if(userInfo != null && bcrypt.compareSync(req.body.password, userInfo.password)) {
					const token = jwt.sign({id: userInfo._id}, req.app.get('secretKey'), { expiresIn: '1h' }); 
					res.status(200).json({data:{user: userInfo.email, token:token}});	
				}else{
					res.status(404).json({status:"error", message: "Invalid email/password!!!", data:null});
				}
			}
		});
	},
	getUserList: function(req, res, next) {
		let usersList = [];
		let skip_result = (req.params.page)?(req.params.page-1)*5:0;
		userModel.find({}, function(err, users){
			if (err){
				next(err);
			} else{
				for (let user of users) {
					usersList.push({id: user._id, email:user.email});
				}
				res.status(200).json({status:"success", message: "Users list found", data:{users: usersList}});
							
			}

		}).skip(skip_result);
	},
	deleteUser: function(req, res, next) {
		let id=req.params.id;
		userModel.findByIdAndRemove(id, function(err, user){
			if (err){
				next(err);
			} else{
				console.log("Deleted",user);
				res.status(204).send("Deleted successfully");
			}
		});
	}

}					
