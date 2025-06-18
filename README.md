# YenDaakye Job Center

A modern, full-stack job board application built with Next.js 15, connecting talented individuals with exceptional opportunities across Ghana and West Africa.

## 🌟 Features

### For Job Seekers
- **Smart Job Search**: Advanced filtering by location, job type, category, and keywords
- **Featured Jobs**: Highlighted opportunities from top companies
- **Detailed Job Listings**: Comprehensive job descriptions, requirements, and benefits
- **Easy Application**: Simple application process with resume upload and cover letter
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### For Employers (Admin Dashboard)
- **Company Management**: Create and manage company profiles with logo uploads
- **Job Posting**: Create, edit, and delete job listings
- **Application Tracking**: View and manage job applications
- **Analytics Dashboard**: Track job postings and company metrics
- **Featured Listings**: Promote important job postings

### Technical Features
- **Modern UI/UX**: Beautiful, responsive design with smooth animations
- **Type Safety**: Full TypeScript implementation
- **Database Integration**: PostgreSQL with Drizzle ORM
- **Email Notifications**: Automated email system for applications and contact forms
- **SEO Optimized**: Dynamic sitemaps, robots.txt, and meta tags
- **Performance**: Optimized with Next.js 15 and Turbopack

## 🚀 Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Motion** - Smooth animations and transitions
- **Radix UI** - Accessible component primitives
- **React Hook Form** - Form handling with validation
- **Zod** - Schema validation

### Backend
- **Next.js API Routes** - Server-side functionality
- **PostgreSQL** - Primary database
- **Drizzle ORM** - Type-safe database operations
- **Resend** - Email delivery service
- **React Email** - Email template system

### Development Tools
- **Biome** - Fast linter and formatter
- **Drizzle Kit** - Database migrations and studio
- **TypeScript** - Static type checking

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- npm or yarn package manager

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/yendaakye-job-center.git
cd yendaakye-job-center
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/yendaakye_db"

# Email Service (Resend)
RESEND_API_KEY="your_resend_api_key"

# Next.js
NEXTAUTH_SECRET="your_nextauth_secret"
NEXTAUTH_URL="http://localhost:3000"
```

### 4. Database Setup
```bash
# Generate database schema
npm run db:generate

# Push schema to database
npm run db:push

# Optional: Open Drizzle Studio to view/edit data
npm run db:studio
```

### 5. Start Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🗂️ Project Structure

```
├── app/                    # Next.js App Router
│   ├── about/             # About page
│   ├── contact/           # Contact page with form
│   ├── dashboard/         # Admin dashboard
│   ├── jobs/              # Job listings and details
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── email/            # Email templates
│   ├── layout/           # Layout components
│   └── ui/               # UI components (shadcn/ui)
├── lib/                  # Utilities and configurations
│   ├── db/               # Database schema and connection
│   └── utils.ts          # Helper functions
├── public/               # Static assets
└── types/                # TypeScript type definitions
```

## 🎯 Key Pages

### Public Pages
- **Home** (`/`) - Landing page with featured jobs and company stats
- **Jobs** (`/jobs`) - Job listings with search and filtering
- **Job Details** (`/jobs/[id]`) - Individual job page with application form
- **About** (`/about`) - Company information and team
- **Contact** (`/contact`) - Contact form with email integration

### Admin Dashboard (`/dashboard`)
- **Analytics** - Platform metrics and statistics
- **Job Management** - Create, edit, delete job postings
- **Company Management** - Manage company profiles
- **Application Tracking** - View job applications

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run linter

# Database
npm run db:generate  # Generate database migrations
npm run db:push      # Push schema changes to database
npm run db:migrate   # Run database migrations
npm run db:studio    # Open Drizzle Studio
```

## 📧 Email Configuration

The application uses Resend for email delivery. Configure your email templates in:
- `components/email/contact-template.tsx` - Contact form emails
- `components/email/application-*.tsx` - Job application emails

## 🎨 Customization

### Styling
- Modify `app/globals.css` for global styles
- Update `tailwind.config.js` for theme customization
- Components use Tailwind CSS classes for styling

### Database Schema
- Edit `lib/db/schema.ts` to modify database structure
- Run `npm run db:generate` and `npm run db:push` after changes

### Email Templates
- Customize email templates in `components/email/`
- Use React Email components for responsive email design

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

### Other Platforms
The application can be deployed on any platform supporting Node.js:
- Railway
- Render
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework for production
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Drizzle ORM](https://orm.drizzle.team/) - TypeScript ORM
- [Radix UI](https://www.radix-ui.com/) - Low-level UI primitives
- [Lucide Icons](https://lucide.dev/) - Beautiful & consistent icons

## 📞 Support

For support, email yendaakyejobscenter@proton.me or create an issue on GitHub.

---

**YenDaakye Job Center** - Connecting talent with opportunity across Ghana and West Africa.