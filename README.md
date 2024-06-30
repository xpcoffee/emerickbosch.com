# [emerickbosch.com](https://emerickbosch.com)

Emerick Bosch's personal site.

## Getting started

1\. Install dependencies

```bash
npm install
```

2\. Start the development server

```bash
npm run dev
```

3\. Start coding!

## Development

### Adding new articles

Articles are [MDX](https://mdxjs.com/) files added to [/articles](./articles). Adding a new file will automatically add a new page.

#### Frontmatter

Articles have frontmatter that provides metadata about the article to the site. See the metadata that currently gets used here:

```md
---
title: Discord bot flow
description: The sequence of actions taken by a chatbot.
date: 2020-04-19
faIcon: faRobot
---
```

<dl>
  <dt>title</dt>
  <dd>The title of the article.</dd>
  <dt>description</dt>
  <dd>A short description of what the article is about.</dd>
   <dt>date</dt>
  <dd>The date the article was <i>last edited</i>. This is not a blog, this is a collection of notes which will get updated with time.</dd>
  <dt>faIcon</dt>
  <dd><i>(I realize this is... meh...)</i></dd>
  <dd>Used to add an FontAwesome icon to the article. It is the name of the <i>module export</i> of that icon in <code>@fortawesome/free-solid-svg-icons</code>. Have a read through <a href="./src/utils/fontAwesome.tsx">the fontAwesome utility</a> to see how this gets used.</dd>
</dl>

#### Images

Add images to [/public/images/](./public/images/), then reference them in the MDX file. Also works for SVGs.

```md
![alt text](/images/my-image.png)
```

### Styling content

This site uses [Tailwind](https://tailwindcss.com/docs). Use the classes as you need them; I recommend using the global-search on their search. If you need to modify an element globally (should be rare) you can do so in [global.css](./src/styles/global.css).

## Deploying/maintaining

The website is built/deployed using AWS CodePipeline.

```bash
git push origin master
```

For more information on/around deployments, see [the wiki](https://github.com/xpcoffee/emerickbosch.com/wiki/Runbook).
