<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png">

        <form @submit.prevent="submitToken">
            <input type="text" v-model="token" placeholder="token">
            <input type="submit" value="go">
        </form>
        
        <div class="list" v-for="(account, index) in accounts.list" :key="index">
            <div class="list-item">
                <a href="#" @click.prevent="loginToken(index)">{{account}}</a>
            </div>
        </div>
    </div>
</template>

<script>
    import { ref } from "vue";
    import { useRouter } from 'vue-router';

    export default {
        setup() {
            const router = useRouter();

            const token = ref('');
            const accounts = ref({
                list: [],
                active: null
            });

            function submitToken () {
                let findAccIndex = accounts.value.list.indexOf(token.value)

                if (findAccIndex < 0) {
                    accounts.value.list.push(token.value)
                    accounts.value.active = accounts.value.list.length -1
                } else {
                    accounts.value.active = findAccIndex
                }

                localStorage.setItem('accounts', JSON.stringify(accounts.value))
                router.push('profile')
            }

            const loginToken = (index) => {
                accounts.value.active = index
                
                localStorage.setItem('accounts', JSON.stringify(accounts.value))
                router.push('profile')
            }

            let localStorageAccounts = JSON.parse(localStorage.getItem('accounts')) || {}

            accounts.value.list = localStorageAccounts.list || []
            accounts.value.active = localStorageAccounts.active || null

            return {
                token, submitToken, accounts, loginToken
            }
        }
    };
</script>