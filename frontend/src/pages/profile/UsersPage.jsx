import { useState } from "react";
import PageWrapper from "@/components/layout/PageWrapper";
import FilterableTable from "@/components/widgets/FilterableTable";
import ComboBox from "@/components/UI/ComboBox";
import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";

function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[--color-primary]">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">×</button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default function UsersPage() {
  const [users, setUsers] = useState([
    { id: 1, name: "Иван Иванов", email: "ivan@example.com", role: "Инженер ПТО" },
    { id: 2, name: "Анна Смирнова", email: "anna@example.com", role: "Начальник участка" },
    { id: 3, name: "Пётр Сидоров", email: "petr@example.com", role: "Руководитель проекта" },
    { id: 4, name: "Админ", email: "admin@example.com", role: "Администратор" }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "", password: "" });

  const roleOptions = [
    { label: "Администратор", value: "Администратор" },
    { label: "Руководитель проекта", value: "Руководитель проекта" },
    { label: "Инженер ПТО", value: "Инженер ПТО" },
    { label: "Начальник участка", value: "Начальник участка" }
  ];

  const handleRoleChange = (userId, newRole) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === userId ? { ...user, role: newRole } : user))
    );
  };

  const handleResetPassword = (user) => {
    alert(`Пароль для ${user.name} будет сброшен (заглушка)`);
  };

  const handleSaveUser = () => {
    setUsers((prev) => [...prev, { ...newUser, id: Date.now() }]);
    setShowModal(false);
    setNewUser({ name: "", email: "", role: "", password: "" });
  };

  return (
    <PageWrapper title="Управление пользователями">
      <div className="flex justify-end mb-4">
        <Button onClick={() => setShowModal(true)}>Добавить пользователя</Button>
      </div>

      <FilterableTable
        columns={[
          { header: "Имя", accessor: "name", filterType: "text" },
          { header: "Email", accessor: "email", filterType: "text" },
          {
            header: "Роль",
            accessor: "role",
            filterType: "select",
            options: roleOptions,
            render: (val, row) => (
              <select
                value={val}
                onChange={(e) => handleRoleChange(row.id, e.target.value)}
                className="border border-[--color-border] rounded px-2 py-1 text-sm"
              >
                {roleOptions.map((role) => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>
            )
          },
          {
            header: "Действия",
            accessor: "actions",
            noFilter: true,
            render: (_, row) => (
              <Button
                className="text-sm px-3 py-1 bg-[--color-primary] text-white rounded hover:bg-[--color-secondary]"
                onClick={() => handleResetPassword(row)}
              >
                Сбросить пароль
              </Button>
            )
          }
        ]}
        data={users}
        pageSize={10}
      />

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Добавить пользователя"
      >
        <div className="grid gap-4">
          <Input
            placeholder="Имя"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
          <Input
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <ComboBox
            placeholder="Роль"
            options={roleOptions}
            value={newUser.role}
            onChange={(val) => setNewUser({ ...newUser, role: val })}
          />
          <Input
            placeholder="Пароль"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            type="password"
          />
        </div>
        <div className="flex justify-end mt-4">
          <Button onClick={handleSaveUser}>Сохранить</Button>
        </div>
      </Modal>
    </PageWrapper>
  );
}
