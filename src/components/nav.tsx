import fs from "fs";
import Link from "next/link";
import React from "react";

export const JeffNav = ({ nav }: { nav?: string[][] }) => {
  return (
    <ul className="text-sm">
      {nav?.map((navItem) => {
        return (
          <li key={navItem.join(".")}>
            <Link href={`/${navItem.join("/")}`}>
              {navItem[navItem.length - 1]}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
