<!--
 * @Author: your name
 * @Date: 2020-12-14 11:25:37
 * @LastEditTime: 2020-12-16 17:54:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /realworld-nuxtjs/pages/article/index.vue
-->
<template>
  <div>
    <div class="article-page">

  <div class="banner">
    <div class="container">

      <h1>{{ article.title }}</h1>

      <div class="article-meta">
        <article-meta :article="article" />
      </div>

    </div>
  </div>

  <div class="container page">

    <div class="row article-content">
      <div class="col-md-12" v-html="article.body"></div>
    </div>

    <hr />

    <div class="article-actions">
      <article-meta :article="article" />
    </div>

    <div class="row">

      <div class="col-xs-12 col-md-8 offset-md-2">

        <form class="card comment-form">
          <div class="card-block">
            <textarea class="form-control" placeholder="Write a comment..." rows="3"></textarea>
          </div>
          <div class="card-footer">
            <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
            <button class="btn btn-sm btn-primary">
             Post Comment
            </button>
          </div>
        </form>
        
        <article-comment :article="article" />
        
      </div>

    </div>

  </div>

</div>
  </div>
</template>

<script>
import { articleDetail } from '@/apis/article'
import markdownIt from 'markdown-it'
import ArticleMeta from './components/article-meta'
import ArticleComment from './components/article-comment'
export default {
  middleware: 'auth',
  head() {
  return {
    title: this.article.title,
    meta: [
        {
          hid: this.article.description,  //唯一标识编号
          name: 'description',
          content: this.article.description
        }
      ]
    }
  },
  components: { ArticleMeta, ArticleComment },
  async asyncData({ params }) {
    let { data: { article } } = await articleDetail(params.slug)
    const md = new markdownIt()
    article.body = md.render(article.body)
    return {
      article
    }
  }
}
</script>

<style>

</style>