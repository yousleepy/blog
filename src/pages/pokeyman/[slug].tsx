import JeffHeader from "@/components/header";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import Head from "next/head";
import React, { use } from "react";
import Image from "next/image";
import "./../../app/globals.css";
import Link from "next/link";

interface PokeyListData {
  results: { name: string }[];
  next?: string;
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
          {list?.map((result) => {
            return (
              <div key={result.name}>
                <Link href={`/pokeyman/${result.name}`} scroll={false}>
                  {result.name}
                </Link>
              </div>
            );
          })}
        </div>
        <div className="col-span-9 row-start-1 -mt-16">
          <div className="fixed">
            <h1> {pokemon?.name}</h1>
            <Image
              src={pokemon?.sprites.front_default ?? ""}
              alt="pokey"
              width={128}
              height={128}
            ></Image>
          </div>
        </div>
      </div>
    </div>
  );
};
export async function getStaticPaths() {
  const allPokemon = await getAllPokemon();
  return {
    paths: allPokemon.map((pokeListDataItem) => ({
      params: {
        slug: pokeListDataItem.name,
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
    return {
      props: {
        pokemon: {
          name: pokeData.name,
          sprites: { front_default: pokeData.sprites.front_default },
        },
        list: await getAllPokemon(),
      },
    };
  }
  return {
    props: {
      pokemon: { name: "n/a", sprites: { front_default: "n/a" } },
      list: await getAllPokemon(),
    },
  };
}

async function getAllPokemon() {
  const pokeListFetch = await fetch("https://pokeapi.co/api/v2/pokemon");
  const pokeListData = (await pokeListFetch.json()) as PokeyListData;
  const ret: PokeyListData["results"] = [];
  const s = [pokeListData];
  while (s.length > 0) {
    const listData = s.pop();
    listData?.results.forEach((data) => {
      ret.push({ name: data.name });
    });
    if (listData?.next) {
      const nextFetch = await fetch(listData.next);
      s.push((await nextFetch.json()) as PokeyListData);
    }
  }
  return ret;
}

export default PokeyPage;
