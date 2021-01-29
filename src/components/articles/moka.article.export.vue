<template>
    <div>
        <!-- EXPORT COMPONENT -->
        <transition name="fade">
            <div class="nuxpresso-modal rounded w-full md:w-1/4  p-4 flex flex-col bg-white z-2xtop">
                <i class="material-icons absolute top-0 right-0 cursor-pointer" @click="$emit('close')">close</i>

                <h4>Export Article</h4>
                <div class="flex flex-col bg-gray-300 p-2 rounded">
                <vue-blob-json-csv
                    file-type="json"
                    :file-name="title"
                    :data="[article]"
                    confirm="Do you want to download it?"
                >
                <button class="my-2">Download</button>
                <div class="text-xs">{{ title }}.json</div>
                </vue-blob-json-csv>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    name: "MokaExportArticle",
    props: [ 'article' , 'title' ]
}
</script>