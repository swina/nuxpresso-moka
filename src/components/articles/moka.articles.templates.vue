<template>
<div class="flex flex-col">
    <div v-if="templates" class="flex flex-row flex-wrap justify-around p-4">
        
        <template v-for="(template,index) in mokatemplates">
            <div class="w-48 flex flex-col mb-4 cursor-pointer" v-if="index>=start && index < (start+limit)" @click="$emit('set',template.id,template.json.id)">
                <span class="text-sm font-bold">{{ template.name }}</span>
                <div v-if="template.image_uri" :style="'background-image:url(' + template.image_uri + ')'" class="h-24 bg-auto bg-no-repeat bg-cover"></div>
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