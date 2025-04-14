import { useState } from "react";
import PageWrapper from "@/components/layout/PageWrapper";
import ComboBox from "@/components/UI/ComboBox";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import Table from "@/components/widgets/Table";
import { Upload } from "lucide-react";

export default function LabTestList() {
  const [construction, setConstruction] = useState("");
  const [object, setObject] = useState("");
  const [section, setSection] = useState("");
  const [docName, setDocName] = useState("");
  const [fileName, setFileName] = useState("");
  const [axes, setAxes] = useState("");
  const [marks, setMarks] = useState("");
  const [date, setDate] = useState("");
  const [tests, setTests] = useState([]);

  const handleUpload = () => {
    setFileName("Протокол_испытаний.pdf"); // пример имени
  };

  const handleAdd = () => {
    setTests([
      ...tests,
      { construction, object, section, docName, axes, marks, date }
    ]);
    setDocName("");
    setFileName("");
    setAxes("");
    setMarks("");
    setDate("");
  };

  const handleDelete = () => {
    setTests([]);
  };

  return (
    <PageWrapper title="Лабораторные испытания">
      <div className="grid grid-cols-2 gap-4">
        {/* Групбокс "Объект" */}
        <div className="group-box border border-[--color-border] col-span-1">
          <h3 className="group-box-title mb-4">Объект</h3>
          <div className="grid grid-cols-6 gap-4">
            <div className="col-span-6">
              <ComboBox
                placeholder="Стройка"
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

        {/* Групбокс "Загрузка лабораторных испытаний" */}
        <div className="group-box border border-[--color-border] col-span-1">
          <h3 className="group-box-title mb-4">Загрузка лабораторных испытаний</h3>

          <div className="grid grid-cols-6 gap-4 mb-4">
            {/* Имя протокола и файл */}
            <Input
              placeholder="Протокол"
              value={docName}
              onChange={(e) => setDocName(e.target.value)}
              className="col-span-3"
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

      {/* Групбокс "Загруженные лабораторные испытания" */}
      <div className="group-box border border-[--color-border] mt-4">
        <h3 className="group-box-title mb-4">Загруженные лабораторные испытания</h3>
        <div className="flex justify-end mb-2">
          <Button onClick={handleDelete}>Удалить</Button>
        </div>
        <Table
          headers={["Стройка", "Объект", "Участок", "Протокол", "В осях", "Отметки", "Дата"]}
          rows={tests.map((item) => [
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