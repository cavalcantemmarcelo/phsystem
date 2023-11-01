import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "@/components/Modal";
import GenericForm from "@/components/GenericForm";
import withLogin from "@/scripts/withLogin";

const apiUrl = "http://localhost:3333/places";
const citiesApiUrl = "http://localhost:3333/cities";

const PlacesPage = () => {
  const [places, setPlaces] = useState([]);
  const [cities, setCities] = useState([]);
  const [error, setError] = useState(null);
  const [editingPlace, setEditingPlace] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [formFields, setFormFields] = useState({
    city: "",
    name: "",
    image: "default.png",
    category: "",
    description: "",
    link: "",
    location: {
      lat: "",
      long: "",
    },
    facilities: [],
  });

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get(apiUrl);
        setPlaces(response.data);
      } catch (error) {
        setError("Error fetching places from the API.");
      }
    };

    const fetchCities = async () => {
      try {
        const response = await axios.get(citiesApiUrl);
        setCities(response.data);
      } catch (error) {
        setError("Error fetching cities from the API.");
      }
    };

    fetchPlaces();
    fetchCities();
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

  const fetchPlaceForEdit = async (placeId) => {
    try {
      const response = await axios.get(`${apiUrl}/${placeId}`);
      setEditingPlace(response.data);

      const {
        city,
        name,
        image,
        category,
        description,
        link,
        location,
        facilities,
      } = response.data;

      setFormFields({
        city,
        name,
        image,
        category,
        description,
        link,
        location,
        facilities,
      });

      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching place for editing:", error);
      setError("Error fetching place for editing.");
    }
  };

  const handleCreateOrUpdatePlace = async () => {
    try {
      if (editingPlace) {
        const formData = {
          city: formFields.city,
          name: formFields.name,
          image: formFields.image,
          category: formFields.category,
          description: formFields.description,
          link: formFields.link,
          location: formFields.location,
          facilities: formFields.facilities,
        };
        await axios.put(`${apiUrl}/${editingPlace._id}`, formData);
      } else {
        const formData = {
          city: formFields.city,
          name: formFields.name,
          image: formFields.image,
          category: formFields.category,
          description: formFields.description,
          link: formFields.link,
          location: formFields.location,
          facilities: formFields.facilities,
        };
        await axios.post(apiUrl, formData);
      }

      setEditingPlace(null);
      closeModal();

      const response = await axios.get(apiUrl);
      setPlaces(response.data);
    } catch (error) {
      setError("Error creating or updating the place.");
    }
  };

  const handleDeletePlace = async (placeId) => {
    if (window.confirm("Deseja realmente deletar este lugar?")) {
      try {
        await axios.delete(`${apiUrl}/${placeId}`);

        const response = await axios.get(apiUrl);
        setPlaces(response.data);
      } catch (error) {
        setError("Error deleting the place.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full">
        <h1 className="text-2xl font-semibold mb-4">Lugares</h1>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={() =>
            openModal(
              "Criar Lugar",
              {
                city: formFields.city,
                name: formFields.name,
                image: formFields.image,
                category: formFields.category,
                description: formFields.description,
                link: formFields.link,
                location: formFields.location,
                facilities: formFields.facilities,
              },
              handleCreateOrUpdatePlace
            )
          }
        >
          Criar Lugar
        </button>
        <table className="w-full mt-4">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-100">Nome</th>
              <th className="py-2 px-4 bg-gray-100">Cidade</th>
              <th className="py-2 px-4 bg-gray-100">Ações</th>
            </tr>
          </thead>
          <tbody>
            {places.map((place) => (
              <tr key={place._id}>
                <td className="py-2 px-4">{place.name}</td>
                <td className="py-2 px-4">
                  {cities.find((city) => city._id === place.city)?.name}
                </td>
                <td>
                  <button
                    className="bg-blue-500 hover-bg-blue-700 mx-5 text-white font-bold py-2 px-4 rounded"
                    onClick={() => fetchPlaceForEdit(place._id)}
                  >
                    Editar
                  </button>
                  <button
                    className="bg-red-500 hover-bg-red-700 mx-5 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleDeletePlace(place._id)}
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
                name: "city",
                type: "select",
                label: "Cidade",
                value: formFields.city,
                options: cities.map((city) => ({
                  value: city._id,
                  label: city.name,
                })),
                onChange: handleInputChange,
              },
              {
                name: "name",
                type: "text",
                label: "Nome",
                value: formFields.name,
                onChange: handleInputChange,
              },
              {
                name: "category",
                type: "text",
                label: "Categoria",
                value: formFields.category,
                onChange: handleInputChange,
              },
              {
                name: "description",
                type: "text",
                label: "Descrição",
                value: formFields.description,
                onChange: handleInputChange,
              },
              {
                name: "link",
                type: "text",
                label: "Link",
                value: formFields.link,
                onChange: handleInputChange,
              },
            ]}
            onSubmit={handleCreateOrUpdatePlace}
          />
        </Modal>
      </div>
    </div>
  );
};

export default withLogin(PlacesPage);
