import { useState } from "react";
import FilterableTable from "@/components/widgets/FilterableTable";
import { Pencil, Trash2, Copy } from "lucide-react";

export default function MaterialsJournalList() {
  const [entries, setEntries] = useState([
    {
      id: 1,
      material: "Цемент М500",
      invoiceNumber: "НК-001",
      qualityDoc: "Сертификат №123",
      deliveryDate: "2025-03-15",
      supplier: "ООО Поставщик",
      object: "ЖК Солнечный",
      section: "Участок A"
    },
    {
      id: 2,
      material: "Арматура А400",
      invoiceNumber: "НК-002",
      qualityDoc: "Паспорт №456",
      deliveryDate: "2025-03-18",
      supplier: "ЗАО Металл",
      object: "ЖК Северный",
      section: "Участок B"
    }
  ]);

  const handleEdit = (row) => {
    console.log("Edit", row);
  };

  const handleDelete = (row) => {
    setEntries((prev) => prev.filter((item) => item.id !== row.id));
  };

  const handleCopy = (row) => {
    const copy = { ...row, id: Date.now(), invoiceNumber: row.invoiceNumber + " (копия)" };
    setEntries((prev) => [...prev, copy]);
  };

  return (
    <FilterableTable
      columns={[
        { header: "Материал", accessor: "material", filterType: "text" },
        { header: "Номер накладной", accessor: "invoiceNumber", filterType: "text" },
        { header: "Документ о качестве", accessor: "qualityDoc", filterType: "text" },
        { header: "Дата поставки", accessor: "deliveryDate", filterType: "date" },
        { header: "Поставщик", accessor: "supplier", filterType: "text" },
        { header: "Объект", accessor: "object", filterType: "text" },
        { header: "Участок", accessor: "section", filterType: "text" },
        {
          header: "Действия",
          accessor: "actions",
          noFilter: true,
          render: (_, row) => (
            <div className="flex justify-center gap-2 text-[--color-primary]">
              <Pencil className="cursor-pointer" onClick={() => handleEdit(row)} />
              <Copy className="cursor-pointer" onClick={() => handleCopy(row)} />
              <Trash2 className="cursor-pointer text-red-600" onClick={() => handleDelete(row)} />
            </div>
          )
        }
      ]}
      data={entries}
    />
  );
}  