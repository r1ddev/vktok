<template>
    <h1>Стена</h1>
    <div class="list">
        <div class="list-item" v-for="post in posts" :key="post.id">
            <WallPost :post="getPostContent(post)" :wallId="wallId" />
        </div>
    </div>
</template>

<script>
    import { ref, reactive ,onMounted, watch, toRefs, inject } from "vue";
    import { useRouter, useRoute } from 'vue-router'
    import WallPost from './WallPost.vue';

    export default {
        props: {
            wallId: Number,
            default: null,
        },
        setup(props) {
            const route = useRoute()
            const posts = ref([]);

            const api = inject('vkApi')
            const wallId = route.params.wallId || props.wallId

            const fetchPosts = () => {
                api.addRequestToQueue({
                    method: 'wall.get',
                    params: {
                        owner_id: wallId,
                    },
                }).then(res => {
                    console.log(res);
                    posts.value = [...res.items]
                })
            }

            const getPostContent = (post) => {
                return post.copyHistory ? post.copyHistory[0] : post
            }

            watch(() => props.wallId, () => {
                fetchPosts()
            })

            fetchPosts()

            return { posts, wallId, WallPost, getPostContent };
        }
    };
</script>

<style lang="less" scoped>
.post-photos {
    display: flex;
}
</style>