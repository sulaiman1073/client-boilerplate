import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Input from "../Controls/Input";
import Button from "../Controls/Button";
import ControlHeader from "../Controls/ControlHeader";

export default function ForgotPasswordModal({
  loading,
  handleSubmit,
  confirmEmailSent
}) {
  return (
    <Formik
      initialValues={{ email: "" }}
      enableReinitialize={true}
      validationSchema={Yup.object({
        email: Yup.string()
          .email("Email is invalid.")
          .required("Email is required.")
      })}
      onSubmit={values => {
        handleSubmit({
          email: values.email
        });
      }}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        errors,
        isValid,
        dirty
      }) => (
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center w-full p-4">
            <div className="flex justify-center text-center">
              <ControlHeader
                header="Enter your email address to search for your account"
                error={touched.email && errors.email}
                size="md"
              />
            </div>
            <Input
              name="email"
              type="email"
              disabled={loading}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              error={touched.email && errors.email}
              className="w-full"
            />
            {confirmEmailSent ? (
              <p className="text-linkText py-2">
                An email has been sent to reset your password!
              </p>
            ) : (
              <></>
            )}
            <Button
              actionButton
              type="submit"
              disabled={loading || !isValid || !dirty}
              analyticsString="Forgot Password Button: ForgotPasswordModal"
            >
              Confirm
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
}
