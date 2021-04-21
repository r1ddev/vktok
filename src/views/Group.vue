<template>
	<div class="" v-if="group.id">
		<h1>{{group.name}}</h1>
		<img :src="group.photo200 || group.photo100 || group.photo50" alt="" sizes="" srcset="">
		<p>{{group.membersCount}} участников</p>
		<p>{{group.description}}</p>
		<a href="#" @click.prevent="groupJoin">Вступить</a> |
		<a href="#" @click.prevent="groupLeave">Выступить</a>
		<Wall :wallId="-1 * group.id" />
	</div>
    
</template>

<script>
    import { ref, reactive, onMounted, computed, watch, inject } from "vue";
    import { useRouter, useRoute } from 'vue-router'
	import Wall from './Wall'

    export default {
        setup() {
			const route = useRoute();

			const group = ref({});

			const api = inject('vkApi')
			
			function fetchGroup () {
				api.addRequestToQueue({
                    method: 'groups.getById',
                    params: {
						group_id: route.params.groupId,
						fields: 'city,country,place,description,wiki_page,market,members_count,counters,start_date,finish_date,can_post,can_see_all_posts,activity,status,contacts,links,fixed_post,verified,site,ban_info,cover'
                    },
                }).then(res => {
					let fetchedGroup = res[0];

					console.log("group", group);

					for (const key in fetchedGroup) {
						if (fetchedGroup.hasOwnProperty(key)) {
							const element = fetchedGroup[key];
							group.value[key] = element
						}
					}
				})
			}

			const groupJoin = () => {
				api.addRequestToQueue({
                    method: 'groups.join',
                    params: {
						group_id: route.params.groupId
                    },
                }).then(res => {
					console.log(res);
				})
			}

			const groupLeave = () => {
				api.addRequestToQueue({
                    method: 'groups.leave',
                    params: {
						group_id: route.params.groupId
                    },
                }).then(res => {
					console.log(res);
				})
			}

			fetchGroup();

            return { group, Wall, groupJoin, groupLeave };
        }
    };
</script>