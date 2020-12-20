const menu = {
    items : [
        { label: 'Home' , icon: 'home' , component: 'MokaHome' , filter: '' },
        { label: 'Content' , icon: 'article' , component: null , 
            items : [
                { label: 'Articles' , icon: 'article' , component: 'MokaArticles' , filter: '' }
            ]
        },
        { label: 'Mokas' , icon: 'widgets' , component: 'MokaList' , filter: '' , 
            items: [
                { label: 'Widgets' , icon: '' , component: 'MokaList' , filter: 'widget' },
                { label: 'Pages' , icon: '' , component: 'MokaList' , filter: 'page' },
                { label: 'Templates' , icon: '' , component: 'MokaList' , filter: 'template' },
                { label: 'Sliders' , icon: '' , component: 'MokaList' , filter: 'slider' },
                { label: 'Components' , icon: '' , component: 'MokaList' , filter: 'component' },
                { label: 'Archive' , icon: '' , component: 'MokaList' , filter: 'archive' },
                { label: 'Favorites' , icon: '' , component: 'MokaList' , filter: 'starred' },
            ]
        },
        { label: 'Media' , icon: 'photo' , component: 'MokaMedia' , filter: '' },
        { label: 'Settings' , icon: 'settings' , component: 'MokaSettings' , filter: '' },
        { label: 'Staging' , icon: 'dns' , component: 'MokaStage' , filter: '' },
        { label: 'Deploy' , icon: 'dynamic_form' , component: 'MokaDeploy' , filter: '' },
        
    ]
}

export default menu