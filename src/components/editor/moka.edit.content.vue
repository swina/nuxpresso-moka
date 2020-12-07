<template>
    <div class="w-full flex flex-col">
        <!-- image -->
        
        <div class="p-4 text-center" v-if="$attrs.entity && $attrs.entity.entity.hasOwnProperty('image')">
            <span v-if="$attrs.entity.entity.element!='img'">Background </span>Image
            <moka-image-placeholder v-if="$attrs.entity" size="sm" :image="$attrs.entity.entity.image" @noimage="$attrs.entity.entity.image=null" @media="$emit('media')"/> 
        </div>

        <!-- video options -->
        <div class="flex flex-col my-1 text-left" v-if="$attrs.element.type==='video'">
            <label>Video Options</label>
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

        <!-- text content -->
        <!--
        <label v-if="$attrs.element.element != 'p'">Content</label>
        <textarea class="w-full dark" v-if="$attrs.element.element != 'p'" v-model="$attrs.element.content"></textarea>
        -->
        <!-- link and anchor -->
        <label>Link</label>
        <input class="dark" type="text" v-model="$attrs.element.link"/>
        <label>Anchor</label>
        <input class="dark" type="text" v-model="$attrs.element.anchor"/>

        <!-- button action -->
        <div v-if="$attrs.element.element === 'button'" class="flex flex-col">
            <label>Action</label>
            <input class="dark" type="text" v-model="$attrs.element.action"/>
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
export default {
    name: 'MokaEditContent',
    components: { MokaImagePlaceholder }
}
</script>