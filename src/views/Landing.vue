<template>
  <div class="wrapper">
    <parallax class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div
            class="md-layout-item md-size-50 md-small-size-70 md-xsmall-size-100"
          >
            <h1 class="title">{{ $t("landing.header") }}</h1>
            <h4>
              {{ $t("landing.subheader") }}
            </h4>
            <br />
            <md-button
              href="https://tn.com.ar/tecno/f5/aca-hay-senal-desventuras-para-conseguir-internet-en-la-argentina-profunda_995739/"
              class="md-success md-lg"
              target="_blank"
              ><i class="fas fa-play"></i>
              {{ $t("landing.headerbutton") }}</md-button
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
              <h2 class="title text-center">
                {{ $t("landing.contenttitle") }}
              </h2>
              <h5 class="description">
                {{ $t("landing.content") }}
              </h5>
            </div>
            <md-button
              class="md-success"
              style="height: 50%"
              @click="toogleProjects"
              >{{
                allProjects
                  ? $t("landing.filter.current")
                  : $t("landing.filter.all")
              }}</md-button
            >
          </div>
        </div>
      </div>

      <div class="section text-center">
        <div class="container">
          <div class="team">
            <div
              class="md-layout"
              v-for="(projectRow, index) in projects[colorPagination - 1]"
              :key="index"
            >
              <div
                class="md-layout-item md-medium-size-33 md-small-size-100"
                v-for="(projectRowSub, index) in projectRow"
                :key="index"
              >
                <div class="team-player">
                  <md-card class="md-card-plain">
                    <div class="md-layout-item md-size-100 mx-auto">
                      <img
                        :src="town1"
                        alt="Thumbnail Image"
                        class="img-raised img-fluid"
                        style="height: 155px; width: 255px;"
                      />
                    </div>
                    <h4 class="card-title">
                      {{ projectRowSub.name }}
                      <br />
                      <small class="card-description text-muted"></small>
                    </h4>

                    <md-card-content>
                      <p class="card-description">
                        {{
                          "Se parte del cambio y ayuda a este localidad. El proyecto de " +
                            projectRowSub.name
                        }}
                        <b
                          >{{ $t("landing.date") }}
                          {{
                            new Date(
                              projectRowSub.finishDate
                            ).toLocaleDateString()
                          }}</b
                        >
                      </p>
                      <div class="md-layout">
                        <div
                          class="md-layout-item md-size-100 md-xsmall-size-100"
                        >
                          <div class="title">
                            <small>{{ $t("landing.collected") }}</small>
                          </div>
                          <md-progress-bar
                            class="md-primary"
                            :md-value="
                              calculateMoneyRaised(
                                projectRowSub.donations,
                                projectRowSub.moneyFactor *
                                  projectRowSub.population
                              )
                            "
                          ></md-progress-bar>
                        </div>
                      </div>
                    </md-card-content>

                    <md-card-content>
                      <DialogCustom
                        :projectName="projectRowSub.name"
                        @donate="donate"
                      />
                    </md-card-content>
                  </md-card>
                </div>
              </div>
            </div>
            <center>
              <pagination
                type="success"
                v-model="colorPagination"
                :page-count="totalPages"
                @input="nextSection"
              >
              </pagination>
            </center>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Modal } from "@/components";
import DialogCustom from "./ModalDonate.vue";
import { Pagination } from "@/components";

export default {
  bodyClass: "landing-page",
  props: {
    header: {
      type: String,
      default: require("@/assets/img/GG-PZzjT2kzo.jpg")
    },
    town1: {
      type: String,
      default: require("@/assets/projects/1.jpg")
    }
  },
  components: {
    Pagination,
    DialogCustom
  },
  data() {
    return {
      projects: [],
      classicModal: false,
      comment: null,
      money: 0,
      error: false,
      showDialog: false,
      colorPagination: 1,
      totalPages: null,
      allProjects: true
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
    nextSection(page) {
      console.log(page);
    },
    getRandomArbitrary(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },
    load: (vueInstance, url) => {
      axios
        .get(url)
        .then(response => {
          let projects = vueInstance.reorderList(response.data, 0, 8);
          const pagesTotal = projects.length;
          projects = projects.map(subProject => {
            return vueInstance.reorderList(subProject);
          });

          vueInstance.$set(vueInstance, "projects", projects);
          vueInstance.$set(vueInstance, "totalPages", Math.round(pagesTotal));
        })
        .catch(err => console.log(err));
    },
    calculateMoneyRaised: (donations, total) => {
      if (donations.length == 0) {
        return 0;
      }

      const moneyRaised = donations
        .map(donation => donation.money)
        .reduce((acc, curr) => acc + curr);

      const porcentageRaised =
        moneyRaised > total ? 100 : (moneyRaised / total) * 100;

      return porcentageRaised;
    },
    classicModalHide() {
      this.classicModal = false;
      this.comment = null;
      this.money = 0;
      this.error = false;
    },
    donate() {
      if (this.allProjects) {
        this.load(this, "http://localhost:8080/openProjects/");
      } else {
        this.load(this, "http://localhost:8080/openMonthProjects/");
      }
    },
    validInput() {
      if (this.money > 0) {
        this.error = false;
      }
    },
    reorderList(mainList, start = 0, end = 4) {
      if (mainList.length == 0) {
        return mainList;
      } else {
        const res_list = this.reorderList(
          mainList.slice(end, mainList.length),
          start,
          end
        );
        return [mainList.slice(start, end)].concat(res_list);
      }
    },
    toogleProjects() {
      this.colorPagination = 1;

      if (this.allProjects) {
        this.load(this, "http://localhost:8080/openMonthProjects/");
      } else {
        this.load(this, "http://localhost:8080/openProjects/");
      }
      this.allProjects = !this.allProjects;
    }
  },
  created() {
    this.load(this, "http://localhost:8080/openProjects/");
    console.log(this);
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
