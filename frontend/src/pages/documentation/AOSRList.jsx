import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "@/components/layout/PageWrapper";
import ComboBox from "@/components/UI/ComboBox";
import Button from "@/components/UI/Button";
import FilterableTable from "@/components/widgets/FilterableTable";
import { Pencil, Copy, Trash2 } from "lucide-react";

export default function AOSRList() {
  const [construction, setConstruction] = useState("");
  const [object, setObject] = useState("");
  const [section, setSection] = useState("");

  const [aosrList, setAosrList] = useState([
    {
      id: 1,
      name: "Гео-схема 01",
      customer: "ООО Заказчик",
      generalContractor: "Генподрядчик",
      supervisor: "СтройКонтроль",
      designer: "Проектировщик",
      contractor: "Подрядчик",
      subContractor: "Субподрядчик 1",
      status: "Черновик"
    },
    {
      id: 2,
      name: "Гео-схема 02",
      customer: "Заказчик 2",
      generalContractor: "Генподряд 2",
      supervisor: "СК 2",
      designer: "Проект 2",
      contractor: "Подряд 2",
      subContractor: "Субподрядчик 2",
      status: "Подписан"
    }
  ]);

  const navigate = useNavigate();

  const handleAdd = () => {
    navigate("/aosrlist/create");
  };

  const handleEdit = (item) => {
    navigate(`/aosrlist/edit/${item.id}`);
  };

  const handleDelete = (item) => {
    setAosrList((prev) => prev.filter((i) => i.id !== item.id));
  };

  const handleCopy = (item) => {
    const copy = { ...item, id: Date.now(), name: `${item.name} (копия)` };
    setAosrList((prev) => [...prev, copy]);
  };

  const handleStatusChange = (id, value) => {
    setAosrList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: value } : item))
    );
  };

  return (
    <PageWrapper title="Акты освидетельствования скрытых работ">
      <div className="group-box border border-[--color-border]">
        <h3 className="group-box-title mb-4">Акты освидетельствования скрытых работ</h3>

        {/* Фильтры */}
        <div className="grid grid-cols-12 gap-4 mb-4">
          <div className="col-span-4">
            <ComboBox
              placeholder="Стройка"
              options={[]}
              value={construction}
              onChange={setConstruction}
            />
          </div>
          <div className="col-span-4">
            <ComboBox
              placeholder="Объект"
              options={[]}
              value={object}
              onChange={setObject}
            />
          </div>
          <div className="col-span-4">
            <ComboBox
              placeholder="Участок"
              options={[]}
              value={section}
              onChange={setSection}
            />
          </div>
        </div>

        {/* Таблица */}
        <FilterableTable
          columns={[
            { header: "Наименование", accessor: "name", filterType: "text" },
            { header: "Заказчик", accessor: "customer", filterType: "text" },
            { header: "Генподрядчик", accessor: "generalContractor", filterType: "text" },
            { header: "Стройконтроль", accessor: "supervisor", filterType: "text" },
            { header: "Проектировщик", accessor: "designer", filterType: "text" },
            { header: "Подрядчик", accessor: "contractor", filterType: "text" },
            { header: "Субподрядчик", accessor: "subContractor", filterType: "text" },
            {
              header: "Статус",
              accessor: "status",
              filterType: "select",
              options: [
                { label: "Черновик", value: "Черновик" },
                { label: "Подписан", value: "Подписан" }
              ],
              render: (val, row) => (
                <select
                  className="border border-[--color-border] rounded px-2 py-1 text-sm"
                  value={val}
                  onChange={(e) => handleStatusChange(row.id, e.target.value)}
                >
                  <option value="Черновик">Черновик</option>
                  <option value="Подписан">Подписан</option>
                </select>
              )
            },
            {
              header: "Действия",
              accessor: "actions",
              noFilter: true,
              render: (_, row) => (
                <div className="flex justify-center gap-2 text-[--color-primary]">
                  <Pencil size={18} className="cursor-pointer" onClick={() => handleEdit(row)} />
                  <Copy size={18} className="cursor-pointer" onClick={() => handleCopy(row)} />
                  <Trash2 size={18} className="cursor-pointer text-red-600" onClick={() => handleDelete(row)} />
                </div>
              )
            }
          ]}
          data={aosrList}
        />

        <div className="flex justify-end mt-4">
          <Button onClick={handleAdd}>Добавить</Button>
        </div>
      </div>
    </PageWrapper>
  );
}