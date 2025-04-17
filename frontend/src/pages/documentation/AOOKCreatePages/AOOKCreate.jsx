import { useState } from "react";
import PageWrapper from "@/components/layout/PageWrapper";
import ComboBox from "@/components/UI/ComboBox";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import Tabs from "@/components/UI/Tabs";
// Вкладки
import AOOKDescriptionTab from "./AOOKDescriptionTab";
import AOOKHiddenWorksTab from "./AOOKHiddenWorksTab";
import AOOKMaterialsTab from "./AOOKMaterialsTab";
import AOOKDocsTab from "./AOOKDocsTab";
import AOOKTestingTab from "./AOOKTestingTab";
import AOOKCommissionTab from "./AOOKCommissionTab";
import AOOKResponsibleTab from "./AOOKResponsibleTab";
import AOOKProjectTab from "./AOOKProjectTab";

export default function AOOKCreate() {
  const [construction, setConstruction] = useState("");
  const [object, setObject] = useState("");
  const [section, setSection] = useState("");
  const [actNumber, setActNumber] = useState("");
  const [actName, setActName] = useState("");

  const tabs = [
    { label: "Описание конструкций", component: <AOOKDescriptionTab /> },
    { label: "Скрытые работы", component: <AOOKHiddenWorksTab /> },
    { label: "Проект", component: <AOOKProjectTab /> },
    { label: "Материалы", component: <AOOKMaterialsTab /> },
    { label: "Исполнительная документация", component: <AOOKDocsTab /> },
    { label: "Испытания", component: <AOOKTestingTab /> },
    { label: "Выводы комиссии", component: <AOOKCommissionTab /> },
    { label: "Ответственные лица", component: <AOOKResponsibleTab /> },
  ];

  return (
    <PageWrapper title="Создание акта АООК">
      <div className="group-box border border-[--color-border] mb-4">
        <h3 className="group-box-title mb-4">Объект</h3>

        {/* Первая строка: стройка, объект, участок */}
        <div className="grid grid-cols-6 gap-4 mb-4">
          <ComboBox
            placeholder="Стройка"
            options={[]}
            value={construction}
            onChange={setConstruction}
            className="col-span-2"
          />
          <ComboBox
            placeholder="Объект"
            options={[]}
            value={object}
            onChange={setObject}
            className="col-span-2"
          />
          <ComboBox
            placeholder="Участок"
            options={[]}
            value={section}
            onChange={setSection}
            className="col-span-2"
          />
        </div>

        {/* Вторая строка: № акта и наименование */}
        <div className="grid grid-cols-6 gap-4">
          <Input
            placeholder="№ Акта"
            value={actNumber}
            onChange={(e) => setActNumber(e.target.value)}
            className="col-span-1"
          />
          <Input
            placeholder="Полное наименование акта"
            value={actName}
            onChange={(e) => setActName(e.target.value)}
            className="col-span-4"
          />
          {/* Статус акта */}
        <select className="w-full p-2 rounded border border-[--color-border] text-[--color-primary]">
          <option>Статус акта</option>
          <option>Черновик</option>
          <option>Подписан</option>
          <option>Отклонён</option>
        </select>
        </div>
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} />

      {/* Кнопка */}
      <div className="flex justify-end mt-6">
        <Button>Сформировать АООК</Button>
      </div>
    </PageWrapper>
  );
}