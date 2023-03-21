<template>
  <NotificationPage></NotificationPage>
  <WorkHeader></WorkHeader>
  <metainfo>
    <template v-slot:base="{ content }">{{ content }}</template>
    <template v-slot:title="{ content }">{{ content }}</template>
  </metainfo>
  <div class="header-spacer"></div>
  <AnalyticsBar></AnalyticsBar>
  <div class="scroll-container full-height full-width">
    <div id="main" class="column">
      <router-view></router-view>
    </div>
    <WorkFooter></WorkFooter>
    <div class="header-spacer2"></div>
  </div>
</template>

<script>
import AnalyticsBar from "./components/element/AnalyticsBar.vue";
import WorkHeader from "./components/header/WorkHeader.vue";
import NotificationPage from "./components/pages/NotificationPage.vue";
import WorkFooter from "./components/pages/WorkFooter.vue";
/* import { useMeta } from "vue-meta"; */

export default {
  name: "App",
  components: {
    WorkHeader,
    NotificationPage,
    WorkFooter,
    AnalyticsBar,
  },
  metaInfo() {
    return {
      title: "WorkDownload",
    };
  },
  mounted() {},
  setup() {
    /* useMeta({
      title: "WorkDownload",
      htmlAttrs: {
        lang: "en",
        amp: true,
      },

      meta: [
        { charset: "utf-8" },
        {
          name: "description",
          content: "work.download is a file delivery platform for freelancers.",
        },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "og:title", content: "WorkDownload" },
        { name: "og:url", content: "https://work.download" },
        {
          name: "og:description",
          content: "Deliver files to your clients easy & secure",
        },
        { name: "og:image", content: "https://work.download/img/profile.jpg" },
      ],
    }); */
  },
};
</script>

<style>
@media only screen and (max-width: 600px) {
  html {
    font-size: 16px;
  }
}

@media only screen and (max-width: 400px) {
  html {
    font-size: 14px;
  }
}

@media only screen and (max-width: 350px) {
  html {
    font-size: 12px;
  }
}
</style>

<style scoped>
#main {
  width: 100%;
  min-height: 95%;
  padding-top: 4rem;
  padding-bottom: 4rem;
  justify-content: center;
  align-items: center;
}

.header-spacer {
  height: 5rem;
}

.header-spacer2 {
  height: 5rem;
}

.scroll-container {
  overflow-y: scroll;
  min-height: fit-content;
}

@media only screen and (max-width: 600px) {
  #main {
    width: 100%;
    padding: 0;
    height: min-content;
    min-height: 0;
    overflow: hidden;
  }

  .header-spacer2 {
    height: 5rem;
  }
}
</style>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap");
* {
  text-decoration: none;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  font-family: "Poppins", Arial, sans-serif;
}

html {
  height: 100vh;
  width: 100vw;
  overflow-x: hidden;
  overflow-y: auto;
}

body {
  background-color: #f2f5ff;
  width: 100%;
  height: 100%;
  overflow-y: hidden;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%;
}

.ontop {
  position: relative;
  z-index: 9999999999;
}

.label {
  color: #707479;
  font-size: 0.8rem;
}

.bg-white {
  background-color: white;
}

.bg-white-2 {
  background-color: #f2f3f4;
}

.bg-primary {
  background-color: #4682da;
}

.text-dark-1 {
  color: #707479;
}

.align-left {
  text-align: left;
  width: 100%;
}

.text-dark-2 {
  color: #353434;
}

h1 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #353434;
}

p {
  color: #737373;
  font-weight: 400;
  font-size: 1rem;
}

h2 {
  font-size: 1.3rem;
  font-weight: 600;
  color: #707479;
}

h3 {
  font-size: 1rem;
  font-weight: 500;
  color: rgb(22, 22, 22);
}

h4 {
  font-size: 0.8rem;
  color: #858585;
  font-weight: 400;
  letter-spacing: 0.1ch;
}

ul,
li {
  list-style: none;
}

.row {
  display: flex;
  flex-direction: row;
}

.column {
  display: flex;
  flex-direction: column;
}

.icon-xs {
  width: 0.75rem;
  height: 0.75rem;
}

.icon-s {
  width: 1rem;
  height: 1rem;
}

.icon-m {
  width: 1.5rem;
  height: 1.5rem;
}

.icon-l {
  width: 2rem;
  height: 2rem;
}

.icon-xl {
  width: 2.5rem;
  height: 2.5rem;
}

.icon-xxl {
  width: 5rem;
  height: 5rem;
}

.spacer-xs {
  height: 0.25rem;
  width: 0.25rem;
}

.spacer-s {
  height: 0.5rem;
  width: 0.5rem;
}

.spacer-m {
  height: 1rem;
  width: 1rem;
}

.spacer-l {
  height: 1.5rem;
  width: 1.5rem;
}

.spacer-xl {
  height: 3rem;
  width: 3rem;
}

.spacer-xxl {
  height: 6rem;
  width: 6rem;
}

.spacer-xxxl {
  height: 12rem;
  width: 12rem;
}

hr.dashed {
  border-top: 1px dashed #bbb;
}

/* Dotted border */
hr.dotted {
  border-top: 1px dotted #bbb;
}

/* Solid border */
hr.solid {
  border-top: 1px solid #bbb;
}

/* Rounded border */
hr.rounded {
  border-top: 4px solid #bbb;
  border-radius: 5px;
}

.full-width {
  width: 100%;
}

.full-height {
  height: 100%;
}

.relative {
  position: relative;
}

.fit {
  object-fit: cover;
}

.right {
  align-self: flex-end;
  float: right;
}

.error {
  background-color: rgb(172, 74, 74);
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
  color: white;
  border-radius: 2rem;
  transition: all 0.1s;
}

.shrink {
  width: fit-content;
}

.error:hover {
  background-color: rgb(150, 60, 60);
}

.success {
  background-color: rgb(74, 172, 87);
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
  color: white;
  border-radius: 2rem;
  transition: all 0.1s;
}

.success:hover {
  background-color: rgb(65, 148, 76);
}

@media only screen and (max-width: 600px) {
  .mobile-full-width {
    width: 100%;
  }
}

.center {
  align-items: center;
}

.equal {
  flex: 1;
}

.justify-center {
  justify-content: center;
}

.pointer {
  cursor: pointer;
}

.space-between {
  justify-content: space-between;
}

/* width */
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #a5a5a5;
  border-radius: 2rem;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #4682da;
  border-radius: 1rem;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
