import {
  ErrorMessage,
  NewsletterDescription,
  NewsletterInnerWrapper,
  NewsletterInputWrapper,
  NewsletterTitle,
  NewsletterWrapper,
  SuccessMessage,
} from "./newsletter.style";
import React, { useState } from "react";

import Button from "../button/button";
import Input from "../input/input";
import addToMailchimp from "gatsby-plugin-mailchimp";

type NewsletterProps = {};

const Newsletter: React.FunctionComponent<NewsletterProps> = ({ ...props }) => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const handleChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    addToMailchimp(email) // listFields are optional if you are only capturing the email address.
      .then(({ msg, result }: any) => {
        if (result !== "success") {
          throw msg;
        }
        setSuccess(msg);
        setError("");
        setEmail("");
      })
      .catch((err: any) => {
        setError(err);
        setSuccess("");
        setEmail("");
      });
  };
  return (
    <NewsletterWrapper {...props}>
      <NewsletterInnerWrapper>
        <NewsletterTitle>
          Be always up to date with my latest content!
        </NewsletterTitle>
        <NewsletterDescription>
          Subscribe to receive notifications
        </NewsletterDescription>

        <NewsletterInputWrapper onSubmit={handleSubmit}>
          {success ? (
            <SuccessMessage>{success} 🙂</SuccessMessage>
          ) : (
            <>
              <Input
                type="email"
                name="email"
                placeholder="Write your email here"
                onChange={handleChange}
                value={email}
                required={true}
              />
              <Button title="Subscribe" type="submit" />
            </>
          )}
        </NewsletterInputWrapper>
        {error && (
          <ErrorMessage
            dangerouslySetInnerHTML={{ __html: `<span>*</span>${error}` }}
          />
        )}
      </NewsletterInnerWrapper>
    </NewsletterWrapper>
  );
};

export default Newsletter;
