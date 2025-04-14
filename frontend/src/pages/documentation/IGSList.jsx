import { useState } from "react";
import PageWrapper from "@/components/layout/PageWrapper";
import ComboBox from "@/components/UI/ComboBox";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import Table from "@/components/widgets/Table";
import { Upload } from "lucide-react";

export default function IgsList() {
  const [construction, setConstruction] = useState("");
  const [object, setObject] = useState("");
  const [section, setSection] = useState("");
  const [docName, setDocName] = useState("");
  const [fileName, setFileName] = useState("");
  const [axes, setAxes] = useState("");
  const [marks, setMarks] = useState("");
  const [date, setDate] = useState("");
  const [igsList, setIgsList] = useState([]);

  const handleUpload = () => {
    setFileName("Файл_ИГС.pdf"); // временно статично
  };

  const handleAdd = () => {
    setIgsList([
      ...igsList,
      { construction, object, section, docName, axes, marks, date }
    ]);
    setDocName("");
    setFileName("");
    setAxes("");
    setMarks("");
    setDate("");
  };

  const handleDelete = () => {
    setIgsList([]);
  };

  return (
    <PageWrapper title="Загрузка ИГС">
      <div className="grid grid-cols-2 gap-4">
        {/* Групбокс "Объект" */}
        <div className="group-box border border-[--color-border] col-span-1">
          <h3 className="group-box-title mb-4">Объект</h3>
          <div className="grid grid-cols-6 gap-4">
            <div className="col-span-6">
              <ComboBox
                placeholder="Строительство"
                options={[]}
                value={construction}
                onChange={setConstruction}
              />
            </div>
            <div className="col-span-3">
              <ComboBox
                placeholder="Объект"
                options={[]}
                value={object}
                onChange={setObject}
              />
            </div>
            <div className="col-span-3">
              <ComboBox
                placeholder="Участок"
                options={[]}
                value={section}
                onChange={setSection}
              />
            </div>
            <div className="col-span-1 col-start-6">
              <Button>Выбрать</Button>
            </div>
          </div>
        </div>

        {/* Групбокс "Загрузка ИГС" */}
        <div className="group-box border border-[--color-border] col-span-1">
          <h3 className="group-box-title mb-4">Загрузка ИГС</h3>

          <div className="grid grid-cols-6 gap-4 mb-4">
            {/* Имя документа и файл */}
            <Input
              className="col-span-3"
              placeholder="Имя документа"
              value={docName}
              onChange={(e) => setDocName(e.target.value)}
            />
            <Input
              placeholder="Файл"
              value={fileName}
              readOnly
              className="col-span-3"
            />

            {/* В осях, Отметки, Дата */}
            <Input
              placeholder="В осях"
              value={axes}
              onChange={(e) => setAxes(e.target.value)}
              className="col-span-2"
            />
            <Input
              placeholder="Отметки"
              value={marks}
              onChange={(e) => setMarks(e.target.value)}
              className="col-span-2"
            />
            <Input
              placeholder="Дата"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="col-span-2"
            />

            {/* Кнопки */}
            <Button onClick={handleAdd} className="col-span-2 col-start-3">
              Добавить
            </Button>
            <Button onClick={handleUpload} className="col-span-2 col-start-5 flex items-center gap-2 justify-center">
              <Upload className="w-4 h-4 rotate-180" /> Загрузить файл
            </Button>
          </div>
        </div>
      </div>

      {/* Групбокс "Загруженные ИГС" */}
      <div className="group-box border border-[--color-border] mt-4">
        <h3 className="group-box-title mb-4">Загруженные ИГС</h3>
        <div className="flex justify-end mb-2">
          <Button onClick={handleDelete}>Удалить</Button>
        </div>
        <Table
          headers={["Строительство", "Объект", "Участок", "Наименование ИГС", "В осях", "Отметки", "Дата"]}
          rows={igsList.map((item) => [
            item.construction,
            item.object,
            item.section,
            item.docName,
            item.axes,
            item.marks,
            item.date
          ])}
        />
      </div>
    </PageWrapper>
  );
}