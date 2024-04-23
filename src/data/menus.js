import { faPage4, faWindows } from "@fortawesome/free-brands-svg-icons";
import {
  faTachometer,
  faTable,
  faLock,
  faNoteSticky,
  faNotdef
} from "@fortawesome/free-solid-svg-icons";

const initMenu = [
  {
    label: "Tableau de Bord",
    path: "/",
    icon: faTachometer,
  },
  {
    label: 'Pages'
  },
  {
    label: "Import",
    path: "/Import",
    icon: faPage4,
  },
  {
    label: "404",
    path: "/404",
    icon: faNotdef,
  },
  
  {
    label: 'Formulaires'
  },
  {
    label: "Ajouter Candidat",
    path: "/form",
    icon: faWindows,
  },
  {
    label: "Listes des Candidats",
    path: "/table",
    icon: faTable,
  },

  {
    label: 'Authentification'
  },
  {
    label: "Se Connecter",
    path: "/auth/login",
    icon: faLock,
  },
];

export default initMenu