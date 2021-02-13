const menu = {
    items : [
        { label: 'Home' , icon: 'home' , component: 'MokaHome' , filter: '' },
        
        { label: 'Blocks' , icon: 'widgets' , component: 'MokaList' , filter: '' , 
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
        { label: 'Themes' , icon: 'web' , component: 'MokaThemes' , filter: ''},
        { label: 'CMS' , icon: 'article' , component: null , 
            items : [
                { label: 'Articles' , icon: 'article' , component: 'MokaArticles' , filter: 'article' },
                { label: 'Categories' , icon: 'category' , component: 'MokaCategories' , filter: 'category' }
            ]
        },
        { label: 'Media' , icon: 'photo' , component: 'MokaMedia' , filter: 'manager' },
        { label: 'Staging' , icon: 'dns' , component: 'MokaStage' , filter: '' },
        { label: 'Publish' , icon: 'dynamic_form' , component: 'MokaDeploy' , filter: '' },
        //{ label: 'Build' , icon: 'dynamic_form' , component: 'MokaBuild' , filter: '' },
        { label: 'Settings' , icon: 'settings' , component: 'MokaSettings' , filter: '' },
        { label: 'Grid Templates' , icon: 'grid_on' , component: 'MokaGrid' , filter: 'demo' },
        
    ]
}

export default menu