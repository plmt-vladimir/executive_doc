import PageWrapper from "@/components/layout/PageWrapper";
import Tabs from "@/components/UI/Tabs";
import ObjectParameters from "./ObjectParameters";
import CustomerCard from "./CustomerCard";
import ContractorCard from "./ContractorCard";
import ProjectOrganizationCard from "./ProjectOrganizationCard";
import ConstructionControlCard from "./ConstructionControlCard";
import GeneralContractorCard from "./GeneralContractorCard";

export default function ObjectRegistrationPage() {
  const tabs = [
    { label: "Параметры объекта", component: <ObjectParameters /> },
    { label: "Карточка заказчика", component: <CustomerCard /> },
    { label: "Карточка подрядчика", component: <ContractorCard /> },
    { label: "Карточка проектной организации", component: <ProjectOrganizationCard /> },
    { label: "Карточка стройконтроля", component: <ConstructionControlCard /> },
    { label: "Карточка генподрядчика", component: <GeneralContractorCard /> },
  ];

  return (
    <PageWrapper title="Регистрация объекта">
      <Tabs tabs={tabs} />
    </PageWrapper>
  );
}