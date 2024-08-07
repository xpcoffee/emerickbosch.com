import { getMarkdownMetadata } from "~/utils/markdownUtils";
import { ArticleListItem } from "./components/ArticleListItem";
import { Layout } from "./components/Layout";

export default async function Home() {
  const articleListItems = getMarkdownMetadata().map((metadata) => {
    return (
      <ArticleListItem
        key={metadata.id}
        articlePath={metadata.slug ?? "404"}
        title={metadata.title}
        description={metadata.description}
        faIconName={metadata?.faIcon}
        lastEdit={metadata?.lastEdit}
      />
    );
  });

  return (
    <Layout>
      <p id="article-list-label">
        {"A collection of "}
        <a href="https://en.wikipedia.org/wiki/Living_document" target="blank">
          living
        </a>
        {" notes and thoughts."}
      </p>
      <ul
        aria-labelledby="article-list-label"
        tabIndex={0}
        className="ml-0 mt-3 list-none"
      >
        {articleListItems}
      </ul>
    </Layout>
  );
}
