import { useState, FormEvent } from "react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import Prismic from "prismic-javascript";
import PrismicDOM from "prismic-dom";
import { Document } from "prismic-javascript/types/documents";
import { client } from "@/lib/prismic";
import Link from "next/link";

interface SearchProps {
  searchResults: Document[];
}

export default function Search({ searchResults }: SearchProps) {
  const router = useRouter();
  const [search, setSearch] = useState("");

  function handleSearch(event: FormEvent) {
    event.preventDefault();

    router.push(`/search?q=${encodeURIComponent(search)}`);

    setSearch("");
  }

  return (
    <>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          onChange={({ target: { value } }) => setSearch(value)}
        />

        <button type="submit">Search</button>
      </form>

      <section>
        <h1>Products Filtered</h1>

        <ul>
          {searchResults.map((product) => (
            <li key={product.id}>
              <Link href={`/catalog/product/${product.uid}`}>
                <a>{PrismicDOM.RichText.asText(product.data.title)}</a>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<SearchProps> = async (
  context
) => {
  const { q } = context.query;

  if (!q) {
    return {
      props: { searchResults: [] },
    };
  }

  const searchResults = await client().query([
    Prismic.Predicates.at("document.type", "product"),
    Prismic.Predicates.fulltext("my.product.title", String(q)),
  ]);

  return { props: { searchResults: searchResults.results } };
};
