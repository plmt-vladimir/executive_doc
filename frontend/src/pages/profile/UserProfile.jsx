import PageWrapper from "@/components/layout/PageWrapper";
import Button from "@/components/UI/Button";

export default function UserProfile() {
  const user = {
    name: "Иван Иванов",
    role: "Инженер ПТО",
    email: "ivan@example.com",
    registered: "2024-10-15"
  };

  return (
    <PageWrapper title="Личный кабинет">
      <div className="group-box border border-[--color-border] p-6 max-w-3xl">
        <h3 className="group-box-title mb-4 text-[--color-primary]">Информация о пользователе</h3>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-xs text-[--color-primary]">ФИО</label>
            <div className="bg-white text-black px-4 py-2 rounded border border-[--color-border]">{user.name}</div>
          </div>

          <div>
            <label className="text-xs text-[--color-primary]">Роль</label>
            <div className="bg-white text-black px-4 py-2 rounded border border-[--color-border]">{user.role}</div>
          </div>

          <div>
            <label className="text-xs text-[--color-primary]">Email</label>
            <div className="bg-white text-black px-4 py-2 rounded border border-[--color-border]">{user.email}</div>
          </div>

          <div>
            <label className="text-xs text-[--color-primary]">Дата регистрации</label>
            <div className="bg-white text-black px-4 py-2 rounded border border-[--color-border]">{user.registered}</div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button>Сменить пароль</Button>
          {user.role === "Администратор" && <Button>Управление пользователями</Button>}
        </div>
      </div>
    </PageWrapper>
  );
}