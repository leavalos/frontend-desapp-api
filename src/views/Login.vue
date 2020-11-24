<template>
  <div class="wrapper">
    <div class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div
            class="md-layout-item md-size-33 md-small-size-66 md-xsmall-size-100 md-medium-size-40 mx-auto"
          >
            <login-card header-color="green">
              <h4 slot="title" class="card-title">
                {{ registered ? $t("loggin.register") : $t("loggin.loggin") }}
              </h4>
              <md-button
                slot="buttons"
                href="javascript:void(0)"
                class="md-just-icon md-simple md-white"
                @click="eventFB"
              >
                <i class="fab fa-facebook-square"></i>
              </md-button>
              <v-facebook-login
                ref="fbcomponent"
                v-show="false"
                v-if="registered"
                app-id="1354911484850696"
                slot="buttons"
                @login="fbResgiter"
                :login-options="{ scope: 'email', return_scopes: true }"
                @sdk-init="initFB"
              />
              <v-facebook-login
                ref="fbcomponent"
                v-show="false"
                v-else
                app-id="1354911484850696"
                slot="buttons"
                @login="fbLogin"
                :login-options="{ scope: 'email', return_scopes: true }"
                @sdk-init="initFB"
              />
              <md-button
                slot="buttons"
                href="javascript:void(0)"
                class="md-just-icon md-simple md-white"
              >
                <i class="fab fa-twitter"></i>
              </md-button>
              <md-button
                slot="buttons"
                href="javascript:void(0)"
                class="md-just-icon md-simple md-white"
              >
                <i class="fab fa-google-plus-g"></i>
              </md-button>

              <md-field
                class="md-form-group"
                slot="inputs"
                :class="{ 'md-valid': !error, 'md-valid md-invalid': !!error }"
                v-show="registered"
              >
                <md-icon>face</md-icon>
                <label for="nickname"
                  ><span style="color: black;">{{
                    $t("loggin.nickname")
                  }}</span></label
                >
                <md-input
                  name="nickname"
                  v-model="nickname"
                  :required="true"
                  @change="validNickname"
                ></md-input>
                <span class="md-error">{{ $t("landing.modal.error") }}</span>
              </md-field>

              <md-field
                class="md-form-group"
                slot="inputs"
                :class="{
                  'md-valid': !errorEmail,
                  'md-valid md-invalid': !!errorEmail
                }"
                style="padding-top: 15px;"
              >
                <md-icon>email</md-icon>
                <label for="email"
                  ><span style="color: black;">{{
                    $t("loggin.email")
                  }}</span></label
                >
                <md-input
                  name="email"
                  v-model="email"
                  type="email"
                  :required="true"
                  @change="validEmail"
                ></md-input>
                <span class="md-error">{{ $t("landing.modal.error") }}</span>
              </md-field>

              <md-field
                class="md-form-group"
                slot="inputs"
                :class="{
                  'md-valid': !errorPass,
                  'md-valid md-invalid': !!errorPass
                }"
                style="padding-top: 15px;"
              >
                <md-icon>lock_outline</md-icon>
                <label for="password"
                  ><span style="color: black;">{{
                    $t("loggin.password")
                  }}</span></label
                >
                <md-input
                  name="password"
                  v-model="password"
                  :required="true"
                  @change="validPassword"
                  type="password"
                ></md-input>
                <span class="md-error">{{ $t("landing.modal.error") }}</span>
              </md-field>

              <md-button
                v-if="errorEmail || errorPass || (!password && !email)"
                slot="footer"
                class="md-simple md-success md-lg"
                @click="loggin"
                disabled
                v-show="!registered"
              >
                {{ $t("loggin.loggin") }}
              </md-button>
              <md-button
                v-else
                slot="footer"
                class="md-simple md-success md-lg"
                @click="loggin"
                v-show="!registered"
              >
                {{ $t("loggin.loggin") }}
              </md-button>
              <md-button
                v-if="
                  errorEmail ||
                    errorPass ||
                    error ||
                    (!password && !email && !nickname)
                "
                slot="footer"
                class="md-simple md-success md-lg"
                @click="createUser"
                disabled
                v-show="registered"
              >
                {{ $t("loggin.register") }}
              </md-button>
              <md-button
                v-else
                slot="footer"
                class="md-simple md-success md-lg"
                @click="createUser"
                v-show="registered"
              >
                {{ $t("loggin.register") }}
              </md-button>
              <p slot="description" class="description">
                <b>{{
                  registered ? $t("loggin.newUser") : $t("loggin.register")
                }}</b>
                <span @click="registered = !registered">{{
                  $t("loggin.click")
                }}</span>
              </p>
            </login-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { LoginCard } from "@/components";
import axios from "axios";
import VFacebookLogin from "vue-facebook-login-component";

export default {
  components: {
    LoginCard,
    VFacebookLogin
  },
  bodyClass: "login-page",
  data() {
    return {
      nickname: null,
      email: null,
      password: null,
      FB: null,
      error: false,
      errorEmail: false,
      errorPass: false,
      registered: false
    };
  },
  props: {
    header: {
      type: String,
      default: require("@/assets/img/GG-PZzjT2kzo.jpg")
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
    initFB(init) {
      this.$set(this, "FB", init.FB);
    },
    fbLogin() {
      this.FB.api("/me", "GET", { fields: "email,name" }, this.logginCallback);
    },
    fbResgiter() {
      this.FB.api(
        "/me",
        "GET",
        { fields: "email,name" },
        this.createUserCallBack
      );
    },
    eventFB() {
      this.$refs.fbcomponent.$el.click();
    },
    logginCallback(response) {
      axios
        .get(
          "http://localhost:8080/login?mail=" +
            response.email +
            "&&password=Aa" +
            response.id
        )
        .then(responseUser => {
          console.log(responseUser);

          if (responseUser.status == 200) {
            responseUser.data.facebook = true;
            localStorage.setItem("user", JSON.stringify(responseUser.data));
            this.$router.push("/");
          } else {
            alert(this.$t("loggin.error.user"));
          }
        })
        .catch(error => alert(this.$t("loggin.error.user")));
    },
    createUserCallBack(response) {
      let body_to_send = {
        mail: response.email,
        nickName: response.name,
        password: "Aa" + response.id
      };

      fetch("http://localhost:8080/user", {
        method: "post",
        body: JSON.stringify(body_to_send),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(responseUser => {
          if (responseUser.status == 201) {
            alert(this.$t("loggin.error.register"));

            this.logginCallback(response);
          } else {
            alert(this.$t("loggin.error.errorRegister"));
          }
        })
        .catch(err => console.log(err));
    },
    createUser() {
      let body_to_send = {
        mail: this.email,
        nickName: this.nickname,
        password: this.password
      };

      fetch("http://localhost:8080/user", {
        method: "post",
        body: JSON.stringify(body_to_send),
        headers: {
          "Content-Type": "application/json"
        }
      }).then(response => {
        if (response.status == 201) {
          alert(this.$t("loggin.error.register"));

          this.loggin();
        } else {
          alert(this.$t("loggin.error.errorRegister"));
        }
      });
    },
    validNickname() {
      if (this.nickname.length < 7) {
        this.error = true;
      } else {
        this.error = false;
      }
    },

    validEmail() {
      if (this.email.length < 7) {
        this.errorEmail = true;
      } else {
        this.errorEmail = false;
      }
    },

    validPassword() {
      if (this.password.length < 7) {
        this.errorPass = true;
      } else {
        this.errorPass = false;
      }
    },
    loggin() {
      axios
        .get(
          "http://localhost:8080/login?mail=" +
            this.email +
            "&&password=" +
            this.password
        )
        .then(response => {
          if (response.data.password == this.password) {
            if (response.status == 200) {
              response.data.facebook = false;
              localStorage.setItem("user", JSON.stringify(response.data));
              if (response.data.mail == "root@gmail.com") {
                this.$router.push("/admin");
              } else {
                this.$router.push("/");
              }
            } else {
              alert(this.$t("loggin.error.user"));
            }
          } else {
            alert(this.$t("loggin.error.password"));
          }
        });
    }
  }
};
</script>

<style lang="css"></style>
