const userModel = require('../models/users');
const bcrypt = require('bcryptjs');	
const jwt = require('jsonwebtoken');				

module.exports = {
	create: function(req, res, next) {
		
		userModel.create({ first_name: req.body.first_name, last_name: req.body.last_name, email: req.body.email, password: req.body.password, employee_id: req.body.employee_id, organization_name: req.body.organization_name }, function (err, result) {
				  if (err) 
				  	next(err);
				  else
				  	res.json({status: "success", message: "User added successfully!!!", data: null});
				  
				});
	},

	authenticate: function(req, res, next) {
		userModel.findOne({email:req.body.email}, function(err, userInfo){
					if (err) {
						next(err);
					} else {

						if(userInfo != null && bcrypt.compareSync(req.body.password, userInfo.password)) {

						 const token = jwt.sign({id: userInfo._id}, req.app.get('secretKey'), { expiresIn: '1h' }); 

						 res.json({status:"success", message: "user found!!!", data:{user: userInfo, token:token}});	

						}else{

							res.json({status:"error", message: "Invalid email/password!!!", data:null});

						}
					}
				});
	},

	userListFirstName: function(req, res, next) {
		let usersList = [];
		let skip_result = (req.params.page)?(req.params.page-1)*5:0;
		userModel.find({first_name: {$eq: req.params.name}}, function(err, users){
			if (err){
				next(err);
			} else{
				for (let user of users) {
					usersList.push({id: user._id, first_name: user.first_name,last_name: user.last_name, email:user.email, organization_name: user.organization_name});
				}
				res.json({status:"success", message: "users list found!!!", data:{users: usersList}});
							
			}

		}).sort({first_name:1}).skip(skip_result);
	},

	userListLastName: function(req, res, next) {
		let usersList = [];
		let skip_result = (req.params.page)?(req.params.page-1)*5:0;
		userModel.find({last_name: {$eq: req.params.name}}, function(err, users){
			if (err){
				next(err);
			} else{
				for (let user of users) {
					usersList.push({id: user._id, first_name: user.first_name,last_name: user.last_name, email:user.email, organization_name: user.organization_name});
				}
				res.json({status:"success", message: "users list found!!!", data:{users: usersList}});
							
			}

		}).sort({last_name:1}).skip(skip_result);
	},

	userListEmployee: function(req, res, next) {
		let usersList = [];
		let skip_result = (req.params.page)?(req.params.page-1)*5:0;
		userModel.find({employee_id: {$eq: req.params.id}}, function(err, users){
			if (err){
				next(err);
			} else{
				for (let user of users) {
					usersList.push({id: user._id, first_name: user.first_name,last_name: user.last_name, email:user.email, organization_name: user.organization_name});
				}
				res.json({status:"success", message: "users list found!!!", data:{users: usersList}});
							
			}

		}).sort({employee_id:1}).skip(skip_result);
	}

}					
