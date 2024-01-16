import fs from "fs";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import Head from "next/head";
import React from "react";
import "./../../app/globals.css";
import { JeffHeader } from "@/components/header";
import rehypeHighlight from "rehype-highlight";
import { common } from "lowlight";
import powershell from "highlight.js/lib/languages/powershell";
import { JeffNav } from "@/components/nav";

export default function PostPage({
  source,
  nav,
}: InferGetStaticPropsType<typeof getStaticProps>) {
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
          <JeffNav nav={nav} />
        </div>
        <div className="col-span-9 row-start-1 -mt-16">
          {source?.compiledSource ? (
            <MDXRemote
              compiledSource={source.compiledSource}
              frontmatter={source.frontmatter}
              scope={source.scope}
              // specifying the custom MDX components
              components={{}}
            />
          ) : (
            <h1>404</h1>
          )}
        </div>
      </div>
    </div>
  );
}
export async function getStaticPaths() {
  const dirs: [string[]] = [[]];
  const files = fs.readdirSync("_posts", { recursive: true });
  files.forEach((file) => {
    if (typeof file === "string" && file.endsWith(".mdx")) {
      dirs.push(["posts", ...file.replace(".mdx", "").split(`\\`)]);
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

export async function getStaticProps(
  ctx: GetStaticPropsContext<{
    slug: string[];
  }>
) {
  const { slug } = ctx.params!;
  if (await fs.existsSync(`_posts/${slug.join("/")}.mdx`)) {
    // retrieve the MDX blog post file associated
    // with the specified slug parameter
    const postFile = fs.readFileSync(`_posts/${slug.join("/")}.mdx`);
    const dirs: [string[]] = [[]];

    const files = fs.readdirSync("_posts", {
      recursive: true,
    });
    files.forEach((file) => {
      if (typeof file === "string" && file.endsWith(".mdx")) {
        dirs.push(file.replace(".mdx", "").split(`\\`));
      }
    });

    // read the MDX serialized content along with the frontmatter
    // from the .mdx blog post file

    const mdxSource = await serialize(postFile, {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [
          () =>
            function (tree, file) {
              rehypeHighlight({ languages: { ...common, ps: powershell } })(
                tree,
                file as any
              );
            },
        ],
      },
    });
    return {
      props: {
        source: mdxSource,
        nav: dirs,
      },
      // enable ISR
      revalidate: 60,
    };
  }
  return { props: {} };
}
