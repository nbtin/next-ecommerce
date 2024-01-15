This is a prototype for a [Next.js](https://nextjs.org/) e-commerce website designed to sell One Piece figures.

## Getting Started :eyes:

- Clone the repository.
- Switch to the `production` branch and install dependencies.

  ```bash
  git checkout production
  npm install
  ```

- Create a `.env` and `.env.local` file in the root directory like the example [here](https://github.com/nbtin/next-ecommerce/blob/production/.env.example) and [here](https://github.com/nbtin/next-ecommerce/blob/production/.env.local.example).
- Run the development server.

  ```bash
  npm run dev
  ```

- Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Built With :hammer_and_pick:

### 1. Frontend

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/) + [DaisyUI](https://daisyui.com/) + [Framer Motion](https://www.framer.com/motion/)
- [Zustand](https://github.com/pmndrs/zustand) (State Management)

### 2. Backend

- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
- [Prisma](https://www.prisma.io/) (ORM for [PostgreSQL](https://www.postgresql.org/))
- [Stripe Webhooks](https://stripe.com/docs/webhooks) (Payment)

## Deployment :rocket:

This project is deployed on [Vercel](https://vercel.com/).

Visit [https://next-ecommerce-flame-two.vercel.app/](https://next-ecommerce-flame-two.vercel.app/) to see the live version :fire:.

P/s: If you want to test the stripe payment process, just type the card number `4242 4242 4242 4242` and any other information in the payment form :smile:. &rarr; [Learn more](https://stripe.com/docs/testing#cards).

## Final Notes

**Thanks for going through this Repository! Have a nice day.** 	:rose:

Do you have any questions? Feel free to contact me via <a href = "mailto: baotin2402@gmail.com">E-mail</a>.