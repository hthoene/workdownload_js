import { createApp } from "vue";
import App from "./App.vue";
import VueGtag from "vue-gtag";

import { createRouter, createWebHistory } from "vue-router";

import LoginPage from "../src/components/pages/LoginPage.vue";
import DashboardPage from "../src/components/pages/DashboardPage.vue";
import EditPage from "../src/components/pages/EditDeliveryPage.vue";
import PrivacyPage from "../src/components/pages/PrivacyPage.vue";
import ManagePage from "../src/components/pages/ManagePage.vue";
import FileManagePage from "../src/components/pages/FileManagePage.vue";
import DownloadPage from "../src/components/pages/DownloadPage.vue";
import HomePage from "../src/components/pages/HomePage.vue";
import RegistrationPage from "../src/components/pages/RegistrationPage.vue";
import NotFoundPage from "../src/components/pages/NotFoundPage.vue";
import ProfilePage from "../src/components/pages/ProfilePage.vue";
import EditUrlPage from "../src/components/pages/EditUrlPage.vue";
import AdminPage from "../src/components/pages/admin/AdminPage.vue";
import CreateDeliveryPage from "../src/components/pages/CreateDeliveryPage.vue";
import EmailPage from "../src/components/pages/EmailPage.vue";
import ImprintPage from "./components/pages/legal/ImprintPage.vue";
import ResetPasswordPage from "../src/components/pages/ResetPasswordPage.vue";
import TermsOfUsePage from "../src/components/pages/legal/TermsOfUsePage.vue";
import ContactPage from "../src/components/pages/legal/ContactPage.vue";

import { createMetaManager, plugin as metaPlugin } from "vue-meta";

import { createStore } from "vuex";

import AuthModule from "./modules/AuthModule";
import DeliveryModule from "./modules/DeliveryModule";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/dashboard", component: DashboardPage },
    { path: "/login", component: LoginPage },
    { path: "/edit", component: EditPage },
    { path: "/files", component: FileManagePage },
    { path: "/create", component: CreateDeliveryPage },
    { path: "/privacy", component: PrivacyPage },
    { path: "/termsOfUse", component: TermsOfUsePage },
    { path: "/admin", component: AdminPage },
    { path: "/manage", component: ManagePage },
    { path: "/email", component: EmailPage },
    { path: "/contact", component: ContactPage },
    { path: "/imprint", component: ImprintPage },
    { path: "/reset/:token", component: ResetPasswordPage },
    { path: "/reset", component: ResetPasswordPage },
    { path: "/", component: HomePage },
    { path: "/notfound", component: NotFoundPage },
    { path: "/register", component: RegistrationPage },
    { path: "/profile", component: ProfilePage },
    { path: "/share", component: EditUrlPage },
    { path: "/:urlName", component: DownloadPage },
  ],
});

router.beforeEach((to, _, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const authPages = ["/dashboard", "/edit", "/files"];
  const authRequired = authPages.includes(to.path);
  const loggedIn = localStorage.getItem("user");

  if (authRequired && !loggedIn) {
    return next({
      path: "/login",
      query: { returnUrl: to.path },
    });
  }

  next();
});

const store = createStore({
  state() {
    return {};
  },
  modules: { delivery: DeliveryModule, authentication: AuthModule },
});

const app = createApp(App);

window.ChatraSetup = {
  colors: {
    buttonText: "#f0f0f0" /* chat button text color */,
    buttonBg: "#4682DA" /* chat button background color */,
  },
};

(function (d, w, c) {
  w.ChatraID = "ZRKLY37ZrPTMiGnAk";
  var s = d.createElement("script");
  w[c] =
    w[c] ||
    function () {
      (w[c].q = w[c].q || []).push(arguments);
    };
  s.async = true;
  s.src = "https://call.chatra.io/chatra.js";
  if (d.head) d.head.appendChild(s);
})(document, window, "Chatra");

app.use(store);

// TODO: https://jasonwatmore.com/post/2018/09/21/vuejs-basic-http-authentication-tutorial-example

app.use(router);

app.use(VueGtag, {
  config: { id: "G-ZGSMTWGXG7" },
  enabled: false,
});

const metaManager = createMetaManager();

app.use(metaManager);
app.use(metaPlugin);

app.mount("#app");
