import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrismPlus from "rehype-prism-plus";
import rehypeCodeTitles from "rehype-code-titles";
import {
  getMarkdownContentForSlug,
  getMarkdownMetadata,
} from "~/utils/markdownUtils";
import Card from "~/app/components/Card";
import { Layout } from "~/app/components/Layout";
import { getIcon } from "~/utils/fontAwesome";
import IconParagraph from "~/app/components/IconParagraph";
import { PullQuote } from "~/app/components/Pullquote";
import { Disclaimer } from "~/app/components/Disclaimer";
import { PatternArticleList } from "~/app/components/PatternArticleList";
import { ModalScale } from "~/app/components/Scale";
import Image from "next/image";
import IconCheckCircle from "~/app/components/IconCheckCircle";
import ArticleRedirect from "~/app/components/ArticleRedirect";
import "~/styles/prism.css";

type Props = {
  // there has to be a more sane way of typechecking static params.....
  params: { slug: string };
};

const Article = ({ params }: Props) => {
  const slug = params.slug;

  // redirect permalinks to their articles
  const permalinkedArticle = getMarkdownMetadata().find(
    ({ id }) => slug === id,
  );
  if (permalinkedArticle) {
    return (
      <ArticleRedirect articlePath={`/articles/${permalinkedArticle.slug}`} />
    );
  }

  const article = getMarkdownContentForSlug(slug);
  const icon = getIcon(article.frontMatter?.faIcon);
  const mdxOptions = {
    mdxOptions: {
      rehypePlugins: [
        //order matters!
        rehypeCodeTitles,
        rehypePrismPlus,
      ],
      remarkPlugins: [remarkGfm],
      tsx: true,
    },
  };

  return (
    <Layout>
      <article>
        <h1>
          {icon}
          {article.frontMatter.title}
        </h1>
        <MDXRemote
          source={article.content}
          options={mdxOptions}
          components={components}
        />
      </article>
    </Layout>
  );
};

export default Article;

/**
 * Tells nextjs which slugs should be rendered statically.
 */
export const generateStaticParams = async () => {
  const slugs = [];
  for (const metadata of getMarkdownMetadata()) {
    slugs.push({ slug: metadata.slug });
    slugs.push({ slug: metadata.id }); // permalinks for each article; allows titles to change
  }
  return slugs;
};

export const generateMetadata = ({ params }: Props) => {
  const permalinkedArticle = getMarkdownMetadata().find(
    ({ id }) => params.slug === id,
  );

  const article = getMarkdownContentForSlug(
    permalinkedArticle?.slug ?? params.slug,
  );
  return {
    title: article.frontMatter.title,
    description: article.frontMatter.description,
    openGraph: {
      siteName: "emerickbosch.com",
      type: "website",
      locale: "en_GB",
      title: article.frontMatter.title,
      description: article.frontMatter.description,
      url: `https://emerickbosch.com/articles/${params.slug}`,
      images: [
        {
          url: "https://emerickbosch.com/xpcoffee-logo.svg", // Must be an absolute URL
          width: 800,
          height: 600,
        },
      ],
    },
  };
};

const components = {
  Card: Card,
  IconParagraph: IconParagraph,
  Link: Link,
  Image: Image,
  PullQuote: PullQuote,
  Disclaimer: Disclaimer,
  PatternArticleList: PatternArticleList,
  IconCheckCircle: IconCheckCircle,
  ModalScale: ModalScale,
};
