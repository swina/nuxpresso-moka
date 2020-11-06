<template>
    <moka-editor :component="component"/>
</template>

<script>
import MokaEditor from '@/components/editor/moka.editor'
export default {
    components: { MokaEditor },
    data:()=>({
        component:{
            "blocks": [
                {
                "blocks": [
                    {
                    "id": "moka-7jjsi",
                    "css": "text-center bg-opacity-50 pr-4 pb-10 pl-4 w-1/3 shadow-lg rounded-lg bg-opacity-50",
                    "image": null,
                    "tag" : "blocks",
                    "blocks": [
                        {
                        "css": "text-blue-800 text-5xl mt-8 ",
                        "tag": "icon",
                        "icon": "crop_original",
                        "link": "",
                        "type": "icon",
                        "label": "Icon",
                        "style": "",
                        "content": "contact_mail",
                        "element": "p",
                        "id": "moka-g6qg2"
                        },
                        {
                        "css": "text-2xl md:text-3xl lg:text-5xl",
                        "tag": "element",
                        "icon": "title",
                        "link": "",
                        "type": "element",
                        "label": "Heading",
                        "style": "",
                        "content": "A title",
                        "element": "h",
                        "level": "1",
                        "id": "moka-g6qg3"
                        },
                        {
                        "css": "w-full",
                        "tag": "element",
                        "icon": "subject",
                        "link": "",
                        "type": "element",
                        "label": "Rich Text",
                        "style": "",
                        "content": "<p><span style=\"color: rgb(74, 85, 104);\">Create your theme, customize the style and apply to your website with a click</span></p>",
                        "element": "p",
                        "id": "moka-g6qg4"
                        }
                    ]
                    }
                ],
                "content": "",
                "css": {
                    "css": "",
                    "container": "flex flex-col md:grid mg:grid-cols-1"
                },
                "element": "grid",
                "icon": "view_column",
                "image": "",
                "label": "Columns",
                "link": "",
                "style": "",
                "type": "grid"
                },
                {
                "blocks": [
                    {
                    "id": "moka-hnbfa",
                    "blocks": [
                        {
                        "css": "",
                        "tag": "element",
                        "icon": "subject",
                        "link": "",
                        "type": "element",
                        "label": "Rich Text",
                        "style": "",
                        "content": "paragraph",
                        "element": "p",
                        "id": "moka-g6qg9"
                        }
                    ],
                    "css": "",
                    "image": null
                    },
                    {
                    "id": "moka-ezs4e",
                    "blocks": [
                        {
                        "css": "",
                        "tag": "element",
                        "icon": "subject",
                        "link": "",
                        "type": "element",
                        "label": "Rich Text",
                        "style": "",
                        "content": "paragraph",
                        "element": "p",
                        "id": "moka-2uw9f"
                        }
                    ],
                    "css": "",
                    "image": null,
                    "tag" : 'blocks'
                    }
                ],
                "content": "",
                "css": {
                    "css": "",
                    "container": "flex flex-col md:grid md:grid-cols-2"
                },
                "element": "grid",
                "icon": "view_column",
                "id": "moka-4rmo0",
                "image": "",
                "label": "Columns",
                "link": "",
                "style": "",
                "tag": "container",
                "type": "grid"
                }
            ],
            "css": "",
            "image": null,
            "name": "A block",
            "id" : "9iiasA-2l",
            "tag": "document"
        }
    })
}
</script>