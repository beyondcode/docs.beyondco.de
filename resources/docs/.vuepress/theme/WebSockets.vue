<template>
  <div class="websocket-link can-hide" v-if="connected">
    <a class="">{{ userCount }} {{ users }} reading the documentation</a>
    <a @click.prevent="notify" title="Notify other users"><div ref="bell" class="notification"></div></a>
  </div>
</template>

<script>
import EchoModule from 'laravel-echo'

export default {
  data() {
    return {
      userCount: 0,
      connected: true,
    };
  },

  computed: {
    users() {
      let s = this.userCount === 1 ? '' : 's';
      return `user${s}`;
    }
  },

  methods: {
    notify() {
      window.documentationChannel.whisper('notify');
    }
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

      window.documentationChannel = Echo.join('documentation')
      .listenForWhisper('notify', (e) => {
        this.$refs.bell.classList.remove('notify');
        setTimeout(() => {
          this.$refs.bell.classList.toggle('notify');
        } , 10);
      })
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

<style lang="css">
  .websocket-link {
    padding-left: 1em;
    padding-right: 1em;
  }

/* Notifications */

.notification {
    cursor: pointer;
    display: inline-block;
    position: relative;
    padding: 0 0.4em;
    background: #3498db;
    border-radius: 0.2em;
    font-size: 1.3em;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.notification::before, 
.notification::after {
    color: #fff;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

.notification::before {
    display: block;
    content: "\f0f3";
    font-family: "FontAwesome";
    transform-origin: top center;
}

.notification::after {
    font-family: Arial;
    font-size: 0.7em;
    font-weight: 700;
    position: absolute;
    top: -15px;
    right: -15px;
    padding: 5px 8px;
    line-height: 100%;
    border: 2px #fff solid;
    border-radius: 60px;
    background: #3498db;
    opacity: 0;
    content: attr(data-count);
    opacity: 0;
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
    transition: transform, opacity;
    transition-duration: 0.3s;
    transition-timing-function: ease-out;
}

.notification.notify::before {
    -webkit-animation: ring 1.5s ease;
    animation: ring 1.5s ease;
}

.notification.show-count::after {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 1;
}

@-webkit-keyframes ring {
    0% {
        -webkit-transform: rotate(35deg);
    }
    12.5% {
        -webkit-transform: rotate(-30deg);
    }
    25% {
        -webkit-transform: rotate(25deg);
    }
    37.5% {
        -webkit-transform: rotate(-20deg);
    }
    50% {
        -webkit-transform: rotate(15deg);
    }
    62.5% {
        -webkit-transform: rotate(-10deg);
    }
    75% {
        -webkit-transform: rotate(5deg);
    }
    100% {
        -webkit-transform: rotate(0deg);
    }
}

@keyframes ring {
    0% {
        -webkit-transform: rotate(35deg);
        transform: rotate(35deg);
    }
    12.5% {
        -webkit-transform: rotate(-30deg);
        transform: rotate(-30deg);
    }
    25% {
        -webkit-transform: rotate(25deg);
        transform: rotate(25deg);
    }
    37.5% {
        -webkit-transform: rotate(-20deg);
        transform: rotate(-20deg);
    }
    50% {
        -webkit-transform: rotate(15deg);
        transform: rotate(15deg);
    }
    62.5% {
        -webkit-transform: rotate(-10deg);
        transform: rotate(-10deg);
    }
    75% {
        -webkit-transform: rotate(5deg);
        transform: rotate(5deg);
    }
    100% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
}
</style>