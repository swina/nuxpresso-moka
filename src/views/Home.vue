<template>
  <div v-if="moka" class="min-h-screen h-screen flex flex-col p-4">
    <h2>Welcome to MOKAStudio</h2>

    <div class="w-full flex flex-row justify-around" v-if="components">
      <div class="border w-1/4 mr-4 border-t-8 border-blue-400 flex flex-col">
      <template v-for="(group,index) in grouped.keys">
        <div class="capitalize flex flex-row justify-between p-2 border-b">
          <div>{{ group }}s </div>
          <div>{{grouped.counters[index]}}</div>
        </div>
      </template>
        <button class="m-auto my-2">Import</button>
      </div>

      <div class="border w-1/4 mr-4 flex flex-col border-t-8 border-orange-400">
        
        <div class="capitalize flex flex-row justify-between p-2 border-b">
          <div>Media  </div>
          <div>{{ moka.media.length }}</div>
        </div>
        <div class="capitalize flex flex-row justify-between p-2 border-b">
          <div>Space  </div>
          <div>{{ total }}</div>
        </div>
      </div>

      <div v-if="moka.articles" class="border w-1/4 flex flex-col border-t-8 border-green-400 p-2">
        <div>Last news</div>
        <template v-for="(article,row) in moka.articles">
          <div class="flex flex-col p-2" v-if="row < 3 && article.categories[0].name==='news'">
            <div class="text-xs">{{ $moment ( article.update_at ) }}</div>
            <div class="text-sm font-bold border-b">{{ article.title }}</div>
            <div class="text-xs">{{ article.excerpt}}</div>
          </div>
        </template>
        
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import qryComponents from '@/apollo/components.gql'
import { mapState } from 'vuex'
export default {
  name: 'Home',
  components: {
  },
  data:()=>({
    email: '',
    password: ''
  }),
  computed:{
    ...mapState ( [ 'moka' ] ),
    grouped(){
      return this.$arrayGroup(this.components,'category','id')
    },
    total(){
      let size = 0
      this.moka.media.forEach( m => {
        size += parseFloat(m.size)
      })
      return Math.round(size/1000,2) + ' MB'
    }
  },
  apollo:{
    components: {
      query: qryComponents
    }
  },
  methods:{
    
  }
  
}
</script>