<template>
    <a-result title="这种网页还能不会用?">
        <template #icon>
            <smile-twoTone />
        </template>
        <template #extra>
            <a-button type="primary" @click="backHome()">
                返回首页
            </a-button>
        </template>
    </a-result>
</template>
<script>
import { SmileTwoTone } from '@ant-design/icons-vue';
import { defineComponent } from 'vue';

export default defineComponent({
    name: "HelpView",
    components: {
        SmileTwoTone,
    },
    emits: ['navChanged'],
    methods: {
        backHome() {
            this.$emit('navChanged', 1);
            this.$router.push('/');
        }
    },
    setup(_, context) {
        context.emit('navChanged', 6);
    }
});
</script>