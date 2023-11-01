import React from "react";

const GenericForm = ({ fields, onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement form submission logic
    onSubmit(/* Submitted data */);
  };

  return (
    <div className="my-20 flex items-center justify-center">
      <div className=" p-8 rounded-lg shadow-md w-96">
        <form onSubmit={handleSubmit}>
          {fields.map((field) => (
            <div key={field.name} className="mb-4">
              <label htmlFor={field.name} className="block text-gray-600">
                {field.label}:
              </label>
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                className="border rounded w-full py-2 px-3"
                value={field.value}
                onChange={field.onChange}
              />
            </div>
          ))}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default GenericForm;
