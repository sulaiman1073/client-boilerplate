import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Input from "../Controls/Input";
import Button from "../Controls/Button";
import EditInformationForm from "./EditInformationForm";
import EditBirthdayForm from "./EditBirthdayForm";
import {
  getUserInformationSchema,
  getSetPasswordSchema,
  getInitialDatePickerValues
} from "../../helpers/functions";
import strings from "../../helpers/localization";

export default function CreateNewAccountForm({ handleSubmit, error, loading }) {
  const initialDoB = new Date();

  return (
    <>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          dateOfBirth: initialDoB,
          email: "",
          username: "",
          ...getInitialDatePickerValues(initialDoB),
          password: ""
        }}
        enableReinitialize={true}
        validationSchema={Yup.object({
          ...getUserInformationSchema(),
          ...getSetPasswordSchema(),
          username: Yup.string()
            .min(6, strings.passwordTooShort)
            .max(32, strings.passwordTooLong)
            .required(strings.inputTextRequired)
        })}
        onSubmit={values => {
          const dateOfBirth = values.dateOfBirth.toISOString().substring(0, 10);
          handleSubmit({
            firstName: values.firstName,
            lastName: values.lastName,
            dateOfBirth,
            email: values.email,
            username: values.username,
            password: values.password
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
            <div className="flex flex-col items-center w-full">
              <p className="text-center text-3xl font-bold">
                {strings.createNewAccountTitle}
              </p>
              <p className="pb-8 text-center account-form-par">
                {strings.createNewAccountSubtitle}
              </p>
              <EditInformationForm loading={loading} />
              <Input
                header={strings.createNewAccountUsername}
                name="username"
                type="text"
                disabled={loading}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
                error={touched.username && errors.username}
                className="w-full px-2"
              />
              <Input
                header={strings.createNewAccountPassword}
                name="password"
                type="password"
                disabled={loading}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                error={touched.password && errors.password}
                className="w-full pt-2 px-2"
              />
              <EditBirthdayForm loading={loading} />
              <p className="pt-8 text-center text-xs account-form-par">
                {strings.createNewAccountTerms}{" "}
                <a
                  className="no-underline"
                  href="https://medium.com/popitalk/end-user-license-agreement-and-terms-of-service-dc8a25c0f5d2?source=friends_link&sk=2150df3f6e097d60599c30a5d3e8942a"
                >
                  {strings.createNewAccountTerms1}
                </a>
              </p>
              <div className="mt-4">
                <Button
                  actionButton
                  type="submit"
                  disabled={loading || !isValid || !dirty}
                  analyticsString="Sign Up Button: CreateNewAccountForm"
                >
                  {strings.createNewAccountButton}
                </Button>
              </div>
              {error ? (
                <p className="text-errorText text-sm pt-4">{error}</p>
              ) : (
                <></>
              )}
            </div>
          </form>
        )}
      </Formik>
    </>
  );
}
