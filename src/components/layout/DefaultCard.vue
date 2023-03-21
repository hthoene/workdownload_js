<template>
  <div id="card" class="bg-white">
    <div id="title"><slot name="title"></slot></div>
    <div class="spacer-m"></div>
    <div id="content" class="column"><slot></slot></div>
  </div>
</template>

<style scoped>
#card {
  padding: 4rem;
  box-shadow: 1px 1px 5px 1px rgba(53, 53, 53, 0.041);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border-radius: 1rem;
  width: 40rem;
  transition: all 1s;
}

#title {
  width: 100%;
}

#content {
  width: 100%;
  align-items: flex-start;
}

@media only screen and (max-width: 600px) {
  #card {
    width: 100%;
    min-height: 100%;
    background-color: #ffffff;
    overflow-y: scroll;
    border-radius: 0;
    padding: 4rem 2rem;
    text-align: center;
  }

  ::-webkit-scrollbar {
    width: 0px;
  }

  #content {
    text-align: center;
  }
}
</style>
