import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "@/components/Modal";
import GenericForm from "@/components/GenericForm";
import WithLogin from "@/scripts/WithLogin";

const apiUrl = "https://phsysystem-api.onrender.com/places";
const citiesApiUrl = "https://phsysystem-api.onrender.com/cities";
const categoriesApiUrl = "https://phsysystem-api.onrender.com/categories";

const PlacesPage = () => {
  const [places, setPlaces] = useState([]);
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);
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
    capacity: "",
  });

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get(apiUrl);
        setPlaces(response.data);
      } catch (error) {
        console.log(error);
        setError("Error fetching places from the API.");
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get(categoriesApiUrl);
        setCategories(response.data);
      } catch (error) {
        setError("Error fetching places from the API.");
      }
    };

    const fetchCities = async () => {
      try {
        const response = await axios.get(citiesApiUrl);
        setCities(response.data);
      } catch (error) {
        console.log(error, citiesApiUrl);
        setError("Error fetching cities from the API.");
      }
    };

    fetchPlaces();
    fetchCities();
    fetchCategories();
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
        capacity,
      } = response.data;

      setFormFields({
        city,
        name,
        image,
        category,
        description,
        link,
        location,
        capacity,
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
          capacity: formFields.capacity,
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
          capacity: formFields.capacity,
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
    <div className="flex items-center justify-center bg-gray-50 rounded">
      <div className="bg-white p-8 rounded-lg shadow-md w-full">
        <h1 className="text-2xl font-semibold mb-4">Locais de Atendimento</h1>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-semibold py-1 px-2 rounded"
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
                capacity: formFields.capacity,
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
              <th className="py-2 px-4 bg-gray-100">Capacidade</th>
              <th className="py-2 px-4 bg-gray-100">Descrição</th>
              <th className="py-2 px-4 bg-gray-100">Categoria</th>
              <th className="py-2 px-4 bg-gray-100 w-70">Ações</th>
            </tr>
          </thead>
          <tbody>
            {places.map((place) => (
              <tr key={place._id}>
                <td className="py-2 px-4">{place.name}</td>
                <td className="py-2 px-4">
                  {cities.find((city) => city._id === place.city)?.name}
                </td>
                <td className="py-2 px-4">{place.capacity}</td>
                <td className="py-2 px-4">{place.description}</td>
                <td className="py-2 px-4">
                  {
                    categories.find(
                      (category) => category._id === place.category
                    )?.name
                  }
                </td>
                <td className="py-2 px-4 w-70">
                  <button
                    className="bg-gray-300 hover-bg-gray-400 mx-2 text-gray-700 font-semibold py-1 px-2 rounded"
                    onClick={() => fetchPlaceForEdit(place._id)}
                  >
                    Editar
                  </button>
                  <button
                    className="bg-red-500 hover-bg-red-700 mx-2 text-white font-semibold py-1 px-2 rounded"
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
                name: "capacity",
                type: "text",
                label: "Capacidade",
                value: formFields.capacity,
                onChange: handleInputChange,
              },
              {
                name: "category",
                type: "select",
                label: "Categoria",
                value: formFields.category,
                options: categories.map((category) => ({
                  value: category._id,
                  label: category.name,
                })),
                onChange: handleInputChange,
              },
              {
                name: "description",
                type: "text",
                label: "Descrição",
                value: formFields.description,
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

export default WithLogin(PlacesPage);
