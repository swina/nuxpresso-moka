<template>
    <div class="w-full flex flex-col">
        <label>Content</label>
        <textarea class="w-full dark" v-if="$attrs.element.element != 'p'" v-model="$attrs.element.content"></textarea>
        <div v-if="$attrs.element.element === 'button'" class="flex flex-col">
            <label>Link</label>
            <input class="dark" type="text" v-model="$attrs.element.link"/>
            <label>Action</label>
            <input class="dark" type="text" v-model="$attrs.element.action"/>
        </div>
    </div>
</template>