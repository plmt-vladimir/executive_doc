import { useState } from "react";
import ComboBox from "@/components/UI/ComboBox";
import Textarea from "@/components/UI/Textarea";
import Input from "@/components/UI/Input";
import FormField from "@/components/UI/FormField";

export default function AOOKDescriptionTab() {
  const [includeSection, setIncludeSection] = useState(false);
  const [includeAxes, setIncludeAxes] = useState(false);
  const [includeMarks, setIncludeMarks] = useState(false);
  const [includeProject, setIncludeProject] = useState(false);

  return (
    <div className="flex flex-col gap-4 text-sm text-[--color-primary]">
      <div className="grid grid-cols-3 gap-4">
        <Input type="date" placeholder="Дата начала работ" />
        <Input type="date" placeholder="Дата окончания работ" />
        <Input type="date" placeholder="Дата подписания" />
      </div>
      <Input placeholder="Конструкции принятые к освидетельствованию" />
      <div className="grid grid-cols-7 gap-4">
        <div className="group-box border border-[--color-border] col-span-2">
          <h3 className="group-box-title mb-4">Проектные данные</h3>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <FormField
                type="checkbox"
                label="Вставить в название"
                checked={includeProject}
                onChange={(e) => setIncludeProject(e.target.checked)}
              />
              <ComboBox
                placeholder="Основной раздел проекта"
                options={[
                  { label: "КЖ1", value: "КЖ1" },
                  { label: "КЖ2", value: "КЖ2" },
                ]}
                size="sm"
                className="w-full"
              />
            </div>

            <div className="flex items-center gap-2">
              <FormField
                type="checkbox"
                label="Вставить в название"
                checked={includeSection}
                onChange={(e) => setIncludeSection(e.target.checked)}
              />
              <ComboBox placeholder="Код участка" options={[]} size="sm" className="w-full" />
            </div>

            <div className="flex items-center gap-2">
              <FormField
                type="checkbox"
                label="Вставить в название"
                checked={includeAxes}
                onChange={(e) => setIncludeAxes(e.target.checked)}
              />
              <ComboBox placeholder="Оси" options={[]} size="sm" className="w-full" />
            </div>

            <div className="flex items-center gap-2">
              <FormField
                type="checkbox"
                label="Вставить в название"
                checked={includeMarks}
                onChange={(e) => setIncludeMarks(e.target.checked)}
              />
              <ComboBox placeholder="Отметки" options={[]} size="sm" className="w-full" />
            </div>
          </div>
        </div>
        <div className="group-box border border-[--color-border] col-span-5">
          <h3 className="group-box-title mb-4">Представление</h3>
          <div className="flex flex-col gap-4">
            <Textarea
              placeholder="К освидетельствованию предъявлены следующие конструкции"
              rows={2}
              className="w-full"
            />
            <Textarea
              placeholder="Полное наименование конструкций"
              rows={2}
              className="w-full"
            />
            <Textarea
              placeholder="Дополнительные сведения"
              rows={2}
              className="w-full"
            />
            <Textarea
              placeholder="Последующие работы"
              rows={2}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}