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