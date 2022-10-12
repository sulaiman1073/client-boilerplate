import React from "react";
import Select from "../Controls/Select";
import ControlHeader from "../Controls/ControlHeader";
import { connect } from "formik";
import { getDatePickerValues } from "../../helpers/functions";
import strings from "../../helpers/localization";

function EditBirthdayForm({ loading, formik }) {
  const datePicker = getDatePickerValues();

  const handleBlur = e => {
    formik.handleBlur(e);

    formik.values.dateOfBirth.setDate(formik.values.day);
    formik.values.dateOfBirth.setMonth(formik.values.month);
    formik.values.dateOfBirth.setFullYear(
      datePicker.years[formik.values.year - 1].label
    );

    formik.setFieldValue("dateOfBirth", formik.values.dateOfBirth);

    formik.setFieldTouched("day", true, false);
    formik.setFieldTouched("month", true, false);
    formik.setFieldTouched("year", true, false);
  };

  return (
    <>
      <div className="w-full pt-2 px-2">
        <ControlHeader
          header={strings.createNewAccountBirthday}
          error={
            formik.touched.day &&
            formik.touched.month &&
            formik.touched.year &&
            formik.errors.dateOfBirth
          }
          size="sm"
        />
      </div>
      <div className="flex flex-row items-center w-full sm:space-x-8 md:space-x-4 lg:space-x-3 space-x-2 justify-center pt-2">
        <Select
          name="month"
          placeholder="Month"
          options={datePicker.months}
          isMulti={false}
          isClearable={false}
          isSearchable={false}
          onBlur={handleBlur}
          disabled={loading}
          value={formik.values.month}
          onChange={v => {
            formik.values.month = v.value;
            formik.values.dateOfBirth.setMonth(v.value);
            formik.setFieldValue("dateOfBirth", formik.values.dateOfBirth);
            formik.setFieldTouched("day", true, false);
            formik.setFieldTouched("month", true, false);
            formik.setFieldTouched("year", true, false);
          }}
          className="w-32 p-0 text-sm"
        />
        <Select
          name="day"
          placeholder="Day"
          options={datePicker.days}
          isMulti={false}
          isClearable={false}
          isSearchable={false}
          onBlur={handleBlur}
          disabled={loading}
          value={formik.values.day}
          onChange={v => {
            formik.values.day = v.value;
            formik.values.dateOfBirth.setDate(v.value);
            formik.setFieldValue("dateOfBirth", formik.values.dateOfBirth);
            formik.setFieldTouched("day", true, false);
            formik.setFieldTouched("month", true, false);
            formik.setFieldTouched("year", true, false);
          }}
          className="w-24 p-0 text-sm"
        />
        <Select
          name="year"
          placeholder="Year"
          options={datePicker.years}
          isMulti={false}
          isClearable={false}
          isSearchable={false}
          onBlur={handleBlur}
          disabled={loading}
          value={formik.values.year}
          onChange={v => {
            formik.values.year = v.value;
            formik.values.dateOfBirth.setFullYear(v.label);
            formik.setFieldValue("dateOfBirth", formik.values.dateOfBirth);
            formik.setFieldTouched("day", true, false);
            formik.setFieldTouched("month", true, false);
            formik.setFieldTouched("year", true, false);
          }}
          className="w-32 p-0 text-sm"
        />
      </div>
    </>
  );
}

export default connect(EditBirthdayForm);
