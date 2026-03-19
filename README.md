# Modern Authentication System

A scalable, enterprise-grade authentication system built with React, Redux Toolkit, and Tailwind CSS. Features secure JWT-based authentication, social login integration, and a component-based architecture.

## 🚀 Features

- **Secure Authentication**: JWT-based authentication with refresh tokens
- **Social Login**: Google and Facebook OAuth integration
- **Redux State Management**: Centralized state management with Redux Toolkit
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Reusable Components**: Modular, reusable UI components
- **Form Validation**: Client-side validation with React Hook Form and Yup
- **Protected Routes**: Route-level authentication protection
- **Modern Architecture**: Clean, maintainable code structure

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Base UI components
│   │   ├── Button.jsx   # Button component with variants
│   │   ├── Input.jsx    # Input component with validation
│   │   ├── Card.jsx     # Card layout component
│   │   ├── Alert.jsx    # Alert notification component
│   │   └── index.js     # UI components exports
│   └── auth/            # Authentication components
│       ├── LoginForm.jsx      # Login form component
│       ├── RegisterForm.jsx   # Registration form component
│       ├── SocialLogin.jsx    # Social login component
│       ├── ProtectedRoute.jsx # Route protection component
│       └── index.js           # Auth components exports
├── hooks/               # Custom React hooks
│   └── useAuth.js       # Authentication hook
├── layouts/             # Layout components
│   ├── AuthLayout.jsx   # Authentication pages layout
│   └── MainLayout.jsx   # Main application layout
├── pages/               # Page components
│   ├── Home.jsx         # Landing page
│   ├── Login.jsx        # Login page
│   ├── Register.jsx     # Registration page
│   └── Dashboard.jsx    # User dashboard
├── services/            # API services
│   └── authAPI.js       # Authentication API calls
├── store/               # Redux store configuration
│   ├── index.js         # Store configuration
│   └── slices/          # Redux slices
│       └── authSlice.js # Authentication slice
└── utils/               # Utility functions
    └── auth.js          # Authentication utilities
```

## 🛠️ Tech Stack

- **Frontend Framework**: React 19
- **State Management**: Redux Toolkit
- **Routing**: React Router v6
- **Styling**: Tailwind CSS v4
- **Form Handling**: React Hook Form
- **Validation**: Yup
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Build Tool**: Vite

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd auth-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   Update the `.env` file with your configuration:
   ```env
   VITE_API_BASE_URL=http://localhost:3001/api
   VITE_GOOGLE_CLIENT_ID=your_google_client_id
   VITE_FACEBOOK_APP_ID=your_facebook_app_id
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 🔧 Configuration

### API Endpoints

The system expects the following API endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | User registration |
| POST | `/api/auth/login` | User login |
| POST | `/api/auth/logout` | User logout |
| POST | `/api/auth/refresh-token` | Refresh JWT token |
| GET | `/api/auth/profile` | Get user profile |
| POST | `/api/auth/social-login` | Social media login |

## 🏗️ Architecture

### Component Architecture

- **UI Components**: Reusable, styled components with consistent API
- **Auth Components**: Authentication-specific components
- **Layout Components**: Page layout wrappers
- **Page Components**: Full page implementations

### State Management

- **Redux Toolkit**: Modern Redux with simplified syntax
- **Auth Slice**: Centralized authentication state
- **Custom Hooks**: Simplified component integration

### Routing

- **Protected Routes**: Automatic authentication checking
- **Layout Routes**: Consistent page layouts
- **Dynamic Redirects**: Context-aware navigation

## 🔒 Security Features

- **JWT Token Management**: Secure token storage and refresh
- **Password Validation**: Strong password requirements
- **Input Sanitization**: Protection against XSS attacks
- **CSRF Protection**: Request origin validation

## 🎨 UI/UX Features

- **Responsive Design**: Works on all device sizes
- **Accessibility**: WCAG 2.1 compliant components
- **Loading States**: User feedback during async operations
- **Error Handling**: Graceful error display and recovery
- **Form Validation**: Real-time validation feedback

## 📱 Components Documentation

### Button Component
```jsx
<Button 
  variant="primary|secondary|outline|danger|ghost"
  size="sm|md|lg"
  loading={boolean}
  fullWidth={boolean}
  onClick={function}
>
  Button Text
</Button>
```

### Input Component
```jsx
<Input
  label="Field Label"
  type="text|email|password"
  placeholder="Placeholder text"
  error="Error message"
  required={boolean}
  showPasswordToggle={boolean}
/>
```

### Card Component
```jsx
<Card>
  <Card.Header>Header Content</Card.Header>
  <Card.Content>Main Content</Card.Content>
  <Card.Footer>Footer Content</Card.Footer>
</Card>
```

## 🚀 Deployment

### Build Optimization

```bash
npm run build
```

### Environment-Specific Builds

- Development: `npm run dev`
- Preview: `npm run preview`
- Production: `npm run build`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

Create an issue in the GitHub repository for support.

## 🔮 Future Enhancements

- [ ] Two-factor authentication (2FA)
- [ ] Password reset functionality
- [ ] Email verification
- [ ] Role-based access control (RBAC)
- [ ] Session management
- [ ] Audit logging
- [ ] Multi-language support
- [ ] Dark theme support
