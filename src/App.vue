<template>
  <v-app id="app">
    <v-app-bar
    dark
    dense
    app
    id="app_bar">
      <h2 class="ml-10">Charlotte Soriano</h2>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({

  }),
  created(){
    
  },
}
</script>


<style>
  #app{
    background: #f6f7f8;
  }
  #app_bar, .gradient{
    background: linear-gradient(45deg, #4568DC, #B06AB3);
    color: white
  }
  .search{
    width: 40%;
    background: white
  }
  .topic-title{
    text-transform: capitalize;
  }
  .bottom{
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 15px 0;
  }
  .card-span, .icon{
    font-size:0.9em
  }
  .capitalize{
    text-transform: capitalize
  }
  .label{
    font-size: 16px;
    color: #798a95
  }
  .border-bottom{
    border-bottom: 1px solid #798a95;
  }
  .date{
    color: #798a95;
    font-size: 12px
  }
  .success, .comment-added{
    color: green;
    font-size: 14px
  }
  .failed, .empty{
    color: tomato;
    font-size: 14px;
  }
</style>