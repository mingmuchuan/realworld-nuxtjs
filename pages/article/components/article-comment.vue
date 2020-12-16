<!--
 * @Author: your name
 * @Date: 2020-12-15 13:54:29
 * @LastEditTime: 2020-12-16 17:56:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /realworld-nuxtjs/pages/article/components/article-moment.vue
-->
<template>
  <div>
     <div class="card" v-for="comment in comments" :key="comment.id">
          <div class="card-block">
            <p class="card-text">{{ comment.body }}</p>
          </div>
          <div class="card-footer">
            <nuxt-link :to="{ name: 'profile', params: { username: comment.author.username } }" class="comment-author">
              <img :src="comment.author.image" class="comment-author-img" />
            </nuxt-link>
            &nbsp;
            <nuxt-link :to="{ name: 'profile', params: { username: comment.author.username } }" class="comment-author">
             {{ comment.author.username }}
            </nuxt-link>
            <span class="date-posted">{{ comment.createdAt | date('MMM DD, YYYY') }}</span>
          </div>
        </div>
  </div>
</template>

<script>
import { getCommentList } from '@/apis/article'
export default {
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      comments: []
    }
  },
  created() {
    this.getCommentList()
  },
  methods: {
    async getCommentList() {
      let { data } = await getCommentList(this.article.slug)
      this.comments = data.comments
    }
  }
}
</script>

<style>

</style>