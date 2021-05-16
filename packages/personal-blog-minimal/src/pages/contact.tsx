import Contact from "../containers/contact";
import Layout from "../components/layout";
import { PageProps } from "gatsby";
import React from "react";
import SEO from "../components/seo";

const ContactPage: React.FunctionComponent<PageProps> = () => {
  return (
    <Layout>
      <SEO
        title="Contact Us"
        description="Get in touch with me with any questions, suggestions, advice or queries."
      />

      <Contact />
    </Layout>
  );
};

export default ContactPage;
