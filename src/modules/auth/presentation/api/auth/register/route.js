import { RegisterUser } from '../../../../app/commands/RegisterUser.js'
import { RegisterHandler } from '../../../../app/handlers/RegisterHandler.js'

export async function POST(request) {
	try {
		// Parse request body
		const body = await request.json()
		const { email, password, firstName, lastName } = body

		// Validate required fields
		if (!email || !password || !firstName || !lastName) {
			return Response.json(
				{
					error: 'Missing required fields',
					details:
						'Email, password, first name, and last name are all required',
				},
				{ status: 400 }
			)
		}

		// Create command
		const registerCommand = new RegisterUser(
			email,
			password,
			firstName,
			lastName
		)

		// Handle registration
		const handler = new RegisterHandler()
		const result = await handler.handle(registerCommand)

		// Return success response
		return Response.json(
			{
				success: true,
				message: result.message,
				user: {
					id: result.user.id,
					email: result.user.email,
					firstName: result.user.firstName,
					lastName: result.user.lastName,
					fullName:
						result.user.firstName + ' ' + result.user.lastName,
					//nepujde jen result.user.fullName?
					emailVerified: result.user.emailVerified,
					createdAt: result.user.createdAt,
				},
			},
			{ status: 201 }
		)
	} catch (error) {
		console.error('Registration error:', error)

		// Handle different types of errors
		if (error.message.includes('email already exists')) {
			return Response.json(
				{ error: error.message },
				{ status: 409 } // Conflict
			)
		}

		if (
			error.message.includes('Password') ||
			error.message.includes('email') ||
			error.message.includes('name')
		) {
			return Response.json(
				{ error: error.message },
				{ status: 400 } // Bad Request
			)
		}

		// Generic server error
		return Response.json(
			{
				error: 'Registration failed. Please try again later.',
				details:
					process.env.NODE_ENV === 'development'
						? error.message
						: undefined,
			},
			{ status: 500 }
		)
	}
}
