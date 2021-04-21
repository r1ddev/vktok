<template>
    <h1>Диалоги</h1>
    <div class="list">
        <div class="list-item" v-for="conversation in conversations" :key="conversation.conversation.peer.id">
            <router-link :to="`/messages/${conversation.conversation.peer.id}`">{{getConversationName(conversation)}}</router-link>
        </div>
    </div>
</template>

<script>
    import { ref, reactive, onMounted, inject } from "vue";
    import { useRouter, useRoute } from 'vue-router'

    export default {
        setup() {

			const conversations = ref([]);

			const api = inject('vkApi')

			const getConversationName = (conversation) => {
				switch (conversation.conversation.peer.type) {
					case 'group':
						return conversation.userData.name
						break;
				
					case 'user':
						return conversation.userData.firstName + ' ' + conversation.userData.lastName
						break;

					case 'chat':
						return conversation.conversation.chatSettings.title
						break;
				}
			}

			api.addRequestToQueue({
				method: 'messages.getConversations',
				params: {
					count: 50,
					extended: '1'
				},
			}).then(res => {
				console.log(res);
				conversations.value = [...res.items]
				
				conversations.value = conversations.value.map(conversation => {
					console.log(res.profiles.find(profile => conversation.conversation.peer.id === profile.id));
					console.log(res.groups.find(group => conversation.conversation.peer.id === group.id * -1));
					return {
						...conversation,
						userData: res.profiles.find(profile => conversation.conversation.peer.id === profile.id) ||
							res.groups.find(group => conversation.conversation.peer.id === -1 * group.id)
					}
				})

				console.log("finalconversations", conversations.value);
			})

            return { conversations, getConversationName };
        }
    };
</script>