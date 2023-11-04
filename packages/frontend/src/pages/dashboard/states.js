import React, { useState, useEffect } from "react";
import axios from "axios";
import GenericForm from "@/components/GenericForm";
import WithLogin from "@/scripts/WithLogin";
import Modal from "@/components/Modal";

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "https://phsysystem-api.onrender.com";
const apiUrl = baseUrl + "/states";

const StatePage = () => {
  const [name, setName] = useState("");
  const [abbreviation, setAbbreviation] = useState("");
  const [states, setStates] = useState([]);
  const [error, setError] = useState(null);
  const [editingState, setEditingState] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [formFields, setFormFields] = useState({
    name: "",
    abbreviation: "",
  });

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

  const openModal = (title, fields, onSubmit) => {
    setFormFields(fields);
    setModalTitle(title);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormFields({
      ...formFields,
      [name]: value,
    });
  };

  const fetchStateForEdit = async (stateId) => {
    try {
      const response = await axios.get(`${apiUrl}/${stateId}`);
      setEditingState(response.data);

      openModal(
        "Editar Estado",
        {
          name: response.data.name,
          abbreviation: response.data.abbreviation,
        },
        handleCreateOrUpdateState
      );
    } catch (error) {
      setError("Error fetching state for editing.");
    }
  };

  const handleCreateOrUpdateState = async () => {
    try {
      if (editingState) {
        const formData = {
          name: formFields.name,
          abbreviation: formFields.abbreviation,
        };
        await axios.put(`${apiUrl}/${editingState._id}`, formData);
      } else {
        const formData = {
          name: formFields.name,
          abbreviation: formFields.abbreviation,
        };
        await axios.post(apiUrl, formData);
      }

      setEditingState(null);
      closeModal();
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
          onClick={() =>
            openModal(
              "Criar Estado",
              {
                name: formFields.name,
                abbreviation: formFields.abbreviation,
              },
              handleCreateOrUpdateState
            )
          }
        >
          Criar Estado
        </button>

        <table className="w-full mt-4">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-100">Nome</th>
              <th className="py-2 px-4 bg-gray-100">Abreviação</th>
              <th className="py-2 px-4 bg-gray-100 w-80">Ações</th>
            </tr>
          </thead>
          <tbody>
            {states.map((state) => (
              <tr key={state._id}>
                <td className="py-2 px-4">{state.name}</td>
                <td className="py-2 px-4">{state.abbreviation}</td>
                <td className="py-2 px-4">
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

        <Modal isOpen={isModalOpen} onClose={closeModal} title={modalTitle}>
          <GenericForm
            fields={[
              {
                name: "name",
                type: "text",
                label: "Estado",
                value: formFields.name,
                onChange: handleInputChange,
              },
              {
                name: "abbreviation",
                type: "text",
                label: "Abreviação",
                value: formFields.abbreviation,
                onChange: handleInputChange,
              },
            ]}
            onSubmit={handleCreateOrUpdateState}
          />
        </Modal>
      </div>
    </div>
  );
};

export default WithLogin(StatePage);
