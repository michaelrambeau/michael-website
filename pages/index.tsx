import Head from "next/head";
import Link from "next/link";

import Container from "../components/container";
import MoreStories from "../components/more-stories";
import HeroPost from "../components/hero-post";
import Layout from "../components/layout";
import { getAllPosts, getPostBySlug } from "../lib/api";
import markdownToHtml from "../lib/markdownToHtml";
import { Heading1, Heading2 } from "../components/typography";

import ReactLogo from "../components/logos/react.svg";
import NodeJSLogo from "../components/logos/nodejs.svg";

export default function HomePage({ experience, skills }) {
  return (
    <Layout>
      <Head>
        <title>Michael Rambeau • Fullstack engineer in Osaka</title>
      </Head>
      <Container>
        <Intro />
        <Skills content={skills} />
        <Experience content={experience} />
      </Container>
    </Layout>
  );
}

const Intro = () => {
  return (
    <>
      <Heading1>Passionate Frontend Engineer in Osaka</Heading1>
      <div className="border-l-4 border-yellow-400 pl-4 py-2 mb-4">
        <p className="mb-2">
          Hello, I'm Michael Rambeau, I have a passion for modern web
          development with tools like React, Next,js or Astro.
        </p>

        <p className="mb-0">
          I'm the creator of{" "}
          <a className="link" href="https://bestofjs.org">
            Best of JS
          </a>
          , a popular project to help developers understand the JavaScript
          landscape.
        </p>
      </div>
    </>
  );
};

const Skills = ({ content }) => {
  return (
    <>
      <Heading2>Skills</Heading2>
      <div className="space-y-6 mb-6">
        <Card title="Front-end" logo={<ReactLogo width={200} />}>
          <div dangerouslySetInnerHTML={{ __html: content.frontend }} />
        </Card>

        <Card title="Back-end" logo={<NodeJSLogo width={160} />}>
          <div dangerouslySetInnerHTML={{ __html: content.backend }} />
        </Card>
      </div>
    </>
  );
};

const Card = ({ title, logo, children }) => {
  return (
    <div className="card flex flex-col sm:flex-row">
      <div className="flex-grow">
        <div className="inline-block mb-4 py-1 px-2 uppercase card-title">
          {title}
        </div>
        <div>{children}</div>
      </div>
      <div className="flex justify-center">{logo}</div>
    </div>
  );
};

const Experience = ({ content }) => {
  return (
    <>
      <Heading2>Experience</Heading2>
      <div className="card">
        <div dangerouslySetInnerHTML={{ __html: content }} />
        <div className="text-center">
          For more details, check <Link href="/resume/">my resume</Link>.
        </div>
      </div>
    </>
  );
};

function readMarkdownContentBlock(slug) {
  const { content } = getPostBySlug(slug);
  const html = markdownToHtml(content);
  return html;
}

export async function getStaticProps() {
  const skills = {
    frontend: await readMarkdownContentBlock("frontend"),
    backend: await readMarkdownContentBlock("backend"),
  };

  const experience = await readMarkdownContentBlock("experience");

  return {
    props: { experience, skills },
  };
}
