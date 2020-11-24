
import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import VueI18n from 'vue-i18n';

import MaterialKit from "./plugins/material-kit";
import Paginate from 'vuejs-paginate'


Vue.use(VueI18n);

Vue.config.productionTip = false;

Vue.use(MaterialKit);


Vue.use('paginate', Paginate)

const NavbarStore = {
  showNavbar: false
};


const messages = {
  Es: {
    navbar: "Idioma",
    logout: {
      buttom: "Cerrar sesion",
      tooltip: "Saldras de tu sesion",
    }, 
    number: "{number},00",
    loggin: {
      loggin: "Ingresar",
      register: "Registrate",
      newUser: "Aun no tienes una cuenta?",
      click: "haz click aqui",
      nickname: "Apodo",
      email: "Correo electronico",
      password: "Contraseña"
    },
    landing: {
      header: "Ayudanos a ayudar a los demas!",
      subheader: "Mira como tu donacion convierte a un pequeño puebloparte de la sociedad actual",
      headerbutton: "Mira las dificultades de algunas de estas personas",
      contenttitle: "Conoce nuestros proyectos",
      content: "Estos son algunos de los proyectos que tenemos actualmente. Ingresa y dona para poder ayudar a un pueblo a llegar a la meta de conseguir conectividad para todos sus habitantes. Se parte del cambio.",
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
        current : "Ver solo proyectos proximos a terminar" ,
        all: "Ver todos los proyectos" 
      }
    },
    profile: {
      donations: "Donaciones hechas",
      points: "Puntos acumulados",
      projects: "Proyectos contribuidos",
      profile: "Perfil"
    }

  },
  En: {
    navbar: "Languages",
    logout: {
      buttom: "log out",
      tooltip: "You will be log out",
    }, 
    number: "{number}.00",
    loggin: {
      loggin: "Log in",
      register: "Register",
      newUser: "New user?",
      click: "click here",
      nickname: "Nickname",
      email: "Email",
      password: "Password"
    },
    landing: {
      header: "Help us to help others!",
      subheader: "See how your donation makes a small town part of today's society",
      headerbutton: "Look at the difficulties of some of these people",
      contenttitle: "See our projects",
      content: "These are some of the projects we currently have. Enter and donate to help a town reach the goal no getting connectivity for all its inhabitants. Be part of the change.",
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
        current : "Show only ending projects" ,
        all: "Show all open projects" 
      }
    },
    profile: {
      donations: "Made donations",
      points: "Accumulated points",
      projects: "Projects contributed",
      profile: "Account"
    }

  }
};

const i18n = new VueI18n({
  locale: 'Es',
  messages
});




Vue.mixin({
  data() {
    return {
      NavbarStore,
    };
  }
});

new Vue({
  router,
  i18n,
  render: h => h(App),
}).$mount("#app");
