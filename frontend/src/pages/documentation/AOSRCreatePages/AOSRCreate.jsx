import { useState } from "react";
import PageWrapper from "@/components/layout/PageWrapper";
import ComboBox from "@/components/UI/ComboBox";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import Tabs from "@/components/UI/Tabs";
import AOSRDescriptionTab from "./AOSRDescriptionTab";
import AOSRNormTab from "./AOSRNormTab";
import AOSRMaterialsTab from "./AOSRMaterialsTab";
import AOSRDocsTab from "./AOSRDocsTab";
import AOSRResponsibleTab from "./AOSRResponsibleTab";

export default function AOSRCreate() {
  const [construction, setConstruction] = useState("");
  const [object, setObject] = useState("");
  const [section, setSection] = useState("");
  const [actNumber, setActNumber] = useState("");
  const [actName, setActName] = useState("");

  const tabs = [
    { label: "Описание работ", component: <AOSRDescriptionTab /> },
    { label: "Нормативная документация", component: <AOSRNormTab /> },
    { label: "Материалы", component: <AOSRMaterialsTab /> },
    { label: "Исполнительная документация", component: <AOSRDocsTab /> },
    { label: "Ответственные лица", component: <AOSRResponsibleTab /> },
  ];

  return (
    <PageWrapper title="Создание акта освидетельствования">
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
            className="col-span-5"
          />
        </div>
      </div>

      {/* Tabs — кастомные */}
      <Tabs tabs={tabs} />

      {/* Кнопка */}
      <div className="flex justify-end mt-6">
        <Button>Сформировать АОСР</Button>
      </div>
    </PageWrapper>
  );
}