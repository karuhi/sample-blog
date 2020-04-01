<template>
  <section>
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
        <div class="markdown">
          <div v-html="compiledMarkdownText(blogPost.contents)" />
        </div>
      </article>
    </main>

    <footer>
      <hr />
      <p>sample-blog by karuhi</p>
    </footer>
  </section>
</template>

<script>
import axios from "axios";
import navmenu from "@/components/nav";
import marked from "marked";

export default {
  components: {
    navmenu
  },
  data() {
    return {
      blogPost: null
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
  methods: {
    compiledMarkdownText: function(mdtext) {
      return marked(mdtext); // computedにする必要あるかどうかは知らん
    }
  }
};
</script>

<style scoped>
.markdown h1,
.markdown h2,
.markdown h3,
.markdown h4 {
  font-family: sans-serif;
  color: #586e75;
}
.markdown p,
.markdown li,
.markdown td {
  font-family: serif;
}
.markdown table th {
  background-color: #93a1a1;
  color: #eee8d5;
}

.markdown table tr:nth-child(even) {
  background-color: #eee8d5;
}

.markdown h1 {
  counter-reset: chapter;
  text-decoration: underline;
  text-align: center;
}
.markdown h2 {
  counter-reset: sub-chapter;
  text-decoration: underline;
}
.markdown h3 {
  counter-reset: section;
  text-decoration: underline;
}
.markdown h4 {
  text-decoration: underline dotted;
}

.markdown h2::before {
  counter-increment: chapter;
  content: counter(chapter) ". ";
}
.markdown h3::before {
  counter-increment: sub-chapter;
  content: counter(chapter) "." counter(sub-chapter) ". ";
}
.markdown h4::before {
  counter-increment: section;
  content: counter(chapter) "." counter(sub-chapter) "." counter(section) " ";
}
</style>
