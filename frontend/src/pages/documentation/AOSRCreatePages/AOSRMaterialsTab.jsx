import { useState } from "react";
import GroupBox from "@/components/UI/Groupbox";
import Textarea from "@/components/UI/Textarea";
import Button from "@/components/UI/Button";
import FilterableTable from "@/components/widgets/FilterableTable";
import Table from "@/components/widgets/Table";
import { Trash2, Plus } from "lucide-react";

export default function AOSRMaterialsTab() {
  const [materials, setMaterials] = useState([]);
  const [documentRepresentation, setDocumentRepresentation] = useState("");

  const allMaterials = [
    {
      name: "Цемент М500",
      type: "Цемент",
      certificate: "Сертификат №001",
      dateIssued: "2024-01-10",
      dateExpires: "2025-01-10"
    },
    {
      name: "Арматура А400",
      type: "Металл",
      certificate: "Сертификат №002",
      dateIssued: "2024-02-15",
      dateExpires: "2025-02-15"
    },
    {
      name: "Песок строительный",
      type: "Песок",
      certificate: "Сертификат №003",
      dateIssued: "2024-03-01",
      dateExpires: "2025-03-01"
    },
    {
      name: "Щебень фракция 5-20",
      type: "Щебень",
      certificate: "Сертификат №004",
      dateIssued: "2024-04-01",
      dateExpires: "2025-04-01"
    }
  ];

  const handleAddFromTable = (row) => {
    const exists = materials.find((m) => m.material === row.name);
    if (exists) return;
    setMaterials((prev) => [
      ...prev,
      { material: row.name, qualityDoc: row.certificate }
    ]);
  };

  const handleDelete = (index) => {
    const newList = [...materials];
    newList.splice(index, 1);
    setMaterials(newList);
  };

  return (
    <div className="flex flex-col gap-6">
      <GroupBox title="Выбор материалов из списка" bordered>
        <FilterableTable
          columns={[
            { header: "Наименование", accessor: "name", filterType: "text" },
            { header: "Тип", accessor: "type", filterType: "text" },
            { header: "Сертификат", accessor: "certificate", filterType: "text" },
            { header: "Дата выдачи", accessor: "dateIssued", filterType: "date", filterMode: "after" },
            { header: "Годен до", accessor: "dateExpires", filterType: "date", filterMode: "after" },
            {
              header: "",
              accessor: "actions",
              filterType: null,
              render: (_, row) => (
                <button
                  onClick={() => handleAddFromTable(row)}
                  className="text-[--color-primary] hover:text-[--color-secondary]"
                  title="Добавить в список"
                >
                  <Plus size={16} />
                </button>
              )
            }
          ]}
          data={allMaterials}
        />
      </GroupBox>

      <GroupBox title="Список применённых материалов" bordered>
        <Table
          headers={["Материал", "Документ о качестве", ""]}
          rows={materials.map((item, idx) => [
            item.material,
            item.qualityDoc,
            <button
              onClick={() => handleDelete(idx)}
              className="text-red-600 hover:text-red-800"
              title="Удалить"
            >
              <Trash2 size={16} />
            </button>
          ])}
        />
      </GroupBox>

      <div>
        <Textarea
          placeholder="Представление в документе"
          value={documentRepresentation}
          onChange={(e) => setDocumentRepresentation(e.target.value)}
          className="h-24"
        />
      </div>

      <div className="flex justify-end gap-4">
        <Button>Очистить</Button>
        <Button>Применить</Button>
      </div>
    </div>
  );
}