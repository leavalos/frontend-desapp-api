import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import VueI18n from "vue-i18n";

import MaterialKit from "./plugins/material-kit";
import Paginate from "vuejs-paginate";

Vue.use(VueI18n);

Vue.config.productionTip = false;

Vue.use(MaterialKit);

Vue.use("paginate", Paginate);

const NavbarStore = {
  showNavbar: false
};

const messages = {
  Es: {
    navbar: "Idioma",
    logout: {
      buttom: "Cerrar sesion",
      tooltip: "Saldras de tu sesion"
    },
    number: "{number},00",
    loggin: {
      loggin: "Ingresar",
      register: "Registrate",
      newUser: "Aun no tienes una cuenta?",
      click: "haz click aqui",
      nickname: "Apodo",
      email: "Correo electronico",
      password: "Contraseña",
      error: {
        password: "La contraseña provista es incorrecta",
        user: "Usuario no encontrado",
        register: "Usuario registrado",
        errorRegister: "No se ha podido registrar a usuario"
      }
    },
    landing: {
      header: "Ayudanos a ayudar a los demas!",
      subheader:
        "Mira como tu donacion convierte a un pequeño puebloparte de la sociedad actual",
      headerbutton: "Mira las dificultades de algunas de estas personas",
      contenttitle: "Conoce nuestros proyectos",
      content:
        "Estos son algunos de los proyectos que tenemos actualmente. Ingresa y dona para poder ayudar a un pueblo a llegar a la meta de conseguir conectividad para todos sus habitantes. Se parte del cambio.",
      donate: "Donar",
      date: "finaliza:",
      collected: "Recaudado",
      modal: {
        comment: "Agrega un comentario",
        donation: "Donacion",
        donate: "Donar",
        error: "Este es un campo obligatorio",
        close: "Cerrar",
        session: "Debes tener una sesision abierta para donar"
      },
      filter: {
        current: "Ver solo proyectos proximos a terminar",
        all: "Ver todos los proyectos"
      }
    },
    profile: {
      donations: "Donaciones hechas",
      points: "Puntos acumulados",
      projects: "Proyectos contribuidos",
      profile: "Perfil"
    },
    admin: {
      addProject: {
        label: "Crear proyecto",
        notification: "El proyecto se ha creado exisitosamente!"
      },
      closeProject: "Cerrar proyecto",
      editProject: "Editar proyecto",
      sendEmail: "Enviar correo",
      placeHolder: "Elige una accion",
      addProjectComponent: {
        name: "Nombre del proyecto",
        location: "Localidad",
        money: "Factor dinero",
        porcentage: "Porcentage minimo de dinero",
        date: "Elige una fecha de fin",
        error: {
          name: {
            required: "Nombre de proyecto es requerido",
            short: "Nombre de proyecto es muy corto"
          },
          location: "Localidad es requerido",
          money: "Factor de dinero muy alto",
          percentage: "Porcentage de dinero debe ser debajo del 100%",
          date: {
            required: "Fecha de fin es requerida",
            early: "Fecha de fin debe ser luego del dia de hoy"
          }
        }
      },
      closeProjectComponent: {
        header: {
          name: "Nombre",
          money: "Dinero recaudado",
          start: "Fecha de inicio",
          finish: "Fecha de fin",
          goal: "Meta cumplida"
        },
        goal: "Si",
        notification: {
          noSelected: "No se ha seleccionado proyecto",
          multiple: "Esta funcion aun ha sido implementada!"
        }
      },
      denied: "Acceso denegado",
      close: "El projecto ha sido cerrado",
      create: "El proyecto ha sido creado exitosamente!"
    }
  },
  En: {
    navbar: "Languages",
    logout: {
      buttom: "log out",
      tooltip: "You will be log out"
    },
    number: "{number}.00",
    loggin: {
      loggin: "Log in",
      register: "Register",
      newUser: "New user?",
      click: "click here",
      nickname: "Nickname",
      email: "Email",
      password: "Password",
      error: {
        password: "Incorrect password",
        user: "User not found",
        register: "Usuar registered",
        errorRegister: "User not registered"
      }
    },
    landing: {
      header: "Help us to help others!",
      subheader:
        "See how your donation makes a small town part of today's society",
      headerbutton: "Look at the difficulties of some of these people",
      contenttitle: "See our projects",
      content:
        "These are some of the projects we currently have. Enter and donate to help a town reach the goal no getting connectivity for all its inhabitants. Be part of the change.",
      donate: "Donate",
      date: "Ends:",
      collected: "Collected",
      modal: {
        comment: "Add a comment",
        donation: "Donation",
        donate: "Donate",
        error: "This is a required field",
        close: "Close",
        session: "You must have an open session to donate"
      },
      filter: {
        current: "Show only ending projects",
        all: "Show all open projects"
      }
    },
    profile: {
      donations: "Made donations",
      points: "Accumulated points",
      projects: "Projects contributed",
      profile: "Account"
    },
    admin: {
      addProject: {
        label: "Create project",
        notification: "The project was saved succesfully!"
      },
      closeProject: "Close project",
      editProject: "Edit project",
      sendEmail: "Send email",
      placeHolder: "Choose some action",
      addProjectComponent: {
        name: "Project name",
        location: "Location",
        money: "Money factor",
        porcentage: "Money minium porcentage",
        date: "Select date",
        error: {
          name: {
            required: "Project name is required",
            short: "Project name too short"
          },
          location: "Location is required",
          money: "Money factor exceded",
          percentage: "Money porcentage has to be lower than 100%",
          date: {
            required: "Date field is required",
            early: "Date need to be later than today"
          }
        }
      },
      closeProjectComponent: {
        header: {
          name: "Name",
          money: "Raised money",
          start: "Start date",
          finish: "Finish date",
          goal: "Goal accomplished"
        },
        goal: "Yes",
        notification: {
          noSelected: "No project selected",
          multiple: "Feature not supported yet!"
        }
      },
      denied: "Access denied",
      close: "Project has been closed",
      create: "Project has been created succesfully!"
    }
  }
};

const i18n = new VueI18n({
  locale: "Es",
  messages
});

Vue.mixin({
  data() {
    return {
      NavbarStore
    };
  }
});

new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount("#app");
