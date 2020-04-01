<template>
  <section>
    <header>
      <navmenu />
      <h2>記事一覧</h2>
      <p>すべての投稿を新しい順に表示しています。</p>
    </header>
    <aside
      @click="jumpToPost(post.id)"
      v-for="post in blogPosts"
      :key="post.id"
    >
      <div v-if="post.image != null">
        <img
          :alt="post.imageCaption"
          :src="post.image + '?q=10&auto=compress&w=500'"
        />
      </div>
      <h3>
        {{ post.title }}
        <sup v-if="post.new">New</sup>
      </h3>
      <p>
        <small>
          {{ new Date(post.createdAt).getMonth() + 1 }}月{{
            new Date(post.createdAt).getDate()
          }}日{{ new Date(post.createdAt).getHours() }}時{{
            new Date(post.createdAt).getMinutes()
          }}分
        </small>
      </p>
    </aside>
  </section>
</template>
<script>
import axios from "axios";
import navmenu from "@/components/nav";

export default {
  components: {
    navmenu
  },
  async asyncData({ env, $axios, route, params, error }) {
    try {
      const newsUrl = "https://sample-blog.microcms.io/api/v1/posts";
      const newsResponse = await $axios.$get(newsUrl, {
        baseURL: env.BASE_URL,
        headers: { "X-API-KEY": env.API_KEY }
      });

      const currentDate = new Date(); // 現在のDateを取得
      newsResponse.contents.forEach(ele => {
        const postedDate = new Date(ele.createdAt); // 投稿日をDate型に
        const termDay = (currentDate - postedDate) / 86400000; // 日数を求める
        ele.new = termDay < 7 ? true : false;
      });
      return {
        blogPosts: newsResponse.contents
      };
    } catch (e) {
      if (typeof e.response === "undefined") {
        return { blogPosts: null };
      }

      if ("status" in e.response && e.response.status === 404) {
        error({ statusCode: 404, message: "Not Found" });
      }
      return { blogPosts: null };
    }
  },
  data() {
    return {
      blogPosts: []
    };
  },
  methods: {
    jumpToPost(id) {
      this.$router.push(`posts/${id}`);
    }
  }
};
</script>
