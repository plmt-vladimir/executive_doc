import { useState } from "react";
import PageWrapper from "@/components/layout/PageWrapper";
import ComboBox from "@/components/UI/ComboBox";
import Input from "@/components/UI/Input";
import Textarea from "@/components/UI/Textarea";
import Button from "@/components/UI/Button";
import Table from "@/components/widgets/Table";
import { Pencil, Copy, Trash2 } from "lucide-react";

export default function MaterialsReceipt() {
  const [materials, setMaterials] = useState([
    {
      id: 1,
      group: "Бетон",
      name: "Бетон М300",
      qualityDoc: "Сертификат №123",
      type: "Сертификат",
      date: "2025-03-01",
      validTill: "2026-03-01",
      fileName: "бетон.pdf"
    }
  ]);

  const handleEdit = (item) => {};
  const handleCopy = (item) => {};
  const handleDelete = (item) => {
    setMaterials((prev) => prev.filter((m) => m.id !== item.id));
  };

  return (
    <PageWrapper title="Новое поступление материала">
      {/* Поставщик */}
      <div className="group-box border border-[--color-border] p-4 mb-4">
        <h3 className="group-box-title mb-4 text-[--color-primary]">Поставщик</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 grid grid-cols-2 gap-4">
            <ComboBox placeholder="Организация" options={[]} />
            <ComboBox placeholder="Тип поставки" options={[]} />
            <div className="flex flex-col">
              <label className="text-xs text-[--color-primary] invisible mb-1">Д</label>
              <Input placeholder="№ Записи" />
            </div>
            <div className="flex flex-col">
              <label className="text-xs text-[--color-primary] mb-1">Дата записи</label>
              <Input type="date" />
            </div>
            <div className="flex flex-col">
              <label className="text-xs text-[--color-primary] mb-1 invisible">#</label>
              <Input placeholder="№ Накладной" />
            </div>
            <div className="flex flex-col">
              <label className="text-xs text-[--color-primary] mb-1">Дата накладной</label>
              <Input type="date" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Textarea placeholder="Примечание" rows={4} />
            <div className="flex gap-2 items-end">
              <Input placeholder="Имя файла" className="w-full" />
              <Button>Загрузить накладную</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Добавление материала */}
      <div className="group-box border border-[--color-border] p-4 mb-4">
        <h3 className="group-box-title mb-4 text-[--color-primary]">Добавление материала</h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex flex-col gap-2">
            <ComboBox placeholder="Группа материалов" options={[]} />
            <ComboBox placeholder="Единицы измерения" options={[]} />
            <Input placeholder="Количество" />
            <Input placeholder="Наименование материала" />
          </div>
          <div className="flex flex-col gap-2">
            <ComboBox placeholder="Тип документа о качестве" options={[]} />
            <Input placeholder="Номер документа" />
            <div className="flex flex-col">
              <label className="text-xs text-[--color-primary] mb-1">Дата документа</label>
              <Input type="date" />
            </div>
            <div className="flex gap-2 items-end">
              <div className="w-full flex flex-col">
                <label className="text-xs text-[--color-primary] mb-1">Срок действия</label>
                <Input type="date" className="w-full" />
              </div>
              <Button>Загрузить</Button>
            </div>
          </div>
        </div>
        <Button>Добавить</Button>
      </div>

      {/* Поставленные материалы */}
      <div className="group-box border border-[--color-border] p-4 mb-4">
        <h3 className="group-box-title mb-4 text-[--color-primary]">Поставленные материалы</h3>
        <Table
          headers={[
            "Группа материала",
            "Наименование",
            "Документ о качестве",
            "Тип документа",
            "Дата документа",
            "Срок действия",
            "Имя файла",
            ""
          ]}
          rows={materials.map((item) => [
            item.group,
            item.name,
            item.qualityDoc,
            item.type,
            item.date,
            item.validTill,
            item.fileName,
            <div className="flex justify-center gap-2 text-[--color-primary]">
              <Pencil className="cursor-pointer" onClick={() => handleEdit(item)} />
              <Copy className="cursor-pointer" onClick={() => handleCopy(item)} />
              <Trash2 className="cursor-pointer text-red-600" onClick={() => handleDelete(item)} />
            </div>
          ])}
        />
      </div>

      <div className="flex justify-end">
        <Button>Сохранить</Button>
      </div>
    </PageWrapper>
  );
}
