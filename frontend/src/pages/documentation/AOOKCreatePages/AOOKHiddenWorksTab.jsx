import { useState, useMemo } from "react";
import FilterableTable from "@/components/widgets/FilterableTable";
import Table from "@/components/widgets/Table";
import Textarea from "@/components/UI/Textarea";
import { Plus, Trash2 } from "lucide-react";

export default function AOOKHiddenWorksTab() {
  const [allAosr, setAllAosr] = useState([
    {
      id: 1,
      name: "АОСР №1-КЖ1",
      date: "2024-01-01",
      object: "Объект 1",
      section: "Участок A"
    },
    {
      id: 2,
      name: "АОСР №2-КЖ1",
      date: "2024-01-05",
      object: "Объект 1",
      section: "Участок B"
    },
    {
      id: 3,
      name: "АОСР №3-КЖ2",
      date: "2024-02-01",
      object: "Объект 2",
      section: "Участок C"
    },
    {
      id: 3,
      name: "АОСР №3-КЖ2",
      date: "2024-02-01",
      object: "Объект 2",
      section: "Участок C"
    },
    {
      id: 4,
      name: "АОСР №3-КЖ2",
      date: "2024-02-01",
      object: "Объект 2",
      section: "Участок C"
    },
    {
      id: 5,
      name: "АОСР №3-КЖ2",
      date: "2024-02-01",
      object: "Объект 2",
      section: "Участок C"
    },
    {
      id: 6,
      name: "АОСР №3-КЖ2",
      date: "2024-02-01",
      object: "Объект 2",
      section: "Участок C"
    },
    {
      id: 7,
      name: "АОСР №3-КЖ2",
      date: "2024-02-01",
      object: "Объект 2",
      section: "Участок C"
    },
    {
      id: 7,
      name: "АОСР №3-КЖ2",
      date: "2024-02-01",
      object: "Объект 2",
      section: "Участок C"
    },
    {
      id: 8,
      name: "АОСР №3-КЖ2",
      date: "2024-02-01",
      object: "Объект 2",
      section: "Участок C"
    },
    {
      id: 9,
      name: "АОСР №1-КЖ1",
      date: "2024-01-01",
      object: "Объект 1",
      section: "Участок A"
    },
    {
      id: 10,
      name: "АОСР №2-КЖ1",
      date: "2024-01-05",
      object: "Объект 1",
      section: "Участок B"
    },
    {
      id: 11,
      name: "АОСР №3-КЖ2",
      date: "2024-02-01",
      object: "Объект 2",
      section: "Участок C"
    },
    {
      id: 12,
      name: "АОСР №3-КЖ2",
      date: "2024-02-01",
      object: "Объект 2",
      section: "Участок C"
    },
    {
      id: 13,
      name: "АОСР №3-КЖ2",
      date: "2024-02-01",
      object: "Объект 2",
      section: "Участок C"
    },
    {
      id: 14,
      name: "АОСР №3-КЖ2",
      date: "01-03-2025",
      object: "Объект 2",
      section: "Участок C"
    },
    {
      id: 15,
      name: "АОСР №3-КЖ2",
      date: "2024-02-01",
      object: "Объект 2",
      section: "Участок C"
    },
    {
      id: 16,
      name: "АОСР №3-КЖ2",
      date: "2024-02-01",
      object: "Объект 2",
      section: "Участок C"
    },
    {
      id: 17,
      name: "АОСР №3-КЖ2",
      date: "2024-02-01",
      object: "Объект 2",
      section: "Участок C"
    },
    {
      id: 18,
      name: "АОСР №3-КЖ2",
      date: "2024-02-01",
      object: "Объект 2",
      section: "Участок C"
    }
  ]);

  const [selectedAosr, setSelectedAosr] = useState([]);

  const handleAdd = (item) => {
    if (!selectedAosr.some((el) => el.id === item.id)) {
      setSelectedAosr((prev) => [...prev, item]);
    }
  };

  const handleRemove = (item) => {
    setSelectedAosr((prev) => prev.filter((el) => el.id !== item.id));
  };

  const summaryText = useMemo(
    () => selectedAosr.map((item) => item.name).join("; "),
    [selectedAosr]
  );

  return (
    <div className="flex flex-col gap-4 text-sm text-[--color-primary]">
      {/* Проведённые скрытые работы */}
      <div className="group-box border border-[--color-border]">
        <h3 className="group-box-title mb-4">Проведённые скрытые работы</h3>
        <FilterableTable
          columns={[
            { header: "Наименование АОСР", accessor: "name", filterType: "text" },
            { header: "Дата", accessor: "date", filterType: "date" },
            { header: "Объект", accessor: "object", filterType: "text" },
            { header: "Участок", accessor: "section", filterType: "text" },
            {
              header: "",
              accessor: "actions",
              noFilter: true,
              render: (_, row) => (
                <Plus
                  className="cursor-pointer text-[--color-secondary] hover:text-[--color-primary]"
                  size={18}
                  onClick={() => handleAdd(row)}
                />
              )
            }
          ]}
          data={allAosr}
          pageSize={10}
        />
      </div>
  
      {/* Работы, оказывающие влияние на безопасность конструкции */}
      <div className="group-box border border-[--color-border]">
        <h3 className="group-box-title mb-4">Работы, оказывающие влияние на безопасность конструкции</h3>
        <Table
          headers={["Наименование АОСР", "Дата", "Объект", "Участок", ""]}
          rows={selectedAosr.map((item) => [
            item.name,
            item.date,
            item.object,
            item.section,
            <Trash2
              size={18}
              className="cursor-pointer text-red-600"
              onClick={() => handleRemove(item)}
            />
          ])}
          pageSize={10}
        />
      </div>
  
      {/* Итоговое представление */}
      <div>
        <label className="text-sm block mb-2">Представление в документе:</label>
        <Textarea value={summaryText} readOnly rows={4} className="w-full" />
      </div>
    </div>
  );
}