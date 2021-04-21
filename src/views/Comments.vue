<template>
    <h1>Комментарии</h1>
    <div class="list">
        <div class="list-item" v-for="comment in comments" :key="comment.id">
			<div class="" v-if="!comment.deleted">{{comment.userData?.firstName}} {{comment.userData?.lastName}}: {{comment.text}}</div>
			<div class="" v-else>deleted</div>
        </div>
    </div>
	<div class="">
		<form @submit.prevent="sendComment">
			<input type="text" v-model="newComment" required>
			<input type="submit" value="Отправить">
		</form>
		<iframe v-if="iframe.length > 0" :src="iframe" frameborder="0"></iframe>
	</div>
</template>

<script>
    import { ref, reactive, onMounted, inject } from "vue";
    import { useRouter, useRoute } from 'vue-router'

    export default {
        setup() {
            const route = useRoute()
			const comments = ref([]);
			const newComment = ref('')
			const iframe = ref('')

			const api = inject('vkApi')
			
			api.addRequestToQueue({
				method: 'wall.getComments',
				params: {
					owner_id: route.params.wallId,
					post_id: route.params.postId,
					sort: 'asc',
					count: 100,
					extended: '1',
				},
			}).then(res => {
				console.log(res.items);
				comments.value = [...res.items]

				comments.value = comments.value.map(comment => {
					return {
						...comment,
						userData: res.profiles.find(profile => comment.fromId === profile.id)
					}
				})
			})
			
			function sendComment () {

				api.addRequestToQueue({
                    method: 'wall.createComment',
                    params: {
                        owner_id: route.params.wallId,
						post_id: route.params.postId,
						message: newComment.value,
                    },
                }).then(res => {
					console.log(res);
                }).catch(err => {
					switch (err.data.errorCode) {
						case 17:
							iframe.value = err.data.redirectUri
							console.log(err.data.redirectUri);
							break;
					
						default:
							break;
					}
				})
			}

            return { comments, sendComment, newComment, iframe };
        }
    };
</script>