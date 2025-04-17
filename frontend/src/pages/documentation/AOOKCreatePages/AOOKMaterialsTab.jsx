import { useState } from "react";
import GroupBox from "@/components/UI/Groupbox";
import Textarea from "@/components/UI/Textarea";
import Button from "@/components/UI/Button";

export default function AOOKMaterialsTab() {
  const [materials, setMaterials] = useState([
    { id: 1, name: "Бетон B25 F100 W6", checked: true },
    { id: 2, name: "Арматура A400", checked: false },
    { id: 3, name: "Песок строительный", checked: false }
  ]);

  const [certificates, setCertificates] = useState([
    { id: 1, name: "Документ № 55721 от 13.09.2023", checked: true },
    { id: 2, name: "Документ № 19366/0823 от 24.08.2023", checked: false }
  ]);

  const [representation, setRepresentation] = useState("");
  const [attachments, setAttachments] = useState("");

  const toggleCheckAll = (setter, list, value) => {
    setter(list.map(item => ({ ...item, checked: value })));
  };

  const toggleSingle = (setter, list, id) => {
    setter(list.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  return (
    <div className="flex flex-col gap-4 text-sm text-[--color-primary]">
      <p className="font-bold">4. При выполнении конструкций применены материалы:</p>

      <div className="grid grid-cols-2 gap-4">
        <GroupBox title="а) Материалы" className="group-box border border-[--color-border]">
          <div className="h-60 overflow-y-auto border border-[--color-border]">
            <table className="w-full">
              <tbody>
                {materials.map((mat) => (
                  <tr key={mat.id} className="border-b border-[--color-border]">
                    <td className="px-2 py-1 text-left">
                      <input
                        type="checkbox"
                        checked={mat.checked}
                        onChange={() => toggleSingle(setMaterials, materials, mat.id)}
                        className="mr-2"
                      />
                      {mat.name}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex gap-2 mt-2">
            <Button onClick={() => toggleCheckAll(setMaterials, materials, false)}>Очистить</Button>
            <Button onClick={() => toggleCheckAll(setMaterials, materials, true)}>Выбрать все</Button>
          </div>
        </GroupBox>

        <GroupBox title="б) Паспорта и сертификаты" className="group-box border border-[--color-border]">
          <div className="h-60 overflow-y-auto border border-[--color-border]">
            <table className="w-full">
              <tbody>
                {certificates.map((doc) => (
                  <tr key={doc.id} className="border-b border-[--color-border]">
                    <td className="px-2 py-1 text-left">
                      <input
                        type="checkbox"
                        checked={doc.checked}
                        onChange={() => toggleSingle(setCertificates, certificates, doc.id)}
                        className="mr-2"
                      />
                      {doc.name}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex gap-2 mt-2">
            <Button onClick={() => toggleCheckAll(setCertificates, certificates, false)}>Очистить</Button>
            <Button onClick={() => toggleCheckAll(setCertificates, certificates, true)}>Выбрать все</Button>
          </div>
        </GroupBox>
      </div>

      <div>
        <label className="text-sm block mb-1">Представление в документе:</label>
        <Textarea
          placeholder="Представление в документе"
          value={representation}
          onChange={(e) => setRepresentation(e.target.value)}
          rows={4}
          className="w-full"
        />
      </div>

      <div>
        <label className="text-sm block mb-1">в) Приложения:</label>
        <Textarea
          placeholder="в) Приложения"
          value={attachments}
          onChange={(e) => setAttachments(e.target.value)}
          rows={4}
          className="w-full"
        />
      </div>
    </div>
  );
}