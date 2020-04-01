<template>
  <div>
    <header v-if="blogPost != null">
      <navmenu />
      <h1>{{ blogPost.title }}</h1>
      <p>
        <small>公開日：{{ blogPost.createdAt }}</small>
      </p>
      <p>
        <small>更新日：{{ blogPost.updatedAt }}</small>
      </p>
    </header>
    <main v-if="blogPost != null">
      <article>
        <figure v-if="blogPost.image != null">
          <img
            :alt="blogPost.imageCaption"
            :src="blogPost.image + '?auto=compress&w=1920'"
          />
          <figcaption>
            <i>{{ blogPost.imageCaption }}</i>
          </figcaption>
        </figure>
        <h2>{{ blogPost.title }}</h2>
        <!-- Markdown Viewer -->
        <TuiEditorViewer :value="postcontent" />
      </article>
    </main>
    <footer>
      <hr />
      <p>sample-blog by karuhi</p>
    </footer>
  </div>
</template>

<script>
import axios from "axios";
import navmenu from "@/components/nav";

export default {
  components: {
    navmenu
  },
  data() {
    return {
      blogPost: null,
      postcontent: ""
    };
  },
  async asyncData({ env, $axios, route, params, error }) {
    try {
      const newsUrl =
        "https://sample-blog.microcms.io/api/v1/posts/" + params.id;
      const newsResponse = await $axios.$get(newsUrl, {
        baseURL: env.BASE_URL,
        headers: { "X-API-KEY": env.API_KEY }
      });
      return {
        blogPost: newsResponse
      };
    } catch (e) {
      if (typeof e.response === "undefined") {
        return { blogPost: null };
      }

      if ("status" in e.response && e.response.status === 404) {
        error({ statusCode: 404, message: "Not Found" });
      }
      return { blogPost: null };
    }
  },
  mounted() {
    if (this.blogPost != null) {
      this.postcontent = this.blogPost.contents;
      this.postcontent = "# hello";
    }
  },
  methods: {
    getPosts() {
      axios
        .get(
          "https://sample-blog.microcms.io/api/v1/posts/" +
            this.$route.params.id,
          {
            headers: { "X-API-KEY": process.env.API_KEY }
          }
        )
        .then(res => {
          this.blogPost = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped></style>
