<template>
    <h1>Диалог</h1>
	<div class="">
		<form @submit.prevent="sendMessage">
			<input type="text" v-model="newMessage" required>
			<input type="submit" value="Отправить">
		</form>
		<iframe v-if="iframe.length > 0" :src="iframe" frameborder="0"></iframe>
	</div>
    <div class="list" v-for="message in messages" :key="message.conversationMessageId">
		<!-- {{JSON.stringify(message)}} -->
        <div class="list-item">
			<div class="">
				<a :href="getAuthorLink(message)" target="_blank">{{getAuthorName(message)}}</a>
				<span> | {{toDateTime(message.date)}}</span>
				<span> | <a href="#" @click.prevent="deleteMessage(message.id)">Удалить</a></span>
			</div>
			<div class="">{{message.text}}</div>
        </div>
    </div>
	
</template>

<script>
    import { ref, reactive, onMounted, computed, inject } from "vue";
    import { useRouter, useRoute } from 'vue-router'
	import moment from 'moment';

    export default {
        setup() {
			const route = useRoute();

			const messages = ref([]);
			const newMessage = ref('');
			const iframe = ref('')

			const api = inject('vkApi')
			
			const sendMessage = () => {
				api.messages.send({
					"user_id": route.params.id,
					"message": newMessage.value
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

			const getAuthorName = (message) => {
				switch (message.userData?.type || 'user') {
					case 'group':
						return message.userData.name
						break;
				
					case 'user':
						return message.userData.firstName + ' ' + message.userData.lastName
						break;
				}
			}

			const getAuthorLink = (message) => {
				switch (message.userData?.type || 'user') {
					case 'group':
						return '/group/' + message.userData.id
						break;
				
					case 'user':
						return '/profile/' + message.userData.id
						break;
				}
			}

			const deleteMessage = (messageId) => {
				api.addRequestToQueue({
					method: 'messages.delete',
                    params: {
						message_ids: messageId,
                    },
				}).then(res => {
					alert(`message ${messageId} deleted`)
				})
			}

			function toDateTime (timestamp) {
				return moment(timestamp*1000).format('YYYY-MM-DD HH:mm:ss');
			}

            onMounted(() => {

                api.addRequestToQueue({
                    method: 'messages.getHistory',
                    params: {
						count: 200,
						user_id: route.params.id,
						extended: 1
                    },
                }).then(res => {
					console.log(res);
					messages.value = [...res.items]
					
					messages.value = messages.value.map(message => {
						let userData = res.profiles?.find(profile => message.fromId === profile.id)
						if (userData) {
							userData.type = 'user'
						} else {
							userData = res.groups.find(group => message.fromId === -1 * group.id)
							if (userData) {
								userData.type = 'group'
							}
						}
						
						return {
							...message,
							userData: userData
						}
					})

				})
				
				// api.addRequestToQueue({
                //     method: 'messages.getChat',
                //     params: {
				// 		chat_id: route.params.id,=
                //     },
                // }).then(res => {
                //     console.log(res);
                //     messages.value = [...res.items]
                // })
            })

            return { messages, toDateTime, newMessage, sendMessage, iframe, getAuthorName, getAuthorLink, deleteMessage };
        }
    };
</script>