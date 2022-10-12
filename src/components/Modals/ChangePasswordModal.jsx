import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Input from "../Controls/Input";
import Button from "../Controls/Button";
import { getSetPasswordSchema } from "../../helpers/functions";

export default function ChangePasswordModal({
  loading,
  handleSubmit,
  passwordUpdated,
  error
}) {
  return (
    <Formik
      initialValues={{
        oldPassword: "",
        password: "",
        confirmPassword: ""
      }}
      validationSchema={Yup.object({
        oldPassword: Yup.string().required(),
        ...getSetPasswordSchema(),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref("password")], "Passwords must match.")
          .required("Confirm Password is required.")
      })}
      onSubmit={(values, { resetForm }) => {
        handleSubmit({
          password: values.oldPassword,
          newPassword: values.password
        });
        resetForm();
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
        <form onSubmit={handleSubmit} className="p-6">
          <Input
            header="Old Password"
            name="oldPassword"
            type="password"
            disabled={loading}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.oldPassword}
            error={touched.oldPassword && errors.oldPassword}
          />
          <Input
            header="New Password"
            name="password"
            type="password"
            disabled={loading}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            error={touched.password && errors.password}
          />
          <Input
            header="Confirm Password"
            name="confirmPassword"
            type="password"
            disabled={loading}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.confirmPassword}
            error={touched.confirmPassword && errors.confirmPassword}
          />
          {passwordUpdated && (
            <p className="text-linkText text-xs py-2 pt-4 text-center">
              You have successfully updated your password!
            </p>
          )}
          {error && (
            <p className="text-errorText text-xs py-2 pt-4 text-center">
              {error}
            </p>
          )}
          <div className="flex justify-center pt-4">
            <Button
              actionButton
              type="submit"
              disabled={loading || !isValid || !dirty}
              analyticsString="Confirm Password Change Button: ChangePasswordModal"
            >
              Confirm
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
}
