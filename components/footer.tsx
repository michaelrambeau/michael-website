import Container from "./container";
import { social } from "../config";

export default function Footer() {
  return (
    <footer className="hidden-print bg-gray-800 border-t border-accent-2 mt-8 text-gray-400">
      <Container>
        <div className="py-12 text-center">
          <SocialNav />
          <div className="text-center">Last update: January 2024</div>
        </div>
      </Container>
    </footer>
  );
}

const SocialNav = () => (
  <nav className="flex justify-center space-x-4 mb-4">
    <SocialLink id="github" />
    <SocialLink id="linkedin" />
    <SocialLink id="facebook" />
    <SocialLink id="twitter" />
  </nav>
);

const SocialLink = ({ id }) => {
  const { url, icon } = social[id];
  return (
    <a
      href={url}
      target="_blank"
      className="text-yellow-500 hover:text-yellow-400"
    >
      {icon}
    </a>
  );
};
