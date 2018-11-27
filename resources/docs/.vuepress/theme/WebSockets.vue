<template>
  <div class="websocket-link can-hide" v-if="connected">
    <a class="">{{ userCount }} users reading the documentation</a>
  </div>
</template>

<script>
import EchoModule from 'laravel-echo'

export default {
  data() {
    return {
      userCount: 0,
      connected: false,
    };
  },

  mounted() {
    import('laravel-echo').then(module => {
      window.Pusher = require('pusher-js');

      const Echo = new module.default({
        broadcaster: 'pusher',
        key: this.$site.themeConfig.websocketClientKey,
        wsHost: window.location.hostname,
        wsPort: 6001,
        disableStats: true
      });

      Echo.join('documentation')
      .here(users => {
        this.connected = true;
        this.userCount = users.length;
        console.log('Here',users);
      })
      .joining(user => {
        this.userCount += 1;
        console.log('Joining',user);
      })
      .leaving(user => {
        this.userCount -= 1;
        console.log('Leaving',user);
      })
      .listen('.hello', data => {
        console.log('hello', data);
      });
    });
  }
}
</script>

<style lang="stylus">
  @import './styles/config.styl'
  .websocket-link
    padding-left: 1em
</style>