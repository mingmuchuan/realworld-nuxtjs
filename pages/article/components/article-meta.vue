<template>
  <div>
    <div class="article-meta">
        <a href="profile.html"><img :src="article.author.image" /></a>
        <div class="info">
          <nuxt-link :to="{
            name: 'profile',
            params: { username: article.author.username }
          }" class="author">{{ article.author.username }}</nuxt-link>
          <span class="date">{{ article.createdAt | date('MMM DD, YYYY') }}</span>
        </div>

        <button class="btn btn-sm btn-outline-secondary" :class="{ active: article.author.following }">
          <i class="ion-plus-round"></i>
          &nbsp;
          Follow Eric Simons <span class="counter">(10)</span>
        </button>
        &nbsp;
        <button class="btn btn-sm btn-outline-primary" :class="{ active: article.favorited }">
          <i class="ion-heart"></i>
          &nbsp;
          Favorite Post <span class="counter">(29)</span>
        </button>
      </div>
  </div>
</template>

<script>
export default {
  name: "article-meta",
  props: {
    article: {
      type: Object,
      required: true
    }
  },
}
</script>

<style>

</style>