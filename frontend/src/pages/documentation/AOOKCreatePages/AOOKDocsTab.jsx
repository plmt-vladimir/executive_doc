import { useState } from "react";
import GroupBox from "@/components/UI/Groupbox";
import Textarea from "@/components/UI/Textarea";
import Button from "@/components/UI/Button";

export default function AOOKDocsTab() {
  const [geoSchemes, setGeoSchemes] = useState([
    { name: "Геосхема 1", checked: true },
    { name: "Геосхема 2", checked: false },
    { name: "Геосхема 3", checked: true },
  ]);

  const [inspections, setInspections] = useState([
    { name: "Экспертиза 1", checked: true },
    { name: "Испытание 1", checked: false },
    { name: "Лабораторное исследование 1", checked: false },
  ]);

  const [geoText, setGeoText] = useState("");
  const [inspText, setInspText] = useState("");

  const handleToggle = (list, setList, index) => {
    const newList = [...list];
    newList[index].checked = !newList[index].checked;
    setList(newList);
  };

  const handleClear = (setList) => {
    setList((prev) => prev.map((item) => ({ ...item, checked: false })));
  };

  const handleSelectAll = (setList) => {
    setList((prev) => prev.map((item) => ({ ...item, checked: true })));
  };

  return (
    <div className="flex flex-col text-sm text-[--color-primary]">
      <p className="font-bold mb-6">
        5. Предъявлены документы, подтверждающие соответствие конструкций предъявнным к ним требованиям в том числе:
      </p>
      <div className="grid grid-cols-2 gap-4">
        {/* Геосхемы */}
        <GroupBox title="а) Исполнительные геодезические схемы положения конструкций" className="group-box border border-[--color-border] h-full">
          <div className="h-60 overflow-y-auto border border-[--color-border] rounded mb-2">
            <table className="w-full table-auto">
              <tbody>
                {geoSchemes.map((doc, i) => (
                  <tr key={i} className="border-b border-[--color-border]">
                    <td className="px-2 py-1 text-center">
                      <input type="checkbox" checked={doc.checked} onChange={() => handleToggle(geoSchemes, setGeoSchemes, i)} />
                    </td>
                    <td className="px-2 py-1">{doc.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Textarea
            placeholder="Представление в документе"
            value={geoText}
            onChange={(e) => setGeoText(e.target.value)}
            rows={4}
            className="mb-2"
          />
          <div className="flex gap-2">
            <Button onClick={() => handleClear(setGeoSchemes)}>Очистить</Button>
            <Button onClick={() => handleSelectAll(setGeoSchemes)}>Выбрать</Button>
          </div>
        </GroupBox>

        {/* Экспертизы */}
        <GroupBox title="б) Результаты экспертиз, обследований, лабораторных и иных испытаний..." className="group-box border border-[--color-border] h-full">
          <div className="h-60 overflow-y-auto border border-[--color-border] rounded mb-2">
            <table className="w-full table-auto">
              <tbody>
                {inspections.map((doc, i) => (
                  <tr key={i} className="border-b border-[--color-border]">
                    <td className="px-2 py-1 text-center">
                      <input type="checkbox" checked={doc.checked} onChange={() => handleToggle(inspections, setInspections, i)} />
                    </td>
                    <td className="px-2 py-1">{doc.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Textarea
            placeholder="Представление в документе"
            value={inspText}
            onChange={(e) => setInspText(e.target.value)}
            rows={4}
            className="mb-2"
          />
          <div className="flex gap-2">
            <Button onClick={() => handleClear(setInspections)}>Очистить</Button>
            <Button onClick={() => handleSelectAll(setInspections)}>Выбрать</Button>
          </div>
        </GroupBox>
      </div>
    </div>
  );
}