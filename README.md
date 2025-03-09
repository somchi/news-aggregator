This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
    npm instll
    # or
    yarn install
```

```bash
npm run dev
# or
yarn dev
# or

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Dockerize

```bash
docker build -t news-aggregator .

docker run -p 3000:3000 news-aggregator
```

## Environment setup

create an .env file and copy this following environment into it

```bash
NEXT_PUBLIC_NYT_KEY=Svq3I3x585AXqJnY1DtgWWfGdkBOMEA7
NEXT_PUBLIC_GUARDIAN_KEY=71c3f72c-d516-450a-8cfc-126ffdb17f63
NEXT_PUBLIC_NEWSAPI_KEY=bb076df66ab84b7481a5268019108dfe
NEXT_PUBLIC_GUARDIAN_API_URL=https://content.guardianapis.com/search
NEXT_PUBLIC_NYT_API_URL=https://api.nytimes.com/svc/search/v2/articlesearch.json
NEXT_PUBLIC_NEWSAPI_API_URL= https://newsapi.org/v2/everything
```
