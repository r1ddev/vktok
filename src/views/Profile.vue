<template>
	<div class="" v-if="profile.id">
		<h1>{{profile.firstName}} {{profile.lastName}}</h1>
		<p>id: {{profile.id}}</p>
		<p><a :href="`https://vk.com/id${profile.id}`" target="_blank">VK</a></p>
		<img :src="profile.photo200 || profile.photo100 || profile.photo50" alt="" sizes="" srcset="">
		<p>Дата рождения: {{profile.bdate}}</p>
		<p>Пол: {{profile.sex}}</p>
		<p>Город: {{profile.sity}}</p>
		<Wall :wallId="profile.id" />
	</div>
    
</template>

<script>
    import { ref, reactive, onMounted, computed, watch, inject } from "vue";
    import { useRouter, useRoute } from 'vue-router'
	import Wall from './Wall'

    export default {
        setup() {
			const route = useRoute();

			const profile = ref({});

			const api = inject('vkApi')

            watch(() => route.params.id, (wallId) => {
				fetchUser()
            });
			
			function fetchUser () {
				api.addRequestToQueue({
                    method: 'users.get',
                    params: {
						...route.params.id && { user_id: route.params.id },
						fields: "photo_50, photo_100, photo_200, bdate, sex, city"
                    },
                }).then(res => {
					let user = res[0];

					console.log("user", user);

					for (const key in user) {
						if (user.hasOwnProperty(key)) {
							const element = user[key];
							profile.value[key] = element
						}
					}
				})
			}

			fetchUser()

            return { profile, Wall };
        }
    };
</script>