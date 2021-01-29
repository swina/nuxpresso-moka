<template>
  <div v-if="moka" class="min-h-screen h-screen flex flex-col p-4">
    <moka-loading v-if="isLoading"/>
    <h2>Dashboard</h2>

    <div class="w-full flex flex-row justify-around" v-if="components">
      <div class="border w-1/4 mr-4 border-t-8 border-blue-400 flex flex-col">
      <div class="bg-gray-300 p-1">BLOCKS</div>
      <template v-for="(group,index) in grouped.keys">
        <div class="capitalize flex flex-row justify-between p-2 border-b">
          <div>{{ group }}s </div>
          <div>{{grouped.counters[index]}}</div>
        </div>
      </template>
        <!-- <button class="m-auto my-2">Import</button> -->
      </div>

      <div class="border w-1/4 mr-4 flex flex-col border-t-8 border-orange-400">
        
        <div class="capitalize flex flex-row justify-between p-2 border-b">
          <div>Media  </div>
          <div v-if="media">{{ media.length }}</div>
        </div>
        <div class="capitalize flex flex-row justify-between p-2 border-b">
          <div>Space  </div>
          <div>{{ total }}</div>
        </div>
      </div>

      <div v-if="moka.articles" class="border w-1/4 flex flex-col border-t-8 border-green-400 p-2">
        <div>Last articles</div>
        <template v-for="(article,row) in moka.articles">
          <div class="flex flex-col p-2" v-if="row < 3">
            <div class="text-xs">{{ $moment ( article.update_at ) }}</div>
            <div class="text-sm font-bold border-b">{{ article.title }}</div>
            <div class="text-xs">{{ article.excerpt}}</div>
          </div>
        </template>
        
      </div>
    </div>
    <div class="w-full flex mt-4 flex-row justify-around" v-if="user.login">
      <div class="border w-1/4 mr-4 border-t-8 border-gray-400 flex flex-col p-2 justify-center items-center">
        <label>Production Host</label>
        <button :class="production?'success rounded-full h-10 w-10':'danger rounded-full rounded-full h-10 w-10'">{{ production ? 'ON' : 'OFF' }}</button>
      </div>
      <div class="border w-1/4 mr-4 border-t-8 border-gray-400 flex flex-col p-2 justify-center items-center">
        <label>Website Deploy Hook</label>
        <button :class="build?'success rounded-full h-10 w-10':'danger rounded-full h-10 w-10'">{{ build ? 'ON' : 'OFF' }}</button>
      </div>
      <div class="w-1/4 flex flex-col">
        
      </div>
    </div>
    <div v-if="!devMode" class="w-full flex-col p-2 border">
      Welcome to MOKAStudio Playground.
      <br/><br/>
      This a demo and many options are available only in development mode.
      <br/><br/>
      Save is disabled.
    </div>
    <div class="fixed bottom-0 left-0 p-2 text-sm w-full text-center bg-gray-600 text-white" v-if="isLoading">
      Loading data ...
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import qryComponents from '@/apollo/components.gql'
import qryMedia from '@/apollo/upload.gql'
import { mapState } from 'vuex'
export default {
  name: 'Home',
  components: {
  },
  data:()=>({
    email: '',
    password: '',
    isLoading: false
  }),
  computed:{
    ...mapState ( [ 'moka' , 'user' ] ),
    devMode(){
      return process.env.NODE_ENV === 'development' ? true : false
    },
    grouped(){
      return this.$arrayGroup(this.components,'category','id')
    },
    total(){
      let size = 0
      this.media.forEach( m => {
        size += parseFloat(m.size)
      })
      return Math.round(size/1000,2) + ' MB'
    },
    production(){
      return this.user.production ? true : false
    },
    build(){
      return this.user.build ? true : false
    }
  },
  apollo:{
    components: {
      query: qryComponents,
      watchLoading(isLoading){
        this.$store.dispatch ( 'loading' , isLoading )
      }
    },
    media: {
      query: qryMedia,
      update: data => data.files,
      watchLoading(isLoading){
        this.$store.dispatch ( 'loading' , isLoading )
      }
    }
  },
  methods:{
    
  }
  
}
</script>