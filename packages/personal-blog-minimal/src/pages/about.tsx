import About from "../containers/about";
import Layout from "../components/layout";
import { PageProps } from "gatsby";
import React from "react";
import SEO from "../components/seo";

const AboutPage: React.FunctionComponent<PageProps> = () => {
  return (
    <Layout>
      <SEO title="About" description="About Pawel Pietruszka an the blog" />

      <About />
    </Layout>
  );
};

export default AboutPage;
