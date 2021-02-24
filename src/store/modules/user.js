const user = {
    state: {
        mode: process.env.NODE_ENV ,
        login: false,
        user: null,
        dashboard: 'MokaHome',
        dashboard_filter: '',
        production: {
            url: process.env.VUE_APP_PRODUCTION_URL || null
        },
        build: process.env.VUE_APP_NUXPRESSO_BUILD || null,
        strapiurl: null
    },
    mutations: {
        login ( state , login ){
            state.login = login
        },
        user ( state , user ){
            state.user = user
        },
        dashboard ( state , dashboard ){
            state.dashboard = dashboard
        },
        dashboard_filter ( state , filter ){
            state.dashboard_filter = filter
        },
        production ( state , production ){
            state.production = production
        },
        strapiurl ( state , url ){
            state.strapiurl = url
        }
    },
    actions: {
        login( { commit } , login ){
            commit ( 'login' , login )
        },
        user( { commit } , user ){
            commit ( 'user' , user )
        },
        dashboard ( { commit } , dashboard ){
            commit ( 'dashboard' , dashboard )
        },
        dashboard_filter ( { commit } , filter ){
            commit ( 'dashboard_filter' , filter )
        },
        production ( { commit } , production ){
            commit ( 'production' , production )
        },
        strapiurl ( { commit } , url ){
            commit ( 'strapiurl'  , url )
        }
    }

}
export default user