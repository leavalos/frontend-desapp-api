<template>
  <md-toolbar
    id="toolbar"
    md-elevation="0"
    class="md-transparent md-absolute"
    :class="extraNavClasses"
    :color-on-scroll="colorOnScroll"
  >
    <div class="md-toolbar-row md-collapse-lateral">
      <div class="md-toolbar-section-start" @click="home">
        <h3 class="md-title">Crowdfunding Solidario Argentina Conectada</h3>
      </div>
      <div class="md-toolbar-section-end">
        <md-button
          class="md-just-icon md-simple md-toolbar-toggle"
          :class="{ toggled: toggledClass }"
          @click="toggleNavbarMobile()"
        >
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </md-button>

        <div class="md-collapse">
          <div class="md-collapse-wrapper">
            <mobile-menu nav-mobile-section-start="false">
              <!-- Here you can add your items from the section-start of your toolbar -->
            </mobile-menu>
            <md-list>
              <li class="md-list-item" v-if="!showDownload">
                <a
                  href="javascript:void(0)"
                  class="md-list-item-router md-list-item-container md-button-clean dropdown"
                >
                  <div class="md-list-item-content" >
                    <drop-down direction="down">
                      <md-button
                        slot="title"
                        class="md-button md-button-link md-white md-simple dropdown-toggle"
                        data-toggle="dropdown"
                      >
                        <i class="material-icons">language</i>
                        <p>{{ $t('navbar') }}</p>
                      </md-button>
                      <ul class="dropdown-menu dropdown-with-icons">

                        <li v-for="(language, index) in languages" :key="index" @click="setLangague(language)">
                             <a>
                            <i :class="['material-icons', language == languagesSelected ? 'reddot' : '']">fiber_manual_record</i>
                            <p>{{language}}</p>
                            </a>
                        </li>
            
                      </ul>
                    </drop-down>
                  </div>
                </a>
              </li>


              <li class="md-list-item" v-if="showLogUser">
                <a
                  href="javascript:void(0)"
                  class="md-list-item-router md-list-item-container md-button-clean dropdown"
                >
                  <div class="md-list-item-content">
                    <drop-down direction="down">
                      <md-button
                        slot="title"
                        class="md-button md-button-link md-white md-simple dropdown-toggle"
                        data-toggle="dropdown"
                      >
                        <i class="material-icons">account_box</i>
                       
                      </md-button>
                      <ul class="dropdown-menu dropdown-with-icons">

                        <li >

                            <a @click="profile">
                              <i class="material-icons">face</i>
                              <p>{{ JSON.parse(storage.getItem('user')).mail }}</p>
                              <md-tooltip  md-direction="right">{{ $t('profile.profile') }}</md-tooltip >
                            </a>
                            
                        </li>

                        <li >

                            <a @click="logout_">
                              <i class="material-icons">power_settings_new</i>
                              <p>{{ $t('logout.buttom') }}</p>
                              <md-tooltip  md-direction="right">{{ $t('logout.tooltip') }}</md-tooltip >
                            </a>
                            
                        </li>
                     

                        <li v-if="JSON.parse(storage.getItem('user')).facebook" v-show="false">
                          <center><v-facebook-login ref="fbcomponent"
                              app-id="1354911484850696" /></center>
                        </li>
                        
            
                      </ul>
                    </drop-down>
                  </div>
                </a>
              </li>
              <li class="md-list-item" v-else-if="auth">
                <a
                  href="javascript:void(0)"
                  class="md-list-item-router md-list-item-container md-button-clean dropdown"
                >
                  <div class="md-list-item-content">
                    <drop-down direction="down">
                      <md-button
                        slot="title"
                        class="md-button md-button-link md-white md-simple dropdown-toggle"
                        data-toggle="dropdown"
                      >
                        <i class="material-icons">account_box</i>
                       
                      </md-button>
                      <ul class="dropdown-menu dropdown-with-icons">

                        <li >

                            <a @click="goLogin">
                              <i class="material-icons">power_settings_new</i>
                              <p>{{"Log in"}}</p>
                            </a>
                            
                        </li>

                        
                        
            
                      </ul>
                    </drop-down>
                  </div>
                </a>
              </li>
           

           
             
            </md-list>
          </div>
        </div>
      </div>
    </div>
  </md-toolbar>
</template>

<script>
let resizeTimeout;
function resizeThrottler(actualResizeHandler) {
  // ignore resize events as long as an actualResizeHandler execution is in the queue
  if (!resizeTimeout) {
    resizeTimeout = setTimeout(() => {
      resizeTimeout = null;
      actualResizeHandler();
      // The actualResizeHandler will execute at a rate of 15fps
    }, 66);
  }
}
import MobileMenu from "@/layout/MobileMenu";
import VFacebookLogin from 'vue-facebook-login-component'
export default {
  components: {
    MobileMenu,
    VFacebookLogin
  },
  props: {
    type: {
      type: String,
      default: "white",
      validator(value) {
        return [
          "white",
          "default",
          "primary",
          "danger",
          "success",
          "warning",
          "info"
        ].includes(value);
      }
    },
    colorOnScroll: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      extraNavClasses: "",
      toggledClass: false,
      languages: ["Es", "En"],
      storage: localStorage,
      languagesSelected: this.$i18n.locale
    };
  },
  computed: {
    showDownload() {
      const excludedRoutes = ["login", "landing", "profile", "auth", "admin"];
      
      return excludedRoutes.every(r => r !== this.$route.name);
    },
    showLogUser() {
      const excludedRoutes = ["login", "landing", "profile", "admin"];
      return !excludedRoutes.every(r => r !== this.$route.name) && !!JSON.parse(localStorage.getItem('user'))
    },
    auth() {
      return this.$route.name != "auth"
    }
  },
  methods: {
    goLogin(){
      this.$router.push('/auth')
    },
    logout_(event) {
      //this.$emit('logout')
      if(!!this.$refs.fbcomponent) {
        this.$refs.fbcomponent.$el.click()
      }
      localStorage.removeItem('user')
      this.$router.push('/auth')
    },
    setLangague(language) {
      this.languagesSelected = language
      this.$i18n.locale = language
    },
    bodyClick() {
      let bodyClick = document.getElementById("bodyClick");
      if (bodyClick === null) {
        let body = document.querySelector("body");
        let elem = document.createElement("div");
        elem.setAttribute("id", "bodyClick");
        body.appendChild(elem);
        let bodyClick = document.getElementById("bodyClick");
        bodyClick.addEventListener("click", this.toggleNavbarMobile);
      } else {
        bodyClick.remove();
      }
    },
    toggleNavbarMobile() {
      this.NavbarStore.showNavbar = !this.NavbarStore.showNavbar;
      this.toggledClass = !this.toggledClass;
      this.$set(this, 'user', JSON.parse(localStorage.getItem('user')))
      this.bodyClick();
    },
    handleScroll() {
      let scrollValue =
        document.body.scrollTop || document.documentElement.scrollTop;
      let navbarColor = document.getElementById("toolbar");
      this.currentScrollValue = scrollValue;
      if (this.colorOnScroll > 0 && scrollValue > this.colorOnScroll) {
        this.extraNavClasses = `md-${this.type}`;
        navbarColor.classList.remove("md-transparent");
      } else {
        if (this.extraNavClasses) {
          this.extraNavClasses = "";
          navbarColor.classList.add("md-transparent");
        }
      }
    },
    scrollListener() {
      resizeThrottler(this.handleScroll);
    },
    scrollToElement() {
      let element_id = document.getElementById("downloadSection");
      if (element_id) {
        element_id.scrollIntoView({ block: "end", behavior: "smooth" });
      }
    },
    home() {
      this.$router.push('/')
    },
    profile() {
      let user = JSON.parse(localStorage.getItem('user'))
      if (user.mail == "root@gmail.com") {
           this.$router.push('/admin')
      }
      else {
        this.$router.push('/profile/'+JSON.parse(localStorage.getItem('user')).id)
      }
      
    }
  },
  mounted() {
    document.addEventListener("scroll", this.scrollListener);
  },
  beforeDestroy() {
    document.removeEventListener("scroll", this.scrollListener);
  },
};
</script>
<style scoped>
  .reddot {
    color: red;
  }
</style>>