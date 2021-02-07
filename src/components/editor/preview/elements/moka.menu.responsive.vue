<template>
    <div>
        <i :class="'material-icons moka-icons z-max fixed md:hidden top-0 left-0 m-1 ' + el.css.css" v-if="el.element === 'menu' && el.responsive" @click="showmenu">menu</i>
        <transition name="fade">
            <nav v-if="menu_show" :class="el.css.responsive"> 
                <i :class="'bi-list moka-icons z-max md:hidden top-0 left-0 m-1 text-3xl ' + el.css.css" v-if="el.element === 'menu' && el.responsive" @click="showmenu"></i>
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