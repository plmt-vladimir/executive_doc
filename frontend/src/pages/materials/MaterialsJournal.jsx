import { useState } from "react";
import PageWrapper from "@/components/layout/PageWrapper";
import MultiSelectComboBox from "@/components/UI/MultiSelectComboBox";
import Tabs from "@/components/UI/Tabs";

import MaterialsJournalList from "./MaterialsJournalPages/MaterialsJournalList";
import MaterialsReceipt from "./MaterialsJournalPages/MaterialsReceipt";

export default function MaterialsJournal() {
  const [construction, setConstruction] = useState([]);
  const [object, setObject] = useState([]);
  const [section, setSection] = useState([]);

  const tabs = [
    { label: "Поступления материалов", component: <MaterialsJournalList /> },
    { label: "Новое поступление", component: <MaterialsReceipt /> }
  ];

  return (
    <PageWrapper title="Журнал входного контроля материалов">
      <div className="group-box border border-[--color-border] p-4 mb-4">
        <h3 className="group-box-title mb-4 text-[--color-primary]">
          Объект
        </h3>
        <div className="grid grid-cols-6 gap-4">
          <MultiSelectComboBox
            placeholder="Стройка"
            options={[]}
            value={construction}
            onChange={setConstruction}
            className="col-span-2"
          />
          <MultiSelectComboBox
            placeholder="Объект"
            options={[]}
            value={object}
            onChange={setObject}
            className="col-span-2"
          />
          <MultiSelectComboBox
            placeholder="Участок"
            options={[]}
            value={section}
            onChange={setSection}
            className="col-span-2"
          />
        </div>
      </div>

      <Tabs tabs={tabs} />
    </PageWrapper>
  );
}