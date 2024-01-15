This is a [Next.js](https://nextjs.org/) e-commerce website for selling One Piece figures, which allows users to browse the store, add items to their cart, and checkout using [Stripe](https://stripe.com/).

## Getting Started
- Clone the repository
- Switch to the `production` branch and install dependencies
```bash
git checkout production
npm install
```
- Create a `.env` and `.env.local` file in the root directory like the example [here](https://github.com/nbtin/next-ecommerce/blob/production/.env.example) and [here](https://github.com/nbtin/next-ecommerce/blob/production/.env.local.example).
- Run the development server
```bash
npm run dev
```
- Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Built With
### 1. Frontend
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/) + [DaisyUI](https://daisyui.com/)
- [Zustand](https://github.com/pmndrs/zustand) (State Management)
### 2. Backend
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
- [Prisma](https://www.prisma.io/) (ORM for [PostgreSQL](https://www.postgresql.org/))
- [Stripe Webhooks](https://stripe.com/docs/webhooks) (Payment)


## Deployment

This project is deployed on [Vercel](https://vercel.com/).

Visit [https://next-ecommerce-flame-two.vercel.app/](https://next-ecommerce-flame-two.vercel.app/) to see the live version.
