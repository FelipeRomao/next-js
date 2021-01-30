import { GetServerSideProps } from "next";

import { Title } from "@/styles/pages/Home";
import SEO from "@/components/SEO";
interface IProduct {
  id: string;
  title: string;
}

interface HomeProps {
  recommendedProducts: IProduct[];
}

export default function Home({ recommendedProducts }: HomeProps) {
  async function handleSum() {
    const { sum } = (await import("../lib/math")).default;
    alert(sum(5, 5));
  }

  return (
    <>
      <SEO
        title="DevCommerce, your best e-commerce!"
        image="boost.png"
        shouldExcludeTitleSuffix
      />

      <section>
        <Title>Products</Title>

        <ul>
          {recommendedProducts.map((recommendedProduct) => (
            <li key={recommendedProduct.id}>{recommendedProduct.title}</li>
          ))}
        </ul>

        <button onClick={handleSum}>Sum!</button>
      </section>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const response = await fetch(`${process.env.API_URL}recommended`);
  const recommendedProducts = await response.json();

  return {
    props: { recommendedProducts },
  };
};
