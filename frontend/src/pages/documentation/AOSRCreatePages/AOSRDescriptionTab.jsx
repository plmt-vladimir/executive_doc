import { useState } from "react";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import Table from "@/components/widgets/Table";
import FormField from "@/components/UI/FormField";
import Textarea from "@/components/UI/Textarea";
import ComboBox from "@/components/UI/ComboBox";
import TreeView from "@/components/widgets/TreeView"; 

export default function AOSRDescriptionTab() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [signDate, setSignDate] = useState("");
  const [codeSection, setCodeSection] = useState("");
  const [axes, setAxes] = useState("");
  const [marks, setMarks] = useState("");
  const [insertCodeSection, setInsertCodeSection] = useState(false);
  const [insertAxes, setInsertAxes] = useState(false);
  const [insertMarks, setInsertMarks] = useState(false);
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [works, setWorks] = useState([]);
  const [nextWorks, setNextWorks] = useState([]);
  const [registryCode, setRegistryCode] = useState("");
  const [treeData, setTreeData] = useState([]);

  return (
    <div className="flex flex-col gap-6">
      {/* Блок дат */}
      <div className="grid grid-cols-6 gap-4">
        <div className="flex flex-col col-span-2">
          <label className="text-sm text-[--color-primary]">Дата начала работ:</label>
          <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </div>
        <div className="flex flex-col col-span-2">
          <label className="text-sm text-[--color-primary]">Дата окончания работ:</label>
          <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </div>
        <div className="flex flex-col col-span-2">
          <label className="text-sm text-[--color-primary]">Дата подписания:</label>
          <Input type="date" value={signDate} onChange={(e) => setSignDate(e.target.value)} />
        </div>
      </div>

      {/* Основной блок с кодами и доп. сведениями */}
      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-2 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Input placeholder="Код участка" value={codeSection} onChange={(e) => setCodeSection(e.target.value)} className="w-full" />
            <FormField
              type="checkbox"
              label="Вставить в название"
              checked={insertCodeSection}
              onChange={(e) => setInsertCodeSection(e.target.checked)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Input placeholder="Оси в которых выполнена конструкция" value={axes} onChange={(e) => setAxes(e.target.value)} className="w-full" />
            <FormField
              type="checkbox"
              label="Вставить в название"
              checked={insertAxes}
              onChange={(e) => setInsertAxes(e.target.checked)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Input placeholder="Отметки" value={marks} onChange={(e) => setMarks(e.target.value)} className="w-full" />
            <FormField
              type="checkbox"
              label="Вставить в название"
              checked={insertMarks}
              onChange={(e) => setInsertMarks(e.target.checked)}
            />
          </div>
        </div>

        <div className="col-span-3">
          <Textarea
            placeholder="Дополнительные сведения"
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
            className="col-span-3 h-full"
          />
        </div>
      </div>

      {/* Таблицы работ */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-[--color-primary] mb-1 block">К освидетельствованию предъявлены следующие работы:</label>
          <Table
            headers={["", "Наименование работы"]}
            rows={works.map((work) => [<input type="checkbox" key={work.id} />, work.name])}
          />
        </div>
        <div>
          <label className="text-sm text-[--color-primary] mb-1 block">Последующие работы:</label>
          <Table
            headers={["", "Наименование работы"]}
            rows={nextWorks.map((work) => [<input type="checkbox" key={work.id} />, work.name])}
          />
        </div>
      </div>

      {/* Селектор работ */}
      <div className="group-box border border-[--color-border]">
        <h3 className="group-box-title mb-2">Селектор работ</h3>

        <div className="grid grid-cols-6 gap-4 items-start">
          {/* Левая колонка */}
          <div className="col-span-1 flex flex-col gap-2">
            <Input placeholder="Код реестра" />

            {[
              "Код номер",
              "Код тип",
              "Код участка",
              "Код в АООК"
            ].map((label, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="bg-check h-4 w-4" />
                <select className="w-full input text-sm">
                  <option>{label}</option>
                </select>
              </div>
            ))}

            <Button className="mt-2">Загрузить</Button>
          </div>

          {/* Правая часть: дерево */}
          <div className="col-span-5 border border-[--color-border] rounded p-4 bg-white h-60 overflow-y-auto">
            <TreeView
              data={[
                {
                  id: 1,
                  label: "Раздел 1",
                  children: [
                    { id: 11, label: "Работа 1.1" },
                    { id: 12, label: "Работа 1.2" },
                  ],
                },
                {
                  id: 2,
                  label: "Раздел 2",
                  children: [
                    { id: 21, label: "Работа 2.1" },
                  ],
                },
              ]}
            />
          </div>
        </div>
      </div>


      {/* Статус акта */}
      <div>
        <select className="w-full p-2 rounded border border-[--color-border] text-[--color-primary]">
          <option>Статус акта</option>
          <option>Черновик</option>
          <option>Подписан</option>
          <option>Отклонён</option>
        </select>
      </div>

      {/* Кнопки */}
      <div className="flex justify-end gap-2 mt-4">
        <Button>Очистить</Button>
        <Button>Применить</Button>
      </div>
    </div>
  );
}