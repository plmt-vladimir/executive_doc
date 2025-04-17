import { useState } from "react";
import PageWrapper from "@/components/layout/PageWrapper";
import FilterableTable from "@/components/widgets/FilterableTable";
import Table from "@/components/widgets/Table";
import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import { Pencil, Trash2 } from "lucide-react";

export default function Contractors() {
  const [organizations, setOrganizations] = useState([
    {
      id: 1,
      name: "ПроектСервис",
      ogrn: "1234567890123",
      inn: "7701234567",
      address: "г. Москва, ул. Строителей, 10",
      phone: "(495) 123-45-67",
      certName: "Свидетельство №1",
      certNumber: "5678",
      certDate: "2022-01-10",
      sroName: "СРО ПроектСоюз",
      sroNumber: "СРО-100",
      sroOgrn: "1023456789012",
      sroInn: "7707654321"
    },
    {
      id: 2,
      name: "П2роектСервис",
      ogrn: "1234567890123",
      inn: "7701234567",
      address: "г. Москва, ул. Строителей, 10",
      phone: "(495) 123-45-67",
      certName: "Свидетельство №1",
      certNumber: "5678",
      certDate: "2022-01-10",
      sroName: "СРО ПроектСоюз",
      sroNumber: "СРО-100",
      sroOgrn: "1023456789012",
      sroInn: "7707654321"
    },
    {
      id: 3,
      name: "ПроектСервис",
      ogrn: "1234567890123",
      inn: "7701234567",
      address: "г. Москва, ул. Строителей, 10",
      phone: "(495) 123-45-67",
      certName: "Свидетельство №1",
      certNumber: "5678",
      certDate: "2022-01-10",
      sroName: "СРО ПроектСоюз",
      sroNumber: "СРО-100",
      sroOgrn: "1023456789012",
      sroInn: "7707654321"
    }
  ]);

  const [selectedOrgId, setSelectedOrgId] = useState(organizations[0].id);

  const [employees, setEmployees] = useState({
    1: [
      {
        id: 1,
        name: "Анна Смирнова",
        position: "Начальник участка",
        role: "Представитель подрядчика",
        order: "987",
        date: "2025-03-20"
      }
    ]
  });

  const [editingEmployee, setEditingEmployee] = useState(null);
  const [showAddOrgForm, setShowAddOrgForm] = useState(false);
  const [newOrg, setNewOrg] = useState({
    name: "",
    ogrn: "",
    inn: "",
    address: "",
    phone: "",
    certName: "",
    certNumber: "",
    certDate: "",
    sroName: "",
    sroNumber: "",
    sroOgrn: "",
    sroInn: ""
  });

  const handleOrgSelect = (org) => {
    setSelectedOrgId(org.id);
  };

  const handleDeleteEmployee = (id) => {
    setEmployees((prev) => ({
      ...prev,
      [selectedOrgId]: prev[selectedOrgId].filter((e) => e.id !== id)
    }));
  };

  const handleEditEmployee = (emp) => setEditingEmployee(emp);

  const handleAddEmployee = () => {
    setEditingEmployee({ id: null, name: "", position: "", role: "", order: "", date: "" });
  };

  const handleSave = () => {
    setEmployees((prev) => {
      const updated = [...(prev[selectedOrgId] || [])];
      if (editingEmployee.id) {
        const idx = updated.findIndex((e) => e.id === editingEmployee.id);
        if (idx > -1) updated[idx] = editingEmployee;
      } else {
        updated.push({ ...editingEmployee, id: Date.now() });
      }
      return { ...prev, [selectedOrgId]: updated };
    });
    setEditingEmployee(null);
  };

  const handleAddOrganization = () => {
    const filledOrg = { ...newOrg, id: Date.now() };
    setOrganizations((prev) => [...prev, filledOrg]);
    setSelectedOrgId(filledOrg.id);
    setShowAddOrgForm(false);
    setNewOrg({
      name: "",
      ogrn: "",
      inn: "",
      address: "",
      phone: "",
      certName: "",
      certNumber: "",
      certDate: "",
      sroName: "",
      sroNumber: "",
      sroOgrn: "",
      sroInn: ""
    });
  };

  const selectedOrg = organizations.find((o) => o.id === selectedOrgId);

  return (
    <PageWrapper title="Справочник организаций и сотрудников">
      <div className="flex flex-col gap-6">
        <div className="group-box border border-[--color-border] p-4 mb-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="group-box-title mb-0 text-[--color-primary]">Организации</h3>
            <Button onClick={() => setShowAddOrgForm(true)}>Добавить организацию</Button>
          </div>
          <FilterableTable
            columns={[
              { header: "Наименование", accessor: "name", filterType: "text" },
              { header: "ОГРН", accessor: "ogrn", filterType: "text" },
              { header: "ИНН", accessor: "inn", filterType: "text" },
              { header: "Адрес", accessor: "address", filterType: "text" },
              { header: "Тел/факс", accessor: "phone", filterType: "text" },
              { header: "Свидетельство", accessor: "certName", filterType: "text" },
              { header: "№ Свид.", accessor: "certNumber", filterType: "text" },
              { header: "Дата выдачи", accessor: "certDate", filterType: "text" },
              { header: "СРО", accessor: "sroName", filterType: "text" }
            ]}
            data={organizations}
            pageSize={10}
            onRowClick={handleOrgSelect}
          />

          {showAddOrgForm && (
            <div className="mt-6 border border-[--color-border] rounded p-4 bg-white shadow">
              <h4 className="text-[--color-primary] font-semibold mb-4">Добавление организации</h4>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <Input placeholder="Наименование" value={newOrg.name} onChange={(e) => setNewOrg({ ...newOrg, name: e.target.value })} />
                <Input placeholder="ОГРН" value={newOrg.ogrn} onChange={(e) => setNewOrg({ ...newOrg, ogrn: e.target.value })} />
                <Input placeholder="ИНН" value={newOrg.inn} onChange={(e) => setNewOrg({ ...newOrg, inn: e.target.value })} />
                <Input placeholder="Адрес" value={newOrg.address} onChange={(e) => setNewOrg({ ...newOrg, address: e.target.value })} />
                <Input placeholder="Тел/факс" value={newOrg.phone} onChange={(e) => setNewOrg({ ...newOrg, phone: e.target.value })} />
                <Input placeholder="Наименование свидетельства" value={newOrg.certName} onChange={(e) => setNewOrg({ ...newOrg, certName: e.target.value })} />
                <Input placeholder="Номер свидетельства" value={newOrg.certNumber} onChange={(e) => setNewOrg({ ...newOrg, certNumber: e.target.value })} />
                <Input type="date" placeholder="Дата выдачи" value={newOrg.certDate} onChange={(e) => setNewOrg({ ...newOrg, certDate: e.target.value })} />
                <Input placeholder="СРО (название)" value={newOrg.sroName} onChange={(e) => setNewOrg({ ...newOrg, sroName: e.target.value })} />
                <Input placeholder="СРО (номер)" value={newOrg.sroNumber} onChange={(e) => setNewOrg({ ...newOrg, sroNumber: e.target.value })} />
                <Input placeholder="СРО ОГРН" value={newOrg.sroOgrn} onChange={(e) => setNewOrg({ ...newOrg, sroOgrn: e.target.value })} />
                <Input placeholder="СРО ИНН" value={newOrg.sroInn} onChange={(e) => setNewOrg({ ...newOrg, sroInn: e.target.value })} />
              </div>
              <div className="flex justify-end gap-2">
                <Button onClick={() => setShowAddOrgForm(false)}>Отмена</Button>
                <Button onClick={handleAddOrganization}>Сохранить</Button>
              </div>
            </div>
          )}
        </div>

        <div className="group-box border border-[--color-border] p-4 mb-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="group-box-title mb-0 text-[--color-primary]">
              Сотрудники организации: {selectedOrg?.name}
            </h3>
            <Button onClick={handleAddEmployee}>Добавить</Button>
          </div>
          <Table
            headers={["ФИО", "Должность", "Роль", "Номер приказа", "Дата приказа", ""]}
            rows={(employees[selectedOrgId] || []).map((emp) => [
              emp.name,
              emp.position,
              emp.role,
              emp.order,
              emp.date,
              <div className="flex justify-center gap-2 text-[--color-primary]">
                <Pencil className="cursor-pointer" onClick={() => handleEditEmployee(emp)} />
                <Trash2 className="cursor-pointer text-red-600" onClick={() => handleDeleteEmployee(emp.id)} />
              </div>
            ])}
          />

          {editingEmployee && (
            <div className="mt-6 border border-[--color-border] rounded p-4 bg-white shadow">
              <h4 className="text-[--color-primary] font-semibold mb-4">
                {editingEmployee.id ? "Редактирование сотрудника" : "Добавление сотрудника"}
              </h4>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <Input placeholder="ФИО" value={editingEmployee.name} onChange={(e) => setEditingEmployee({ ...editingEmployee, name: e.target.value })} />
                <Input placeholder="Должность" value={editingEmployee.position} onChange={(e) => setEditingEmployee({ ...editingEmployee, position: e.target.value })} />
                <Input placeholder="Роль" value={editingEmployee.role} onChange={(e) => setEditingEmployee({ ...editingEmployee, role: e.target.value })} />
                <Input placeholder="Номер приказа" value={editingEmployee.order} onChange={(e) => setEditingEmployee({ ...editingEmployee, order: e.target.value })} />
                <Input type="date" placeholder="Дата приказа" value={editingEmployee.date} onChange={(e) => setEditingEmployee({ ...editingEmployee, date: e.target.value })} />
              </div>
              <div className="flex justify-end gap-2">
                <Button onClick={() => setEditingEmployee(null)}>Отмена</Button>
                <Button onClick={handleSave}>Сохранить</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}

