<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
  export default {
    name: 'app',
    components: {

    },
    data() {
      return {

      }
    },
    mounted() {
      if(this.$cookie.get('userId')) {
        this.getUser();
        // this.getCartCount();
      }
    },
    methods: {
      getUser() {
        this.$axios.post('/user/get_user_info.do', this.$qs.stringify({
          userId: this.$cookie.get('userId')
        })).then(res => {
          // console.log(res)
          this.$store.dispatch('saveUserName', res.data.data.username);
        }).catch(error=> {
          window.alert(error)
        })}
      },
      getCartCount() {
        // this.$axios.get('/carts/products/sum').then((res=0)=>{
        //   this.$store.dispatch('saveCartCount', res);
        // })
      }
  }
</script>
<style lang="scss">
  @import "assets/scss/config.scss";
  @import "assets/scss/reset.scss";
</style>
