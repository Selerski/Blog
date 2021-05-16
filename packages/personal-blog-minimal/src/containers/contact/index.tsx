import * as React from "react";
import * as Yup from "yup";

import {
  ContactFromWrapper,
  ContactPageTitle,
  ContactWrapper,
  InputGroup,
} from "./style";
import { Form, Formik, FormikProps } from "formik";

import Button from "../../components/button/button";
import Input from "../../components/input/input";

interface MyFormValues {
  firstName: string;
  email: string;
  message: string;
}

const SignupSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  message: Yup.string().required("Required"),
});

const encode = (data: Record<string, string>) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

const Contact: React.SFC<{}> = () => {
  return (
    <Formik
      initialValues={{ firstName: "", email: "", message: "" }}
      onSubmit={(values, actions) => {
        fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: encode({ "form-name": "contact", ...values }),
        })
          .then(() => {
            alert("Success");
            actions.resetForm();
          })
          .catch(() => {
            alert("Error");
          })
          .finally(() => actions.setSubmitting(false));
      }}
      validationSchema={SignupSchema}
      render={({
        handleChange,
        values,
        errors,
        handleBlur,
        touched,
        isSubmitting,
      }: FormikProps<MyFormValues>) => (
        <>
          <Form name="contact" data-netlify={true}>
            <ContactWrapper>
              <ContactPageTitle>
                <h2>Contact</h2>
                <p>
                  Get in touch with me with any questions, suggestions, advice
                  or queries.
                </p>
              </ContactPageTitle>
              <ContactFromWrapper>
                <InputGroup>
                  <Input
                    type="text"
                    name="firstName"
                    value={`${values.firstName}`}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="Name"
                    notification={`${
                      errors.firstName && touched.firstName
                        ? errors.firstName
                        : ""
                    }`}
                  />
                  <Input
                    type="email"
                    name="email"
                    value={`${values.email}`}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="Email"
                    notification={`${
                      errors.email && touched.email ? errors.email : ""
                    }`}
                  />
                </InputGroup>
                <Input
                  type="textarea"
                  name="message"
                  value={`${values.message}`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="Message"
                  notification={
                    errors.message && touched.message ? errors.message : ""
                  }
                />
                <Button
                  title="Submit"
                  type="submit"
                  isLoading={isSubmitting ? true : false}
                  loader="Submitting.."
                />
              </ContactFromWrapper>
            </ContactWrapper>
          </Form>
        </>
      )}
    />
  );
};

export default Contact;
