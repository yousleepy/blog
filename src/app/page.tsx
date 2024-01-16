import fs from "fs";
import { JeffHeader } from "@/components/header";
import "./globals.css";
import { JeffNav } from "@/components/nav";
export default function Home() {
  const dirs: [string[]] = [[]];

  const files = fs.readdirSync("_posts", {
    recursive: true,
  });
  files.forEach((file) => {
    if (typeof file === "string" && file.endsWith(".mdx")) {
      dirs.push(["posts", ...file.replace(".mdx", "").split(`\\`)]);
    }
  });
  return (
    <div>
      <JeffHeader />
      <JeffNav nav={dirs} />
    </div>
  );
}
