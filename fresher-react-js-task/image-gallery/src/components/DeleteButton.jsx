// delete button component

import React from "react";

function DeleteButton({ onDelete }) {
  return (
    <>
      <button onClick={onDelete}>Delete</button>
    </>
  );
}

export default DeleteButton;