<!--
 * @Author: your name
 * @Date: 2020-12-14 10:30:09
 * @LastEditTime: 2020-12-16 15:39:47
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /realworld-nuxtjs/pages/index.vue
-->
<template>
    <div>
        <nav class="navbar navbar-light">
            <div class="container">
              <a class="navbar-brand" href="index.html">GITHUB ACTIONS</a>
              <ul class="nav navbar-nav pull-xs-right">
                <li class="nav-item">
                  <!-- Add "active" class when you're on that page" -->
                  <a class="nav-link active" href="">Home</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="">
                    <i class="ion-compose"></i>&nbsp;New Post
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="">
                    <i class="ion-gear-a"></i>&nbsp;Settings
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="">Sign up</a>
                </li>
              </ul>
            </div>
          </nav>


        <nuxt-child />

          <footer>
            <div class="container">
              <a href="/" class="logo-font">conduit</a>
              <span class="attribution">
                An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code &amp; design licensed under MIT.
              </span>
            </div>
          </footer>

    </div>
</template>