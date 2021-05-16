import * as React from "react";

import {
  AboutDetails,
  AboutImage,
  AboutPageTitle,
  AboutWrapper,
  SocialProfiles,
} from "./style";
import { graphql, useStaticQuery } from "gatsby";

import Image from "gatsby-image";
import { SocialLinks } from "../../utils/Social";
import SocialProfile from "../../components/social-profile/social-profile";

interface AboutProps {}

const About: React.FunctionComponent<AboutProps> = () => {
  const Data = useStaticQuery(graphql`
    query {
      avatar: file(absolutePath: { regex: "/about.jpg/" }) {
        childImageSharp {
          fluid(maxWidth: 1770, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      site {
        siteMetadata {
          author
          about
        }
      }
    }
  `);

  return (
    <AboutWrapper>
      <AboutPageTitle>
        <h2>About this blog</h2>
        <p>
          I established this blog in May 2021, one year into my journey as a
          Full Stack Engineer. My day-to-day job provides a continuous stream of
          unusual and interesting software engineering problems. In this blog, I
          intend to break some of them down, so that you, the readers, can learn
          something new and grow along with me.
        </p>
      </AboutPageTitle>

      <AboutImage>
        <Image fluid={Data.avatar.childImageSharp.fluid} alt="author" />
      </AboutImage>

      <AboutDetails>
        <h2>What do I write about?</h2>
        <h6>TLDR: JavaScript, TypeScript, Rust, cars</h6>
        <p>
          As a Full Stack engineer in Vortexa, I am responsible for building out
          various interfaces for our customers to ingest the data. The company
          uses React as the framework for developing frontend applications, and
          it just so happens that this one is my favourite (sorry to all Angular
          fans). The content I intend to put out here will mostly relate to
          tips, tricks and best practices in developing React-based
          applications.
        </p>
        <p>
          As some of you may have already guessed, my tech stack includes
          JavaScript with TypeScript. I have recently started playing with Rust,
          and my goal is to write a few pieces about it in the not too distant
          future.
        </p>
        <p>
          Automotive engineering is one of my greatest passions. What this means
          is that you can expect an occasional article in which I drool over a
          newly released car or some cool technology it uses.
        </p>

        <SocialProfiles>
          <SocialProfile items={SocialLinks} />
        </SocialProfiles>
      </AboutDetails>
    </AboutWrapper>
  );
};

export default About;
