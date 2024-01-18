import fs from "fs";
import Link from "next/link";
import React from "react";

interface PokeyListData {
  results: { name: string }[];
  next?: string;
}
interface NavTree {
  [key: string]: NavTree;
}
export const JeffNav = async () => {
  let menu: NavTree = {};
  const files = fs.readdirSync("public/_posts", {
    recursive: true,
  });
  files.forEach((file) => {
    if (typeof file === "string" && file.endsWith(".mdx")) {
      let curMenu = menu;
      ["posts", ...file.replace(".mdx", "").split(/[\\/]/g)].forEach(
        (pathSegment) => {
          curMenu[pathSegment] = curMenu[pathSegment] ?? {};
          curMenu = curMenu[pathSegment];
        }
      );
    }
  });
  (await getAllPokemon()).forEach((pokemon) => {
    menu["pokeyman"] = menu["pokeyman"] ?? {};
    menu["pokeyman"][pokemon.name.charAt(0)] =
      menu["pokeyman"][pokemon.name.charAt(0)] ?? {};
    menu["pokeyman"][pokemon.name.charAt(0)][pokemon.name] = {};
  });
  const recurseNav = (cur: NavTree, curPath: string) => {
    console.log(curPath);
    return (
      <>
        {Object.keys(cur).map((pathSegment) => {
          const path = `${curPath}/${pathSegment}`;
          return (
            <li key={path}>
              {Object.keys(cur[pathSegment]).length > 0 ? (
                <details>
                  <summary className="text-slate-400">{pathSegment}</summary>
                  <ul key="child">{recurseNav(cur[pathSegment], path)}</ul>
                </details>
              ) : (
                <Link className="text-white" href={path}>
                  {pathSegment}
                </Link>
              )}
            </li>
          );
        })}
      </>
    );
  };
  return (
    <div className="dropdown dropdown-right fixed">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h7"
          />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content z-[1] p-2 shadow rounded-r-lg w-72 bg-blue-950 -ml-10 -mt-10 overflow-y-auto max-h-72 block"
      >
        {recurseNav(menu, "")}
      </ul>
    </div>
  );
};
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
