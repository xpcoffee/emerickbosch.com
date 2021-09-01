# [xpcoffee.github.io](https://xpcoffee.github.io)

Emerick Bosch's personal site.

## Prerequisites

Install the [Gatsby CLI](https://www.gatsbyjs.com/docs/tutorial/part-0/#gatsby-cli).

## Start up the dev-server

```bash
gatsby develop
```

## Adding new articles

Articles are [MDX](https://mdxjs.com/) files added to [src/articles](./src/articles). Adding a new file will automatically add a new page.

### Frontmatter

Articles have frontmatter that provides metadata about the article to the site. See the metadata that currently gets used here:

```md
---
title: Discord bot flow
description: The sequence of actions taken by a chatbot.
date: 2020-04-19
faIcon: faRobot
---
```

**title** - The title of the article.

**description** - A short description of what the article is about.

**date** - The date the article was _last edited_. This is not a blog, this is a collection of notes which will get updated with time.

**faIcon** - _(I realize this is... meh...)_ Used to add an FontAwesome icon to the article. It is the name of the _module export_ of that icon in `@fortawesome/free-solid-svg-icons`. Have a read through [the fontAwesome utility](./src/utils/fontAwesome.tsx) to see how this gets used.

### Images

Add images to [src/articles/images/](./src/articles/images/), then reference them relatively in the MDX file:

```md
![alt text](./images/my-image.png)
```

**For SVGs:** add them [src/articles/images/](./src/articles/images/) as with normal images, but then _import them as React components_ in the MDX file.

```md
import MySvg from "./images/my-svg.svg";

<MySvg />
```

## Dev notes

See (and update) [src/articles/gatsby-notes.mdx](./src/articles/gatsby-notes.mdx).

## Styling content

This site uses [Tailwind](https://tailwindcss.com/docs). Use the classes as you need them; I recommend using the global-search on their search. If you need to modify an element globally (should be rare) you can do so in [global.css](./src/styles/global.css).

## Deploying

```bash
npm run deploy
```

This builds the site and deploys it to the `main` branch. The `main` branch is used by Github Pages to build/serve the site.

> **Note:** note the difference between this and the `master` branch on which development happens. Develop and save code on `master`; deploy to `main`.

See also: https://www.gatsbyjs.com/docs/how-to/previews-deploys-hosting/how-gatsby-works-with-github-pages/

### Troubleshooting

**A branch named 'main' already exists.**

This can happen if the deployment process died halfway. It's caused by stale state. Remove the github page state in `node_modules`.

```bash
rm -rf node_modules/.cache/gh-pages
```
