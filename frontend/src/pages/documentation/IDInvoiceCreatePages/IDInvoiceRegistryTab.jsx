import { useState } from "react";
import GroupBox from "@/components/UI/Groupbox";
import FilterableTable from "@/components/widgets/FilterableTable";
import Button from "@/components/UI/Button";

export default function IDInvoiceRegistryTab() {
  const [data, setData] = useState([
    {
      id: 1,
      index: "1",
      actNumber: "АОСР-001",
      actName: "АОСР скрытых работ",
      date: "01.03.2025",
      organization: "ООО СтройИнвест",
      pages: "5",
      copies: "2",
      checked: false
    },
    {
      id: 2,
      index: "2",
      actNumber: "ИГС-002",
      actName: "Испытания сварных соединений",
      date: "06.03.2025",
      organization: "АО ГеоТест",
      pages: "3",
      copies: "1",
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
        Реестр исполнительной документации
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
          { header: "Дата подписания", accessor: "date", filterType: "text" },
          { header: "Организация", accessor: "organization", filterType: "text" },
          { header: "Кол-во листов", accessor: "pages", filterType: "text" },
          { header: "Кол-во экз.", accessor: "copies", filterType: "text" }
        ]}
        data={data}
        pageSize={10}
      />

      <div className="flex justify-end gap-4 mt-4">
        <Button>Сохранить</Button>
        <Button>Сформировать</Button>
      </div>
    </div>
  );
}