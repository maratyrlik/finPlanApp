src/
├── modules/
│   ├── auth/
│   │   ├── application/
│   │   │   ├── commands/
│   │   │   │   ├── LoginUser.js
│   │   │   │   ├── RegisterUser.js
│   │   │   │   ├── LogoutUser.js
│   │   │   │   ├── ResetPassword.js
│   │   │   │   └── ChangePassword.js
│   │   │   ├── queries/
│   │   │   │   ├── GetCurrentUser.js
│   │   │   │   ├── ValidateSession.js
│   │   │   │   └── CheckEmailExists.js
│   │   │   └── handlers/
│   │   │       ├── AuthCommandHandler.js
│   │   │       └── AuthQueryHandler.js
│   │   ├── domain/
│   │   │   ├── entities/
│   │   │   │   ├── User.js
│   │   │   │   ├── Session.js
│   │   │   │   └── PasswordReset.js
│   │   │   ├── repositories/
│   │   │   │   ├── IUserRepository.js
│   │   │   │   └── IAuthRepository.js
│   │   │   ├── services/
│   │   │   │   ├── AuthService.js
│   │   │   │   ├── PasswordService.js
│   │   │   │   └── EmailService.js
│   │   │   └── value-objects/
│   │   │       ├── Email.js
│   │   │       └── Password.js
│   │   ├── infrastructure/
│   │   │   ├── repositories/
│   │   │   │   ├── SupabaseUserRepository.js
│   │   │   │   └── SupabaseAuthRepository.js
│   │   │   └── services/
│   │   │       ├── SupabaseAuthService.js
│   │   │       └── SupabaseEmailService.js
│   │   ├── presentation/
│   │   │   ├── api/
│   │   │   │   └── auth/
│   │   │   │       ├── login/
│   │   │   │       │   └── route.js (BE)
│   │   │   │       ├── register/
│   │   │   │       │   └── route.js (BE)
│   │   │   │       ├── logout/
│   │   │   │       │   └── route.js (BE)
│   │   │   │       ├── reset-password/
│   │   │   │       │   └── route.js (BE)
│   │   │   │       ├── change-password/
│   │   │   │       │   └── route.js (BE)
│   │   │   │       └── user/
│   │   │   │           └── route.js (BE)
│   │   │   ├── components/
│   │   │   │   ├── forms/
│   │   │   │   │   ├── LoginForm.jsx (FE)
│   │   │   │   │   ├── RegisterForm.jsx (FE)
│   │   │   │   │   ├── ForgotPasswordForm.jsx (FE)
│   │   │   │   │   ├── ResetPasswordForm.jsx (FE)
│   │   │   │   │   └── ChangePasswordForm.jsx (FE)
│   │   │   │   ├── ui/
│   │   │   │   │   ├── AuthButton.jsx (FE)
│   │   │   │   │   ├── AuthInput.jsx (FE)
│   │   │   │   │   ├── AuthCard.jsx (FE)
│   │   │   │   │   └── AuthLayout.jsx (FE)
│   │   │   │   └── guards/
│   │   │   │       ├── AuthGuard.jsx (FE)
│   │   │   │       └── GuestGuard.jsx (FE)
│   │   │   └── pages/
│   │   │       ├── login/
│   │   │       │   └── page.jsx (FE)
│   │   │       ├── register/
│   │   │       │   └── page.jsx (FE)
│   │   │       ├── forgot-password/
│   │   │       │   └── page.jsx (FE)
│   │   │       └── reset-password/
│   │   │           └── page.jsx (FE)
│   │   ├── styles/
│   │   │   ├── auth-theme.css
│   │   │   ├── components/
│   │   │   │   ├── forms.css
│   │   │   │   ├── buttons.css
│   │   │   │   ├── inputs.css
│   │   │   │   └── cards.css
│   │   │   └── variables.css
│   │   └── module.js
│   │
│   └── shared/
│       ├── hooks/
│       │   ├── useAuth.js (FE)
│       │   ├── useUser.js (FE)
│       │   └── useLocalStorage.js (FE)
│       ├── context/
│       │   └── AuthContext.jsx (FE)
│       ├── middleware/
│       │   ├── authMiddleware.js (BE)
│       │   └── sessionMiddleware.js (BE)
│       └── utils/
│           ├── validation.js
│           ├── errors.js
│           └── constants.js




-Create User Domain Entity - Build User class similar to your Account entity with validation 
-User Repository Implementation - Create UserRepository extending your base Repository class
-Login Command/Handler - Build login use case with email/password validation
-Authentication Service - Create service to handle Supabase auth (signIn, signUp, signOut)
TODOSession Management - Set up middleware to check authentication state and protect routes
Login API Endpoint - Create /api/auth/login route handler
Logout API Endpoint - Create /api/auth/logout route handler
Login Form Component - Build login form in presentation layer
Protected Route Setup - Create middleware or HOC to protect private pages
Private Dashboard Page - Create simple /dashboard page that requires authentication
Redirect Logic - Implement redirects (logged in users → dashboard, unauthorized → login)
Error Handling - Add proper error handling for auth failures and form validation


-přidat todo - vytvořit tabulu user, trigger na plnění user z auth.users (v supabase)