import JeffHeader from "@/components/header";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import Head from "next/head";
import React from "react";
import Image from "next/image";
import "./../../app/globals.css";
import Link from "next/link";

interface PokeyListData {
  results: { name: string; url: string }[];
}
interface PokeyData {
  name: string;
  sprites: {
    front_default: string;
  };
}
const PokeyPage = ({
  pokemon,
  list,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/github-dark.min.css"
        ></link>
      </Head>
      <JeffHeader />
      <div className="grid grid-cols-12">
        <div className="col-span-2 row-start-1">
          {list?.results.map((result) => {
            return (
              <div key={result.name}>
                <Link href={`/pokeyman/${result.name}`}>{result.name}</Link>
              </div>
            );
          })}
        </div>
        <div className="col-span-9 row-start-1 -mt-16">
          <h1> {pokemon?.name}</h1>{" "}
          <Image
            src={pokemon?.sprites.front_default ?? ""}
            alt="pokey"
            width={128}
            height={128}
          ></Image>
        </div>
      </div>
    </div>
  );
};
export async function getStaticPaths() {
  const pokeListFetch = await fetch("https://pokeapi.co/api/v2/pokemon");
  const pokeListData = (await pokeListFetch.json()) as PokeyListData;
  return {
    paths: pokeListData.results.map((pokeListDataItem) => ({
      params: {
        slug: pokeListDataItem.name,
        data: pokeListDataItem.url,
      },
    })),
    fallback: true,
  };
}

export async function getStaticProps(
  ctx: GetStaticPropsContext<{
    slug: string;
    data: string;
  }>
) {
  if (ctx.params?.slug) {
    const pokeFetch = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${ctx.params.slug}`
    );
    const pokeData = (await pokeFetch.json()) as PokeyData;
    const pokeListFetch = await fetch("https://pokeapi.co/api/v2/pokemon");
    const pokeListData = (await pokeListFetch.json()) as PokeyListData;
    return { props: { pokemon: pokeData, list: pokeListData } };
  }
  return { props: { pokemon: null } };
}
export default PokeyPage;
