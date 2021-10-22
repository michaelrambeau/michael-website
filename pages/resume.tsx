import Head from "next/head";
import { BsFilePerson, BsEnvelope, BsFillHouseDoorFill } from "react-icons/bs";
import pProps from "p-props";
import marked from "marked";

import Container from "../components/container";
import Layout from "../components/layout";
import { getPostBySlug } from "../lib/api";
import { Heading1, Heading2 } from "../components/typography";
import markdownToHtml from "../lib/markdownToHtml";
import markdownStyles from "../components/markdown-styles.module.css";
import { email } from "../config";
import GitHubIcon from "../components/logos/social/github.svg";
import { WorkHistoryItem } from "../components/resume/work-history-item";
import { workHistoryData } from "../components/resume/work-history-data";

export default function ResumePage({ workHistory }) {
  return (
    <Layout>
      <Head>
        <title>Michael Rambeau • Resume</title>
      </Head>
      <Container>
        <div className="p-4 bg-white my-6 space-y-6">
          <Profile />
          <Languages />
          <Skills />
          <Experience workHistory={workHistory} />
          <Education />
        </div>
      </Container>
    </Layout>
  );
}

const today = new Date();
const age = today.getFullYear() - 1977;

const Profile = () => (
  <div className="flex">
    <div className="space-y-4 flex-grow">
      <h1 className="text-3xl sm:text-6xl mb-6">Full-stack web engineer</h1>
      <ProfileItem icon={<BsFilePerson size="24" />}>
        Michael Rambeau (ミカエル ランボー), {age} years old, French
      </ProfileItem>
      <ProfileItem icon={<BsFillHouseDoorFill size="24" />}>
        Residing in Ibaraki city, Osaka, Japan since April 2010
      </ProfileItem>
      <ProfileItem icon={<BsEnvelope size="24" />}>
        <a className="email" href={`mailto:${email}`}>
          {email}
        </a>
      </ProfileItem>
      <ProfileItem icon={<GitHubIcon width={24} />}>
        Creator of <em>Best of JS</em> project:{" "}
        <a href={`https://bestofjs.org/`}>https://bestofjs.org/</a>{" "}
      </ProfileItem>
    </div>
    <div className="hidden sm:block">
      <img src="/assets/michael-400x400.png" width={150} />
    </div>
  </div>
);

const ProfileItem = ({ icon, children }) => {
  return (
    <div className="flex items-center">
      <div className="text-yellow-600">{icon}</div>
      <div className="ml-2">{children}</div>
    </div>
  );
};

const Languages = () => {
  return (
    <div>
      <Heading2>Languages</Heading2>
      <ul>
        <LanguageItem name="French" level="native speaker" />
        <LanguageItem
          name="English"
          level="Business level, TOEIC 960 points (2011)"
        />
        <LanguageItem
          name="Japanese"
          level=" Intermediate level, JLPT N3 (2012)"
        />
      </ul>
    </div>
  );
};

const LanguageItem = ({ name, level }) => {
  return (
    <li>
      {name}: {level}
    </li>
  );
};

const Skills = () => {
  return (
    <div>
      <Heading2>Skills</Heading2>
      <ul>
        <SkillItem category="Frontend">
          JavaScript ES6, TypeScript, React, CSS, CSS-in-JS
        </SkillItem>
        <SkillItem category="UI/UX">
          Attention to details, always willing to deliver the best user
          experience
        </SkillItem>
        <SkillItem category="Mobile">Responsive Web Design</SkillItem>
        <SkillItem category="Backend">
          Node.js APIs, Express, Meteor, MongoDB
        </SkillItem>
        <SkillItem category="Testing">Jest, Mocha, Tape</SkillItem>
      </ul>
    </div>
  );
};

const SkillItem = ({ category, children }) => {
  return (
    <li>
      {category}: {children}
    </li>
  );
};

const Experience = ({ workHistory }) => {
  return (
    <div>
      <Heading2>Work experience</Heading2>
      <div className="space-y-6">
        <WorkHistoryItem item={workHistory.medmain} />
        <WorkHistoryItem item={workHistory.pactera} />
        <WorkHistoryItem item={workHistory.bentoandco} />
        <WorkHistoryItem item={workHistory.firstserver} />
        <WorkHistoryItem item={workHistory.brastel} />
        <WorkHistoryItem item={workHistory.airfrance} />
        <WorkHistoryItem item={workHistory.ccr} />
        <WorkHistoryItem item={workHistory.gpa} />
      </div>
    </div>
  );
};

const Education = () => (
  <div>
    <Heading2>Education</Heading2>
    <div>Bachelor's degree in Physics, University of Pau, France 1999</div>
  </div>
);

export async function getStaticProps() {
  const historyWithHTML = await formatHistory(workHistoryData);
  return {
    props: { workHistory: historyWithHTML },
  };
}

function formatHistory(work) {
  return pProps(work, (value) => {
    return formatHistoryItem(value);
  });
}

function formatHistoryItem(item) {
  return pProps(item, (value, fieldName) => {
    switch (fieldName) {
      case "title":
      case "resp":
        return marked.parseInline(value);
      case "points":
        return Promise.all(value.map(marked.parseInline));
      default:
        return value;
    }
  });
}
