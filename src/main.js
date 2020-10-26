
import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import VueI18n from 'vue-i18n';

import MaterialKit from "./plugins/material-kit";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

Vue.use(BootstrapVue)
Vue.use(VueI18n);
Vue.use(IconsPlugin)
Vue.config.productionTip = false;

Vue.use(MaterialKit);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

const NavbarStore = {
  showNavbar: false
};


const messages = {
  Es: {
    navbar: "Idioma",
    landing: {
      header: "Ayudanos a ayudar a los demas!",
      subheader: "Mira como tu donacion convierte a un pequeño puebloparte de la sociedad actual",
      headerbutton: "Mira las dificultades de algunas de estas personas",
      contenttitle: "Conoce nuestros proyectos",
      content: "Estos son algunos de los proyectos que tenemos actualmente. Ingresa y dona para poder ayudar a un pueblo a llegar a la meta de conseguir conectividad para todos sus habitantes. Se parte del cambio.",
      donate: "Donar",
      date: "Fecha de fin:",
      collected: "Recaudado",
      modal: {
        comment: "Agrega un comentario",
        donation: "Donacion",
        donate: "Donar",
        error: "Este es un campo obligatorio",
        close: "Cerrar"
      }, 
    },
    profile: {
      donations: "Donaciones hechas",
      points: "Puntos acumulados",
      projects: "Proyectos contribuidos"
    }

  },
  En: {
    navbar: "Languages",
    landing: {
      header: "Help us to help others!",
      subheader: "See how your donation makes a small town part of today's society",
      headerbutton: "Look at the difficulties of some of these people",
      contenttitle: "See our projects",
      content: "These are some of the projects we currently have. Enter and donate to help a town reach the goal no getting connectivity for all its inhabitants. Be part of the change.",
      donate: "Donate",
      date: "Finish date:",
      collected: "Collected",
      modal: {
        comment: "Add a comment",
        donation: "Donation",
        donate: "Donate",
        error: "This is a required field",
        close: "Close"
      }
    },
    profile: {
      donations: "Made donations",
      points: "Accumulated points",
      projects: "Projects contributed"
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
      NavbarStore
    };
  }
});

new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount("#app");
