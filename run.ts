// to run: npm run anonym-ts
//package.json nesmí obsahovat "type: module"
console.log('helo')

// import { User } from './src/modules/auth/domain/entities/User.ts'

// const u = User.create({
// 	id: 'whatever',
// 	firstName: 'John',
// 	lastName: 'doe',
// })

// console.log(u)

// console.log(u.toJson())

// //console.log(u.id)
// console.log(u.firstName)

// u.firstName = 'mara'
// console.log(u)
// console.log(u.firstName)

import { LogService } from './src/modules/log/domain/services/LogService.ts'
LogService.error('this is test error')
