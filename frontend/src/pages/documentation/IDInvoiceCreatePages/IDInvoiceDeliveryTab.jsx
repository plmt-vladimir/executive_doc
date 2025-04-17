import { useState } from "react";
import GroupBox from "@/components/UI/Groupbox";
import FilterableTable from "@/components/widgets/FilterableTable";
import Button from "@/components/UI/Button";

export default function IDInvoiceDeliveryTab() {
  const [data, setData] = useState([
    {
      id: 1,
      index: "1",
      actNumber: "АОСР-001",
      actName: "АОСР скрытых работ",
      location: "Ось А-Г, Отм. +0.000",
      period: "01.03.2025 – 05.03.2025",
      note: "",
      checked: false
    },
    {
      id: 2,
      index: "2",
      actNumber: "ИГС-002",
      actName: "Испытания сварных соединений",
      location: "Секция 2",
      period: "06.03.2025",
      note: "Протокол №45",
      checked: false
    }
  ]);

  const handleToggle = (index) => {
    setData((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], checked: !updated[index].checked };
      return updated;
    });
  };

  return (
    <div className="group-box border border-[--color-border] p-6 ">
      <h3 className="group-box-title mb-4 text-lg font-semibold text-[--color-primary]">
        Накладная на передачу ИД
      </h3>
      <FilterableTable
        columns={[
          {
            header: "✓",
            accessor: "checked",
            noFilter: true,
            render: (_, row, i) => (
              <input
                type="checkbox"
                checked={row.checked || false}
                onChange={() => handleToggle(i)}
              />
            )
          },
          { header: "№ п/п", accessor: "index", filterType: "text" },
          { header: "№ Акта", accessor: "actNumber", filterType: "text" },
          {
            header: "Наименование актов освидетельствования",
            accessor: "actName",
            filterType: "text"
          },
          {
            header: "Место освидетельствования",
            accessor: "location",
            filterType: "text"
          },
          {
            header: "Время (период)",
            accessor: "period",
            filterType: "text"
          },
          { header: "Примечание", accessor: "note", filterType: "text" }
        ]}
        data={data}
        pageSize={30}
      />

      <div className="flex justify-end gap-4 mt-4">
        <Button>Сохранить</Button>
        <Button>Сформировать</Button>
      </div>
    </div>
  );
}