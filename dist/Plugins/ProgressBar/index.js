import ProgresBar from "../../Components/ProgresBar/ProgresBar";

export default {

    Vue: {},
    mounted:false,
    instance: {},

    install (Vue) {

        this.Vue = Vue

        Vue.progress = this

        Object.defineProperties(Vue.prototype, {
            $progress: {
                get () {
                    return Vue.progress
                }
            }
        })
    },

    mountIfNotMounted (options) {

        let node = document.createElement('div')
        let body = document.querySelector('body')
            body . appendChild(node);


        let progressBar = new ( this.Vue.extend(ProgresBar) )({
            propsData: options
        })

        if(!options.destroy) progressBar.$on('done', () => this.destroy())

        progressBar.$mount(node)

        this.instance = progressBar
        this.mounted  = true
    },

    open (options) {

        if(options.mounted === true){
            throw new Error('ProgressBar allready mounted!')
        }

        if(options.totallenght == null){
            throw new Error('totallenght must be defined!')
        }


        this.mountIfNotMounted(options)
    },

    raise (value) {

        for (let i = 0; i < value; i++) {
            this.instance.donedatalenght += 1
        }
    },

    done (cb) {
        return this.instance.$on('done', () => cb())
    },

    destroy () {
        if (this.mounted === true) {

            let elem = this.instance.$el
            this.instance.$destroy()
            this.instance.$off()
            elem.remove()
            this.mounted = false
        }
    }
}