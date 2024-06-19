**Login Page:**

![Twitter_Clone](https://github.com/pallavithorat/twitter-clone/assets/87472620/bbc1974a-c4a0-4b07-9cdc-7dd9e4d942fa)

**Twitter Clone - Typescript | NodeJS | GraphQL | PostgreSQL | AWS**

I recreated key Twitter functionalities using TypeScript for the frontend and NodeJS for the backend, ensuring easy scalability and upgradability. Redis is utilized for caching to accelerate response times as the scale increases.

For the frontend, I employed NextJS for server-side rendering, Tailwind CSS for styling, and GraphQL for queries and mutations, with hosting on Vercel.

On the backend, I used Apollo Server to manage the GraphQL API, PostgreSQL as the database, and Supabase for hosting, all deployed on an AWS EC2 instance with SSL certification.

For storage and hosting, Amazon S3 and AWS EC2 are used. Authentication is handled through Google OAuth and JSON Web Tokens.

An installation guide will be provided at the end.

**Short Description**


The Twitter clone is a web application designed to replicate the core functionalities of the popular social media platform, Twitter. This project is under continuous development, with new features being regularly added. This README aims to describe the architecture flow and data modeling of the application.

**Architecture**

![TC_Architecture](https://github.com/pallavithorat/twitter-clone/assets/87472620/7e349c32-0eab-4e3e-9c14-1c675ed806c8)

**Steps:**

The front end loads the page by fetching tweets from the backend hosted on AWS EC2.
User authentication process.
If tweets are available in Redis, they are fetched directly from there.
If not, the tweets are retrieved from the PostgreSQL database via Apollo Server using GraphQL requests.
Media content is stored on AWS S3.

**Data Model:**

Steps:

There are currently three models: User, Tweet, and Follows.
Each model has a set of attributes that define their properties and relationships.
These models are mapped using Prisma ORM.
PostgreSQL is used for non-media data storage and is hosted on Supabase.
Media content is stored using AWS S3.
Queries are handled through Apollo Server, utilizing the GraphQL API model.

**Installation Steps**
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
