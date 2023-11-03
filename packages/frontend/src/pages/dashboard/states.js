import React, { useState, useEffect } from "react";
import axios from "axios";
import GenericForm from "@/components/GenericForm";
import WithLogin from "@/scripts/WithLogin";

const apiUrl = process.env.BASE_URL + "/states";

const StatePage = () => {
  const [name, setName] = useState("");
  const [abbreviation, setAbbreviation] = useState("");
  const [states, setStates] = useState([]);
  const [error, setError] = useState(null);

  // New state to hold the state being edited
  const [editingState, setEditingState] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await axios.get(apiUrl);
        setStates(response.data);
      } catch (error) {
        setError("Error fetching states from the API.");
      }
    };

    fetchStates();
  }, []);

  // Fetch a specific state by its ID for editing
  const fetchStateForEdit = async (stateId) => {
    try {
      const response = await axios.get(`${apiUrl}/${stateId}`);
      setEditingState(response.data);
      setShowCreateModal(true); // Show the modal for editing
    } catch (error) {
      setError("Error fetching state for editing.");
    }
  };

  // Handle creating or updating a state
  const handleCreateOrUpdateState = async () => {
    try {
      if (editingState) {
        // If editingState is defined, update the state
        const formData = {
          name: editingState.name,
          abbreviation: editingState.abbreviation,
        };
        await axios.put(`${apiUrl}/${editingState._id}`, formData);
      } else {
        // If editingState is not defined, create a new state
        const formData = { name, abbreviation };
        await axios.post(apiUrl, formData);
      }

      // Clear the editing state and refresh the list
      setEditingState(null);
      setShowCreateModal(false);
      setName("");
      setAbbreviation("");
      const response = await axios.get(apiUrl);
      setStates(response.data);
    } catch (error) {
      setError("Error creating or updating the state.");
    }
  };

  const handleDeleteState = async (stateId) => {
    if (window.confirm("Deseja realmente deletar este estado?")) {
      try {
        await axios.delete(`${apiUrl}/${stateId}`);
        // Refresh the state list after deletion
        const response = await axios.get(apiUrl);
        setStates(response.data);
      } catch (error) {
        setError("Error deleting the state.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-50 rounded">
      <div className="bg-white p-8 rounded-lg shadow-md w-full">
        <h1 className="text-2xl font-semibold mb-4">Estados</h1>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          className="bg-green-500 hover:bg-green-700 text-white font-semibold  py-1 px-2 rounded"
          onClick={() => setShowCreateModal(true)}
        >
          Criar Estado
        </button>

        <table className="w-full mt-4">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-100">Nome</th>
              <th className="py-2 px-4 bg-gray-100">Abreviação</th>
              <th className="py-2 px-4 bg-gray-100">Ações</th>
            </tr>
          </thead>
          <tbody>
            {states.map((state) => (
              <tr key={state._id}>
                <td className="py-2 px-4">{state.name}</td>
                <td className="py-2 px-4">{state.abbreviation}</td>
                <td className="py-2 px-4 w-70">
                  <button
                    className="bg-gray-300 hover:bg-gray-400 mx-2 text-gray-700 font-semibold py-1 px-2 rounded"
                    onClick={() => fetchStateForEdit(state._id)}
                  >
                    Editar
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 mx-2 text-white font-semibold  py-1 px-2 rounded"
                    onClick={() => handleDeleteState(state._id)}
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {showCreateModal && (
          <div>
            <h2>{editingState ? "Editar Estado" : "Criar Estado"}</h2>
            <GenericForm
              fields={[
                {
                  name: "name",
                  type: "text",
                  label: "Estado",
                  value: editingState ? editingState.name : name,
                  onChange: (e) =>
                    editingState
                      ? setEditingState({
                          ...editingState,
                          name: e.target.value,
                        })
                      : setName(e.target.value),
                },
                {
                  name: "abbreviation",
                  type: "text",
                  label: "Abreviação",
                  value: editingState
                    ? editingState.abbreviation
                    : abbreviation,
                  onChange: (e) =>
                    editingState
                      ? setEditingState({
                          ...editingState,
                          abbreviation: e.target.value,
                        })
                      : setAbbreviation(e.target.value),
                },
              ]}
              onSubmit={handleCreateOrUpdateState}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default WithLogin(StatePage);
