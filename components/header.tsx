import Link from "next/link";
import { useRouter } from "next/router";
import cn from "classnames";

import Container from "./container";

export const Header = () => {
  return (
    <header className="h-16 bg-white hidden-print">
      <Container>
        <div className="flex items-center text-xl">
          <div className="flex-grow">
            <Link href="/">
              <a className="text-gray-500 hover:text-gray-900 hover:no-underline">
                Michael Rambeau
              </a>
            </Link>
          </div>
          <nav className="h-16">
            <NavLink exact href="/">
              Home
            </NavLink>
            <NavLink href="/projects">Projects</NavLink>
            <NavLink href="/resume">Resume</NavLink>
          </nav>
        </div>
      </Container>
    </header>
  );
};

const NavLink = ({ href, children }) => {
  const router = useRouter();
  return (
    <Link href={href}>
      <a
        className={cn(
          "h-16 px-4 inline-flex items-center hover:no-underline text-gray-500 hover:text-gray-900",
          {
            "border-b-4 border-yellow-400": router.asPath === href,
          }
        )}
      >
        {children}
      </a>
    </Link>
  );
};
