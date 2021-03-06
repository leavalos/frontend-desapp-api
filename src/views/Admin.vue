<template>
  <div class="wrapper">
    <parallax
      class="section page-header header-filter"
      :style="headerStyle"
    ></parallax>
    <div class="main main-raised">
      <div class="section section-content">
        <div class="container">
          <div class="md-layout">
            <div class="md-layout-item md-size-100 mx-auto">
              <div class="profile color-section">
                <div class="avatar">
                  <img
                    :src="img"
                    alt="Circle Image"
                    class="img-raised rounded-circle img-fluid"
                  />
                </div>
                <div class="name">
                  <h3 class="title">{{ user.nickName }}</h3>
                </div>

                <div class="page-container md-layout-row">
                  <md-app>
                    <md-app-toolbar class="md-success toolbar">
                      <md-button
                        class="md-success md-icon-button"
                        @click="toggleMenu"
                        v-if="!menuVisible"
                      >
                        <md-icon>menu</md-icon>
                      </md-button>
                      <center>
                        <span class="md-title"
                          >Crowdfunding Solidario Argentina Conectada</span
                        >
                      </center>
                    </md-app-toolbar>

                    <md-app-drawer
                      :md-active.sync="menuVisible"
                      md-persistent="full"
                    >
                      <md-toolbar class="md-transparent" md-elevation="0">
                        <div class="md-toolbar-section-end">
                          <md-button
                            class="md-icon-button md-dense"
                            @click="toggleMenu"
                          >
                            <md-icon>keyboard_arrow_left</md-icon>
                          </md-button>
                        </div>
                      </md-toolbar>

                      <md-list>
                        <md-list-item @click="create">
                          <md-icon>add_circle</md-icon>
                          <h5 class="md-list-item-text">
                            {{ $t("admin.addProject.label") }}
                          </h5>
                        </md-list-item>

                        <md-list-item @click="close">
                          <md-icon>transit_enterexit</md-icon>
                          <h5 class="md-list-item-text">
                            {{ $t("admin.closeProject") }}
                          </h5>
                        </md-list-item>

                        <md-list-item @click="edit">
                          <md-icon>build</md-icon>
                          <h5 class="md-list-item-text">
                            {{ $t("admin.editProject") }}
                          </h5>
                        </md-list-item>

                        <md-list-item @click="send">
                          <md-icon style="color: ">send</md-icon>
                          <h5 class="md-list-item-text">
                            {{ $t("admin.sendEmail") }}
                          </h5>
                        </md-list-item>
                      </md-list>
                    </md-app-drawer>

                    <md-app-content
                      v-if="!(created || closed || edited || sent)"
                    >
                      {{ $t("admin.placeHolder") }}
                    </md-app-content>
                    <md-app-content v-else-if="created">
                      <center>
                        <div>
                          <form
                            novalidate
                            class="md-layout"
                            @submit.prevent="validateUser"
                          >
                            <md-card class="md-layout-item  md-small-size-100">
                              <md-card-content>
                                <div class="md-layout md-gutter">
                                  <div class="md-layout-item md-small-size-100">
                                    <md-field
                                      :class="[
                                        'md-valid',
                                        getValidationClass('projectname')
                                      ]"
                                    >
                                      <label for="project-name">{{
                                        $t("admin.addProjectComponent.name")
                                      }}</label>
                                      <md-input
                                        name="project-name"
                                        id="project-name"
                                        v-model="form.projectname"
                                        :disabled="sending"
                                      />
                                      <span
                                        class="md-error"
                                        v-if="!$v.form.projectname.required"
                                        >{{
                                          $t(
                                            "admin.addProjectComponent.error.name.required"
                                          )
                                        }}</span
                                      >
                                      <span
                                        class="md-error"
                                        v-else-if="
                                          !$v.form.projectname.minlength
                                        "
                                        >{{
                                          $t(
                                            "admin.addProjectComponent.error.name.short"
                                          )
                                        }}</span
                                      >
                                    </md-field>
                                  </div>

                                  <div class="md-layout-item md-small-size-100">
                                    <md-field
                                      :class="[
                                        'md-valid',
                                        getValidationClass('location')
                                      ]"
                                    >
                                      <label for="location">{{
                                        $t("admin.addProjectComponent.location")
                                      }}</label>
                                      <md-select
                                        name="location"
                                        id="location"
                                        v-model="form.location"
                                        md-dense
                                        :disabled="sending"
                                      >
                                        <md-option></md-option>
                                        <md-option
                                          style="padding-left: 5%;"
                                          v-for="(location, index) in locations"
                                          :value="location.id"
                                          :key="index"
                                          >{{ location.name }}</md-option
                                        >
                                      </md-select>
                                      <span class="md-error">{{
                                        $t(
                                          "admin.addProjectComponent.error.location"
                                        )
                                      }}</span>
                                    </md-field>
                                  </div>
                                </div>

                                <div
                                  class="md-layout md-gutter"
                                  style="padding-top: 5%"
                                >
                                  <div class="md-layout-item md-small-size-100">
                                    <md-field
                                      :class="[
                                        'md-valid',
                                        getValidationClass('moneyfactor')
                                      ]"
                                    >
                                      <label for="moneyfactor">{{
                                        $t("admin.addProjectComponent.money")
                                      }}</label>
                                      <md-input
                                        type="number"
                                        id="moneyfactor"
                                        name="moneyfactor"
                                        v-model="form.moneyfactor"
                                        :disabled="sending"
                                      />
                                      <span
                                        class="md-error"
                                        v-if="!$v.form.moneyfactor.maxlength"
                                        >{{
                                          $t(
                                            "admin.addProjectComponent.error.money"
                                          )
                                        }}</span
                                      >
                                    </md-field>
                                  </div>

                                  <div class="md-layout-item md-small-size-100">
                                    <md-field
                                      :class="[
                                        'md-valid',
                                        getValidationClass('moneyporcentage')
                                      ]"
                                    >
                                      <label for="moneyporcentage">{{
                                        $t(
                                          "admin.addProjectComponent.porcentage"
                                        )
                                      }}</label>
                                      <md-input
                                        type="number"
                                        id="moneyporcentage"
                                        name="moneyporcentage"
                                        v-model="form.moneyporcentage"
                                        :disabled="sending"
                                      />
                                      <span
                                        class="md-error"
                                        v-if="
                                          !$v.form.moneyporcentage.isLessThan100
                                        "
                                        >{{
                                          $t(
                                            "admin.addProjectComponent.error.percentage"
                                          )
                                        }}</span
                                      >
                                    </md-field>
                                  </div>
                                </div>

                                <div
                                  class="md-layout md-gutter md-valid"
                                  style="padding-top: 5%"
                                >
                                  <div>
                                    <md-datepicker
                                      vmd-model-type="String"
                                      :class="[
                                        'md-valid',
                                        getValidationClass('selectedDate')
                                      ]"
                                      v-model="form.selectedDate"
                                    >
                                      <label class="md-valid">{{
                                        $t("admin.addProjectComponent.date")
                                      }}</label>
                                      <span
                                        class="md-error"
                                        v-if="!$v.form.selectedDate.required"
                                        >{{
                                          $t(
                                            "admin.addProjectComponent.error.date.required"
                                          )
                                        }}</span
                                      >
                                      <span
                                        class="md-error"
                                        v-else-if="
                                          !$v.form.selectedDate.isLaterThanToday
                                        "
                                        >{{
                                          $t(
                                            "admin.addProjectComponent.error.date.early"
                                          )
                                        }}</span
                                      >
                                    </md-datepicker>
                                  </div>
                                </div>
                              </md-card-content>

                              <md-card-actions>
                                <md-button
                                  type="submit"
                                  class="md-success"
                                  :disabled="sending"
                                  >{{ $t("admin.addProject.label") }}</md-button
                                >
                              </md-card-actions>
                            </md-card>

                            <md-snackbar :md-active.sync="projectSaved">{{
                              $t("admin.addProject.notification")
                            }}</md-snackbar>
                          </form>
                        </div>
                      </center>
                    </md-app-content>
                    <md-app-content v-else-if="sent || edited">
                      {{
                        $t("admin.closeProjectComponent.notification.multiple")
                      }}
                    </md-app-content>
                    <md-app-content v-else style="padding-right: 5%;">
                      <center>
                        <md-table
                          v-model="projects"
                          md-card
                          @md-selected="onSelect"
                        >
                          <md-table-toolbar slot="md-table-alternate-header">
                            <div class="md-toolbar-section-end">
                              <md-button
                                class="md-icon-button"
                                @click="closeProjects"
                              >
                                <md-icon>delete</md-icon>
                              </md-button>
                            </div>
                          </md-table-toolbar>

                          <md-table-row
                            slot="md-table-row"
                            slot-scope="{ item }"
                            :md-disabled="item.name.includes('Stave')"
                            md-selectable="multiple"
                            md-auto-select
                          >
                            <md-table-cell
                              :md-label="
                                $t('admin.closeProjectComponent.header.name')
                              "
                              :md-sort-by="
                                $t('admin.closeProjectComponent.header.name')
                              "
                              >{{ item.name }}</md-table-cell
                            >
                            <md-table-cell
                              :md-label="
                                $t('admin.closeProjectComponent.header.money')
                              "
                              :md-sort-by="
                                $t('admin.closeProjectComponent.header.money')
                              "
                              >{{
                                $t("number", {
                                  number: calculateMoneyRaised(item.donations)
                                })
                              }}</md-table-cell
                            >
                            <md-table-cell
                              :md-label="
                                $t('admin.closeProjectComponent.header.start')
                              "
                              :md-sort-by="
                                $t('admin.closeProjectComponent.header.start')
                              "
                              >{{
                                new Date(item.beginningDate).toLocaleDateString(
                                  $i18n.locale.toLowerCase()
                                )
                              }}</md-table-cell
                            >
                            <md-table-cell
                              :md-label="
                                $t('admin.closeProjectComponent.header.finish')
                              "
                              :md-sort-by="
                                $t('admin.closeProjectComponent.header.finish')
                              "
                              >{{
                                new Date(item.finishDate).toLocaleDateString(
                                  $i18n.locale.toLowerCase()
                                )
                              }}</md-table-cell
                            >
                            <md-table-cell
                              :md-label="
                                $t('admin.closeProjectComponent.header.goal')
                              "
                              :md-sort-by="
                                $t('admin.closeProjectComponent.header.goal')
                              "
                              >{{
                                isRaisedMoney(
                                  item.moneyFactor,
                                  item.population,
                                  calculateMoneyRaised(item.donations)
                                )
                                  ? $t("admin.closeProjectComponent.goal")
                                  : "No"
                              }}</md-table-cell
                            >
                          </md-table-row>
                        </md-table>
                      </center>
                    </md-app-content>
                  </md-app>
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
import { Tabs } from "@/components";
import axios from "axios";
import { Pagination } from "@/components";
import { validationMixin } from "vuelidate";
import {
  required,
  email,
  minLength,
  maxLength
} from "vuelidate/lib/validators";

export default {
  components: {},
  mixins: [validationMixin],
  bodyClass: "profile-page",
  data() {
    return {
      user: null,
      created: false,
      closed: false,
      edited: false,
      sent: false,
      menuVisible: true,
      locations: [],
      form: {
        projectname: null,
        location: null,
        moneyfactor: null,
        email: null,
        selectedDate: null
      },
      projectSaved: false,
      sending: false,
      projects: [],
      selected: []
    };
  },
  validations: {
    form: {
      projectname: {
        required,
        minLength: minLength(5)
      },
      location: {
        required
      },
      moneyfactor: {
        maxLength: maxLength(4)
      },
      moneyporcentage: {
        isLessThan100(value) {
          if (value) {
            return value <= 100;
          }
          return true;
        }
      },
      selectedDate: {
        required,
        isLaterThanToday(value) {
          if (Date.now() < value) {
            return true;
          }
          return false;
        }
      }
    }
  },
  props: {
    header: {
      type: String,
      default: require("@/assets/img/GG-PZzjT2kzo.jpg")
    },
    img: {
      type: String,
      default: require("@/assets/img/images.jpg")
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
    isRaisedMoney(money, population, moneyFromDonations) {
      return money * population <= moneyFromDonations;
    },
    closeProjects() {
      if (this.selected.length > 1) {
        alert(this.$t("admin.closeProjectComponent.notification.multiple"));
      } else if (this.selected.length == 0) {
        alert(this.$t("admin.closeProjectComponent.notification.noSelected"));
      } else {
        this.closeProject(this.selected[0].id);
      }
    },
    closeProject(id) {
      axios
        .get("http://localhost:8080/closeProject?id=" + id)
        .then(response => {
          alert(this.$t("admin.close"));
          this.selected = [];
          this.closed = false;
          this.edited = false;
          this.sent = false;
          this.created = false;
        })
        .catch(err => console.log(err));
    },
    onSelect(items) {
      this.selected = items;
    },

    create() {
      this.closed = false;
      this.edited = false;
      this.sent = false;
      this.created = true;
      this.toggleMenu();
      this.fetchLocations();
    },
    send() {
      this.closed = false;
      this.edited = false;
      this.sent = true;
      this.created = false;
      this.toggleMenu();
    },
    edit() {
      this.closed = false;
      this.edited = true;
      this.sent = false;
      this.created = false;
      this.toggleMenu();
    },
    close() {
      this.closed = true;
      this.edited = false;
      this.sent = false;
      this.created = false;
      this.toggleMenu();
      this.loadProjects();
    },
    fetchLocations() {
      axios
        .get("http://localhost:8080/locations")
        .then(response => {
          this.$set(this, "locations", response.data);
        })
        .catch(err => console.log(err));
    },
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
    },

    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];

      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty
        };
      }
    },
    calculateMoneyRaised(donations) {
      if (donations.length == 0) {
        return 0;
      }

      const moneyRaised = donations
        .map(donation => donation.money)
        .reduce((acc, curr) => acc + curr);

      return moneyRaised;
    },
    clearForm() {
      this.$v.$reset();
      this.form.projectname = null;
      this.form.location = null;
      this.form.moneyfactor = null;
      this.form.moneyporcentage = null;
      this.form.selectedDate = null;
    },
    capitalize(val) {
      return val.charAt(0).toUpperCase() + val.slice(1);
    },
    saveProject() {
      this.sending = true;

      let body_to_send = {
        project: {
          name: this.capitalize(this.form.projectname),
          finishDate: {
            year: this.form.selectedDate.getFullYear(),
            month: this.form.selectedDate.getMonth() + 1,
            day: this.form.selectedDate.getDate()
          },
          moneyFactor: this.form.moneyFactor,
          minPercentage: this.form.minPercentage
        },
        locationId: this.form.location
      };

      fetch("http://localhost:8080/project", {
        method: "post",
        body: JSON.stringify(body_to_send),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(() => {
          this.clearForm();
          this.toggleMenu();
          this.sending = false;
          this.created = false;
          alert(this.$t("admin.create"));
        })
        .catch(err => console.log(err));
    },
    validateUser() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.saveProject();
      }
    },
    loadProjects() {
      axios
        .get("http://localhost:8080/openProjects")
        .then(response => {
          this.$set(this, "projects", response.data);
        })
        .then(() => console.log(this))
        .catch(err => console.log(err));
    }
  },
  created() {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user && user.mail == "root@gmail.com") {
      this.user = user;
    } else {
      alert(this.$t("admin.denied"));
      this.$router.push("/auth");
    }
  }
};
</script>

<style lang="scss" scoped>
.toolbar {
  display: flex;
  justify-content: flex-start;
}
.md-app {
  min-height: 350px;
  border: 1px solid rgba(#000, 0.12);
}

.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
}
.section {
  padding: 0;
}

.color-section {
  background-color: #456a85 !important;
  padding: 45px;
}

.parent {
  padding: 20px;
  justify-content: center;
  margin-block-end: 20px;
}

.child {
  //padding: 100px;
  background-color: white;
  text-align: left;
}

.mid-child {
  border-left: 2px solid #000;
  border-right: 2px solid #000;
}
.profile-tabs::v-deep {
  .md-card-tabs .md-list {
    justify-content: center;
  }

  [class*="tab-pane-"] {
    margin-top: 3.213rem;
    padding-bottom: 50px;

    img {
      margin-bottom: 2.142rem;
    }
  }
  .box {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .md-table + .md-table {
    margin-top: 16px;
  }
}
</style>
