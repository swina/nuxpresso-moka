<template>
    <div v-if="articles" :class="blocks.css.container + ' text-base'" :style="blocks.style">
        <div :key="article.id" v-for="(article,i) in articles" :class="blocks.blocks[0].css">
        <a :href="'/articles/' + article.slug">
            
            <template v-for="(field) in blocks.blocks[0].blocks">
                <component :key="field.id" :ref="field.id" :class="$cssResponsive(field.css)" :is="tag(field)" v-if="field.type != 'image' && field.type != 'date'" v-html="article[field.label]"/>
                <div :key="field.id" :ref="field.id" v-if="field.type==='date'">{{ $moment( article.updated_at )}}</div>
                <img :class="$cssResponsive(field.css)" v-if="field.type === 'image' && article.image" :src="article.image.url" :key="field.id" :ref="field.id"/>
            </template>
        </a>
        </div>
    </div>
</template>

<script>
import queryArticles from '@/apollo/articles-admin.gql'
import MokaElement from '@/components/editor/moka.element'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin ( ScrollTrigger )
const plugins = [ScrollTrigger];

export default {
    name: 'MokaArticlesLoop',
    components: {
        MokaElement
    },
    data:()=>({
        limit: 6,
        start: 0
    }),
    props: [ 'blocks' ],
    methods: {
        tag(field){
            return field.element === 'h' ? 'h' + field.level : 
                    field.element
        },
    },
    apollo:{
        articles: {
            prefetch: true,
            query: queryArticles,
            variables(){
                return {
                    limit: parseInt(this.limit),
                    start: parseInt(this.start)
                }
            },
            update: data => data.articles 
        }  
    },
    mounted(){
        console.log ( this.blocks.blocks[0].blocks )
        this.blocks.blocks[0].blocks.forEach ( element => {
            if ( element.hasOwnProperty('gsap') && element.gsap.animation ){
                console.log ( element.id )
                let id = element.id
                let ani = gsap.effects[element.gsap.animation]( this.$refs[id] ,{
                            trigger: this.$refs[id],
                            duration: parseFloat(element.gsap.duration),
                            delay: parseFloat(element.gsap.delay),
                            ease: element.gsap.ease
                })

                //let ani = gsap.effects[element.animation]( this.$refs[id] ) 
                
                ScrollTrigger.create({
                    id: id,
                    start: "top 80%",
                    trigger: this.$refs[id],
                    toggleActions: "play pause restart none",
                    animation:ani,
                    onEnter: ()=>{ 
                        if ( element.gsap.delay ){
                            ani.play()
                        } else {
                            ani.play(0)
                        }
                    },
                    onStart:()=> { console.log ( 'started' , new Date() )},
                    onComplete:()=> { console.log ( 'completed' , new Date() )}
                    
                });
            }
        })
    }
}
</script>