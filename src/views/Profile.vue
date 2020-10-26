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
                  <h3 class="title">{{user.nickName}}</h3>
                </div>
                <div class="md-layout parent">
                  <div class="md-layout-item md-size-30  child">
                    <div>
                      <center>
                        <h3>{{ $t('profile.donations') }}</h3>
                        <b>{{user.madeDonations.length}}</b>
                      </center>
                    </div>
                  </div>
                   <div class="md-layout-item md-size-30  child mid-child">
                    <div>
                      <center><h3>{{ $t('profile.points') }}</h3>
                              <b>{{user.points}}</b>
                      </center>
                      
                    </div>
                  </div>
                   <div class="md-layout-item md-size-30  child">
                    <div>
                      <center><h3>{{ $t('profile.projects') }}</h3>
                        <b>{{quantityOfProjectsContribuited(user.madeDonations)}}</b>
                      </center>
                      
                    </div>
                  </div>
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
import axios from 'axios'
export default {
  components: {
    //Tabs
  },
  bodyClass: "profile-page",
  data() {
    return {
      user: null
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
    getUser: (vueInstance, id) => {
      axios.get(`http://localhost:8080/user/${id}`)
      .then((response) =>{
        vueInstance.$set(vueInstance,"user", response.data)
      })
      .catch((err) => console.log(err))
    },
    quantityOfProjectsContribuited: (donations) => {
        return new Set(donations.map((donation) => donation.projectName)).size
    },
    classicModalHide() {
      this.classicModal = false;
    }
  },
  created() {
    this.getUser(this, this.$route.params.id)
  }
};
</script>

<style lang="scss" scoped>
.section {
  padding: 0;
}

.color-section {
  background-color:#fecd51!important;
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
}
</style>
