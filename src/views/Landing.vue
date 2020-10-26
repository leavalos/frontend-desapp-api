<template>
  <div class="wrapper">
    <parallax class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div
            class="md-layout-item md-size-50 md-small-size-70 md-xsmall-size-100"
          >
            <h1 class="title">{{ $t('landing.header') }}</h1>
            <h4>
              {{ $t('landing.subheader') }}
            </h4>
            <br />
            <md-button
              href="https://tn.com.ar/tecno/f5/aca-hay-senal-desventuras-para-conseguir-internet-en-la-argentina-profunda_995739/"
              class="md-success md-lg"
              target="_blank"
              ><i class="fas fa-play"></i> {{ $t('landing.headerbutton') }}</md-button
            >
          </div>
        </div>
      </div>
    </parallax>
    <div class="main main-raised">
      <div class="section">
        <div class="container">
          <div class="md-layout">
            <div
              class="md-layout-item md-size-66 md-xsmall-size-100 mx-auto text-center"
            >
              <h2 class="title text-center">{{ $t('landing.contenttitle') }}</h2>
              <h5 class="description">
                {{ $t('landing.content') }}
              </h5>
            </div>
          </div>
        </div>
      </div>
  
      <div class="section text-center">
        <div class="container">
          <div class="team">
            <div class="md-layout" v-for="(projectRow,index) in projects" :key="index">
              <div class="md-layout-item md-medium-size-33 md-small-size-100" v-for="(projectRowSub,index) in projectRow" :key="index">
                <div class="team-player">
                  <md-card class="md-card-plain">
                    <div class="md-layout-item md-size-100 mx-auto">
                      <img
                        :src="header"
                        alt="Thumbnail Image"
                        class="img-raised img-fluid"
                      />
                    </div>
                    <h4 class="card-title">
                      {{projectRowSub.name}}
                      <br />
                      <small class="card-description text-muted">{{"Aca podemos meter el nombre de la localidad"}}</small>
                    </h4>

                    <md-card-content>
                      <p class="card-description">
                        {{"Aca tambien podemos agregar una descripcion al proyecto."}}
                        <b>{{ $t('landing.date') }} {{new Date(projectRowSub.finishDate).toLocaleDateString()}}</b>
                      </p>
                      <div class="md-layout">
                        <div class="md-layout-item md-size-100 md-xsmall-size-100">
                          <div class="title">
                            <small>{{ $t('landing.collected') }}</small>
                          </div>
                          <md-progress-bar
                            class="md-primary"
                            :md-value="calculateMoneyRaised(projectRowSub.donations, projectRowSub.moneyFactor * projectRowSub.population)"
                          ></md-progress-bar>
                        </div>
                      </div>
                    </md-card-content>

                    <md-card-content>
                      
                        <div class="md-layout-item md-size-100 mx-auto text-center">
                          <template>
                            <md-button class="md-success md-round classic-modal" @click="classicModal = true">{{ $t('landing.donate') }}</md-button>
                            <modal v-if="classicModal" @close="classicModalHide">
                            <template slot="header">
                              <h4 class="modal-title">{{projectRowSub.name}}</h4>
                              <md-button
                                class="md-simple md-just-icon md-round modal-default-button"
                                @click="classicModalHide"
                              >
                                <md-icon>clear</md-icon>
                              </md-button>
                            </template>

                            <template slot="body">
                              <md-field class="md-success">
                              <label>{{ $t('landing.modal.comment') }}</label>
                              <md-textarea v-model="comment"></md-textarea>
                            </md-field>

                            <md-field  :class="{'md-valid': !error, 'md-valid md-invalid': !!error}" >
                              <md-icon >warning</md-icon>
                              <label>{{ $t('landing.modal.donation') }}</label>
                              <md-input type="number" v-model="money" :required="true" @change="validInput"></md-input>
                              <md-icon>attach_money</md-icon>
                              <span class="md-error">{{ $t('landing.modal.error') }}</span>
                            </md-field>
                            </template>

                            <template slot="footer">
                              <md-button class="md-simple" @click="donate(projectRowSub.name)">{{ $t('landing.modal.donate') }}</md-button>
                              <md-button
                                class="md-danger md-simple"
                                @click="classicModalHide"
                                >{{ $t('landing.modal.close') }}</md-button
                              >
                            </template>
                          </modal>
                          </template>
                        </div>
                    
                    </md-card-content>
                  </md-card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {Modal} from '@/components'

export default {
  
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
  components: {
    Modal,
  },
  data() {
    return {
      name: null,
      email: null,
      message: null,
      projects: [],
      classicModal: false,
      comment: null,
      money: 0,
      error: false
    };
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
        vueInstance.$set(vueInstance,"projects", vueInstance.reorderList(response.data))
      })
      .catch((err) => console.log(err))
    },
    calculateMoneyRaised: (donations, total) => {
      if (donations.length == 0 ){
        return 0
      }

      

      const moneyRaised = donations.map(donation => donation.money).reduce((acc, curr) => acc + curr)

      const porcentageRaised = moneyRaised > total? 100 : (moneyRaised / total) * 100

      return porcentageRaised
    },
    classicModalHide() {
      this.classicModal = false
      this.comment = null
      this.money = 0
      this.error= false
    },
    donate(projectName){
      
      if (this.money == 0) {
        this.error = true 
      }
      else {
        this.error = false
        let money_to_send = new Number(this.money)
        let body_to_send = {
                              'money': money_to_send.toFixed(2),
                              'comment': this.comment,
                              'nickname': "Leavalos123",
                              'date': new Date().toISOString(),
                              'projectName': projectName
                            }
        
        fetch('http://localhost:8080/donation', {
                    method: 'post',
                    body: JSON.stringify(body_to_send),
                    headers: {
                    'Content-Type': 'application/json'
                    },
        })
        .then(()=> {
          this.classicModalHide()
         })
    
      }
    },
    validInput() {
      if (this.money > 0) {
        this.error = false 
      }
    },
    reorderList(mainList, start = 0, end = 4) {
      if (mainList.length == 0) {
        return mainList
      }
      else {
        const res_list = this.reorderList(mainList.slice(end, mainList.length))
        return [mainList.slice(start, end)].concat(res_list)
      }
    }
  },
  created() {
    this.load(this)
  }
};
</script>

<style lang="scss" scoped>

.md-card-actions.text-center {
  display: flex;
  justify-content: center !important;
}
.contact-form {
  margin-top: 30px;
}

.md-has-textarea + .md-layout {
  margin-top: 15px;
}
</style>
