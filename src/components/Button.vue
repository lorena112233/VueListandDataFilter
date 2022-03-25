<template>
    <button  class="btn p-1" :class="selectedStyle">
        <slot>Button</slot>
    </button>
</template>

<script>
 export default {
    name: "Button",
    props: {
        //Type control style
        type: {
            type:String,
            default:"default"
        },

    },
    computed:{
        selectedStyle(){
            switch (this.type) {
                case "outline":
                    return "outline"
                case "outline-secondary":
                    return "outline-secondary"
                default:
                    return "outline";
            }
        }
    }
 }
</script>

<style scoped>
.btn{
        padding:10px 30px;
        border:none;
        border-radius: 5px;
        color:white;
        cursor:pointer;
        font-weight: 700;
        letter-spacing: 2px;
        transition:.3s;
        max-height: 50px;
}

.outline{
        background-color:transparent;
        border: 2px solid #00a200;
        color:#00a200 ;
    }
    .outline:hover{
        background-color: #00a200;
        color:white;
    }

        .outline-secondary{
        background-color:transparent;
        border:2px solid #8388A4;
        color:#8388A4;
    }
    .outline-secondary:hover{
        background-color:#8388A4;
        color:#32364F;
    }
</style>