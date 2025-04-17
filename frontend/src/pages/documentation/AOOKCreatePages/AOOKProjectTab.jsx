import { useState } from "react";
import GroupBox from "@/components/UI/Groupbox";
import Textarea from "@/components/UI/Textarea";
import Button from "@/components/UI/Button";

export default function AOOKProjectTab() {
  const [normDocs, setNormDocs] = useState([
    { name: "СП 70.13330.2012", checked: true },
    { name: "ГОСТ 25100-2011", checked: false },
    { name: "СНиП 3.03.01-87", checked: true },
    { name: "СП 70.13330.2012", checked: true },
    { name: "ГОСТ 25100-2011", checked: false },
    { name: "СНиП 3.03.01-87", checked: true },
    { name: "СП 70.13330.2012", checked: true },
    { name: "ГОСТ 25100-2011", checked: false },
    { name: "СНиП 3.03.01-87", checked: true },
    { name: "СП 70.13330.2012", checked: true },
    { name: "ГОСТ 25100-2011", checked: false },
    { name: "СНиП 3.03.01-87", checked: true },
    { name: "СП 70.13330.2012", checked: true },
    { name: "ГОСТ 25100-2011", checked: false },
    { name: "СНиП 3.03.01-87", checked: true },
    { name: "СП 70.13330.2012", checked: true },
    { name: "ГОСТ 25100-2011", checked: false },
    { name: "СНиП 3.03.01-87", checked: true },
    { name: "СП 70.13330.2012", checked: true },
    { name: "ГОСТ 25100-2011", checked: false },
    { name: "СНиП 3.03.01-87", checked: true },
    { name: "СП 70.13330.2012", checked: true },
    { name: "ГОСТ 25100-2011", checked: false },
    { name: "СНиП 3.03.01-87", checked: true },
    { name: "СП 70.13330.2012", checked: true },
    { name: "ГОСТ 25100-2011", checked: false },
    { name: "СНиП 3.03.01-87", checked: true },
    { name: "СП 70.13330.2012", checked: true },
    { name: "ГОСТ 25100-2011", checked: false },
    { name: "СНиП 3.03.01-87", checked: true },
    { name: "СП 70.13330.2012", checked: true },
    { name: "ГОСТ 25100-2011", checked: false },
    { name: "СНиП 3.03.01-87", checked: true },
    { name: "СП 70.13330.2012", checked: true },
    { name: "ГОСТ 25100-2011", checked: false },
    { name: "СНиП 3.03.01-87", checked: true },
    { name: "СП 70.13330.2012", checked: true },
    { name: "ГОСТ 25100-2011", checked: false },
    { name: "СНиП 3.03.01-87", checked: true },
    { name: "СП 70.13330.2012", checked: true },
    { name: "ГОСТ 25100-2011", checked: false },
    { name: "СНиП 3.03.01-87", checked: true },
    { name: "СП 70.13330.2012", checked: true },
    { name: "ГОСТ 25100-2011", checked: false },
    { name: "СНиП 3.03.01-87", checked: true }
  ]);

  const [projectDocs, setProjectDocs] = useState([
    { name: "22К059-КЖ1", pages: "1-13", org: "ООО ПБ «Линия»", checked: true },
    { name: "22К059-КМ1", pages: "1-15", org: "ООО ПроектСтрой", checked: false },
    { name: "22К059-КМ2", pages: "1-10", org: "ООО Структура", checked: true },
  ]);

  const [normText, setNormText] = useState("");
  const [projectText, setProjectText] = useState("");
  const [otherDocs, setOtherDocs] = useState("");
  const [summary, setSummary] = useState("");

  const handleSelectAllNorms = () => {
    setNormDocs(normDocs.map((d) => ({ ...d, checked: true })));
  };
  const handleClearNorms = () => {
    setNormDocs(normDocs.map((d) => ({ ...d, checked: false })));
  };

  const handleSelectAllProjects = () => {
    setProjectDocs(projectDocs.map((d) => ({ ...d, checked: true })));
  };
  const handleClearProjects = () => {
    setProjectDocs(projectDocs.map((d) => ({ ...d, checked: false })));
  };

  return (
    <div className="flex flex-col gap-4 text-sm text-[--color-primary]">
      <div className="grid grid-cols-6 gap-4">
        {/* Нормативная документация */}
        <GroupBox title="Нормативная документация" className="col-span-2 group-box border border-[--color-border]">
          <div className="h-60 overflow-y-auto border border-[--color-border] rounded mb-2">
            <table className="w-full table-auto">
              <tbody>
                {normDocs.map((doc, i) => (
                  <tr key={i} className="border-b border-[--color-border]">
                    <td className="px-2 py-1 text-center">
                      <input
                        type="checkbox"
                        checked={doc.checked}
                        onChange={() => {
                          const newDocs = [...normDocs];
                          newDocs[i].checked = !newDocs[i].checked;
                          setNormDocs(newDocs);
                        }}
                      />
                    </td>
                    <td className="px-2 py-1">{doc.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex gap-2 justify-end">
            <Button size="sm" onClick={handleSelectAllNorms}>Выбрать</Button>
            <Button size="sm" onClick={handleClearNorms}>Очистить</Button>
          </div>
        </GroupBox>

        {/* Проектные документы */}
        <GroupBox title="Выполненные согласно разделам проекта" className="col-span-4 group-box border border-[--color-border]">
          <div className="h-60 overflow-y-auto border border-[--color-border] rounded mb-2">
            <table className="w-full table-auto">
              <thead className="bg-[--color-primary] text-white text-center">
                <tr>
                  <th className="px-2 py-1 w-8">✓</th>
                  <th className="px-2 py-1">Наименование</th>
                  <th className="px-2 py-1">Номера листов</th>
                  <th className="px-2 py-1">Организация</th>
                </tr>
              </thead>
              <tbody>
                {projectDocs.map((doc, i) => (
                  <tr key={i} className="border-b border-[--color-border] text-center">
                    <td>
                      <input
                        type="checkbox"
                        checked={doc.checked}
                        onChange={() => {
                          const newDocs = [...projectDocs];
                          newDocs[i].checked = !newDocs[i].checked;
                          setProjectDocs(newDocs);
                        }}
                      />
                    </td>
                    <td className="px-2 py-1">{doc.name}</td>
                    <td className="px-2 py-1">{doc.pages}</td>
                    <td className="px-2 py-1">{doc.org}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex gap-2 justify-end">
            <Button size="sm" onClick={handleSelectAllProjects}>Выбрать</Button>
            <Button size="sm" onClick={handleClearProjects}>Очистить</Button>
          </div>
        </GroupBox>
      </div>

      {/* Три текстовых поля на одной строке */}
      <div className="grid grid-cols-3 gap-4">
        <Textarea
          placeholder="Ссылка на нормативные документы"
          rows={4}
          value={normText}
          onChange={(e) => setNormText(e.target.value)}
        />
        <Textarea
          placeholder="Ссылка на проектные документы"
          rows={4}
          value={projectText}
          onChange={(e) => setProjectText(e.target.value)}
        />
        <Textarea
          placeholder="Прочие документы"
          rows={4}
          value={otherDocs}
          onChange={(e) => setOtherDocs(e.target.value)}
        />
      </div>

      {/* Представление */}
      <div>
        <label className="text-sm mb-1 block">Представление в документе:</label>
        <Textarea
          placeholder="Представление в документе"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          rows={4}
          className="w-full"
        />
      </div>
    </div>
  );
}