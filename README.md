This is an ai toolbox built by Nextjs. This project's backend interface is deployed on cloudflare worker. You can find the simple worker source code [here](https://github.com/chenyuan-new/ai-toolbox-worker)


## Getting Started

First, run the development server in both Nextjs and worker repo:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
You should **copy** the `.env.example` file and rename it to `.env.local` and fill in the missing settings.

## Tech Stack

- [Next.js Documentation](https://nextjs.org/)
- [cloudflare worker ai](https://developers.cloudflare.com/workers-ai/) - ai interface provider
- [shadcn/ui](https://ui.shadcn.com/) - ui lib
- [clerk](https://clerk.com/) - login
- [neon](https://neon.tech/) - postgresql for api limit

## Deploy

You just need to deploy this Nextjs repo on vercel and the worker repo on cloudflare worker. Then set the env in vercel and it's all done 

## TODO
- [ ] complement image inpainting、music generation and video generation
- [ ] complement upgrade process 