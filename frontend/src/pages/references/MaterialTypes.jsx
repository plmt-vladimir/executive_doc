import { useState } from "react";
import PageWrapper from "@/components/layout/PageWrapper";
import FilterableTable from "@/components/widgets/FilterableTable";
import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import { Pencil, Trash2 } from "lucide-react";

function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
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

export default function MaterialTypes() {
  const [materials, setMaterials] = useState([
    { id: 1, name: "Цемент М500", type: "Цемент", unit: "т" },
    { id: 2, name: "Арматура А400", type: "Металл", unit: "м" }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({ name: "", type: "", unit: "" });

  const handleOpen = (item = null) => {
    setEditingItem(item);
    setFormData(item || { name: "", type: "", unit: "" });
    setShowModal(true);
  };

  const handleSave = () => {
    if (editingItem) {
      setMaterials((prev) =>
        prev.map((m) => (m.id === editingItem.id ? { ...formData, id: m.id } : m))
      );
    } else {
      setMaterials((prev) => [...prev, { ...formData, id: Date.now() }]);
    }
    setShowModal(false);
  };

  const handleDelete = (item) => {
    setMaterials((prev) => prev.filter((m) => m.id !== item.id));
  };

  return (
    <PageWrapper title="Справочник материалов">
      <div className="group-box border border-[--color-border] p-4 mb-4">
        <h3 className="group-box-title mb-4 text-[--color-primary]">Материалы</h3>
        <FilterableTable
          columns={[
            { header: "Наименование", accessor: "name", filterType: "text" },
            { header: "Тип", accessor: "type", filterType: "text" },
            { header: "Ед. измерения", accessor: "unit", filterType: "text" },
            {
              header: "",
              accessor: "actions",
              noFilter: true,
              render: (_, row) => (
                <div className="flex justify-center gap-2 text-[--color-primary]">
                  <Pencil className="cursor-pointer" onClick={() => handleOpen(row)} />
                  <Trash2 className="cursor-pointer text-red-600" onClick={() => handleDelete(row)} />
                </div>
              )
            }
          ]}
          data={materials}
        />
        <div className="flex justify-end mt-4">
          <Button onClick={() => handleOpen()}>Добавить материал</Button>
        </div>
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingItem ? "Редактировать материал" : "Добавить материал"}
      >
        <div className="grid gap-4">
          <Input
            placeholder="Введите наименование"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <Input
            placeholder="Введите тип"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          />
          <Input
            placeholder="Введите единицу измерения"
            value={formData.unit}
            onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
          />
        </div>
        <div className="flex justify-end mt-4">
          <Button onClick={handleSave}>Сохранить</Button>
        </div>
      </Modal>
    </PageWrapper>
  );
}