import axios from 'axios'
import icons  from '@/plugins/icons.js'
import articlesQry from '@/apollo/articles.gql'

const moka = {
    state:  {
        remote_api: process.env.VUE_APP_PRODUCTION_URL,
        remote_graphql: process.env.VUE_APP_PRODUCTION_GRAPHQL,
        remote_user: process.env.VUE_APP_REMOTE_USER,
        remote_password: process.env.VUE_APP_REMOTE_PASSWORD,
        loading: false,
        message: '',
        filter: '',
        settings: null,
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
        fonts: process.env.VUE_APP_FONT_FAMILIES.split('|'),
        slide: 0
    },
    mutations: {
        SET_SETTINGS ( state , settings ){
            state.settings = settings
        },
        SET_LOADING ( state , loading ){
            state.loading = loading || true
        },
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
        },
        SET_SLIDE ( state , slide ){
            state.slide = slide
        }
    },
    actions: {
        loading( { commit } ){
            commit ( 'SET_LOADING' )
        },
        filter ( { commit } , filter ){
            commit ( 'SET_FILTER' , filter )
        },
        message( { commit } , message ){
            commit ( 'SET_MESSAGE' , message )
        },
        async loadComponents ( { commit } ){
            const comps = await axios.get ( process.env.VUE_APP_API_URL + 'components' )
            commit ( 'SET_COMPONENTS' , comps.data.sort( (a, b) => a.name < b.name ? -1 : 1) ) 
            
        },
        async loadElements ( { commit } ){
            const settings = await axios.get ( process.env.VUE_APP_API_URL + 'settings' )
            commit ( 'SET_SETTINGS' , settings.data )
            axios.get ( process.env.VUE_APP_API_URL + 'elements' ).then ( response => {
                commit ( 'SET_ELEMENTS' , response.data )
            }).catch ( error => {
                if ( error ){
                    window.localStorage.removeItem('nuxpresso-user')
                    window.localStorage.removeItem('nuxpresso-jwt')
                }
            })
            //const els = await axios.get ( strapi_url + 'elements' )
            //console.log ( 'Loading elements ... ' , els )
            //commit ( 'SET_ELEMENTS' , els.data )
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
            const media = await axios.get ( process.env.VUE_APP_API_URL + 'upload/files' )
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
        },
        slide ( { commit } , slide ){
            commit (  'SET_SLIDE' , slide )
        }
    }

}
export default moka