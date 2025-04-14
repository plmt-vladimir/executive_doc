import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "@/components/layout/PageWrapper";
import ComboBox from "@/components/UI/ComboBox";
import Button from "@/components/UI/Button";
import Table from "@/components/widgets/Table";

export default function AOSRList() {
  const [construction, setConstruction] = useState("");
  const [object, setObject] = useState("");
  const [section, setSection] = useState("");
  const [aosrList, setAosrList] = useState([]);

  const navigate = useNavigate(); // добавлено

  const handleAdd = () => {
    navigate("/aosrlist/create"); // редирект на страницу создания
  };

  const handleEdit = () => {
    // логика редактирования
  };

  const handleDelete = () => {
    // логика удаления
  };

  const handleCopy = () => {
    // логика копирования
  };

  return (
    <PageWrapper title="Акты освидетельствования скрытых работ">
      <div className="group-box border border-[--color-border]">
        <h3 className="group-box-title mb-4">
          Акты освидетельствования скрытых работ
        </h3>

        {/* Комбобоксы */}
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
        <Table
          headers={[
            "Наименование",
            "Статус",
            "Объект",
            "Участок",
            "Заказчик",
            "Генподрядчик",
            "СтройКонтроль",
            "Проектировщик",
            "Подрядчик",
          ]}
          rows={aosrList.map((item) => [
            item.name,
            item.status,
            item.object,
            item.section,
            item.customer,
            item.generalContractor,
            item.supervisor,
            item.designer,
            item.contractor,
          ])}
        />

        {/* Кнопки */}
        <div className="flex justify-end gap-2 mt-4">
          <Button onClick={handleAdd}>Добавить</Button>
          <Button onClick={handleEdit}>Редактировать</Button>
          <Button onClick={handleDelete}>Удалить</Button>
          <Button onClick={handleCopy}>Создать копию</Button>
        </div>
      </div>
    </PageWrapper>
  );
}