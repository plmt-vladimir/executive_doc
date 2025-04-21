import { createContext, useContext, useState } from "react";

const ObjectRegistrationContext = createContext();

export const ObjectRegistrationProvider = ({ children }) => {
  const [objectParameters, setObjectParameters] = useState({
    constructionName: "",
    constructionShort: "",
    constructionAddress: "",
    objects: [],
    newObject: { name: "", shotname: "", address: "" },
    sections: [],
    newSection: { object: "", name: "", address: "" },
  });

  const [customerCard, setCustomerCard] = useState({
    selectedOrganization: "",
    orgFullName: "",
    ogrn: "",
    inn: "",
    address: "",
    telFax: "",
    certificateName: "",
    certificateNumber: "",
    issueDate: "",
    sroName: "",
    sroNumber: "",
    sroOgrn: "",
    sroInn: "",
    position: "",
    orderOrgNumber: "",
    orderDate: "",
    employees: [],
    fullName: "",
    ins: "",
    orderNumber: "",
  });

  const [contractorCard, setContractorCard] = useState({ ...customerCard });
  const [projectOrgCard, setProjectOrgCard] = useState({ ...customerCard });
  const [constructionControlCard, setConstructionControlCard] = useState({ ...customerCard });
  const [generalContractorCard, setGeneralContractorCard] = useState({ ...customerCard });

  return (
    <ObjectRegistrationContext.Provider
      value={{
        objectParameters, setObjectParameters,
        customerCard, setCustomerCard,
        contractorCard, setContractorCard,
        projectOrgCard, setProjectOrgCard,
        constructionControlCard, setConstructionControlCard,
        generalContractorCard, setGeneralContractorCard,
      }}
    >
      {children}
    </ObjectRegistrationContext.Provider>
  );
};

export const useObjectRegistration = () => useContext(ObjectRegistrationContext);