import { GetStaticPaths, GetStaticProps } from "next";
import { Document } from "prismic-javascript/types/documents";
import { useRouter } from "next/router";
import PrismicDOM from "prismic-dom";

import { client } from "@/lib/prismic";

interface ProductProps {
  product: Document;
}

export default function Product({ product }: ProductProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <p>Carregando...</p>;
  }

  return (
    <>
      <p>{PrismicDOM.RichText.asText(product.data.title)}</p>
      <div
        dangerouslySetInnerHTML={{
          __html: PrismicDOM.RichText.asHtml(product.data.description),
        }}
      />

      <img src={product.data.thumbnail.url} alt="" width="400" />

      <p>Price: R${product.data.price}</p>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<ProductProps> = async (context) => {
  const { slug } = context.params;
  const product = await client().getByUID("product", String(slug), {});

  return {
    props: { product },
    revalidate: 5,
  };
};
