import React, { useState, useEffect } from "react";
import axios from "axios";
import GenericForm from "@/components/GenericForm";
import Modal from "@/components/Modal";

const apiUrl = "http://localhost:3333/appointments";
const categoriesUrl = "http://localhost:3333/categories";
const placesUrl = "http://localhost:3333/places";
const userUrl = "http://localhost:3333/auth/profile";

const AppointmentsPage = () => {
  const userRole = "65427a57c50ca80c689ee9dd";
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState("");
  const [endTime, setEndTime] = useState("");
  const [place, setPlace] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [places, setPlaces] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("Realizar Agendamento");
  const [status, setStatus] = useState("pendente");
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [minStartDateString, setMinStartDateString] = useState("");

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get(placesUrl);
        setPlaces(response.data);
      } catch (error) {
        setError("Error fetching places from the API.");
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get(categoriesUrl);
        setCategories(response.data);
      } catch (error) {
        setError("Error fetching categories from the API.");
      }
    };

    const fetchUser = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const userResponse = await axios.get(userUrl, {
          headers: { Authorization: `JWT ${token}` },
        });
        setUser(userResponse.data.user_info);
        setUserName(userResponse.data.user_info.fullname);
      } catch (error) {
        setError("Error fetching user from the API.");
      }
    };

    const fetchAppointments = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const response = await axios.get(apiUrl, {
          headers: { Authorization: `JWT ${token}` },
        });

        if (user) {
          const isAdmin = user.role === "admin";
          let filteredAppointments = response.data;

          if (!isAdmin) {
            filteredAppointments = response.data.filter(
              (appointment) => appointment.user._id === user._id
            );
          }

          setAppointments(filteredAppointments);
        } else {
          setAppointments([]);
        }
      } catch (error) {
        console.error(error);
        setError("Error fetching appointments from the API.");
      }
    };

    const minStartDate = new Date();
    minStartDate.setDate(minStartDate.getDate() + 1);
    minStartDate.setHours(minStartDate.getHours() + 1);
    const minStartDateString = minStartDate.toISOString().slice(0, 16);
    setMinStartDateString(minStartDateString);

    fetchAppointments();
    fetchCategories();
    fetchPlaces();
    fetchUser();
  }, []);

  const handleCreateOrUpdateAppointment = async () => {
    try {
      const token = sessionStorage.getItem("token");

      const formData = {
        user: user._id,
        endTime: roundToHour(endTime),
        status: "pendente",
        place,
        category,
        userRole,
      };

      if (editingAppointment) {
        await axios.put(`${apiUrl}/${editingAppointment._id}`, formData);
      } else {
        await axios.post(apiUrl, formData);
      }

      setEditingAppointment(null);
      setIsModalOpen(false);
      setEndTime("");
      setStatus("");
      setPlace("");
      setCategory("");

      const appointmentsResponse = await axios.get(apiUrl, {
        headers: { Authorization: `JWT ${token}` },
      });

      setAppointments(appointmentsResponse.data);
    } catch (error) {
      console.error(error);
      setError(
        "Error creating or updating the appointment. Check the console for details."
      );
    }
  };

  const handleDeleteAppointment = async (appointmentId) => {
    try {
      const token = sessionStorage.getItem("token");

      await axios.delete(`${apiUrl}/${appointmentId}`, {
        headers: { Authorization: `JWT ${token}` },
      });

      const appointmentsResponse = await axios.get(apiUrl, {
        headers: { Authorization: `JWT ${token}` },
      });

      setAppointments(appointmentsResponse.data);
    } catch (error) {
      console.error(error);
      setError("Error deleting the appointment.");
    }
  };

  const roundToHour = (dateTimeString) => {
    try {
      const date = new Date(dateTimeString);
      if (isNaN(date)) {
        throw new Error("Invalid date");
      }
      date.setMinutes(0);
      date.setSeconds(0);
      return date.toISOString().split(".")[0];
    } catch (error) {
      console.error("Error rounding date to the hour:", error);
      return "";
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-50 rounded">
      <div className="bg-white p-8 rounded-lg shadow-md w-full">
        <h1 className="text-2xl font-semibold mb-4">Agendamentos</h1>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button
          className="bg-green-500 hover-bg-green-700 text-white font-semibold py-1 px-2 rounded"
          onClick={() => setIsModalOpen(true)}
        >
          Novo Agendamento
        </button>
        <table className="w-full mt-4">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-100">Nome do Usuário</th>
              <th className="py-2 px-4 bg-gray-100">Período</th>
              <th className="py-2 px-4 bg-gray-100">Status</th>
              <th className="py-2 px-4 bg-gray-100">Local</th>
              <th className="py-2 px-4 bg-gray-100">Categoria</th>
              <th className="py-2 px-4 bg-gray-100">Ações</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment._id}>
                <td className="py-2 px-4">
                  {appointment.user.fullname || userName}
                </td>
                <td className="py-2 px-4">
                  {new Date(appointment.startTime).toLocaleString()} -{" "}
                  {new Date(appointment.endTime).toLocaleString()}
                </td>
                <td className="py-2 px-4">{appointment.status}</td>
                <td className="py-2 px-4">{appointment.place.name}</td>
                <td className="py-2 px-4">{appointment.category.name}</td>
                <td className="py-2 px-4 w-70">
                  <button
                    className="bg-gray-300 hover-bg-gray-400 mx-2 text-gray-700 font-semibold py-1 px-2 rounded"
                    onClick={() => {
                      setEditingAppointment(appointment);
                      setIsModalOpen(true);
                    }}
                  >
                    Editar
                  </button>
                  <button
                    className="bg-red-500 hover-bg-red-700 mx-2 text-white font-semibold py-1 px-2 rounded"
                    onClick={() => handleDeleteAppointment(appointment._id)}
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={modalTitle}
        >
          <GenericForm
            fields={[
              {
                name: "place",
                type: "select",
                label: "Local",
                options: places.map((place) => ({
                  value: place._id,
                  label: place.name,
                })),
                onChange: (e) => setPlace(e.target.value),
              },
              {
                name: "category",
                type: "select",
                label: "Categoria",
                options: categories.map((category) => ({
                  value: category._id,
                  label: category.name,
                })),
                value: category,
                onChange: (e) => setCategory(e.target.value),
              },
              {
                name: "endTime",
                type: "datetime-local",
                label: "Data e Hora preferencial",
                min: minStartDateString,
                value: endTime,
                onChange: (e) => setEndTime(e.target.value),
              },
            ]}
            onSubmit={handleCreateOrUpdateAppointment}
          />
        </Modal>
      </div>
    </div>
  );
};

export default AppointmentsPage;
