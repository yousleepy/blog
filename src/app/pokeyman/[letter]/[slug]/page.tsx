"use client";
import Head from "next/head";
import React, { use } from "react";
import Image from "next/image";
import "@/app/globals.css";
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
interface PokeyPageParams {
  params: { slug: string };
}
const PokeyPage = ({ params }: PokeyPageParams) => {
  const pokemon = use(getPokemon(params.slug));
  return (
    <div>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/github-dark.min.css"
        ></link>
      </Head>
      <div className="fixed ml-20">
        <h1> {pokemon?.name}</h1>
        {pokemon.sprites.front_default !== "n/a" ? (
          <Image
            src={pokemon?.sprites.front_default ?? ""}
            alt="pokey"
            width={128}
            height={128}
            className="-z-10"
          ></Image>
        ) : null}
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

export async function getPokemon(slug?: string) {
  if (slug) {
    const pokeFetch = await fetch(`https://pokeapi.co/api/v2/pokemon/${slug}`);
    const pokeData = (await pokeFetch.json()) as PokeyData;
    return {
      name: pokeData.name,
      sprites: { front_default: pokeData.sprites.front_default },
    };
  }
  return {
    name: "n/a",
    sprites: { front_default: "n/a" },
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
