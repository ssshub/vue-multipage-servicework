<template>
  <div id="app" :class="{'v-cloak': !isPageLoaded}">
      hello!
  </div>
</template>

<script>
  import {openDetail} from 'common/js/utl'
  import {getList} from 'api'



export default {
  components: {

  },
  data () {
    return {
      isPageLoaded: true
    }
  }
}
</script>

<style lang="scss">
@import 'common/scss/index.scss';
@import "~assets/scss/cell";

html, body {
  height: 100%;
}


</style>


