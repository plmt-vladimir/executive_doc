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

export default function SPList() {
  const [standards, setStandards] = useState([
    {
      id: 1,
      code: "СП 70.13330.2012",
      title: "Несущие и ограждающие конструкции",
      fileName: "sp70.pdf"
    },
    {
      id: 2,
      code: "СП 48.13330.2011",
      title: "Организация строительства",
      fileName: "sp48.pdf"
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({ code: "", title: "", fileName: "" });

  const handleOpen = (item = null) => {
    setEditingItem(item);
    setFormData(item || { code: "", title: "", fileName: "" });
    setShowModal(true);
  };

  const handleSave = () => {
    if (editingItem) {
      setStandards((prev) =>
        prev.map((s) => (s.id === editingItem.id ? { ...formData, id: s.id } : s))
      );
    } else {
      setStandards((prev) => [
        ...prev,
        { ...formData, id: Date.now() }
      ]);
    }
    setShowModal(false);
  };

  const handleDelete = (item) => {
    setStandards((prev) => prev.filter((s) => s.id !== item.id));
  };

  return (
    <PageWrapper title="Справочник СП">
      <div className="group-box border border-[--color-border] p-4 mb-4">
        <h3 className="group-box-title mb-4 text-[--color-primary]">Свод правил (СП)</h3>
        <FilterableTable
          columns={[
            { header: "Шифр СП", accessor: "code", filterType: "text" },
            { header: "Наименование СП", accessor: "title", filterType: "text" },
            {
              header: "Файл СП",
              accessor: "fileName",
              filterType: "text",
              render: (val) => (
                <a
                  href={`/uploads/${val}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[--color-primary] underline"
                >
                  {val}
                </a>
              )
            },
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
          data={standards}
        />
        <div className="flex justify-end mt-4">
          <Button onClick={() => handleOpen()}>Добавить СП</Button>
        </div>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editingItem ? "Редактировать СП" : "Добавить СП"}>
        <div className="grid gap-4">
          <Input
            label="Шифр СП"
            value={formData.code}
            onChange={(e) => setFormData({ ...formData, code: e.target.value })}
          />
          <Input
            label="Наименование СП"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          <div className="flex gap-2 items-end">
            <Input
              label="Имя файла"
              value={formData.fileName}
              onChange={(e) => setFormData({ ...formData, fileName: e.target.value })}
              className="w-full"
            />
            <Button>Загрузить</Button>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <Button onClick={handleSave}>Сохранить</Button>
        </div>
      </Modal>
    </PageWrapper>
  );
}