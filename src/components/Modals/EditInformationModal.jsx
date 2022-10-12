import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  getInitialDatePickerValues,
  getUserInformationSchema
} from "../../helpers/functions";
import Button from "../Controls/Button";
import ImageUpload from "../Controls/ImageUpload";
import EditInformationForm from "../Forms/EditInformationForm";
import EditBirthdayForm from "../Forms/EditBirthdayForm";
import _ from "lodash";

export default function EditInformationModal({
  username,
  initial,
  handleSubmit,
  loading,
  informationUpdated,
  error
}) {
  return (
    <div className="p-12 overflow-auto">
      <Formik
        initialValues={{
          ...initial,
          ...getInitialDatePickerValues(initial.dateOfBirth)
        }}
        enableReinitialize={true}
        validationSchema={Yup.object({
          ...getUserInformationSchema(),
          avatar: Yup.mixed().notRequired()
        })}
        onSubmit={values => {
          handleSubmit({
            firstName: values.firstName,
            lastName: values.lastName,
            dateOfBirth: values.dateOfBirth.toISOString(),
            email: values.email,
            avatar: values.avatar
          });
        }}
      >
        {({ handleSubmit, values, isValid, setFieldValue, dirty, touched }) => (
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col items-center w-full">
              <ImageUpload
                name="avatar"
                size="sm"
                icon={values.avatar}
                onUpload={url => {
                  setFieldValue("avatar", url);
                }}
                onRemove={() => {
                  setFieldValue("avatar", null);
                }}
                disabled={loading}
                className=""
              />
              <p className="mb-12 mt-2 text-2xl font-bold">{username}</p>
              <EditInformationForm loading={loading} />
              <div className="w-full pb-8">
                <EditBirthdayForm loading={loading} />
              </div>
              {informationUpdated && (
                <p className="text-linkText text-sm">
                  You have successfully updated your information!
                </p>
              )}
              {error && <p className="text-errorText text-sm">{error}</p>}
              <div className="pt-4">
                <Button
                  actionButton
                  type="submit"
                  disabled={
                    loading || !isValid || (_.isEmpty(touched) && !dirty)
                  }
                  analyticsString="Edit User Info Button: EditInformationModal"
                >
                  Confirm
                </Button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}
