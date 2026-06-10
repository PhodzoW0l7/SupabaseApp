# SupabaseApp
<img width="952" height="469" alt="image" src="https://github.com/user-attachments/assets/01ba6019-c610-4954-92ac-b0d162adeb5a" />

A modern service request management platform built with React, Vite, and Supabase.

## Overview

SupabaseApp.ME is an innovative service request dispatch system that streamlines operational workflows, ticket management, and resource allocation. Built with modern web technologies, it provides real-time request tracking, priority management, and seamless user authentication.

##  Features

-  **Authentication** - Secure user authentication with Supabase Auth
-  **Dashboard** - Real-time analytics and metrics visualization
-  **Ticket Management** - Create, track, and manage service requests
-  **Priority System** - Categorize requests (Low/Medium/High/Urgent)
-  **Responsive Design** - Fully responsive UI with Tailwind CSS
-  **Real-time Updates** - Live status updates for tickets
-  **Modern UI** - Sleek, gradient-rich interface with smooth animations

##  Tech Stack

### Frontend
- **React 18** - UI Library
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing

### Backend & Database
- **Supabase** - Backend-as-a-Service
  - Authentication
  - PostgreSQL Database
  - Real-time subscriptions
  - Row Level Security (RLS)

## Project Structure

SupabaseApp/
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx
│   │   ├── Login.jsx
│   │   ├── SignUp.jsx
│   │   └── ProtectedRoute.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── lib/
│   │   └── supabaseClient.js
│   ├── App.jsx
│   └── main.jsx
├── public/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md


##  Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Supabase account (free tier works)

### Installation

1. **Clone the repository**
   git clone https://github.com/PhodzoW0I7/SupabaseApp.me.git
   cd SupabaseApp.me

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up Supabase**
   
   a. Create a new project on [Supabase](https://supabase.com)
   
   b. Create the following database tables:

   ```sql
   -- Tickets table
   CREATE TABLE tickets (
     id SERIAL PRIMARY KEY,
     ticket_id VARCHAR(10) UNIQUE NOT NULL,
     title TEXT NOT NULL,
     category VARCHAR(50) NOT NULL,
     priority VARCHAR(20) NOT NULL,
     status VARCHAR(20) DEFAULT 'Pending',
     user_id UUID REFERENCES auth.users(id),
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Create index for better performance
   CREATE INDEX idx_tickets_user_id ON tickets(user_id);
   CREATE INDEX idx_tickets_status ON tickets(status);
   
   -- Enable Row Level Security
   ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;
   
   -- Create policies
   CREATE POLICY "Users can view own tickets"
     ON tickets FOR SELECT
     USING (auth.uid() = user_id);
   
   CREATE POLICY "Users can insert own tickets"
     ON tickets FOR INSERT
     WITH CHECK (auth.uid() = user_id);
   
   CREATE POLICY "Users can update own tickets"
     ON tickets FOR UPDATE
     USING (auth.uid() = user_id);
   ```

4. **Environment Variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

5. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Build for production**
   ```bash
   npm run build
   # or
   yarn build
   ```

## 🔧 Configuration Files

### `src/lib/supabaseClient.js`
```javascript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

### `vite.config.js`
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  }
})
```

## 📦 Key Dependencies

```json
{
  "dependencies": {
    "@supabase/supabase-js": "^2.39.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.43",
    "@types/react-dom": "^18.2.17",
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32",
    "tailwindcss": "^3.3.6",
    "vite": "^5.0.8"
  }
}
```

## 🎯 Core Functionality

### Authentication Flow
- Email/password sign up and login
- Session management with Supabase
- Protected routes for authenticated users
- Automatic token refresh

### Ticket Management
- Create new service requests
- View all user tickets
- Update ticket status
- Priority-based filtering
- Real-time ticket updates

### Dashboard Features
- Real-time metrics display
- Ticket status breakdown
- Priority distribution charts
- Recent activity feed

## 🔒 Security Features

- **Row Level Security (RLS)** - Users can only access their own data
- **Environment Variables** - Sensitive keys never exposed to client
- **Supabase Auth** - Secure authentication with JWT
- **Input Validation** - Sanitized user inputs
- **CORS Protection** - Configured for production domains

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import project on Vercel
3. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy

### Deploy to Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod --dir=dist
```

### Deploy to Supabase (Static hosting)

```bash
# Build your project
npm run build

# Deploy to Supabase storage
supabase storage cp dist/* your-bucket-name
```

## 📊 Database Schema

### Tickets Table
| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL | Primary key |
| ticket_id | VARCHAR(10) | Unique ticket identifier (e.g., REQ-104) |
| title | TEXT | Request description |
| category | VARCHAR(50) | DevOps, Hardware, Software, Finance |
| priority | VARCHAR(20) | Low, Medium, High, Urgent |
| status | VARCHAR(20) | Pending, Approved, In Progress |
| user_id | UUID | Reference to auth.users |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

## 🧪 Testing

```bash
# Run tests (when implemented)
npm run test

# Lint code
npm run lint

# Format code
npm run format
```

## 📈 Performance Optimizations

- **Code Splitting** - Lazy loading for routes
- **Image Optimization** - Optimized asset delivery
- **Caching Strategy** - Browser caching for static assets
- **Bundle Analysis** - Vite bundle visualization
- **Tree Shaking** - Remove unused code

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Supabase](https://supabase.com) - Open source Firebase alternative
- [React](https://reactjs.org) - UI library
- [Vite](https://vitejs.dev) - Next generation frontend tooling
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework

## 📞 Support

For support, email support@SuapbaseApp.me or open an issue in the GitHub repository.

## 🗺️ Roadmap

- [ ] Real-time notifications
- [ ] Team collaboration features
- [ ] File attachments for tickets
- [ ] Advanced analytics dashboard
- [ ] Export reports (PDF/CSV)
- [ ] API rate limiting
- [ ] Two-factor authentication
- [ ] Mobile app (React Native)

## 🔄 Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| VITE_SUPABASE_URL | Your Supabase project URL | Yes |
| VITE_SUPABASE_ANON_KEY | Your Supabase anonymous key | Yes |
| VITE_APP_NAME | Application name | No |
| VITE_APP_ENV | Environment (development/production) | No |

---

**Built with ❤️ using React, Vite, and Supabase**
```

## Also create a `.env.example` file:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# Optional
VITE_APP_NAME=SupabaseApp.ME
VITE_APP_ENV=development
```

## And a `LICENSE` file (MIT):

```text
MIT License

Copyright (c) 2024 SuapbaseApp.ME

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

This README provides comprehensive documentation for your Supabase + React + Vite project, including setup instructions, database schema, deployment guides, and best practices.
