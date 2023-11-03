import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "@/components/Modal";
import GenericForm from "@/components/GenericForm";
import WithLogin from "@/scripts/WithLogin";

const apiUrl = "https://phsysystem-api.onrender.com/cities";
const statesApiUrl = "https://phsysystem-api.onrender.com/states";

const CityPage = () => {
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [error, setError] = useState(null);
  const [editingCity, setEditingCity] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [formFields, setFormFields] = useState({
    name: "",
    state: "",
  });

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get(apiUrl);
        setCities(response.data);
      } catch (error) {
        setError("Error fetching cities from the API.");
      }
    };

    const fetchStates = async () => {
      try {
        const response = await axios.get(statesApiUrl);
        setStates(response.data);
      } catch (error) {
        setError("Error fetching states from the API.");
      }
    };

    fetchCities();
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

  const fetchCityForEdit = async (cityId, setIsModalOpen) => {
    console.log("City ID for Edit:", cityId);
    try {
      const response = await axios.get(`${apiUrl}/${cityId}`);
      console.log("Fetched City Data:", response.data);
      setEditingCity(response.data);

      setFormFields({
        name: response.data.name,
        state: response.data.state,
      });

      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching city for editing:", error);
      setError("Error fetching city for editing.");
    }
  };

  const handleCreateOrUpdateCity = async () => {
    try {
      if (editingCity) {
        const formData = {
          name: formFields.name,
          state: formFields.state,
        };
        await axios.put(`${apiUrl}/${editingCity._id}`, formData);
      } else {
        const formData = { name: formFields.name, state: formFields.state };
        await axios.post(apiUrl, formData);
      }

      setEditingCity(null);
      closeModal();

      const response = await axios.get(apiUrl);
      setCities(response.data);
    } catch (error) {
      setError("Error creating or updating the city.");
    }
  };

  const handleDeleteCity = async (cityId) => {
    if (window.confirm("Deseja realmente deletar esta cidade?")) {
      try {
        await axios.delete(`${apiUrl}/${cityId}`);

        const response = await axios.get(apiUrl);
        setCities(response.data);
      } catch (error) {
        setError("Error deleting the city.");
      }
    }
  };

  return (
    <div className="flex-grow items-center justify-center bg-gray-50 rounded">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-4">Cidades</h1>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          className="bg-green-500 hover:bg-green-700 text-white font-semibold  py-1 px-2 rounded"
          onClick={() =>
            openModal(
              "Criar Cidade",
              {
                name: formFields.name,
                state: formFields.state,
              },
              handleCreateOrUpdateCity
            )
          }
        >
          Criar Cidade
        </button>

        <table className="w-full mt-4">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-100">Nome</th>
              <th className="py-2 px-4 bg-gray-100">Estado</th>
              <th className="py-2 px-4 bg-gray-100">Ações</th>
            </tr>
          </thead>
          <tbody>
            {cities.map((city) => (
              <tr key={city._id}>
                <td className="py-2 px-4">{city.name}</td>
                <td className="py-2 px-4">
                  {states.find((state) => state._id === city.state)?.name}
                </td>
                <td>
                  <button
                    className="bg-gray-300 hover:bg-gray-400 mx-2 text-gray-700 font-semibold py-1 px-2 rounded"
                    onClick={() => {
                      console.log(`Editing city ID: ${city._id}`);
                      fetchCityForEdit(city._id, setIsModalOpen);
                    }}
                  >
                    Editar
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 mx-2 text-white font-semibold  py-1 px-2 rounded"
                    onClick={() => handleDeleteCity(city._id)}
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
                label: "Cidade",
                value: formFields.name,
                onChange: handleInputChange,
              },
              {
                name: "state",
                type: "select",
                label: "Estado",
                value: formFields.state,
                options: states.map((state) => ({
                  value: state._id,
                  label: state.name,
                })),
                onChange: handleInputChange,
              },
            ]}
            onSubmit={handleCreateOrUpdateCity}
          />
        </Modal>
      </div>
    </div>
  );
};

export default WithLogin(CityPage);
