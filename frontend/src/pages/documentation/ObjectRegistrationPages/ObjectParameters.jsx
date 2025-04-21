import PageWrapper from "@/components/layout/PageWrapper";
import ComboBox from "@/components/UI/ComboBox";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import Table from "@/components/widgets/Table";
import { useObjectRegistration } from "./ObjectRegistrationContext";

export default function ObjectParameters() {
  const {
    objectParameters,
    setObjectParameters,
  } = useObjectRegistration();

  const addObject = () => {
    setObjectParameters({
      ...objectParameters,
      objects: [...objectParameters.objects, objectParameters.newObject],
      newObject: { name: "", address: "", shotname: "" },
    });
  };

  const addSection = () => {
    setObjectParameters({
      ...objectParameters,
      sections: [...objectParameters.sections, objectParameters.newSection],
      newSection: { object: "", name: "", address: "" },
    });
  };

  return (
    <PageWrapper title="Регистрация объекта">
      <div className="grid grid-cols-4 gap-5">
        {/* Параметры объекта */}
        <div className="group-box border border-[--color-border] col-span-4">
          <h3 className="group-box-title mb-4">Стройка</h3>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="col-span-3">
              <Input
                placeholder="Полное наименование объекта"
                value={objectParameters.constructionName}
                onChange={(e) =>
                  setObjectParameters({ ...objectParameters, constructionName: e.target.value })
                }
              />
            </div>
            <div className="col-span-1">
              <Input
                placeholder="Краткое наименование"
                value={objectParameters.constructionShort}
                onChange={(e) =>
                  setObjectParameters({ ...objectParameters, constructionShort: e.target.value })
                }
              />
            </div>
            <div className="col-span-2">
              <Input
                placeholder="Адрес"
                value={objectParameters.constructionAddress}
                onChange={(e) =>
                  setObjectParameters({ ...objectParameters, constructionAddress: e.target.value })
                }
              />
            </div>
          </div>
        </div>

        {/* Объекты */}
        <div className="group-box border border-[--color-border] col-span-2">
          <h3 className="group-box-title mb-4">Объекты</h3>
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div className="col-span-3">
              <Input
                placeholder="Полное наименование"
                value={objectParameters.newObject.name}
                onChange={(e) =>
                  setObjectParameters({
                    ...objectParameters,
                    newObject: { ...objectParameters.newObject, name: e.target.value },
                  })
                }
              />
            </div>
            <div className="col-span-1">
              <Input
                placeholder="Краткое наименование"
                value={objectParameters.newObject.shotname}
                onChange={(e) =>
                  setObjectParameters({
                    ...objectParameters,
                    newObject: { ...objectParameters.newObject, shotname: e.target.value },
                  })
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 mb-4">
            <div className="col-span-3">
              <Input
                placeholder="Адрес"
                value={objectParameters.newObject.address}
                onChange={(e) =>
                  setObjectParameters({
                    ...objectParameters,
                    newObject: { ...objectParameters.newObject, address: e.target.value },
                  })
                }
              />
            </div>
            <div className="col-span-1">
              <Button onClick={addObject}>Добавить</Button>
            </div>
          </div>

          <Table
            headers={["#", "Объект", "Адрес"]}
            rows={objectParameters.objects.map((obj, index) => [
              index + 1,
              obj.shotname,
              obj.address,
            ])}
          />
        </div>

        {/* Участки */}
        <div className="group-box border border-[--color-border] col-span-2">
          <h3 className="group-box-title mb-4">Участки</h3>
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div className="col-span-2">
              <ComboBox
                options={objectParameters.objects.map((obj, index) => ({
                  value: index,
                  label: obj.name,
                }))}
                placeholder="Выберите объект"
                value={objectParameters.newSection.object}
                onChange={(value) =>
                  setObjectParameters({
                    ...objectParameters,
                    newSection: { ...objectParameters.newSection, object: value },
                  })
                }
              />
            </div>
            <div className="col-span-2">
              <Input
                placeholder="Название участка"
                value={objectParameters.newSection.name}
                onChange={(e) =>
                  setObjectParameters({
                    ...objectParameters,
                    newSection: { ...objectParameters.newSection, name: e.target.value },
                  })
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 mb-4">
            <div className="col-span-3">
              <Input
                placeholder="Адрес"
                value={objectParameters.newSection.address}
                onChange={(e) =>
                  setObjectParameters({
                    ...objectParameters,
                    newSection: { ...objectParameters.newSection, address: e.target.value },
                  })
                }
              />
            </div>
            <div className="col-span-1">
              <Button onClick={addSection}>Добавить</Button>
            </div>
          </div>

          <Table
            headers={["#", "Объект", "Участок", "Адрес"]}
            rows={objectParameters.sections.map((section, index) => [
              index + 1,
              section.object,
              section.name,
              section.address,
            ])}
          />
        </div>
      </div>
    </PageWrapper>
  );
}