<template>
	<div class="">
		{{post.fromId}}
	</div>
	<div class="">
		{{post.text}}
	</div>
	<div v-if="post.attachments" class="post-photos">
		<div v-for="(attachment, index) in post.attachments" :key="index">
			<div v-if="attachment.type == 'photo'">
				<img :src="attachment.photo.sizes[0].url" alt="" srcset="">
			</div>
		</div>
	</div>
	<router-link :to="`/wall/${wallId}/post/${post.id}/comments`">Комментарии</router-link>
</template>

<script>
    import { ref, reactive ,onMounted, watch, toRefs, inject } from "vue";
    import { useRouter, useRoute } from 'vue-router'

    export default {
        props: {
            post: {
				type: Object,
				default: null,
			},
            wallId: {
				type: Number,
				default: null,
			},
        },
        setup(props) {
            const route = useRoute()

            const api = inject('vkApi')

            return { };
        }
    };
</script>

<style lang="less" scoped>
.post-photos {
    display: flex;

	img {
		max-width: 500px;
	}
}
</style>