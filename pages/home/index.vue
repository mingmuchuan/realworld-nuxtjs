<!--
 * @Author: your name
 * @Date: 2020-12-14 10:30:09
 * @LastEditTime: 2020-12-18 10:12:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /realworld-nuxtjs/pages/home/index.vue
-->
<template>
    <div class="home-page">

        <div class="banner">
          <div class="container">
            <h1 class="logo-font">github actions update 6.0</h1>
            <p>A place to share your knowledge.</p>
          </div>
        </div>
      
        <div class="container page">
          <div class="row">
      
            <div class="col-md-9">
              <div class="feed-toggle">
                <ul class="nav nav-pills outline-active">
                  <li class="nav-item" v-if="user">
                    <nuxt-link class="nav-link" :class="{ active: tab === 'need_tag' }" :to="{ name: 'home', query: { tab: 'need_tag', } }" exact>Your Feed</nuxt-link>
                  </li>
                  <li class="nav-item">
                    <nuxt-link class="nav-link" :class="{ active: tab === 'global_tag' }" :to="{ name: 'home', query: { tab: 'global_tag', } }" exact>Global Feed</nuxt-link>
                  </li>
                  <li class="nav-item" v-if="tag">
                    <nuxt-link class="nav-link active" :to="{ name: 'home', query: { tab: tag, tab: 'tag' } }" exact>#{{ tag }}</nuxt-link>
                  </li>
                </ul>
              </div>
       
              <div class="article-preview" v-for="item in articles" :key="item.slug">
                <div class="article-meta">
                  <nuxt-link :to="`/profile/${item.author.username}`"><img src="item.author.image" /></nuxt-link>
                  <div class="info">
                    <nuxt-link class="author" :to="`/profile/${item.author.username}`">{{ item.author.username }}</nuxt-link>
                    <span class="date">{{ item.createdAt | date('MMM DD, YYYY') }}</span>
                  </div>
                  <button class="btn btn-outline-primary btn-sm pull-xs-right" :class="{ active: item.favorited }" @click="handleLike(item)" :disabled="item.isDisabled">
                    <i class="ion-heart"></i> {{ item.favoritesCount }}
                  </button>
                </div>
                <nuxt-link :to="{ name: 'article', params: { slug: item.slug } }" class="preview-link">
                  <h1>{{ item.title }}</h1>
                  <p>{{ item.description }}</p>
                  <span>Read more...</span>
                </nuxt-link>
              </div>
      
      
            </div>
      
            <div class="col-md-3">
              <div class="sidebar">
                <p>Popular Tags</p>
      
                <div class="tag-list">
                  <nuxt-link v-for="tag in tags" :key="tag" :to="{ name: 'home', query: { tag, tab: 'tag' } }" class="tag-pill tag-default">{{ tag }}</nuxt-link>
                </div>
              </div>
            </div>
      
          </div>
        </div>
      <!-- 分页 -->
      <nav> 
        <ul class="pagination">
          <li class="page-item" v-for="index in totalPage" :key="index" :class="{ active : page === index }">
              <nuxt-link class="page-link" :to="{ name: 'home', query: { page: index, tag: $route.query.tag, tab } }" >{{ index }}</nuxt-link>
            </li> 
        </ul>
      </nav>


      <div class="sidebar">
        <p>Popular Tags</p>

        <div class="tag-list">
          <nuxt-link v-for="tag in tags" :key="tag" :to="{ name: 'home', query: { tag, tab: 'tag' } }" class="tag-pill tag-default">{{ tag }}</nuxt-link>
        </div>
      </div>
    </div>
</template>
<script>
import { getArticles, getNeddArticles, favorite, cancelFavorite } from '@/apis/article'
import { getTags } from '@/apis/tags'
import { mapState } from 'vuex'
export default {
  name: "home",
  watchQuery: ['page', 'tag', 'tab'],
  async asyncData({ query }) {
    let limit = 10
    let page = +query.page || 1
    let tag = query.tag
    let tab = query.tab || 'global_tag'
    let articleType = tab === 'need_tag' ? getNeddArticles : getArticles  //用来判断调用全部还是关注的接口
    let [articleData, tagsData] = await Promise.all([
      articleType({
        limit: 10,
        offset: (page - 1) * limit,
        tag: tag
      }),
      getTags(tag)
    ])
    let { articles, articlesCount } = articleData.data
    articles.forEach(item => {
      articles.isDisabled = false
    })
    return {
      articles,  //对应数据
      articlesCount,  //总条数
      page,
      limit,
      tags: tagsData.data.tags,  //做截取是因为前面会返回特殊字符，浏览器又显示不出来
      tag,
      tab
    }
  },
  data() {
    return {
tags: []
    }
  },
  computed: {
    ...mapState(['user']),
    //获取总页数
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit)
    }
  },
  methods: {
    //点赞
    async handleLike(item) {
      item.isDisabled = true
      if(item.favorited) {
        await cancelFavorite(item.slug)
        item.favorited = false
        item.favoritesCount -= 1
      }else {
        await favorite(item.slug)
        item.favorited = true
        item.favoritesCount += 1
      }
      item.isDisabled = false
    }
  }
}
</script>