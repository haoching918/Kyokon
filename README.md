# Kyokon

A comprehensive recipe database and daily health assistant for everyone who loves to cook.

Kyokon allows users to create their own recipes, plan meals for the week, and monitor their daily protein and fat intake to stay on top of their health goals.

## Features

- **Recipe Database:** Browse, discover, and create your own recipes.
- **Weekly Meal Planning:** Organize your cooking schedule for the entire week.
- **Health Monitoring:** Built-in tracking for daily protein and fat intake based on your meals.

## Architecture & Tech Stack

- **Frontend:** Next.js 14+ (App Router), React 19, Tailwind CSS v4, and shadcn/ui for accessible components.
- **Backend-as-a-Service:** Supabase (Database, Authentication, Storage).
- **Icons & Typography:** Hugeicons & Lucide React; `next/font` for optimized loading.
- **Deployment:** Vercel.

## Getting Started

### Prerequisites

- Node.js installed on your local machine.
- A package manager (npm, yarn, pnpm, or bun).

> [!NOTE]
> Future updates will require a configured Supabase project with relevant environment variables to run locally.

### Installation

1. Clone the repository to your local machine:
   ```bash
   git clone <repository-url>
   cd kyokon
   ```

2. Install dependencies:
   ```bash
   npm install
   ```
   *(or `yarn`, `pnpm install`, `bun install`)*

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Deployment

The easiest way to deploy this application is using [Vercel](https://vercel.com/):

1. Push your code to a GitHub/GitLab/Bitbucket repository.
2. Import the project in Vercel.
3. Configure the Supabase environment variables in the Vercel dashboard.
4. Deploy the application. Vercel automatically detects Next.js and handles the build setup.

> [!TIP]
> For more information on Vercel deployment features like Serverless Functions or Edge Middleware, refer to the [Next.js Deployment Documentation](https://nextjs.org/docs/app/building-your-application/deploying).
