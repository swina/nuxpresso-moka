import axios from 'axios'
import JSZip from 'jszip'

const themes = {
    state : {
        themes: null,
        theme: null,
        images: []
    },
    mutations: {
        SET_THEMES ( state , themes ){
            state.themes = themes
        },
        SET_THEME ( state , theme ){
            state.theme = theme
        },
        SET_IMAGES ( state , images ){
            state.images = images 
        }
    },
    actions: {
        async loadThemes ( { commit } ){
            return
            //const themes = await axios.get ( process.env.VUE_APP_API_URL + 'themes')
            //console.log ( themes )
            //if ( themes ){
            //    commit ( 'SET_THEMES' , themes.data)
            //}
            /*
            axios({
                url: '/uploads/themes.zip',
                    method: 'GET',
                    responseType: 'blob'
            }).then ( response => {
                if (response.status === 200 || response.status === 0) {
                    return Promise.resolve(response.data);
                } else {
                    return Promise.reject(new Error(response.statusText));
                }
            }).then ( JSZip.loadAsync ).then ( (zip) => {
                zip.forEach ( (relativePath,entry) => {
                    if ( entry ){
                        if ( entry && entry.name.endsWith('json') ){
                            zip.file(entry.name).async('string').then(function(content) {
                                return JSON.parse(content)
                            }).then ( json => {
                                commit ( 'SET_THEMES' , json )
                            }).catch ( error => {
                                console.log ( 'Error => ' , error )
                            })
                        }
                    }
                })
            }).catch ( error => {
                console.log ( error )
            })
            */
        },
        async loadTheme ( { commit } , zip ){
            let zipImages = []
            axios({
                url: '/uploads/' + zip,
                    method: 'GET',
                    responseType: 'blob'
            }).then ( response => {
                if (response.status === 200 || response.status === 0) {
                    return Promise.resolve(response.data);
                } else {
                    return Promise.reject(new Error(response.statusText));
                }
            }).then ( JSZip.loadAsync ).then ( (zip) => {
                zip.forEach ( (relativePath,entry) => {
                    if ( entry ){
                        if ( entry && entry.name.endsWith('json') ){
                            zip.file(entry.name).async('string').then(function(content) {
                                return JSON.parse(content)
                            }).then ( json => {
                                delete json.autosave
                                commit ( 'SET_THEME' , json )
                            });
                        } else {
                            //put images url in array, to use to export as data uri
                            zipImages.push ( entry )
                        }
                    }
                })
                commit ( 'SET_IMAGES' , zipImages )
            }).catch ( error => {
                console.log ( error )
            })
        }
    }

}

export default themes