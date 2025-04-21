import PageWrapper from "@/components/layout/PageWrapper";
import Tabs from "@/components/UI/Tabs";
import Button from "@/components/UI/Button";

import ObjectParameters from "./ObjectParameters";
import CustomerCard from "./CustomerCard";
import ContractorCard from "./ContractorCard";
import ProjectOrganizationCard from "./ProjectOrganizationCard";
import ConstructionControlCard from "./ConstructionControlCard";
import GeneralContractorCard from "./GeneralContractorCard";

import { ObjectRegistrationProvider } from "./ObjectRegistrationContext";

export default function ObjectRegistrationPage() {
  const tabs = [
    { label: "Параметры объекта", component: <ObjectParameters /> },
    { label: "Карточка заказчика", component: <CustomerCard /> },
    { label: "Карточка подрядчика", component: <ContractorCard /> },
    { label: "Карточка проектной организации", component: <ProjectOrganizationCard /> },
    { label: "Карточка стройконтроля", component: <ConstructionControlCard /> },
    { label: "Карточка генподрядчика", component: <GeneralContractorCard /> },
  ];

  const handleGlobalSave = () => {
    console.log("Сохранение глобального объекта...");
  };

  return (
    <ObjectRegistrationProvider>
      <PageWrapper title="Регистрация объекта">
        <Tabs tabs={tabs} />
        <div className="mt-6 flex justify-end">
          <Button onClick={handleGlobalSave}>Сохранить глобальный объект</Button>
        </div>
      </PageWrapper>
    </ObjectRegistrationProvider>
  );
}