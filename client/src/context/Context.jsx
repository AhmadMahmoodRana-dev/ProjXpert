import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const Context = createContext();

const ContextProvider = (props) => {
  const [countryData, setCountryData] = useState([]);
  const [openCustomerForm, setOpenCustomerForm] = useState(false);
  // ## PEOPLE

  const [openPersonForm, setOpenPersonForm] = useState(false);
  const [openPersonDetail, setOpenPersonDetail] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState("");
  const [storePeopleData, setStorePeopleData] = useState([]);
  const [showButton, setShowButton] = useState(false);
  const [updateId, setUpdateId] = useState("");
  const [personDetail, setPersonDetail] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  // ## COMPANY
  const [openCompanyForm, setOpenCompanyForm] = useState(false);
  const [openCompanyDetail, setOpenCompanyDetail] = useState(false);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [website, setWebsite] = useState("");
  const [cmpCountry, setCmpCountry] = useState("");
  const [cmpPhone, setCmpPhone] = useState();
  const [cmpEmail, setCmpEmail] = useState("");
  const [storeCompanyData, setStoreCompanyData] = useState([]);
  const [cmpShowButton, setCmpShowButton] = useState(false);
  const [cmpUpdateId, setCmpUpdateId] = useState("");
  const [companyDetail, setCompanyDetail] = useState({});
  const [cmpSearchTerm, setCmpSearchTerm] = useState("");

  // ## LEAD
  const [leadBranch, setLeadBranch] = useState("");
  const [leadType, setLeadType] = useState("");
  const [leadName, setLeadName] = useState("");
  const [leadStatus, setLeadStatus] = useState("");
  const [leadSource, setLeadSource] = useState("");
  const [leadCountry, setLeadCountry] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadProject, setLeadProject] = useState("");
  const [openLeadForm, setOpenLeadForm] = useState(false);
  const [storeLeadData, setStoreLeadData] = useState([]);
  const [showLeadButton,setShowLeadButton] = useState(false)

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
      getPeople();
      console.log("people delete SuccessFully !", result);
    } catch (error) {
      console.log(error);
    }
  };

  // update

  const getSinglePeople = async (people) => {
    try {
      const { data } = await axios.get(
        `http://localhost:1337/api/form/get-single-people/${people._id}`
      );
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setCompany(data.company);
      setCountry(data.country);
      setPhone(data.phone);
      setEmail(data.email);
      setOpenPersonForm(!openPersonForm);
      setShowButton(!showButton);
      setUpdateId(data._id);
      console.log("data fetch sucessfully", data);
    } catch (error) {
      console.log(error);
    }
  };

  const updatePeople = async () => {
    try {
      const result = await axios.put(
        `http://localhost:1337/api/form/update-people/${updateId}`,
        {
          firstName: firstName,
          lastName: lastName,
          company: company,
          country: country,
          phone: phone,
          email: email,
        }
      );
      console.log("Succesfully Updated");
      setShowButton(!showButton);
      setOpenPersonForm(!openPersonForm);
      setFirstName("");
      setLastName("");
      setCompany("");
      setCountry("");
      setPhone("");
      setEmail("");
      getPeople();
    } catch (error) {
      console.log(error);
    }
  };

  // detailpageInfo
  const getPeopleDetail = async (id) => {
    const result = await axios.get(
      `http://localhost:1337/api/form/get-single-people/${id}`
    );
    setPersonDetail(result.data);
    console.log(result.data);
    setOpenPersonDetail(true);
  };

  // search

  const filteredPeopleData = storePeopleData.filter((people) => {
    const fullName = `${people.firstName} ${people.lastName}`.toLowerCase();
    return (
      fullName.includes(searchTerm.toLowerCase()) ||
      people.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      people.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      people.country?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  //           #########################################################################################          //

  // ## COMPANIES FORM APIS

  // post

  const setCompanies = async () => {
    try {
      const result = await axios.post(
        `http://localhost:1337/api/form/post-company`,
        {
          name: name,
          contact: contact,
          website: website,
          country: cmpCountry,
          phone: cmpPhone,
          email: cmpEmail,
        }
      );
      setOpenCompanyForm(false);
      setName("");
      setContact("");
      setWebsite("");
      setCmpCountry("");
      setCmpPhone("");
      setCmpEmail("");
      getCompany();
      console.log("CompanyForm submitted", result);
    } catch (error) {
      console.log("Error", error);
    }
  };

  // get

  const getCompany = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:1337/api/form/get-company`
      );
      setStoreCompanyData(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  // delete
  const deleteCompany = async (id) => {
    try {
      const result = await axios.delete(
        `http://localhost:1337/api/form/delete-company/${id}`
      );
      getCompany();
      console.log("Company delete SuccessFully !", result);
    } catch (error) {
      console.log(error);
    }
  };

  // update

  const getSingleCompany = async (people) => {
    try {
      const { data } = await axios.get(
        `http://localhost:1337/api/form/get-single-company/${people._id}`
      );
      setName(data.name);
      setContact(data.contact);
      setWebsite(data.website);
      setCmpCountry(data.country);
      setCmpPhone(data.phone);
      setCmpEmail(data.email);
      setOpenCompanyForm(!openPersonForm);
      setCmpShowButton(!cmpShowButton);
      setCmpUpdateId(data._id);
      console.log("Companydata fetch sucessfully", data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateCompany = async () => {
    try {
      const result = await axios.put(
        `http://localhost:1337/api/form/update-company/${cmpUpdateId}`,
        {
          name: name,
          contact: contact,
          website: website,
          country: cmpCountry,
          phone: cmpPhone,
          email: cmpEmail,
        }
      );
      console.log("Succesfully Updated Company");
      setCmpShowButton(!cmpShowButton);
      setOpenCompanyForm(!openCompanyForm);
      setName("");
      setContact("");
      setWebsite("");
      setCmpCountry("");
      setCmpPhone("");
      setCmpEmail("");
      getCompany();
    } catch (error) {
      console.log(error);
    }
  };

  // detailpageInfo
  const getCompanyDetail = async (id) => {
    const result = await axios.get(
      `http://localhost:1337/api/form/get-single-company/${id}`
    );
    setCompanyDetail(result.data);
    console.log(result.data);
    setOpenCompanyDetail(true);
  };

  // search

  const filteredCompanyData = storeCompanyData.filter((company) => {
    const fullName = `${company.name}`.toLowerCase();
    return (
      fullName.includes(cmpSearchTerm.toLowerCase()) ||
      company.email?.toLowerCase().includes(cmpSearchTerm.toLowerCase()) ||
      company.contact?.toLowerCase().includes(cmpSearchTerm.toLowerCase()) ||
      company.country?.toLowerCase().includes(cmpSearchTerm.toLowerCase())
    );
  });

  //           #########################################################################################          //
  // CUSTOMERS
  const [customerPeople, setCustomerPeople] = useState("");
  const [customerCompany, setCustomerCompany] = useState("");
  const [type, setType] = useState("email");

  //           #########################################################################################          //

  //   ## LEAD FORM APIS

  // ## Get DATA

  const getLeadData = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:1337/api/form/get-lead`
      );
      setStoreLeadData(data.message);
    } catch (error) {
      console.log(error);
    }
  };
  console.log("lead data", storeLeadData);

  // ## Post DATA

  const setLeads = async () => {
    try {
      const result = await axios.post(
        `http://localhost:1337/api/form/post-lead`,
        {
          branch: leadBranch,
          type: leadType,
          name: leadName,
          status: leadStatus,
          source: leadSource,
          country: leadCountry,
          phone: leadPhone,
          email: leadEmail,
          project: leadProject,
        }
      );
      setLeadType(""),
        setLeadBranch(""),
        setLeadCountry(""),
        setLeadEmail(""),
        setLeadPhone(""),
        setLeadProject(""),
        setLeadName(""),
        setLeadStatus(""),
        setLeadSource(""),
        setOpenLeadForm(false);
      getLeadData();
      console.log("CompanyForm submitted", result);
    } catch (error) {
      console.log("Error", error);
    }
  };

  // ## DELETE
  const deleteLead = async (id) => {
    try {
      const result = await axios.delete(
        `http://localhost:1337/api/form/delete-lead/${id}`
      );
      getLeadData();
      console.log("Lead delete SuccessFully !", result);
    } catch (error) {
      console.log(error);
    }
  };

  // ## UPDATE
  // update

  const getSingleLead = async (lead) => {
    try {
      const { data } = await axios.get(
        `http://localhost:1337/api/form/get-single-lead/${lead._id}`
      );

      // Since setLeadFormData is async, log data directly here:
      console.log("leadSingleData", data);
      setLeadType(data.type),
      setLeadBranch(data.branch),
      setLeadCountry(data.country),
      setLeadEmail(data.email),
      setLeadPhone(data.phone),
      setLeadProject(data.project),
      setLeadName(data.name),
      setLeadStatus(data.status),
      setLeadSource(data.source),
      setOpenLeadForm(!openLeadForm);
      setShowLeadButton(!showLeadButton);
      setUpdateId(data._id);
    } catch (error) {
      console.log(error);
    }
  };

 

  const updateLead = async () => {
    try {
      const result = await axios.put(
        `http://localhost:1337/api/form/update-lead/${updateId}`,
        {
          branch: leadBranch,
          type: leadType,
          name: leadName,
          status: leadStatus,
          source: leadSource,
          country: leadCountry,
          phone: leadPhone,
          email: leadEmail,
          project: leadProject,
        }
      );
      console.log("Succesfully Updated");
      setShowButton(!showButton);
      setOpenLeadForm(!openLeadForm);

      getLeadData();
    } catch (error) {
      console.log(error);
    }
  };

  //           #########################################################################################          //

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
    getCompany();
    getCountry();
    getLeadData();
  }, []);

  // ######################################################################################################################################

  const contextValue = {
    // #######################
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
    deletePeople,
    showButton,
    getSinglePeople,
    updatePeople,
    openPersonDetail,
    setOpenPersonDetail,
    getPeopleDetail,
    personDetail,
    filteredPeopleData,
    searchTerm,
    setSearchTerm,

    // #######################
    // ## COMPANY

    setOpenCompanyForm,
    openCompanyForm,
    name,
    setName,
    contact,
    setContact,
    website,
    setWebsite,
    cmpCountry,
    setCmpCountry,
    cmpPhone,
    setCmpPhone,
    cmpEmail,
    setCmpEmail,
    setCompanies,
    storeCompanyData,
    deleteCompany,
    cmpShowButton,
    getSingleCompany,
    updateCompany,
    openCompanyDetail,
    setOpenCompanyDetail,
    getCompanyDetail,
    companyDetail,
    filteredCompanyData,
    cmpSearchTerm,
    setCmpSearchTerm,

    // #######################
    // Customer

    openCustomerForm,
    setOpenCustomerForm,
    customerPeople,
    setCustomerPeople,
    customerCompany,
    setCustomerCompany,
    type,
    setType,
    storeCompanyData,

    // #######################
    // Lead
    setLeadType,
    setLeadBranch,
    setLeadCountry,
    setLeadEmail,
    setLeadPhone,
    setLeadProject,
    setLeadName,
    setLeadStatus,
    setLeadSource,
    leadBranch,
    leadType,
    leadCountry,
    leadEmail,
    leadPhone,
    leadProject,
    leadName,
    leadStatus,
    leadSource,
    openLeadForm,
    setOpenLeadForm,
    storeLeadData,
    getSingleLead,
    deleteLead,
    updateLead,
    setLeads,
    showLeadButton
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
