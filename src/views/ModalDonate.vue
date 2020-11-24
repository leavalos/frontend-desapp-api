<template>
  <div>
    <md-dialog :md-active.sync="showDialog">
      <div style="padding: 10px 10px 10px 10px;">
        <div style="display: grid;">
          <h4 class="modal-title">{{ projectName }}</h4>
          <md-button
            class="md-simple md-just-icon md-round modal-default-button"
            @click="classicModalHide"
          >
            <md-icon>clear</md-icon>
          </md-button>
        </div>

        <md-field class="md-success">
          <label>{{ $t("landing.modal.comment") }}</label>
          <md-textarea v-model="comment"></md-textarea>
        </md-field>

        <md-field
          :class="{ 'md-valid': !error, 'md-valid md-invalid': !!error }"
        >
          <md-icon>warning</md-icon>
          <label>{{ $t("landing.modal.donation") }}</label>
          <md-input
            type="number"
            v-model="money"
            :required="true"
            @change="validInput"
          ></md-input>
          <md-icon>attach_money</md-icon>
          <span class="md-error">{{ $t("landing.modal.error") }}</span>
        </md-field>

        <center>
          <md-button class="md-simple" @click="donate(projectName)">{{
            $t("landing.modal.donate")
          }}</md-button>
          <md-button class="md-danger md-simple" @click="classicModalHide">{{
            $t("landing.modal.close")
          }}</md-button>
        </center>
      </div>
    </md-dialog>

    <md-button
      class="md-success md-round classic-modal"
      @click="showDialog = true"
      >{{ $t("landing.donate") }}</md-button
    >
  </div>
</template>

<script>
export default {
  name: "DialogCustom",
  props: ["projectName"],
  data: () => ({
    showDialog: false,
    comment: "",
    money: 0,
    error: false,
    user: ""
  }),
  methods: {
    classicModalHide() {
      this.showDialog = false;
      this.comment = "";
      this.money = 0;
      this.error = false;
    },
    donate(projectName) {
      if (!this.user || this.user.mail == "root@gmail.com") {
        alert(this.$t("landing.modal.session"));
      } else {
        if (this.money == 0) {
          this.error = true;
        } else {
          this.error = false;
          let money_to_send = new Number(this.money);
          let body_to_send = {
            money: money_to_send.toFixed(2),
            comment: this.comment,
            nickname: this.user.nickName,
            date: new Date().toISOString(),
            projectName: projectName
          };

          console.log(body_to_send);

          fetch("http://localhost:8080/donation", {
            method: "post",
            body: JSON.stringify(body_to_send),
            headers: {
              "Content-Type": "application/json"
            }
          }).then(() => {
            this.classicModalHide();
            this.$emit("donate");
          });
        }
      }
    },
    validInput() {
      if (this.money > 0) {
        this.error = false;
      }
    },
    load() {
      this.user = JSON.parse(localStorage.getItem("user"));
    }
  },
  created() {
    this.load();
  }
};
</script>

<style lang="scss" scoped>
.md-dialog .md-dialog-container {
  max-width: 768px;
}
</style>
