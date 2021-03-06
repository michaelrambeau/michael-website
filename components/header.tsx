import Link from "next/link";
import { useRouter } from "next/router";
import cn from "classnames";

import styles from "./header.module.css";
import Container from "./container";

export const Header = () => {
  return (
    <header className="bg-white hidden-print">
      <Container>
        <div className="flex items-center text-xl flex-col xs:flex-row">
          <div className="flex-grow hidden xs:block">
            <Link href="/">
              <a
                className={cn(
                  styles.menuEntry,
                  "text-gray-500 hover:text-gray-900 hover:no-underline"
                )}
              >
                Michael Rambeau
              </a>
            </Link>
          </div>
          <nav>
            <NavLink href="/">Home</NavLink>
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
          styles.menuEntry,
          "px-4 inline-flex items-center hover:no-underline text-gray-500 hover:text-gray-900 border-b-4 border-transparent",
          {
            "border-yellow-400": router.asPath === href,
          }
        )}
      >
        {children}
      </a>
    </Link>
  );
};
