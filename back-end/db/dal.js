const {MongoClient} = require('mongodb');
const snowmachine = new (require('snowflake-generator'))(1420070400000);

const dbclient = new MongoClient(require('../../secrets.json').db.connectionString, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
console.log("Attempting to connect to database");
dbclient.connect().then(() => console.log("Connected")).catch(error => console.log("Could not connect", error));


const hasher = require('argon2');
const hash_options = {
	type: hasher.argon2id
};
const hash = async (pw) => {
	return hasher.hash(pw, hash_options)
		.catch(err => {
			const error_id = gen_id();
			throw ['An error occurred while hashing the supplied password'];
		});
};
const verify_hash = (hash, input) => hasher.verify(hash, input);

const gen_id = (errors = []) => snowmachine.generate().snowflake.toString();

const isFieldEmpty = field => {
	return (field === undefined || field === null);
}
const findErrors = fields => {
	const errors = [];
	fields.forEach(field => {
		if(isFieldEmpty(field.value) || typeof field.value != (field.type ? field.type : "string") ||(field.regex && !field.regex.test(field.value))) {
			errors.push(`Expected ${field.name}, but ${field.value} was supplied`);
		}
	});
	return errors;
}


// ==============================
//            Users
// ==============================

const createUser = async (_user) => {
	const errors = findErrors([
		{name: "email", value: _user.email, regex: /\w+@\w+\.\w+/}, 
		{name: "name", value: _user.name, regex: /^[a-zA-Z- ]+$/}, 
		{name: "password", value: _user.password, regex: /^(?=.*[A-Za-z])(?=.*\d).{8,}$/}, 
	]);
	if (errors.length) {
		throw errors;
	}

    const user_id = gen_id();
	const record = Object.assign({}, _user, {user_id});
	return getUserByEmail({email: record.email}).then(user => {
		if(user) throw [`A user already exists with the email address ${record.email}`];
	})
	.then(() => hash(record.password)
		.then(hashed_password => {
			record.password = hashed_password;
			return dbclient.db('Bello').collection('Users').insertOne(record).then(() => (user_id));
		})
	);
}

const getUserById = async ({user_id}) => {
	return await dbclient.db('Bello').collection('Users').findOne({"user_id": user_id}).then(result => {
		if(!result) return null;
		delete result.password; 
        delete result._id;
        return result;
	})
	.catch(err => { throw ['An error occurred while finding user by id'];});
}

const getUserByEmail = async ({email}) => {
	return await dbclient.db('Bello').collection('Users').findOne({"email": email})
	.catch(err => { throw ['An error occurred while finding user by email'];});

}

const updateUser = async (user_id, user) => {
	let newValues = { $set: {}};
	if(!isFieldEmpty(user.email) && /^[a-zA-Z0-9_ ]+$/.test(user.email)) newValues['$set'].email = user.email;
	if(!isFieldEmpty(user.name) && /^[a-zA-Z- ]+$/.test(user.name)) newValues['$set'].name = user.name;
	return await dbclient.db('Bello').collection('Users').updateOne({user_id}, newValues)
	.catch(err => { throw ['An error occurred while updating user'];});

}

const removeUser = async (user_id) => {
	return await dbclient.db('Bello').collection('Users').deleteOne({user_id})
	.catch(err => { throw ['An error occurred while removing user'];});
	
}


const authenticate = async ({identifier, password}) => {
	return dbclient.db('Bello').collection('Users').findOne({"email":identifier})
		.then(result => {
			// console.log(result);
			if (result)
				return verify_hash(result.password, password).then(ok => {
					if (ok) return result.user_id;
					else return undefined;
				});
			else return undefined; 
		});
}

const checkCredentials = async ({user_id, email}) => {
	const errors = false;
	await dbclient.db('Bello').collection('Users').findOne({"email": email})
		.then(result => {
			if(result && user_id != result.user_id) errors = true;
		});
	return errors;
}


// ==============================
//            Boards
// ==============================

const createBoard = async (user_id, _board) => {
	// if(_board.name.length === 0) throw ['Board name cannot be empty'];

    const board_id = gen_id();
	const record = {
        board_id,
        name: _board.name,
        taskLists: [],
        user_id
    };

	return dbclient.db('Bello').collection('Boards').insertOne(record).then(() => board_id);
	
}
const getBoardById = async (board_id) => {

	return dbclient.db('Bello').collection('Boards').findOne({board_id}).then(result => {
		return result;
	})
	.catch(err => { throw ['An error occurred while finding board by id'];});
	
	
}

const getBoardsByUser = async (user_id) => {
	console.log(user_id, "dsfadshzsfadsfawefasfdfadsfs");
	let boardArray = await dbclient.db('Bello').collection('Boards').find({"user_id": user_id}).toArray()
	.catch(err => { throw ['An error occurred while finding board by user id'];});
	return boardArray;
}




const updateBoard = async (board_id, user_id, board) => {
	//check if current user owns the board
	getBoardById(board_id).then(result => {
        if(result.user_id != user_id) throw ['The user does not own the board they are attemting to update'];
		let newValues = { $set: {
			name: board.name,
			taskLists: board.taskLists
		}};
		return dbclient.db('Bello').collection('Boards').updateOne({board_id}, newValues)
		.catch(err => { console.log(err); throw ['An error occurred while updating board'];});
	}).catch(err => { console.log(err); throw ['An error occurred while updating board'];});

}



const removeBoard = async (board_id, user_id) => {
    getBoardById(board_id).then(result => {
        if(result.user_id != user_id) throw ['The user does not own the board they are attemting to remove'];
		
		return dbclient.db('Bello').collection('Boards').deleteOne({board_id})
	    .catch(err => { throw ['An error occurred while removing board'];});
	}).catch(err => { console.log(err); throw ['An error occurred while updating board'];});

	
	
}


module.exports =  {
	createUser, getUserById, updateUser, removeUser,
	authenticate, checkCredentials,
	createBoard, getBoardById, getBoardsByUser, updateBoard, removeBoard
	
};