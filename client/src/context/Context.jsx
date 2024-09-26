import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const Context = createContext();

const ContextProvider = (props) => {
  // ## PEOPLE

  const [openPersonForm, setOpenPersonForm] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState("");
  const [storePeopleData, setStorePeopleData] = useState([]);
  const [countryData, setCountryData] = useState([]);
  // ### PEOPLE FORM API ###

  // post

  const setPeople = async () => {
    try {
      const result = await axios.post(
        `http://localhost:1337/api/form/post-people`,
        {
          firstName: firstName,
          lastName: lastName,
          company: company,
          country: country,
          phone: phone,
          email: email,
        }
      );
      setOpenPersonForm(false);
      setFirstName("");
      setLastName("");
      setCompany("");
      setCountry("");
      setPhone("");
      setEmail("");
      getPeople();
      console.log("Form submitted", result);
    } catch (error) {
      console.log("Error", error);
    }
  };

  // get

  const getPeople = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:1337/api/form/get-people`
      );
      setStorePeopleData(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  // delete
  const deletePeople = async (id) => {
    try {
      const result = await axios.delete(
        `http://localhost:1337/api/form/delete-people/${id}`
      );
      getPeople()
      console.log("people delete SuccessFully !", result);
    } catch (error) {
      console.log(error);
    }
  };

  //   ## GET COUNTRY

  const getCountry = async () => {
    try {
      const response = await axios.get(`https://restcountries.com/v3.1/all`);
      setCountryData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPeople();
    getCountry();
  }, []);

  const contextValue = {
    // ## PEOPLE
    setOpenPersonForm,
    openPersonForm,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    company,
    setCompany,
    country,
    setCountry,
    phone,
    setPhone,
    email,
    setEmail,
    setPeople,
    storePeopleData,
    countryData,
    deletePeople
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
