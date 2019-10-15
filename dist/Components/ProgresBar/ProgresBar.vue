<template>
    <div>

        <div class="modal-backdrop fade show"></div>

        <div class="modal fade show" id="myModal" style="padding-right: 15px; display: block;">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div v-if="title" class="modal-header text-center">
                        <h6 class="modal-title font-weight-bolder" style="width: 100%">{{ title }}</h6>
                    </div>
                    <div class="modal-body">
                        <div class="large-12 medium-12 small-12 cell text-center">
                            <div class="progressHolder">
                                <div class="progress" style="height:20px">
                                    <div :class="['progress-bar', barclass]" :style="{ width: progress +'%' }" style="height:20px"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="confirm && showConfirm" class="modal-footer">
                        <button @click="doneEmitter" class="btn btn-primary btn-sm">OK</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "progres-bar",

        data: () => ({
            donedata: 0,
            showConfirm: false
        }),

        props: {
            title: {
                type: String,
                required: false
            },

            totallenght:{
                type: Number|String,
                required: true
            },

            donedatalenght:{
                type: Number|Boolean,
                required: false,
                default: false
            },

            delay: {
                type: Number|String,
                required: false,
                default: 500
            },

            confirm: {
                type: Boolean,
                required: false,
                default: false
            },

            barclass: {
                type: String,
                required: false,
                default: 'bg-primary'
            }
        },

        computed: {
            progress: function () {

                let total = this.totallenght
                let done  = this.donedatalenght || this.donedata

                return Math.floor( (done / total) * 100 ) || 0
            }
        },

        methods: {
            doneEmitter: function () {
                setTimeout(() => this.$emit('done'), this.delay)
                setTimeout(() => this.$root.$emit('progressdone'), this.delay)
            }
        },

        watch: {
            progress: function (value) {
                if(value === 100){

                    if (!this.confirm)
                        setTimeout(this.doneEmitter, this.delay)

                    else
                        setTimeout(() => this.showConfirm = true, this.delay)
                }
            }
        }
    }
</script>

<style scoped>

    .progressHolder {
        width: 100%;
    }

    .progress {
        text-align: center;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        height: 1rem;
        overflow: hidden;
        font-size: .75rem;
        background-color: #ffffff;
        border-radius: .25rem;
        border: 1px solid #dadcde;
    }

    .modal {
        position: fixed;
        top: 35%;
        left: 0;
        z-index: 1050;
        display: none;
        width: 100%;
        height: 100%;
        overflow: hidden;
        outline: 0;
    }
</style>