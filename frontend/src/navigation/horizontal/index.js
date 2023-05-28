import { Mail, Home, FilePlus } from "react-feather"

export default [
  {
    id: "home",
    title: "Главная",
    icon: <Home size={20} />,
    navLink: "/home"
  },
  {
    id: "secondPage",
    title: "Новые данные",
    icon: <FilePlus size={20} />,
    navLink: "/retrain"
  },
  {
    id: "secondPage",
    title: "Контакты",
    icon: <Mail size={20} />,
    navLink: "/contacts"
  }
]
