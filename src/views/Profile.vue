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
                <div class="md-layout parent">
                  <div class="md-layout-item md-size-30  child">
                    <div>
                      <center>
                        <h3>{{ $t("profile.donations") }}</h3>
                        <b>{{ user.madeDonations.length }}</b>
                      </center>
                    </div>
                  </div>
                  <div class="md-layout-item md-size-30  child mid-child">
                    <div>
                      <center>
                        <h3>{{ $t("profile.points") }}</h3>
                        <b>{{ user.points }}</b>
                      </center>
                    </div>
                  </div>
                  <div class="md-layout-item md-size-30  child">
                    <div>
                      <center>
                        <h3>{{ $t("profile.projects") }}</h3>
                        <b>{{
                          quantityOfProjectsContribuited(user.madeDonations)
                        }}</b>
                      </center>
                    </div>
                  </div>
                </div>

                <h3 style="padding-bottom: 5%">
                  <b>{{ "Donaciones hechas" }}</b>
                </h3>
                <md-table :mdFixedHeader="True">
                  <md-table-row>
                    <md-table-head md-numeric><b>#</b></md-table-head>
                    <md-table-head style="text-align: center;"
                      ><b>{{ "Proyecto" }}</b></md-table-head
                    >
                    <md-table-head style="text-align: center;"
                      ><b>{{ "Monto de la donacion" }}</b></md-table-head
                    >
                    <md-table-head
                      ><b>{{ "Fecha de la donacion  " }}</b></md-table-head
                    >
                  </md-table-row>

                  <md-table-row
                    v-for="(donation, index) in donations[colorPagination - 1]"
                    :key="index"
                  >
                    <md-table-cell>{{
                      indexes.indexOf(donation)
                    }}</md-table-cell>
                    <md-table-cell>{{ donation.projectName }}</md-table-cell>
                    <md-table-cell style="padding-right: 4%;">{{
                      $t("number", { number: donation.money })
                    }}</md-table-cell>
                    <md-table-cell style="padding-left: 6%;">{{
                      new Date(donation.date).toLocaleDateString(
                        $i18n.locale.toLowerCase()
                      )
                    }}</md-table-cell>
                  </md-table-row>

                  <md-table-row
                    v-for="(_, index) in new Array(
                      8 -
                        (donations.length == 0
                          ? 0
                          : donations[colorPagination - 1].length)
                    )"
                    :key="index"
                  >
                    <md-table-cell></md-table-cell>
                    <md-table-cell></md-table-cell>
                    <md-table-cell></md-table-cell>
                    <md-table-cell></md-table-cell>
                  </md-table-row>
                </md-table>

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
    </div>
  </div>
</template>

<script>
import { Tabs } from "@/components";
import axios from "axios";
import { Pagination } from "@/components";

export default {
  components: {
    Pagination
  },
  bodyClass: "profile-page",
  data() {
    return {
      user: null,
      isHide: false,
      donations: null,
      colorPagination: 1,
      totalPages: null,
      indexes: null
    };
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
    getUser: (vueInstance, id) => {
      axios
        .get(`http://localhost:8080/user/${id}`)
        .then(response => {
          vueInstance.$set(vueInstance, "user", response.data);
          vueInstance.$set(vueInstance, "indexes", response.data.madeDonations);
          let donations = vueInstance.reorderList(
            response.data.madeDonations,
            0,
            8
          );

          const pagesTotal = donations.length;

          vueInstance.$set(vueInstance, "donations", donations);
          vueInstance.$set(vueInstance, "totalPages", Math.round(pagesTotal));
        })
        .then(() => console.log(""))
        .catch(err => console.log(err));
    },
    quantityOfProjectsContribuited: donations => {
      return new Set(donations.map(donation => donation.projectName)).size;
    },
    classicModalHide() {
      this.classicModal = false;
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
    }
  },
  created() {
    this.getUser(this, this.$route.params.id);
  }
};
</script>

<style lang="scss" scoped>
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
}
</style>
