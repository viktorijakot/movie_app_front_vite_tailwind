import PropTypes from "prop-types";
function SmartInput({ id, formik, type = "text", readOnly = false }) {
  // id = title

  const areaInput = (
    <textarea
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values[id]}
      placeholder=""
      className="w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none  focus:ring-teal-600 focus:border-teal-600"
      id={id}
      rows="3"
    ></textarea>
  );

  return (
    <>
      <label className="w-full ">
        <span className="block">
          {id.charAt(0).toUpperCase() + id.slice(1).replace("_", " ")}
        </span>

        {type === "textarea" ? (
          areaInput
        ) : (
          <input
            disabled={readOnly}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values[id]}
            // placeholder={placeholder}
            type={type}
            className="input w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-teal-600 focus:border-teal-600 "
            id={id}
          />
        )}
      </label>
      {formik.touched[id] && formik.errors[id] && (
        <p className="text-red-500 ">
          {formik.errors[id].charAt(0).toUpperCase() +
            formik.errors[id].slice(1).replace("_", " ")}
        </p>
      )}
    </>
  );
}

export default SmartInput;

SmartInput.propTypes = {
  id: PropTypes.string.isRequired,
  formik: PropTypes.object,
  type: PropTypes.string,
  readOnly: PropTypes.bool,
};
