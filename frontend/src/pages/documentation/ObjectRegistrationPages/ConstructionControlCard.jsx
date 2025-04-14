import { useState } from "react";
import PageWrapper from "@/components/layout/PageWrapper";
import ComboBox from "@/components/UI/ComboBox";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import Table from "@/components/widgets/Table";

export default function ConstructionControlCard() {
  const [selectedOrganization, setSelectedOrganization] = useState("");
  const [orgFullName, setOrgFullName] = useState("");
  const [ogrn, setOgrn] = useState("");
  const [inn, setInn] = useState("");
  const [address, setAddress] = useState("");
  const [telFax, setTelFax] = useState("");
  const [certificateName, setCertificateName] = useState("");
  const [certificateNumber, setCertificateNumber] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [sroName, setSroName] = useState("");
  const [sroNumber, setSroNumber] = useState("");
  const [sroOgrn, setSroOgrn] = useState("");
  const [sroInn, setSroInn] = useState("");
  const [position, setPosition] = useState("");
  const [orderOrgNumber, setOrgOrderNumber] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [employees, setEmployees] = useState([]);
  const [fullName, setFullName] = useState("");
  const [ins, setIns] = useState("");
  const [orderNumber, setOrderNumber] = useState("");

  const organizations = [
    { value: "org1", label: "Организация 1" },
    { value: "org2", label: "Организация 2" },
  ];

  const handleAddEmployee = () => {
    setEmployees([
      ...employees,
      { fullName, position, ins, orderNumber, orderDate }
    ]);
    // Clear input fields after adding the employee
    setFullName("");
    setPosition("");
    setIns("");
    setOrderNumber("");
    setOrderDate("");
  };

  const handleSave = () => {
    console.log("Data saved:", {
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
      employees
    });
  };

  return (
    <PageWrapper title="Карточка заказчика">
      <div className="grid grid-cols-7 gap-4">
        {/* Комбобокс для выбора организации */}
        <div className="col-span-3">
          <ComboBox
            options={organizations}
            placeholder="Выберите организацию"
            value={selectedOrganization}
            onChange={(value) => setSelectedOrganization(value)}
          />
        </div>
        <div className="col-span-4"></div>

        {/* Первая группа для данных заказчика */}
        <div className="group-box border border-[--color-border] col-span-2">
        <h3 className="group-box-title mb-4">Организация</h3>
          <div className="grid grid-cols-1 gap-4 mb-4">
            <Input
              placeholder="Наименование"
              value={orgFullName}
              onChange={(e) => setOrgFullName(e.target.value)}
            />
            <Input
              placeholder="ОГРН"
              value={ogrn}
              onChange={(e) => setOgrn(e.target.value)}
            />
            <Input
              placeholder="ИНН"
              value={inn}
              onChange={(e) => setInn(e.target.value)}
            />
            <Input
              placeholder="Адрес"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <Input
              placeholder="Тел/факс"
              value={telFax}
              onChange={(e) => setTelFax(e.target.value)}
            />
            <Input
              placeholder="Наименование свидетельства о допуске"
              value={certificateName}
              onChange={(e) => setCertificateName(e.target.value)}
            />
            <Input
              placeholder="Номер свидетельства о допуске"
              value={certificateNumber}
              onChange={(e) => setCertificateNumber(e.target.value)}
            />
            <Input
              placeholder="Дата выдачи"
              value={issueDate}
              onChange={(e) => setIssueDate(e.target.value)}
            />
            <Input
              placeholder="Выдан: Наименование СРО"
              value={sroName}
              onChange={(e) => setSroName(e.target.value)}
            />
            <Input
              placeholder="Номер СРО"
              value={sroNumber}
              onChange={(e) => setSroNumber(e.target.value)}
            />
            <Input
              placeholder="СРО ОГРН"
              value={sroOgrn}
              onChange={(e) => setSroOgrn(e.target.value)}
            />
            <Input
              placeholder="СРО ИНН"
              value={sroInn}
              onChange={(e) => setSroInn(e.target.value)}
            />
          </div>
        </div>

        {/* Вторая группа для данных ответственного лица */}
        <div className="group-box border border-[--color-border] col-span-5">
        <h3 className="group-box-title mb-4">Ответственное лицо</h3>

          {/* Строка 1: ФИО, ИНС, Должность */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <Input
              placeholder="Ф.И.О."
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <Input
              placeholder="ИНС"
              value={ins}
              onChange={(e) => setIns(e.target.value)}
            />
            <Input
              placeholder="Должность"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            />
          </div>

          {/* Строка 2: Приказ, Дата приказа и кнопка */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <Input
              placeholder="Приказ №"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
            />
            <Input
              placeholder="Дата приказа"
              value={orderDate}
              onChange={(e) => setOrderDate(e.target.value)}
            />
            <Button onClick={handleAddEmployee} className="col-span-1">
              Добавить
            </Button>
          </div>

          {/* Таблица сотрудников */}
          <Table
            headers={["Ф.И.О.", "Должность", "ИНС", "Приказ №", "Дата приказа"]}
            rows={employees.map((emp, index) => [
              emp.fullName,
              emp.ins,
              emp.position,
              emp.orderNumber,
              emp.orderDate
            ])}
          />
        </div>

        {/* Кнопка для сохранения */}
        <div className="col-span-1 col-start-7">
          <Button onClick={handleSave}>
            Сохранить
          </Button>
        </div>
      </div>
    </PageWrapper>
  );
}
