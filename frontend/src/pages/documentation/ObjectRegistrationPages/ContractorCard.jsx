import PageWrapper from "@/components/layout/PageWrapper";
import ComboBox from "@/components/UI/ComboBox";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import Table from "@/components/widgets/Table";
import { useObjectRegistration } from "./ObjectRegistrationContext";

export default function ContractorCard() {
  const {
    contractorCard,
    setContractorCard,
  } = useObjectRegistration();

  const {
    selectedOrganization,
    orgFullName,
    ogrn,
    inn,
    address,
    telFax,
    certificateName,
    certificateNumber,
    issueDate,
    sroName,
    sroNumber,
    sroOgrn,
    sroInn,
    position,
    orderOrgNumber,
    orderDate,
    employees,
    fullName,
    ins,
    orderNumber,
  } = contractorCard;

  const organizations = [
    { value: "org1", label: "Организация 1" },
    { value: "org2", label: "Организация 2" },
  ];

  const updateField = (field, value) =>
    setContractorCard({ ...contractorCard, [field]: value });

  const handleAddEmployee = () => {
    setContractorCard({
      ...contractorCard,
      employees: [
        ...employees,
        { fullName, position, ins, orderNumber, orderDate },
      ],
      fullName: "",
      position: "",
      ins: "",
      orderNumber: "",
      orderDate: "",
    });
  };

  const handleSave = () => {
    console.log("Сохранено:", contractorCard);
  };

  return (
    <PageWrapper title="Карточка подрядчика">
      <div className="grid grid-cols-7 gap-4">
        {/* Комбобокс для выбора организации */}
        <div className="col-span-3">
          <ComboBox
            options={organizations}
            placeholder="Выберите организацию"
            value={selectedOrganization}
            onChange={(selected) => updateField("selectedOrganization", selected)}
          />
        </div>
        <div className="col-span-4"></div>

        {/* Данные организации */}
        <div className="group-box border border-[--color-border] col-span-2">
          <h3 className="group-box-title mb-4">Организация</h3>
          <div className="grid grid-cols-1 gap-4 mb-4">
            <Input placeholder="Наименование" value={orgFullName} onChange={(e) => updateField("orgFullName", e.target.value)} />
            <Input placeholder="ОГРН" value={ogrn} onChange={(e) => updateField("ogrn", e.target.value)} />
            <Input placeholder="ИНН" value={inn} onChange={(e) => updateField("inn", e.target.value)} />
            <Input placeholder="Адрес" value={address} onChange={(e) => updateField("address", e.target.value)} />
            <Input placeholder="Тел/факс" value={telFax} onChange={(e) => updateField("telFax", e.target.value)} />
            <Input placeholder="Наименование свидетельства о допуске" value={certificateName} onChange={(e) => updateField("certificateName", e.target.value)} />
            <Input placeholder="Номер свидетельства о допуске" value={certificateNumber} onChange={(e) => updateField("certificateNumber", e.target.value)} />
            <Input placeholder="Дата выдачи" value={issueDate} onChange={(e) => updateField("issueDate", e.target.value)} />
            <Input placeholder="Наименование СРО" value={sroName} onChange={(e) => updateField("sroName", e.target.value)} />
            <Input placeholder="Номер СРО" value={sroNumber} onChange={(e) => updateField("sroNumber", e.target.value)} />
            <Input placeholder="СРО ОГРН" value={sroOgrn} onChange={(e) => updateField("sroOgrn", e.target.value)} />
            <Input placeholder="СРО ИНН" value={sroInn} onChange={(e) => updateField("sroInn", e.target.value)} />
          </div>
        </div>

        {/* Ответственные лица */}
        <div className="group-box border border-[--color-border] col-span-5">
          <h3 className="group-box-title mb-4">Ответственное лицо</h3>

          <div className="grid grid-cols-3 gap-4 mb-4">
            <Input placeholder="Ф.И.О." value={fullName} onChange={(e) => updateField("fullName", e.target.value)} />
            <Input placeholder="ИНС" value={ins} onChange={(e) => updateField("ins", e.target.value)} />
            <Input placeholder="Должность" value={position} onChange={(e) => updateField("position", e.target.value)} />
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4">
            <Input placeholder="Приказ №" value={orderNumber} onChange={(e) => updateField("orderNumber", e.target.value)} />
            <Input placeholder="Дата приказа" value={orderDate} onChange={(e) => updateField("orderDate", e.target.value)} />
            <Button onClick={handleAddEmployee}>Добавить</Button>
          </div>

          <Table
            headers={["Ф.И.О.", "Должность", "ИНС", "Приказ №", "Дата приказа"]}
            rows={employees.map((emp) => [
              emp.fullName,
              emp.position,
              emp.ins,
              emp.orderNumber,
              emp.orderDate,
            ])}
          />
        </div>
      </div>
    </PageWrapper>
  );
}

