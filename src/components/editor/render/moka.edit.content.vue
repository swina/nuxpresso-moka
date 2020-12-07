<template>
    <div class="w-full flex flex-col">
        <!-- image -->
        

        <div class="bg-gray-700 cursor-pointer hover:bg-blue-300 text-gray-100 px-1 mb-1" v-if="$attrs.entity && $attrs.entity.entity.hasOwnProperty('image')" @click="image=!image">
            Media
        </div>
        <div class="p-4 text-center" v-if="image && $attrs.entity && $attrs.entity.entity.hasOwnProperty('image')">
            <moka-image-placeholder v-if="$attrs.entity" size="sm" :image="$attrs.entity.entity.image" @noimage="$attrs.entity.entity.image=null" @media="$emit('media')"/> 
        </div>

        <!-- video options -->
        <div class="bg-gray-700 cursor-pointer hover:bg-blue-300 text-gray-100 px-1 mb-1" v-if="$attrs.element.type==='video'" @click="video=!video">
            Video Options
        </div>
        <transition name="fade">
            <div class="flex flex-col my-1 text-left" v-if="video">
                
                <div class="w-full flex flex-row justify-around">
                    <div>
                        <input type="checkbox" v-model="$attrs.element.options.autoplay"/> autoplay
                    </div>
                    <div>   
                        <input type="checkbox" v-model="$attrs.element.options.loop"/> loop 
                    </div>
                    <div>
                        <input type="checkbox" v-model="$attrs.element.options.controls"/> controls
                    </div>
                </div>
            </div> 
        </transition>

       
        <!-- link and anchor -->
        <div class="bg-gray-700 cursor-pointer hover:bg-blue-300 mb-1 text-gray-100 px-1" @click="link=!link">
            Link / Anchor
        </div>
        <transition name="fade">
            <div v-if="link" class="flex flex-col">
                <label>Link</label>
                <input class="dark" type="text" v-model="$attrs.element.link"/>
                <label>Anchor</label>
                <input class="dark" type="text" v-model="$attrs.element.anchor"/>
            </div>
             <!-- slider link next prev -->
            <div class="flex flex-col my-1 text-left" v-if="$attrs.component.category==='slider'">
                <label>Slider Action</label>
                <select class="dark" v-model="$attrs.element.action">
                    <option value=""></option>
                    <option value="slider_next">Next</option>
                    <option value="slider_prev">Prev</option>
                </select>
            </div>
        </transition>

        <!-- icon options -->
        <div class="bg-gray-700 cursor-pointer hover:bg-blue-300 text-gray-100 px-1 mt-1 mb-1" v-if="$attrs.element.tag==='icon'" @click="icon=!icon">
            Icon
        </div>
        <!-- icon settings -->
        <moka-icons v-if="icon" :icon="$attrs.element.content" v-model="$attrs.element.content"/>

        <div v-if="$attrs.element.tag === 'input'" class="flex flex-col">
            <label>Default value</label>
            <input class="dark" type="text" v-model="$attrs.element.content"/>
            <label>Field name</label>
            <input class="dark" type="text" v-model="$attrs.element.name"/>
            <label>Placeholder</label>
            <input class="dark" type="text" v-model="$attrs.element.placeholder"/>
            <label>Required</label>
            <input type="checkbox" v-model="$attrs.element.required"/>
        </div>

        <!-- button action -->
        <div v-if="$attrs.element.element === 'button'" class="flex flex-col">
            <label>Action</label>
            <input class="dark" type="text" v-model="$attrs.element.action"/>
        </div>

       

        
        <!--<div v-if="$attrs.element.element === 'button'" class="flex flex-col">
            <label>Link</label>
            <input class="dark" type="text" v-model="$attrs.element.link"/>
            <label>Action</label>
            <input class="dark" type="text" v-model="$attrs.element.action"/>
        </div>-->
       
    </div>
</template>

<script>
import MokaImagePlaceholder from '@/components/editor/moka.editor.image.placeholder'
import MokaIcons from '@/components/editor/render/moka.customize.icon'
export default {
    name: 'MokaEditContent',
    data:()=>({
        image: false,
        video: false,
        link: false,
        icon: false
    }),
    components: { MokaImagePlaceholder , MokaIcons }
}
</script>