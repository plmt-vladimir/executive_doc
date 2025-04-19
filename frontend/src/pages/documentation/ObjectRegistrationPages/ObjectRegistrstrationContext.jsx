import { createContext, useContext, useState } from "react";

const ObjectRegistrationContext = createContext();

export const useObjectRegistration = () => useContext(ObjectRegistrationContext);

export function ObjectRegistrationProvider({ children }) {
  // Параметры стройки
  const [constructionParams, setConstructionParams] = useState({
    name: "",
    shortname: "",
    address: "",
  });

  // Объекты и участки
  const [objects, setObjects] = useState([]);
  const [sections, setSections] = useState([]);

  // Заказчик
  const [customer, setCustomer] = useState({
    organization: {},
    employees: [],
  });

  // Подрядчик
  const [contractor, setContractor] = useState({
    organization: {},
    employees: [],
  });

  // Генподрядчик
  const [generalContractor, setGeneralContractor] = useState({
    organization: {},
    employees: [],
  });

  // Проектная организация
  const [projectOrg, setProjectOrg] = useState({
    organization: {},
    employees: [],
  });

  // Стройконтроль
  const [constructionControl, setConstructionControl] = useState({
    organization: {},
    employees: [],
  });

  const value = {
    constructionParams,
    setConstructionParams,
    objects,
    setObjects,
    sections,
    setSections,
    customer,
    setCustomer,
    contractor,
    setContractor,
    generalContractor,
    setGeneralContractor,
    projectOrg,
    setProjectOrg,
    constructionControl,
    setConstructionControl,
  };

  return (
    <ObjectRegistrationContext.Provider value={value}>
      {children}
    </ObjectRegistrationContext.Provider>
  );
}
