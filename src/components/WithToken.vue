<template>
	<router-view v-if="isLoaded"/>
</template>

<script>
	import { ref, onMounted, provide } from 'vue';
    import { useRouter, useRoute } from 'vue-router'
    import { VKAPI } from 'vkontakte-api';

    export default {
        setup() {
			const router = useRouter()
			
            const isLoaded = ref(false)

            if (localStorage.accounts) {
                let accounts = JSON.parse(localStorage.accounts)
                let accountsList = accounts.list
                let activeAccounts = accounts.active

                const api = new VKAPI({
                    accessToken: accountsList[activeAccounts],
                    isBrowser: true,
                })

                provide('vkApi', api)
                isLoaded.value = true;
            } else {
                router.push("/");
            }

            return { isLoaded };
        }
    };
</script>

<style>

</style>