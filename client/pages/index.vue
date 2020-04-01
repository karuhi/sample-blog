<template>
  <div>
    <header>
      <navmenu />
      <h1>
        このサンプルなサイトは
        <i>microCMS</i> と <u>Nuxt.js</u> で作ってる
      </h1>
      <p><mark>TypeScript</mark>も使ってる</p>
      <br />
      <p>
        <nuxt-link to="/posts">
          <b>View Blog</b>
        </nuxt-link>
        <a href="#">
          <i>View Portfolio &rarr;</i>
        </a>
        <nuxt-link to="/editor">
          <b>Go editor</b>
        </nuxt-link>
      </p>
    </header>
    <main>
      <hr />
      <section>
        <blockquote>
          "watashi ni totte koreha sample da."
          <footer>
            <i>- karuhi</i>
          </footer>
        </blockquote>
      </section>
    </main>
    <footer>
      <hr />
      <p>sample-blog by karuhi</p>
    </footer>
  </div>
</template>

<script>
import navmenu from "@/components/nav";
export default {
  components: {
    navmenu
  }
};
</script>

<style scoped></style>
