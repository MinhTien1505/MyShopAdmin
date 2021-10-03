<template>
    <div>
        <input class="form-control" type="text" v-model="displayValue" required
                pattern="^(([1-9]\d{0,2}(,\d{3})*)|0)$"
                title="Price should a number!"/>
    </div>
</template>

<script>
export default {
    props: ["value"],
    data: function() {
        return {
            isInputActive: false
        }
    },
    computed: {
        displayValue: {
            get: function() {
                return this.value.replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,");
            },
            set: function(modifiedValue) {
                // Recalculate value after ignoring "$" and "," in user input
                let newValue = modifiedValue.replace(/[^\d.]/g, "");
                // Ensure that it is not NaN
                if (isNaN(newValue)) {
                    newValue = '0';
                }
                console.log(newValue);
                this.$emit('input', newValue);
            }
        }
    }
}
</script>
