import { useState } from "react";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";

export default function AOSRDescriptionTab() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [signDate, setSignDate] = useState("");
  const [sectionCode, setSectionCode] = useState("");
  const [axes, setAxes] = useState("");
  const [marks, setMarks] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");

  const [insertSectionName, setInsertSectionName] = useState(false);
  const [insertAxes, setInsertAxes] = useState(false);
  const [insertMarks, setInsertMarks] = useState(false);

  return (
    <div className="flex flex-col gap-6">

      {/* Первая строка: даты */}
      <div className="grid grid-cols-6 gap-4">
        <Input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          placeholder="Дата начала работ"
          className="col-span-2"
        />
        <Input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          placeholder="Дата окончания работ"
          className="col-span-2"
        />
        <Input
          type="date"
          value={signDate}
          onChange={(e) => setSignDate(e.target.value)}
          placeholder="Дата подписания"
          className="col-span-2"
        />
      </div>

      {/* Код участка, оси, отметки + дополнительные сведения */}
      <div className="grid grid-cols-5 gap-4">
        {/* Левый столбец с чекбоксами и инпутами */}
        <div className="flex flex-col gap-4 col-span-2">
          <div className="flex items-center gap-2">
            <Input placeholder="Код участка" value={sectionCode} onChange={(e) => setSectionCode(e.target.value)} />
            <label className="flex items-center gap-2 text-sm text-[--color-primary]">
              <input type="checkbox" checked={insertSectionName} onChange={() => setInsertSectionName(!insertSectionName)} />
              Вставить в название
            </label>
          </div>

          <div className="flex items-center gap-2">
            <Input placeholder="Оси в которых выполнена конструкция" value={axes} onChange={(e) => setAxes(e.target.value)} />
            <label className="flex items-center gap-2 text-sm text-[--color-primary]">
              <input type="checkbox" checked={insertAxes} onChange={() => setInsertAxes(!insertAxes)} />
              Вставить в название
            </label>
          </div>

          <div className="flex items-center gap-2">
            <Input placeholder="Отметки" value={marks} onChange={(e) => setMarks(e.target.value)} />
            <label className="flex items-center gap-2 text-sm text-[--color-primary]">
              <input type="checkbox" checked={insertMarks} onChange={() => setInsertMarks(!insertMarks)} />
              Вставить в название
            </label>
          </div>
        </div>

        {/* Правый большой инпут */}
        <textarea
          placeholder="Дополнительные сведения"
          value={additionalInfo}
          onChange={(e) => setAdditionalInfo(e.target.value)}
          className="col-span-3 p-2 rounded border border-[--color-border] bg-white text-[--color-primary] resize-none h-full"
        />
      </div>

      {/* Таблицы "К освидетельствованию" и "Последующие работы" */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="text-sm text-[--color-primary] mb-1">К освидетельствованию предъявлены следующие работы:</h4>
          <div className="border border-[--color-border] rounded p-2 bg-white h-32">[Тут будет таблица 1]</div>
        </div>
        <div>
          <h4 className="text-sm text-[--color-primary] mb-1">Последующие работы:</h4>
          <div className="border border-[--color-border] rounded p-2 bg-white h-32">[Тут будет таблица 2]</div>
        </div>
      </div>

      {/* Групбокс селектора работ */}
      <div className="group-box border border-[--color-border] p-4 rounded-2xl">
        <h4 className="group-box-title mb-2">Селектор работ</h4>
        <div className="text-sm text-gray-500">[Контент селектора работ]</div>
      </div>

      {/* Статус + Кнопки */}
      <div className="grid grid-cols-6 gap-4 items-center">
        <select className="col-span-2 p-2 rounded border border-[--color-border] bg-white text-[--color-primary]">
          <option>Статус акта</option>
        </select>
        <div className="col-span-4 flex justify-end gap-2">
          <Button variant="secondary">Очистить</Button>
          <Button>Применить</Button>
          <Button>Загрузить</Button>
        </div>
      </div>
    </div>
  );
}