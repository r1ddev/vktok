<template>
    <h1>Группы</h1>
    <div class="list">
        <div class="list-item" v-for="group in groups" :key="group.id">
            <router-link :to="`/group/${group.id}`">{{group.name}}</router-link>
        </div>
    </div>
</template>

<script>
    import { ref, reactive, onMounted, inject } from "vue";
    import { useRouter, useRoute } from 'vue-router'

    export default {
        setup() {

            const groups = ref([]);

            const api = inject('vkApi')

            api.addRequestToQueue({
                method: 'groups.get',
                params: {
                    extended: '1',
                },
            }).then(res => {
                console.log(res);
                groups.value = [...res.items]
            })

            return { groups };
        }
    };
</script>