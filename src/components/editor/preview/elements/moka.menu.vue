<template>
<div>
    <nav v-if="el.element === 'menu'" :class="menu_responsive(el) + ' z-top ' + el.css.align"> 
        <div v-for="(item,i) in el.items" :class="el.css.css + ' cursor-pointer relative pr-4'" :key="el.id + '_' + i"> 

            <a :class="el.css.css" v-if="!item.submenu && !$attrs.develop && item.link && !item.link.includes('http')" :href="item.link">{{ item.label }} <i v-if="item.submenu" class="material-icons moka-icons">arrow_drop_down</i></a>
            
            <div v-else @mouseover="menuover=i" :class="el.css.css" @click="menuover=i">{{item.label}} <i v-if="item.submenu && item.submenu.length" :class="el.css.css + ' material-icons moka-icons text-sm'">arrow_drop_down</i></div>
            
            <div v-if="item.submenu && item.submenu.length" :class="isOver(i) + ' ' + el.css.submenu + ' absolute flex flex-col z-2xtop'" @mouseleave="menuover=-1"> 
                <div v-for="sub in item.submenu">
                    <div :class="el.css.css">{{sub.label}}</div>
                </div>
            </div>
        </div>
    </nav>
    
    <!-- responsive -->
    <i :class="'material-icons moka-icons z-max fixed md:hidden top-0 left-0 m-1 ' + el.css.css" v-if="el.element === 'menu' && el.responsive" @click="showmenu">menu</i>
    <transition name="fade">
        <nav v-if="menu_show" :class="el.css.responsive"> 
            <i :class="'material-icons moka-icons z-max md:hidden top-0 left-0 m-1 ' + el.css.css" v-if="el.element === 'menu' && el.responsive" @click="showmenu">menu</i>
            <div v-for="(item,i) in el.items" :class="el.css.css + ' cursor-pointer relative p-1'"> 
                
                <a :class="el.css.css" :href="item.link">{{ item.label }}</a>
                
                
                <div v-if="item.submenu && item.submenu.length" :class="el.css.css + ' ml-2 flex flex-col'"> 
                    <div v-for="sub in item.submenu">
                        <a :class="el.css.css" :href="sub.link">{{ sub.label }}</a>
                    </div>
                </div>
            </div>
        </nav>
    </transition>

</div>
</template>

<script>
var gsap
export default {
    name: 'MokaMenuElement',
    props: ['el'],
    data:()=>({
        opacity: 'opacity-0',
        menuover: -1,
        menu_show: false
    }),
    methods:{
        showmenu(){
            this.menu_show =! this.menu_show
        },
        isOver(i){
            return i < 0 ? 'opacity-0' : this.menuover === i ? 'opacity-100' : 'opacity-0'
        },
        menu_responsive(menu){
            if ( menu.type === 'horizontal' && menu.responsive ) return 'hidden flex flex-col md:flex md:flex-row' 
            if ( menu.type === 'horizontal' && !menu.responsive ) return menu.css.container
            if ( menu.type === 'vertical' ) return 'flex flex-col'
        }
    },
    mounted(){
        gsap = this.$animation(this.el,this.el.id,this.$refs)
    },
    beforeDestroy(){
        if ( gsap ) gsap.timeline().kill()
    }
}
</script>