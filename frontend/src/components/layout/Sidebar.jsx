import { NavLink } from "react-router-dom";
import logo from "../../../resource/images/logo.png";

export default function Sidebar() {
  const menuItems = [
    { label: "Регистрация объекта", path: "/register" },
    { label: "Ведение реестра ИГС", path: "/igslist" },
    { label: "Испытания", path: "/lab-tests" },
    { label: "Входной контроль", path: "/"},
    { label: "Работа с АОСР", path: "/aosrlist" },
    { label: "Работа с АООК", path: "/aook" },
    { label: "Передача ИД", path: "/invoice" },
  ];

  return (
    <div className="flex flex-col justify-between h-full p-4 bg-[--color-background_menu]">
      <div>
        <img src={logo} alt="PALMETTO" className="w-36 mx-auto mb-4" />
        <h2 className="text-3xl text-center text-[--color-primary] font-bold mb-2 tracking-wide">Меню</h2>

        <nav className="space-y-2">
          {menuItems.map((item, index) => (
            <NavLink key={index} to={item.path} className="block btn-primary text-center">
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <button className="btn-primary mt-6">Назад</button>
    </div>
  );
}