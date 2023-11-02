import React from "react";

const GenericList = ({ entities, onEdit, onDelete }) => {
  return (
    <ul>
      {entities.map((entity) => (
        <li key={entity.id}>
          {/* Customize how to display entity data */}
          {entity.name}
          <button onClick={() => onEdit(entity)}>Edit</button>
          <button onClick={() => onDelete(entity.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default GenericList;
