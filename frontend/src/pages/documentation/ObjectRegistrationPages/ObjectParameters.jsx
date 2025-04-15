import { useState } from "react";
import PageWrapper from "@/components/layout/PageWrapper";
import ComboBox from "@/components/UI/ComboBox";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import Table from "@/components/widgets/Table";

export default function ObjectRegistrationPage() {
  const [constructionName, setConstructionName] = useState("");
  const [constructionShort, setConstructionShort] = useState("");
  const [constructionAddress, setConstructionAddress] = useState("");
  const [objects, setObjects] = useState([]);
  const [newObject, setNewObject] = useState({ name: "", address: "" });

  const [sections, setSections] = useState([]);
  const [newSection, setNewSection] = useState({ object: "", name: "" });

  const addObject = () => {
    setObjects([...objects, newObject]);
    setNewObject({ name: "", address: "" });
  };

  const addSection = () => {
    setSections([...sections, newSection]);
    setNewSection({ object: "", name: "" });
  };

  return (
    <PageWrapper title="Регистрация объекта">
      {/* Внешняя группа с границей для всех 3 секций */}
      <div className="grid grid-cols-4 gap-5">
        {/* Группа для Параметров объекта */}
        <div className="group-box border border-[--color-border] col-span-4">
          <h3 className="group-box-title mb-4">Стройка</h3>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="col-span-3">
              <Input
                placeholder="Полное наименование объекта"
                value={constructionName}
                onChange={(e) => setConstructionName(e.target.value)}
              />
            </div>
            <div className="col-span-1">
              <Input
                placeholder="Краткое наименование"
                value={constructionShort}
                onChange={(e) => setConstructionShort(e.target.value)}
              />
            </div>
            <div className="col-span-2">
              <Input
                placeholder="Адрес"
                value={constructionAddress}
                onChange={(e) => setConstructionAddress(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Группа для объектов */}
        <div className="group-box border border-[--color-border] col-span-2">
          <h3 className="group-box-title mb-4">Объекты</h3>
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div className="col-span-3">
              <Input
                placeholder="Полное наименование"
                value={newObject.name}
                onChange={(e) => setNewObject({ ...newObject, name: e.target.value })}
              />
            </div>
            <div className="col-span-1">
              <Input
                placeholder="Краткое наименование"
                value={newObject.shotname}
                onChange={(e) => setNewObject({ ...newObject, shotname: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 mb-4">
            <div className="col-span-3">
              <Input
                placeholder="Адрес"
                value={newObject.address}
                onChange={(e) => setNewObject({ ...newObject, address: e.target.value })}
              />
            </div>
            <div className="col-span-1">
              <Button onClick={addObject}>
                Добавить
              </Button>
            </div>
          </div>

          {/* Таблица для объектов */}
          <Table
            headers={["#", "Объект", "Адрес"]}
            rows={objects.map((obj, index) => [index + 1, obj.shotname, obj.address])}
          />
        </div>

        {/* Группа для участков */}
        <div className="group-box border border-[--color-border] col-span-2">
        <h3 className="group-box-title mb-4">Участки</h3>
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div className="col-span-2">
              <ComboBox
                options={objects.map((obj, index) => ({
                  value: index,
                  label: obj.name,
                }))}
                placeholder="Выберите объект"
                value={newSection.object}
                onChange={(value) => setNewSection({ ...newSection, object: value })}
              />
            </div>
            <div className="col-span-2">
              <Input
                placeholder="Название участка"
                value={newSection.name}
                onChange={(e) => setNewSection({ ...newSection, name: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 mb-4">
            <div className="col-span-3">
              <Input
                placeholder="Адрес"
                value={newSection.address}
                onChange={(e) => setNewSection({ ...newSection, address: e.target.value })}
              />
            </div>
            <div className="col-span-1">
              <Button onClick={addSection}>
                Добавить
              </Button>
            </div>
          </div>

          {/* Таблица для участков */}
          <Table
            headers={["#", "Объект", "Участок", "Адрес"]}
            rows={sections.map((section, index) => [
              index + 1,
              section.object,
              section.name,
              section.address,
            ])}
          />
        </div>

        {/* Кнопка для сохранения глобального объекта */}
        <div className="mt-6 col-span-1 col-start-4">
          <Button>
            Сохранить глобальный объект
          </Button>
        </div>
      </div>
    </PageWrapper>
  );
}