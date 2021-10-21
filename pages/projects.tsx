import Head from "next/head";

import Container from "../components/container";
import MoreStories from "../components/more-stories";
import HeroPost from "../components/hero-post";
import Intro from "../components/intro";
import Layout from "../components/layout";
import { getPostBySlug } from "../lib/api";
import { Heading1 } from "../components/typography";
import markdownToHtml from "../lib/markdownToHtml";
import markdownStyles from "../components/markdown-styles.module.css";

export default function ProjectsPage({ projects }) {
  return (
    <Layout>
      <Head>
        <title>Michael Rambeau • Projects</title>
      </Head>
      <Container>
        <Heading1>Projects</Heading1>
        <div className="space-y-8">
          <ProjectCard project={projects.bestofjs} />
          <ProjectCard project={projects.risingstars} />
        </div>
      </Container>
    </Layout>
  );
}

const ProjectCard = ({ project }) => {
  return (
    <div className="bg-white p-4 rounded-xl">
      <h2 className="text-3xl mb-4">
        <a href={project.url}>{project.title}</a>
      </h2>
      <div
        className={markdownStyles["markdown"]}
        dangerouslySetInnerHTML={{ __html: project.content }}
      />
      <a
        href={project.url}
        className="block text-xl rounded-xl bg-white hover:bg-gray-50 text-orange-200 hover:text-orange-700 hover:no-underline border-orange-900 border rounded-6 p-4 text-center"
      >
        Visit the project
      </a>
    </div>
  );
};

async function fetchProjectData(id) {
  const rawData = getPostBySlug(id);
  const contentHTML = await markdownToHtml(rawData.content);
  const data = { ...rawData, content: contentHTML };
  return data;
}

export async function getStaticProps() {
  const projects = {
    bestofjs: await fetchProjectData("bestofjs"),
    risingstars: await fetchProjectData("risingstars"),
  };
  return {
    props: { projects },
  };
}
