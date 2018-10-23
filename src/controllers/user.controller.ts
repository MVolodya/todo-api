// import jwt from 'jsonwebtoken';
import { User } from './../models/user.model';
import { ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';

const userController = {
	addUser: async (root: any, args: any) => {
		const hashedPassword = await bcrypt.hash( args.password, 10)
		const user = await new User({ 
			name: args.name,
			surname: args.surname,
			password: hashedPassword
		});
		return user.save();
	},
	deleteUser: (root: any, args: any) => User.deleteOne({ _id: args.id }),
	updateUser: (root: any, args: any) => {
		const tempUser = { ...args };
		delete tempUser.id;
		return User.updateOne({ _id: args.id }, { $set: tempUser });
	},
	// login: async (root: any, args: any, context: any, info: any) => {
	// 	const user = await context.db.query.user({ where: { name: args.name } }, ` { id password } `)
  // if (!user) {
  //   throw new Error('No such user found')
	// }
	// const valid = await bcrypt.compare(args.password, user.password)
  // if (!valid) {
  //   throw new Error('Invalid password')
	// }
	// const token = jwt.sign({ userId: user.id }, 'sfsd')
	// return {
  //   token,
  //   user,
  // }
	// },
	users: (root: any, args: any) => User.find({}),
	user: (token: string) => User.find({ token: token })
};

export { userController };