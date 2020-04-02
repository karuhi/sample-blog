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
      <div id="editor">
        <textarea :value="input" @input="update"></textarea>
        <div v-html="compiledMarkdown"></div>
      </div>
      <label>
        書き込みパスワード：
        <input v-model="password" type="password" />
      </label>
      <button @click="postArticle">{{ postProgress }}</button>

      <nuxt-link v-if="postProgress == 'データの投稿に成功しました'" to="/posts">
        <button>投稿を確認する</button>
      </nuxt-link>
    </main>
  </section>
</template>
<style scoped>
#editor {
  margin: 16px;
  height: 300px;
  width: 80vw;
  font-family: "Helvetica Neue", Arial, sans-serif;
  color: #333;
}

textarea,
#editor div {
  display: inline-block;
  width: 49%;
  height: 100%;
  vertical-align: top;
  box-sizing: border-box;
  padding: 0 20px;
  overflow: scroll;
}
/*スクロールバー全体*/
::-webkit-scrollbar {
  width: 10px;
}

/*スクロールバーの軌道*/
::-webkit-scrollbar-track {
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
}

/*スクロールバーの動く部分*/
::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 50, 0.5);
  border-radius: 10px;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.3);
}
textarea {
  border: none;
  border-right: 1px solid #ccc;
  resize: none;
  outline: none;
  background-color: #f6f6f6;
  font-size: 14px;
  font-family: "Monaco", courier, monospace;
  padding: 20px;
}

code {
  color: #f66;
}
#editor h1,
#editor h2,
#editor h3,
#editor h4 {
  font-family: sans-serif;
  color: #586e75;
}
#editor p,
#editor li,
#editor td {
  font-family: serif;
}
#editor table th {
  background-color: #93a1a1;
  color: #eee8d5;
}

#editor table tr:nth-child(even) {
  background-color: #eee8d5;
}

#editor h1 {
  counter-reset: chapter;
  text-decoration: underline;
  text-align: center;
}
#editor h2 {
  counter-reset: sub-chapter;
  text-decoration: underline;
}
#editor h3 {
  counter-reset: section;
  text-decoration: underline;
}
#editor h4 {
  text-decoration: underline dotted;
}

#editor h2::before {
  counter-increment: chapter;
  content: counter(chapter) ". ";
}
#editor h3::before {
  counter-increment: sub-chapter;
  content: counter(chapter) "." counter(sub-chapter) ". ";
}
#editor h4::before {
  counter-increment: section;
  content: counter(chapter) "." counter(sub-chapter) "." counter(section) " ";
}
</style>
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
      input: "# This is initialValue.",
      postProgress: "投稿する",
      title: "タイトル",
      imageURL: "https://via.placeholder.com/1920x1080",
      imageCaption: "image by https://via.placeholder.com/",
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
          contents: this.input
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
    },
    update: function(e) {
      this.input = e.target.value;
    }
  },
  computed: {
    compiledMarkdown: function() {
      return marked(this.input);
    }
  }
};
</script>
