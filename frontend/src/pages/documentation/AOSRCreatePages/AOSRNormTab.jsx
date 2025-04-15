import Input from "@/components/UI/Input";
import Textarea from "@/components/UI/Textarea";
import ComboBox from "@/components/UI/ComboBox";
import FormField from "@/components/UI/FormField";
import Button from "@/components/UI/Button";
import { useState } from "react";
import GroupBox from "@/components/UI/Groupbox";

export default function AOSRNormTab() {
  const [normOptions] = useState([
    { label: "СП 70.13330.2012", value: "sp70" },
    { label: "ГОСТ 25100-2011", value: "gost25100" },
    { label: "СНиП 3.03.01-87", value: "snip30301" },
  ]);

  const renderDocSection = (title) => (
    <GroupBox bordered className="w-full">
      <h4 className="group-box-title mb-2">{title}</h4>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <ComboBox placeholder="Раздел проекта" options={[]} />
        <Input placeholder="Шифр раздела" />
        <Input placeholder="Листы" />
      </div>
  
      <div className="mb-4">
        <Textarea placeholder="Полное название" />
      </div>
  
      <div className="mb-4">
        <Input placeholder="Проектная организация" />
      </div>
  
      <div className="mb-4">
        <Textarea placeholder="Представление в документе" />
      </div>
  
      <div className="grid grid-cols-3 items-center gap-4">
        <ComboBox
          placeholder="Нормативные документы и СП"
          options={normOptions}
          className="col-span-2"
        />
        <FormField
          type="checkbox"
          label="Исполнительный реестр"
        />
      </div>
  
      <div className="mt-4">
        <Input placeholder="Представление в документе с указанием СП" />
      </div>
    </GroupBox>
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-4">
        {renderDocSection("Основной раздел проекта")}
        {renderDocSection("Вспомогательный раздел проекта")}
      </div>

      <Textarea
        placeholder="Представление в документе"
        className="h-24"
      />

      <Textarea
        placeholder="Представление в документе с указанием СП"
        className="h-24"
      />

      <div className="flex justify-end gap-4">
        <Button>Очистить</Button>
        <Button>Применить</Button>
      </div>
    </div>
  );
}