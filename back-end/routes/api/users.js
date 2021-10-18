const dal = {};
const configure = (obj) => {
	Object.assign(dal, obj.dal);

};

const { requireAuth, requireNotAuth, handle } = require('../util');

const createUser = (req, res) => {
	dal.createUser(req.body)
		.then(({user_id, is_seller}) => {
			req.session.user_id = user_id.toString(); // log them in
			console.log("session created");
			res.status(201);
			res.statusMessage = 'Created User';
			res.end();
		})
		.catch(handle(req, res));
}

// Authenticate the user by assigning them a session/cookie
const authenticate = (req, res, next) => {
	dal.authenticate({identifier: req.body.identifier, password: req.body.password})
		.then((value) => {
			if(value === undefined || value === null) {
				res.status(401).end();
				return;
			}
			if (value.user_id) {
				req.session.user_id = value.user_id;

				console.log("session created");
				res.statusMessage = 'Authenticated';
				res.status(200).end();
				return;
			}
			res.status(401).end();
			return;
		})
		.catch(err => {console.log(err); return handle(req, res);});
};


const endSession = (req, res) => {
	req.session.destroy();
	res.status(204);
	res.statusMessage = 'Logged out';
	res.end();
};

const getUser = (req, res) => {
    dal.getUserById({user_id: req.params.user_id}).then( user => {
		res.json(user);
	})
	.catch(handle(req, res));
}





const checkSession = (req, res) => {
	//console.log("check Auth:",req.session);
	
	if(req.session && req.session.user_id) {
		const is_seller = req.session.is_seller === "true" ? "seller" : "buyer";
		// res.json({authLevel: is_seller});
		dal.getUserById({user_id: req.session.user_id}).then( user => {
			let retUser = Object.assign(user, {authLevel: is_seller});
			delete retUser._id;
			delete retUser.is_seller;

			res.json(retUser);
		})
		.catch(handle(req, res));
	}
	else res.json({authLevel: ""});
}


const checkCredentials = (req, res) => {
	let user_id = null;
	if(req.session && req.session.user_id) user_id = req.session.user_id;
	dal.checkCredentials({user_id, email: req.body.email}).then(response => {
		// console.log(req.body.username, req.body.email);
		// console.log(response);
		res.json(response);
	})
	.catch(handle(req, res));
}


const routes = [
	{
		uri: '/api/user',
		methods: ['post'],
		handler: createUser
	},
    {
		uri: '/api/user/:user_id',
		methods: ['get'],
		handler: getUser
	},
	{
		uri: '/api/user/check',
		methods: ['post'],
		handler: checkCredentials
	},

	{
		uri: '/api/auth',
		methods: ['post'],
		handler: authenticate
	},
	{
		uri: '/api/auth',
		methods: ['delete'],
		handler: [requireAuth(), endSession]
	},
	{
		uri: '/api/auth',
		methods: ['get'],
		handler: checkSession
	},

];


module.exports = { routes, configure };