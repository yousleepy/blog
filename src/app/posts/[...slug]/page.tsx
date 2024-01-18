import fs from "fs";
import { MDXRemote, compileMDX } from "next-mdx-remote/rsc";
import Head from "next/head";
import React from "react";
import "@/app/globals.css";
import { JeffNav } from "@/app/components/nav";
import rehypePrettyCode from "rehype-pretty-code";

export default async function PostPage(props: { params: { slug: string[] } }) {
  const mdSource = await getMarkdownFile(props.params.slug);
  return (
    <div>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/github-dark.min.css"
        ></link>
      </Head>
      {mdSource?.source ? (
        <MDXRemote
          source={mdSource!.source}
          options={{
            parseFrontmatter: true,
            mdxOptions: {
              rehypePlugins: [rehypePrettyCode as any],
            },
          }}
          components={{}}
        />
      ) : (
        <h1>404</h1>
      )}
    </div>
  );
}
export function getStaticPaths() {
  let dirs: string[][] = [];
  const files = fs.readdirSync("public/_posts", { recursive: true });
  files.forEach((file) => {
    if (typeof file === "string" && file.endsWith(".mdx")) {
      dirs.push(file.replace(".mdx", "").split(/[\\/]/g));
    }
  });
  const paths = dirs.map((dir) => ({
    params: {
      slug: dir,
    },
  }));
  return {
    paths,
    fallback: true,
  };
}

export async function getMarkdownFile(slug: string[]) {
  if (fs.existsSync(`public/_posts/${slug.join("/")}.mdx`)) {
    const postFile = fs.readFileSync(`public/_posts/${slug.join("/")}.mdx`);
    const dirs: string[][] = [];

    const files = fs.readdirSync("public/_posts", {
      recursive: true,
    });
    files.forEach((file) => {
      if (typeof file === "string" && file.endsWith(".mdx")) {
        dirs.push([...["posts"], ...file.replace(".mdx", "").split(/[\\/]/g)]);
      }
    });

    return {
      source: postFile,
      nav: dirs,
    };
  }
}
