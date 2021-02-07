<template>
<div class="flex flex-col">
    <div v-if="templates" class="flex flex-row flex-wrap justify-around p-4">
        
        <template v-for="(template,index) in mokatemplates">
            <div class="w-48 flex flex-col mb-4 cursor-pointer" v-if="index>=start && index < (start+limit)" @click="$emit('set',template.id,template.blocks_id,template)" :title="template.category">
                <div class="flex flex-row items-center justify-between text-gray-600">
                    <span class="text-sm">{{ template.name }}</span>
                    <i class="material-icons ml-1">{{ template.category === 'page' ? 'web' : 'dynamic_feed'}}</i>
                </div>
                
                <div :style="'background-image:url(' + background(template) + ')'" class="h-24 bg-auto bg-no-repeat bg-cover border shadow rounded"></div>
            </div>
        </template>
    </div>
    <div class="flex flex-row justify-around text-center">
        <i class="material-icons mx-2 text-2xl" @click="prev">chevron_left</i>
        <i class="material-icons mx-2 text-2xl" @click="next">chevron_right</i>
    </div>
</div>
</template>

<script>
export default {
    name: 'NuxpressoMokaTemplates',
    props:['templates'],
    data:()=>({
        start: 0,
        limit: 12,
        filter: 'template'
    }),
    computed: {
        mokatemplates(){
            return this.templates.filter(comp=>{ return comp.category === 'template' || comp.category === 'page' } )
        }
    },
    methods: {
        background(template){
            let image = ''
            template.image && template.image.url ?
                image = template.image.url : 
                    template.image_uri ? image = template.image_uri : ''
            if ( !image.includes('http') ){
                image = process.env.VUE_APP_API_URL + image.substring(1)
            }
            return image
        },
        next(){
            if ( this.start < ( this.mokatemplates.length - this.limit ) ){
                this.start += this.limit
            }
        },
        prev(){
            if ( this.start > 0 ){
                this.start -= this.limit
            }
            
        }
    }
}
</script>