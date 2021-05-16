import Footer from "../components/footer/footer";
import Navbar from "../components/navbar/navbar";
import NotFound from "../containers/not-found";
import { PageProps } from "gatsby";
import React from "react";
import ResetCss from "../components/reset-css";
import SEO from "../components/seo";

const Error404Page: React.FC<PageProps> = () => {
  return (
    <>
      <ResetCss />
      <Navbar />
      <SEO title="404: Not Found" />
      <NotFound />
      <Footer>
        Copyright &copy; {new Date().getFullYear()} Pawel Pietruszka
      </Footer>
    </>
  );
};

export default Error404Page;
