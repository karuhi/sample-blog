<template>
  <section>
    <header>
      <navmenu />
      <h2>記事を投稿</h2>
      <p>新しい記事を投稿できます</p>
    </header>
    <main>
      <label>
        タイトル：
        <input v-model="title" type="text" />
      </label>
      <label>
        トップ画像URL：
        <input v-model="imageURL" type="text" />
      </label>
      <label>
        トップ画像キャプション：
        <input v-model="imageCaption" type="text" />
      </label>
      <TuiEditor
        :initialValue="editorText"
        :options="editorOptions"
        mode="markdown"
        preview-style="vertical"
        height="300px"
        v-model="editorText"
      />
      <label>
        書き込みパスワード：
        <input v-model="password" type="password" />
      </label>
      <button @click="postArticle">{{ postProgress }}</button>

      <button v-if="postProgress == 'データの投稿に成功しました'" @click="postArticle">投稿を確認する</button>
    </main>
  </section>
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
      postProgress: "投稿する",
      title: "タイトル",
      imageURL: "https://via.placeholder.com/1920x1080",
      imageCaption: "image by https://via.placeholder.com/",
      editorText: "# This is initialValue.",
      editorOptions: {
        hideModeSwitch: true
      },
      password: ""
    };
  },
  methods: {
    postArticle: function() {
      if (this.password != "" && this.password == process.env.WRITE_PASSWORD) {
        this.postProgress = "投稿しています...";
        const data = {
          title: this.title,
          image: this.imageURL,
          imageCaption: this.imageCaption,
          contents: this.editorText
        };
        this.$axios
          .post("api/microcms", data)
          .then(res => {
            cosnole.log(res.body);
            this.postProgress = "データの投稿に成功しました";
          })
          .catch(error => {
            this.postProgress = "データの投稿に失敗しました";
          });
      } else {
        alert("正しい書き込みパスワードを入力してください。");
      }
    }
  }
};
</script>
