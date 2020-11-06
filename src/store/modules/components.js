import axios from 'axios'
const strapi_url = 'http://localhost:1337/'
import icons  from '@/plugins/icons.js'
import articlesQry from '@/apollo/articles.gql'

const moka = {
    state:  {
        message: '',
        filter: '',
        components: null,
        elements:null,
        component: null,
        media: null,
        classes: null,
        articles:null,
        categories: null,
        icons: icons.icons,
        selected: null,
        current: null,
        fonts: [ 'Barlow Condensed','Abel','Alice','Alegreya','Amethysta','Nunito Sans','Roboto','Quattrocento']
    },
    mutations: {
        SET_MESSAGE ( state , message ){
            state.message = message
        },
        SET_FILTER ( state, filter ){
            state.filter = filter
        },
        SET_COMPONENTS ( state, components ){
            state.components = components
        },
        SET_ELEMENTS ( state, elements ){
            state.elements = elements
        },
        SET_COMPONENT ( state , component ){
            state.component = component
        },
        SET_MEDIA ( state , media ){
            state.media = media
        },
        SET_CLASSES ( state , classes ){
            state.classes = classes
        },
        SET_ARTICLES ( state , articles ){
            state.articles = articles
        },
        SET_CATEGORIES ( state , categories ){
            state.categories = categories
        },
        SET_SELECTED ( state , selected ){
            state.selected = selected
        },
        SET_CURRENT ( state , current ){
            state.current = current 
        }
    },
    actions: {
        filter ( { commit } , filter ){
            commit ( 'SET_FILTER' , filter )
        },
        message( { commit } , message ){
            commit ( 'SET_MESSAGE' , message )
        },
        async loadComponents ( { commit } ){
            const comps = await axios.get ( strapi_url + 'components' )
            commit ( 'SET_COMPONENTS' , comps.data.sort( (a, b) => a.name < b.name ? -1 : 1) ) 
        },
        async loadElements ( { commit } ){
            const els = await axios.get ( strapi_url + 'elements' )
            commit ( 'SET_ELEMENTS' , els.data )
        },
        async loadArticles ( { commit } ,articles ){
            
            commit ( 'SET_ARTICLES' , articles )
        },
        async loadCategories ( { commit } , categories ){
            commit ( 'SET_CATEGORIES' , categories )
        },
        loadComponent ( { commit } , component ){
            commit ( 'SET_COMPONENT' , component)
        },
        async loadMedia ( { commit } ){
            const media = await axios.get ( strapi_url + 'upload/files' )
            commit ( 'SET_MEDIA' , media.data )
        },
        loadClasses ( { commit } , classes ){
            commit ( 'SET_CLASSES' , classes )
        },
        selected ( { commit } , selected ){
            commit ( 'SET_SELECTED' , selected )
        },
        current ( { commit } , current ){
            commit ( 'SET_CURRENT' , current )
        }
    }

}
export default moka