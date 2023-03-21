<template>
  <footer class="footer">
    <hr class="mobile-hr" />
    <div class="footer-container">
      <div class="footer-column">
        <h3 class="footer-title">About</h3>
        <p>
          work.download is a project to securely exchange files with customers.
          The project is still in development.
        </p>
      </div>
      <div class="footer-column">
        <h3 class="footer-title">Links</h3>
        <ul class="footer-list">
          <li><a href="/">Home</a></li>
          <li><a href="/login">Login</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </div>
      <div class="footer-column">
        <h3 class="footer-title">Information</h3>
        <img
          id="ssl-image"
          src="../../assets/positive_ssl.png"
          alt="positive ssl certificate"
        />
      </div>
    </div>
    <div class="footer-nav">
      <ul class="nav-list">
        <li>
          <router-link
            to="/privacy"
            class="nav-item"
            active-class="active"
            exact
            >Privacy Policy</router-link
          >
        </li>
        <li>
          <router-link
            to="/termsOfUse"
            class="nav-item"
            active-class="active"
            exact
            >Terms of Use</router-link
          >
        </li>
        <li>
          <router-link
            to="/imprint"
            class="nav-item"
            active-class="active"
            exact
            >Imprint</router-link
          >
        </li>
      </ul>
    </div>
  </footer>
</template>

<script>
export default {
  components: {},
};
</script>

<style scoped>
.mobile-hr {
  display: none;
}

.footer {
  background-color: #fff;
  color: #333;
  font-size: 1rem;
  box-shadow: 0px 1px 5px 2px rgba(0, 0, 0, 0.055);
}
.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  display: flex;
  justify-content: space-between;
}

.footer-column {
  flex: 1;
}

.footer-title {
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: bold;
}

.footer-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.footer-list li {
  margin-bottom: 5px;
}

.footer-list a {
  color: #333;
  text-decoration: none;
}

.footer-list a:hover {
  color: #0066cc;
}

.footer-nav {
  background-color: #f5f5f5;
  padding: 20px;
}

.nav-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-between;
}

.nav-list li {
  margin-left: 20px;
}

.nav-list a {
  color: #333;
}

.nav-list a:hover {
  color: #0066cc;
}

#ssl-image {
  width: 14rem;
  height: 3.5rem;
}

/* Small screens (e.g. smartphones) */
@media only screen and (max-width: 600px) {
  .footer-container {
    flex-direction: column;
  }
  .footer-title {
    margin-top: 2rem;
  }
  .footer-column {
    width: 100%;
  }

  .mobile-hr {
    display: block;
  }

  .footer-nav li a {
    font-size: 0.9rem;
  }
}

/* Medium screens (e.g. tablets) */
@media only screen and (min-width: 601px) and (max-width: 992px) {
  .footer {
    width: 100%;
  }
  .footer-container {
    width: 100%;
    flex-direction: column;
    align-items: center;
  }
  .footer-title {
    margin-top: 2rem;
  }
  .footer-column {
    width: 50%;
  }
}

/* Large screens (e.g. laptops and desktops) */
@media only screen and (min-width: 993px) {
  .footer-container {
    flex-direction: row;
  }
  .footer-column {
    width: 33.3333%;
  }
}
</style>
