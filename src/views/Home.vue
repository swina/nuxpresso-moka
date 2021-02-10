<template>
  <div v-if="moka" class="min-h-screen h-screen flex flex-col border p-4">
    <moka-loading v-if="isLoading"/>
    <h2>Dashboard</h2>
    <div v-if="library" class="border mx-12 my-4 border-t-8 border-blue-400 flex flex-col p-2 justify-start items-start text-base bg-blue-100">
      <label>Import MOKAStudio sample library <span @click="viewLibrary=!viewLibrary">View</span></label>
      <div class="flex flex-col text-base pl-4" v-if="sampleLibrary && viewLibrary">
      <template v-for="block in sampleLibrary">
        <div class="capitalize">{{ block.category }} - {{ block.name }}</div>
      </template>
      </div>
      <button @click="importLibrary=!importLibrary">Import</button>
    </div>
    <div class="w-full flex flex-row justify-around" v-if="components && grouped">
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

    <!-- import library -->
    <transition name="fade">
        <div v-if="importLibrary" class="nuxpresso-modal w-full md:w-1/3 bg-gray-800 rounded border-4 border-gray-500  shadow-xl p-2 text-gray-600 text-sm">
            <moka-import-library @close="importLibrary=!importLibrary" :library="sampleLibrary"/>
        </div>
    </transition>
  </div>
</template>

<script>
// @ is an alias to /src
import qryComponents from '@/apollo/components.gql'
import qryMedia from '@/apollo/upload.gql'
import MokaImportLibrary from '@/components/moka/moka.import.json'
import { mapState } from 'vuex'
export default {
  name: 'Home',
  components: {
    MokaImportLibrary
  },
  data:()=>({
    email: '',
    password: '',
    isLoading: false,
    viewLibrary: false,
    importLibrary: false,
    sampleLibrary: null
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
    },
    library(){
      /*
      let imported = window.localStorage.getItem('nuxpresso-import')
      if ( imported ) return
      const library = require.context(
        '@/assets/blocks',
        true,
        /^.*\.json$/
      )
      this.sampleLibrary = require ( '@/assets/blocks/' + library.keys()[0].replace('./',''))
      return library.keys()
      */
      return null
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