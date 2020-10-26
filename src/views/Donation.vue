<template>
  <div class="wrapper">

    <div class="main main-raised">
      <div class="section">
        <div class="container">
          <div class="md-layout">
            <div
              class="md-layout-item md-size-66 md-xsmall-size-100 mx-auto text-center"
            >
            <hr />
              <h2 class="title text-center"></h2>
            <hr />  
            </div>
          </div>
        </div>
      </div>
  
      <div class="section text-center">
        
        <md-field class="md-success">
          <label>Description</label>
          <md-textarea v-model="text"></md-textarea>
          <md-icon>description</md-icon>
        </md-field>

        <md-field class="md-valid">
          <md-icon >warning</md-icon>
          <label>Transfer Money</label>
          <md-input v-model="money"></md-input>
          <md-icon>attach_money</md-icon>
        </md-field>
      
         
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
import {Modal} from '@/components'

export default {
  mixins: [validationMixin],
  bodyClass: "landing-page",
  props: {
    header: {
      type: String,
      default: require("@/assets/img/GG-PZzjT2kzo.jpg")
    },
    teamImg1: {
      type: String,
      default: require("@/assets/img/faces/avatar.jpg")
    },
    teamImg2: {
      type: String,
      default: require("@/assets/img/faces/christian.jpg")
    },
    teamImg3: {
      type: String,
      default: require("@/assets/img/faces/kendall.jpg")
    }
  },
  data() {
    return {
      name: null,
      email: null,
      message: null,
      projects: [],
      classicModal: false,
     formulario: {
        nombre: "",
        apellido: "",
        correo: "",
        fechaNacimiento: "",
        localidad: "",
        provincia: "",
        lugarResidencia: "",
        tiempoFueraDeArgentina: 0,
        text: null,
        money: null,
      },
      botonEstado: false,
    };
  },
  validations: {
    formulario: {
      nombre: {required},
      apellido: {required},
      correo: {required, email},
      fechaNacimiento: {required},
      localidad: {required},
      provincia: {required},
    }
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`
      };
    }
  },
   methods: {
    load: (vueInstance) =>  {

     
      axios.get('http://localhost:8080/openProjects/')
      .then((response) =>{
        console.log(response.data)
        vueInstance.$set(vueInstance,"projects", response.data)
      })
      .catch((err) => console.log(err))
    },
    calculateMoneyRaised: (donations) => {
      // needs to be implemented
      return 25
    },
    classicModalHide() {
      this.classicModal = false;
    }
  },
  created() {
    this.load(this)
  }
};
</script>
<style lang="scss" scoped>
@import "node_modules/bootstrap/scss/bootstrap";
@import "node_modules/bootstrap-vue/src/index.scss";

.btn-enviar {
  background-color: #ff5a5f;
  color: #fff;
  border-color: #ff5a5f;
}

.btn-cancelar {
  background-color: #45d9c9;
  color: #fff;
  border-color: #45d9c9;
}

hr {
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid #6300b3;
  margin: 1em 0;
  padding: 0;
}

p.modal-body {
  margin: 10px 0;
  text-align: justify;
  font-family: "Work Sans", "sans-serif" !important;
}

.md-field:focus {
  color: blue !important;
}

</style>
