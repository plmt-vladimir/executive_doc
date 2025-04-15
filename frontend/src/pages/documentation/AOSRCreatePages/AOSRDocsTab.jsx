import { useState } from "react";
import GroupBox from "@/components/UI/Groupbox";
import Textarea from "@/components/UI/Textarea";
import Button from "@/components/UI/Button";
import FilterableTable from "@/components/widgets/FilterableTable";
import Table from "@/components/widgets/Table";
import { Trash2, Plus } from "lucide-react";

export default function AOSRDocsTab() {
  const [geodesyDocs, setGeodesyDocs] = useState([]);
  const [labDocs, setLabDocs] = useState([]);
  const [presentationGeo, setPresentationGeo] = useState("");
  const [presentationLab, setPresentationLab] = useState("");

  const allDocs = [
    { name: "Гео-схема 01", number: "Г-001", date: "2024-01-01", type: "geodesy" },
    { name: "Гео-схема 02", number: "Г-002", date: "2024-02-01", type: "geodesy" },
    { name: "Протокол испытаний", number: "Л-001", date: "2024-01-10", type: "lab" },
    { name: "Отчёт лаборатории", number: "Л-002", date: "2024-02-05", type: "lab" },
  ];

  const columns = (handleAdd) => [
    { header: "Наименование", accessor: "name", filterType: "text" },
    { header: "Номер", accessor: "number", filterType: "text" },
    { header: "Дата", accessor: "date", filterType: "date" },
    {
      header: "", accessor: "actions", filterType: null,
      render: (_, row) => (
        <button onClick={() => handleAdd(row)} className="text-green-600 hover:text-green-800">
          <Plus size={16} />
        </button>
      )
    }
  ];

  const tableRows = (data, handleDelete) =>
    data.map((item, idx) => [
      item.name,
      item.number,
      item.date,
      <button onClick={() => handleDelete(idx)} className="text-red-600 hover:text-red-800">
        <Trash2 size={16} />
      </button>
    ]);

  const handleAddDoc = (type, doc) => {
    const setList = type === "geodesy" ? setGeodesyDocs : setLabDocs;
    const current = type === "geodesy" ? geodesyDocs : labDocs;
    if (!current.some((d) => d.name === doc.name)) {
      setList([...current, doc]);
    }
  };

  const handleDeleteDoc = (type, index) => {
    const setList = type === "geodesy" ? setGeodesyDocs : setLabDocs;
    const current = type === "geodesy" ? geodesyDocs : labDocs;
    const updated = [...current];
    updated.splice(index, 1);
    setList(updated);
  };

  return (
    <div className="flex flex-col gap-6">
      <GroupBox title="а) Исполнительные геодезические схемы положения конструкций" bordered>
        <FilterableTable
          columns={columns((row) => handleAddDoc("geodesy", row))}
          data={allDocs.filter((d) => d.type === "geodesy")}
        />
        <div className="mt-4">
          <Table
            headers={["Наименование", "Номер", "Дата", ""]}
            rows={tableRows(geodesyDocs, (i) => handleDeleteDoc("geodesy", i))}
          />
        </div>
        <div className="mt-4">
          <Textarea
            placeholder="Представление в документе"
            value={presentationGeo}
            onChange={(e) => setPresentationGeo(e.target.value)}
            className="h-24"
          />
        </div>
      </GroupBox>

      <GroupBox title="б) Результаты экспертиз, обследований, лабораторных и иных испытаний" bordered>
        <FilterableTable
          columns={columns((row) => handleAddDoc("lab", row))}
          data={allDocs.filter((d) => d.type === "lab")}
        />
        <div className="mt-4">
          <Table
            headers={["Наименование", "Номер", "Дата", ""]}
            rows={tableRows(labDocs, (i) => handleDeleteDoc("lab", i))}
          />
        </div>
        <div className="mt-4">
          <Textarea
            placeholder="Представление в документе"
            value={presentationLab}
            onChange={(e) => setPresentationLab(e.target.value)}
            className="h-24"
          />
        </div>
      </GroupBox>

      <div className="flex justify-end gap-4">
        <Button>Очистить</Button>
        <Button>Применить</Button>
      </div>
    </div>
  );
}
