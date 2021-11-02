const dal = {};
const configure = (obj) => {
	Object.assign(dal, obj.dal);

};

const { requireAuth, requireNotAuth, handle } = require('../util');

const createBoard = (req, res) => {
	// console.log(req);
	// console.log(req.session.user_id, req.body);
	dal.createBoard(req.session.user_id, req.body).then((result) => {
		res.json(result);
	})
	.catch(handle(req, res));
}

const getBoard = (req, res) => {
	dal.getBoardById(req.params.board_id).then(result => {
		res.json(result);
	})
	.catch(handle(req, res));
}


const getBoardsByUser = (req, res) => {
	dal.getBoardsByUser(req.session.user_id).then(result => {
		res.json(result);
	})
	.catch(handle(req, res));
}




const updateBoard = (req, res) => {
	console.log(req.body);
	dal.updateBoard(req.body.board_id, req.session.user_id, req.body).then(() => {
		res.status(201);
		res.statusMessage = 'Updated Board';
		res.end();
	})
	.catch(handle(req, res));
}


const removeBoard = (req, res) => {
	dal.removeBoard(req.params.board_id).then(() => {
		res.status(204);
		res.statusMessage = 'Removed Board';
		res.end();
	})
	.catch(handle(req, res));
}




const routes = [
	{
		uri: '/api/board',
		methods: ['post'],
		handler: [requireAuth(), createBoard]
	},
    {
		uri: '/api/board/:board_id',
		methods: ['get'],
		handler: [requireAuth(), getBoard]
	},
	{
		uri: '/api/boards',
		methods: ['get'],
		handler: [requireAuth(), getBoardsByUser]
	},
    {
		uri: '/api/board/:board_id',
		methods: ['put'],
		handler: [requireAuth(), updateBoard]
	},
    {
		uri: '/api/board/:board_id',
		methods: ['delete'],
		handler: [requireAuth(), removeBoard]
	}
];


module.exports = { routes, configure };
