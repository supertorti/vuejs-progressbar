import * as Components from './Components'

const ComponentLibrary = {

    install (Vue) {

        let installed = {}

        for (let Component in Components){
            let name = Components[ Component ].name

            Vue.component(name, Component)

            installed[ name ] = { "Message": 'Component registered'}
        }

        if(process.env.NODE_ENV === 'development') {
            console.group('%c Install Component-Library', 'background-color: green; color: white')
            console.table(installed)
            console.groupEnd()
        }
    }
}

export default ComponentLibrary