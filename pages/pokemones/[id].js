import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
const Pokemon = ({ data }) => {
  const router = useRouter();
  console.log(router);
  if (router.isFallback) {
    return <p>Cargando...</p>;
  }
  return (
    <div>
      <h1>
        {data.name} numero #{data.id}
      </h1>
      <Image
        src={data.sprites.front_default}
        width={400}
        height={400}
        alt={data.name}
      ></Image>
      <Link href="/">Volver al Inicio</Link>
    </div>
  );
};
export default Pokemon;

export const getStaticPaths = async () => {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
  const data = await res.json();

  const paths = data.results.map((pokemon) => {
    const id = pokemon.url
      .split("/")
      .filter((x) => x)
      .pop();

    return {
      params: { id },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

// export const getStaticProps = async ({ params }) => {
//   const response = await fetch(
//     `https://pokeapi.co/api/v2/pokemon/${params.id}`,
//   );
//   const data = await response.json();
//   return { props: { data } };
// };

// export const getStaticPaths = async () => {
//   const paths = [{ params: { id: "1" } }, { params: { id: "2" } }];
//   return {
//     paths,
//     fallback: "blocking",
//     // fallback: false,
//   };
// };

// export const getServerSideProps = async ({ params }) => {
//   const response = await fetch(
//     `https://pokeapi.co/api/v2/pokemon/${params.id}`,
//   );
//   const data = await response.json();
//   return { props: { data } };
// };
