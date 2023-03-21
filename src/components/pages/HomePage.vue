<template>
  <section id="home" class="column">
    <div class="spacer-xxl"></div>
    <h4 class="subtitle2">the future of file sharing</h4>
    <div class="spacer-s"></div>
    <h1 class="title-heading">
      Deliver Files<br />
      more
      <span class="font-blue">Secure & Easy</span>
    </h1>
    <div class="spacer-m"></div>
    <CustomButton mode="default" class="shrink">
      <span>Start Now</span>
    </CustomButton>

    <div class="spacer-m"></div>
    <div class="mobile-column full-width justify-between heading-image-holder">
      <img src="../../assets/WorkDownload_Head.png" id="title-image" />
      <div class="spacer-l hide-mobile"></div>
      <img
        src="../../assets/work_download_edit.png"
        class="efficient-image hide-mobile"
        id="title-image2"
      />
    </div>
  </section>
  <section id="section2">
    <h4 class="subtitle">start being more professional</h4>
    <div class="spacer-s"></div>
    <h1>More <span class="font-blue">Efficient</span> WorkFlow</h1>
    <p>Sharing files with your client has never been easier before</p>
    <div class="spacer-xl"></div>

    <div class="mobile-column efficient-image-holder full-width">
      <img
        src="../../assets/work_download_dashboard.png"
        class="efficient-image"
      />
      <div class="spacer-xl hide-mobile"></div>
      <img
        src="../../assets/work_download_password.png"
        class="efficient-image hide-mobile"
        id="password-image"
      />
    </div>
  </section>
  <section id="section3">
    <h4 class="subtitle2">all needed features</h4>
    <div class="spacer-s"></div>
    <h1>Easy & Useful <span class="font-blue">Features</span></h1>
    <p>Our platform is easy to learn and you can start today!</p>
    <div class="spacer-xl"></div>
    <div class="row full-width space-between mobile-column">
      <div class="column image-card center equal">
        <img src="../../assets/share.svg" alt="share" class="icon-card" />
        <div class="spacer-m"></div>
        <h2 class="text-center">Easy Data Sharing</h2>
        <div class="spacer-s"></div>
        <p class="text-center">
          Everything is design to be as simple as possible
        </p>
      </div>
      <div class="spacer-cards"></div>
      <div class="column image-card center equal">
        <img
          src="../../assets/cyber-security.svg"
          alt="cyber-security"
          class="icon-card"
        />
        <div class="spacer-m"></div>
        <h2 class="text-center">Advanced Encryption</h2>
        <div class="spacer-s"></div>
        <p class="text-center">
          We use modern AES 256 encryption to secure your files
        </p>
      </div>
      <div class="spacer-cards"></div>
      <div class="column image-card center equal">
        <img src="../../assets/email.svg" alt="email" class="icon-card" />
        <div class="spacer-m"></div>
        <h2 class="text-center">Email Notifications</h2>
        <div class="spacer-s"></div>
        <p class="text-center">Notify your clients with emails about changes</p>
      </div>
    </div>
    <div class="spacer-xl hide-mobile"></div>
    <div class="row full-width space-between mobile-column">
      <div class="column image-card center equal">
        <img
          src="../../assets/megaphone.svg"
          alt="megaphone"
          class="icon-card"
        />
        <div class="spacer-m"></div>
        <h2 class="text-center">No Ads</h2>
        <div class="spacer-s"></div>
        <p class="text-center">
          There are no ads, this prevents downloading malware
        </p>
      </div>
      <div class="spacer-cards"></div>
      <div class="column image-card center equal">
        <img src="../../assets/open-box.svg" class="icon-card" alt="open-box" />
        <div class="spacer-m"></div>
        <h2 class="text-center">Long Storage Time</h2>
        <div class="spacer-s"></div>
        <p class="text-center">
          Your clients files are always available to download
        </p>
      </div>
      <div class="spacer-cards"></div>
      <div class="column image-card center equal">
        <img
          src="../../assets/customer-support.svg"
          alt="customer-support"
          class="icon-card"
        />
        <div class="spacer-m"></div>
        <h2 class="text-center">Support</h2>
        <div class="spacer-s"></div>
        <p class="text-center">
          We are always here to help you and answer your questions
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import CustomButton from "../layout/CustomButton.vue";

export default {
  components: { CustomButton },
  methods: {
    getStarted() {
      this.$router.replace("register");
    },
  },
};
</script>

<style scoped>
.mobile-column {
  flex-direction: row;
  display: flex;
  justify-content: center;
  align-items: center;
}

.title-heading {
  line-height: 1.7cm;
}

.spacer-cards {
  flex: 0.2;
}

.row-equal {
  flex: 1;
  justify-content: center;
}

.image-card {
  box-shadow: 0 0 3px 3px rgba(90, 90, 90, 0.021);
  border-radius: 0.4rem;
  padding: 2rem;
  background-color: white;
  transition: all 0.3s;
  align-self: stretch;
}

.image-card h2 {
  font-size: 1.4rem;
}

.image-card p {
  font-size: 1rem;
}

.image-card:hover {
  transform: scale(1.05);
  box-shadow: 0 0 5px 5px rgba(68, 68, 68, 0.048);
}

.image-card img {
  transition: all 0.3s;
}

.image-card:hover img {
  transform: rotate(3deg);
}

.icon-card {
  width: 4rem;
  height: 4rem;
}

.heading-image-holder {
  justify-content: center;
  align-items: flex-end;
}

#home {
  padding-top: 0rem;
  margin-top: -4rem;
  background-image: url(../../assets/background_curved.svg);

  background-position-y: bottom;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
}

section {
  display: flex;
  flex-direction: column;
  background-color: white;
  width: 100vw;
  min-height: fit-content;
  align-items: center;
  padding: 8rem 20% 8rem 20%;
}

.subtitle {
  align-self: center;
  border-radius: 10rem;
  padding: 0.6rem 2rem 0.6rem 2rem;
  width: fit-content;
  background-color: rgb(249, 230, 255);
  color: rgb(197, 68, 236);
  background-color: rgb(230, 236, 255);
  color: rgb(68, 121, 236);
  text-transform: uppercase;
  font-weight: 600;
}

.subtitle2 {
  align-self: center;
  border-radius: 10rem;
  padding: 0.6rem 2rem 0.6rem 2rem;
  width: fit-content;
  background-color: rgb(249, 230, 255);
  color: rgb(197, 68, 236);
  background-color: rgb(255, 255, 255);
  box-shadow: 0 0 3px 3px rgba(153, 153, 153, 0.075);
  color: rgb(68, 121, 236);
  text-transform: uppercase;
  font-weight: 600;
}

p {
  font-size: 1.2rem;
}

.efficient-image {
  border-radius: 1rem;
  box-shadow: 0 0 3px 3px rgba(46, 46, 46, 0.055);
  width: 40%;
}

#password-image {
  height: min-content;
}

.efficient-image-holder {
  justify-content: center;
  align-items: center;
}

#section3 {
  background-image: url(../../assets/background_curved2.svg);

  background-position-y: top;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
}

.font-blue {
  color: rgb(65, 65, 235);
}

h1 {
  font-size: 3rem;
  text-transform: capitalize;
}

#title-image {
  width: 50%;
}

#title-image2 {
  width: 38%;
  height: min-content;
  margin-bottom: 1rem;
}

.text-center {
  text-align: center;
  width: 100%;
}

.hide-desktop {
  display: none;
}

@media only screen and (max-width: 1650px) {
  .hide-tablet {
    display: none;
  }
}

@media only screen and (max-width: 1200px) {
  #title-image {
    width: 60%;
  }

  .efficient-image {
    width: 50%;
  }

  .mobile-center {
    text-align: center;
    justify-content: center;
    align-items: center;
  }

  .mobile-justify {
    text-align: justify;
    align-self: center;
  }

  section {
    padding: 8rem 2rem 8rem 2rem;
  }

  .image-card {
    margin-bottom: 2rem;
    width: 100%;
  }

  .hide-mobile {
    display: none;
  }

  .hide-desktop {
    display: flex;
  }
}

@media only screen and (max-width: 600px) {
  section {
    padding: 8rem 2rem 8rem 2rem;
  }

  .title-heading {
    line-height: 1cm;
  }

  #section2 {
    padding-bottom: 1rem;
  }

  #section3 {
    padding-top: 12rem;
  }

  #home {
    height: fit-content;
    padding-top: 1rem;
    padding-bottom: 8rem;
  }

  #title-image {
    width: 100%;
  }

  h1 {
    line-height: 1cm;
    margin-bottom: 1rem;
    margin-top: 0.4rem;
    font-size: 2rem;
  }

  .efficient-image {
    width: 100%;
  }

  .mobile-column {
    flex-direction: column;
    align-items: center;
  }
}

@media only screen and (max-width: 400px) {
  .title-heading {
    line-height: 1cm;
  }

  h1 {
    line-height: 1cm;
    font-size: 2.4rem;
  }
}
</style>
