# Next.js Starter Kit

A modern, full-featured Next.js application starter kit built with TypeScript, featuring authentication, role-based access control, and a comprehensive admin dashboard.

## 🚀 Features

- **Next.js 15** with App Router and Turbopack
- **TypeScript** for type safety
- **Tailwind CSS 4** for styling
- **Shadcn/ui** components for beautiful UI
- **React Hook Form** with Zod validation
- **TanStack Query** for data fetching and caching
- **JWT Authentication** with refresh token support
- **Role-based Access Control (RBAC)**
- **Responsive Design** with mobile support
- **Dark/Light Theme** support
- **Docker** support for development and production
- **Comprehensive Admin Dashboard** with:
  - User Management
  - Role Management
  - Department Management
  - Permission-based navigation

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI Components**: Shadcn/ui + Radix UI
- **State Management**: React Context + TanStack Query
- **Forms**: React Hook Form + Zod
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Animations**: Lottie Files

### Development Tools
- **Package Manager**: pnpm
- **Linting**: ESLint
- **Containerization**: Docker
- **Fonts**: Geist Sans & Geist Mono

## 📁 Project Structure

```
src/
├── api-config/           # API configuration and services
│   ├── instance/         # Axios instance setup
│   ├── queries/          # TanStack Query hooks
│   └── services/         # API service functions
├── app/                  # Next.js App Router
│   ├── (auth)/          # Authentication routes
│   │   └── login/       # Login page and schema
│   ├── (root)/          # Protected routes
│   │   ├── setting/     # Admin settings
│   │   │   ├── users/   # User management
│   │   │   ├── roles/   # Role management
│   │   │   └── departments/ # Department management
│   │   └── layout.tsx   # Root layout
│   ├── contexts/        # React contexts
│   └── globals.css      # Global styles
├── components/          # Reusable components
│   ├── ui/             # Shadcn/ui components
│   ├── form-inputs/    # Form components
│   ├── data-table/     # Table components
│   └── ...             # Other components
├── helper/             # Utility functions
├── hooks/              # Custom React hooks
└── lib/                # Library configurations
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- Docker (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd next-starter-kit
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Environment Setup**
   ```bash
   cp sample_env .env.local
   ```
   
   Update the environment variables in `.env.local`:
   ```env
   NEXT_PUBLIC_USER_ACCESS_TOKEN=your_access_token_key
   NEXT_PUBLIC_USER_REFRESH_TOKEN=your_refresh_token_key
   NEXT_PUBLIC_BASE_URL=http://localhost:3002
   NEXT_CONFIG_OUTPUT=standalone
   ```

4. **Start the development server**
   ```bash
   pnpm dev
   ```

   The application will be available at [http://localhost:3000](http://localhost:3000)

### Docker Setup

#### Development
```bash
cd docker/development
docker-compose up --build -d
```

#### Production
```bash
cd docker/production
docker-compose up --build -d
```

## 🔐 Authentication & Authorization

The application implements a comprehensive authentication system:

### Features
- **JWT-based authentication** with access and refresh tokens
- **Automatic token refresh** on expiration
- **Role-based access control (RBAC)**
- **Permission-based navigation** and actions
- **Secure cookie storage** for tokens

### Authentication Flow
1. User logs in with email/password
2. Server returns access and refresh tokens
3. Tokens are stored in secure HTTP-only cookies
4. Access token is automatically attached to API requests
5. On token expiration, refresh token is used to get new access token
6. On refresh failure, user is redirected to login

### Permission System
- **Menu-based permissions** with CRUD actions
- **Dynamic navigation** based on user permissions
- **Action-level permissions** (create, read, update, delete)
- **Hierarchical menu structure** with sub-menus

## 📊 Admin Dashboard

### User Management
- Create, edit, and delete users
- Assign roles and departments
- Change user passwords
- Advanced filtering and search

### Role Management
- Create and manage roles
- Assign permissions to roles
- Hierarchical permission structure

### Department Management
- Organize users by departments
- Department-based access control

## 🎨 UI Components

The application uses a comprehensive set of UI components:

### Form Components
- Text inputs with validation
- Select boxes and dropdowns
- Date and time pickers
- Checkboxes and switches
- File uploads
- Phone number inputs

### Data Display
- Data tables with sorting and filtering
- Pagination
- Detail views
- Cards and modals
- Loading states and skeletons

### Navigation
- Sidebar navigation
- Breadcrumbs
- User menu
- Theme toggle

## 🔧 Configuration

### API Configuration
The API client is configured with:
- **Base URL** from environment variables
- **Request/Response interceptors** for authentication
- **Automatic token refresh** on 401 errors
- **Timeout handling** (3 minutes)
- **Error handling** with user-friendly messages

### Theme Configuration
- **Dark/Light mode** support
- **System preference** detection
- **Smooth transitions** between themes
- **Custom color schemes**

## 📱 Responsive Design

The application is fully responsive with:
- **Mobile-first** approach
- **Breakpoint-based** layouts
- **Touch-friendly** interactions
- **Optimized** for all screen sizes

## 🚀 Deployment

### Production Build
```bash
pnpm build
pnpm start
```

### Docker Deployment
```bash
# Build production image
docker build -f docker/Dockerfile -t next-starter-kit .

# Run with docker-compose
cd docker/production
docker-compose up -d
```

### Environment Variables for Production
```env
NEXT_PUBLIC_BASE_URL=https://your-api-domain.com
NEXT_CONFIG_OUTPUT=standalone
```

## 🧪 Development

### Available Scripts
- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

### Code Style
- **TypeScript** for type safety
- **ESLint** for code quality
- **Prettier** for code formatting
- **Conventional commits** for version control

## 📝 API Integration

The application integrates with a REST API for:
- **Authentication** (login, logout, refresh tokens)
- **User management** (CRUD operations)
- **Role management** (permissions and assignments)
- **Department management** (organizational structure)

### API Endpoints Structure
```
POST /auth/login          # User authentication
POST /user/refresh-token  # Token refresh
GET  /user/permissions    # User permissions
GET  /users              # List users
POST /users              # Create user
PUT  /users/:id          # Update user
DELETE /users/:id        # Delete user
# Similar patterns for roles and departments
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Htet Thu** - *Initial work*

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [TanStack Query](https://tanstack.com/query) for data fetching and caching
- [Radix UI](https://www.radix-ui.com/) for accessible component primitives

---

**Happy Coding! 🚀**
