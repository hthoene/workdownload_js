<template>
  <header class="full-width column header-holder ontop">
    <div id="header" class="bg-white" :class="{ 'header-shadow': showShadow }">
      <nav class="header-nav">
        <a href="#" class="text-dark-2" @click="clickLogo"
          ><img
            class="logo"
            src="../../assets/WorkDownloadLogo.svg"
            alt="work.download logo"
          />

          <span>work.download</span>
          <div class="spacer-xs"></div>
          <p>(Beta)</p>
        </a>

        <ul class="row header-links hide-mobile">
          <li>
            <router-link to="/" class="nav-item" active-class="active" exact>
              Home
            </router-link>
          </li>
          <div class="spacer-l"></div>
          <li>
            <router-link
              to="dashboard"
              class="nav-item"
              active-class="active"
              exact
            >
              Dashboard
            </router-link>
          </li>
          <div class="spacer-l"></div>
          <li>
            <router-link
              to="contact"
              class="nav-item"
              active-class="active"
              exact
            >
              Contact
            </router-link>
          </li>
          <div v-if="isAdmin" class="spacer-l"></div>
          <li v-if="isAdmin">
            <router-link
              to="admin"
              class="nav-item"
              active-class="active"
              exact
            >
              Admin
            </router-link>
          </li>
        </ul>
        <div class="row center space-between" v-if="!loggedIn">
          <div class="hide-mobile row center">
            <CustomButton mode="default" @click="toLogin"
              ><span>Login</span></CustomButton
            >
            <div class="spacer-l"></div>
            <CustomButton mode="flat" @click="toRegistration"
              ><span>Register</span></CustomButton
            >
          </div>
          <div class="row center hide-desktop pointer" @click="toggleMobileNav">
            <img src="../../assets/menu.svg" class="icon-m" />
          </div>
        </div>
        <div class="row" v-else>
          <div class="row center">
            <img
              src="../../assets/setting.svg"
              id="settings-button"
              class="icon-m pointer hide-mobile"
              @click="toProfile"
            />
          </div>
          <div class="spacer-m"></div>
          <div id="profile-picture-holder">
            <img
              :src="profilePicUrl"
              class="full-height full-width pointer"
              @click="toProfile"
            />
          </div>
          <div class="spacer-l"></div>
          <CustomButton class="hide-mobile" mode="default" @click="logout"
            ><span>Logout</span></CustomButton
          >
          <div class="row center hide-desktop pointer" @click="toggleMobileNav">
            <img src="../../assets/menu.svg" class="icon-m" />
          </div>
        </div>
      </nav>
    </div>
    <div
      class="column mobile-expanded-menu hide-desktop full-width"
      v-if="expanded"
    >
      <router-link to="/" class="nav-item" active-class="active" exact>
        <div class="mobile-nav-item">Home</div>
      </router-link>

      <router-link to="dashboard" class="nav-item" active-class="active" exact>
        <div class="mobile-nav-item" v-if="loggedIn">Dashboard</div>
      </router-link>

      <router-link to="contact" class="nav-item" active-class="active" exact>
        <div class="mobile-nav-item">Contact</div>
      </router-link>
      <router-link
        v-if="isAdmin"
        to="admin"
        class="nav-item"
        active-class="active"
        exact
      >
        <div class="mobile-nav-item">Admin</div>
      </router-link>
      <div class="spacer-s"></div>
      <div class="row center full-width justify-center" v-if="!loggedIn">
        <CustomButton mode="default" @click="toLogin"
          ><span>Login</span></CustomButton
        >
        <div class="spacer-s"></div>
        <CustomButton mode="default" @click="toRegistration"
          ><span>Register</span></CustomButton
        >
      </div>
      <div class="spacer-s" v-if="!loggedIn"></div>
    </div>
  </header>
</template>

<script>
import CustomButton from "../layout/CustomButton.vue";
// import config from "../../_helpers/config";

export default {
  components: { CustomButton },
  data() {
    return {
      expanded: false,
    };
  },

  mounted() {
    this.$store.dispatch("checkLogin");
  },

  watch: {
    userData() {
      this.$store.dispatch("init").catch((err) => console.log(err));
    },
  },

  computed: {
    isAdmin() {
      if (!this.userData) {
        return false;
      }
      return this.userData.appUserRole == "ADMIN";
    },
    isMobile() {
      return window.matchMedia("(max-width: 700px)");
    },
    userData() {
      return this.$store.state.authentication.userData;
    },
    loggedIn() {
      return this.$store.state.authentication.userData != null;
    },
    profilePicUrl() {
      return this.userData.profilePictureUrl;

      /*
      return (
        config.api_url +
        "api/v1/file/picture/" +
        this.$store.state.authentication.userData.id
      );

      
      */
    },
    showShadow() {
      return this.$route.path != "/";
    },
  },
  methods: {
    toggleMobileNav() {
      this.expanded = !this.expanded;
    },
    toLogin() {
      this.$router.replace("/login");
    },
    toRegistration() {
      this.$router.replace("/register");
    },
    logout() {
      this.$store.dispatch("logout");
      this.$router.replace("/login");
    },
    toProfile() {
      this.$router.replace("/profile");
    },
    clickLogo() {
      this.$router.replace("/");
    },
  },
};
</script>

<style scoped>
.mobile-expanded-menu {
  position: relative;
  background-color: white;
  color: black;
  z-index: 9999999999999;
  box-shadow: 1px 1px 3px 3px rgba(0, 0, 0, 0.034);
}

.mobile-nav-item {
  padding: 0.4rem;
  z-index: 9999999999999;
  background-color: white;
  cursor: pointer;
}

.mobile-nav-item:hover {
  padding: 0.4rem;
  background-color: rgb(245, 245, 245);
}

.header-holder {
  position: fixed;
}

#settings-button {
  transition: all 5s;
}

#settings-button:hover {
  transform: rotateZ(180deg) scale(1.05);
}

.nav-item {
  color: rgba(115, 116, 117, 0.801);
  transition: all 0.1s;
}

.nav-item:hover {
  transform: scale(1.05);
  color: #5f6164cc;
}

.nav-item.active {
  color: rgb(100, 94, 94);
  position: relative;
  font-weight: 500;
}

.nav-item.active:hover {
  transform: scale(1.05);
  color: #1a1b1bcc;
}

#header {
  overflow: hidden;
  z-index: 555;
  width: 100%;
  display: flex;
  height: 5rem;
  padding: 0 20%;
  transition: all 0.2s;
  box-shadow: 0px 1px 5px 2px rgba(0, 0, 0, 0.055);
}

.header-shadow {
  box-shadow: 0px 1px 5px 2px rgba(0, 0, 0, 0.055);
}

ul li a {
  font-weight: 500;
}

.logo {
  height: 3rem;
  width: 3rem;
}

#login-arrow:hover {
  width: 1rem;
  margin-left: 1rem;
}

nav {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

nav a {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-weight: 500;
}

nav a img {
  margin-right: 0.5rem;
}

.hide-desktop {
  display: none;
}

#profile-picture-holder {
  width: 3rem;
  height: 3rem;
  overflow: hidden;
  border-style: solid;
  border-width: 2px;
  border-radius: 5rem;
  border-color: #c0c3ce;
  padding: 2px;
  background-color: rgba(207, 204, 204, 0.486);
}
#profile-picture-holder img {
  border-radius: 5rem;
}

@media only screen and (max-width: 1400px) {
  #header {
    padding: 0 2rem;
  }

  .header-holder {
    justify-content: space-between;
  }
}

@media only screen and (max-width: 900px) {
  .header-links {
    flex-direction: column;
  }
  .hide-mobile {
    display: none;
  }
  .hide-desktop {
    display: flex;
  }
}

#profile-picture-holder {
  width: 3rem;
  height: 3rem;
  overflow: hidden;
  border-style: solid;
  border-width: 2px;
  border-radius: 5rem;
  border-color: #c0c3ce;
  padding: 2px;
  background-color: rgba(207, 204, 204, 0.486);
}
#profile-picture-holder img {
  border-radius: 5rem;
}
</style>
