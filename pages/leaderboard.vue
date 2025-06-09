<template>
    <ClientOnly>
        <SharedHeaderText>Top #50</SharedHeaderText>
        <div class="flex flex-col gap-4">
            <LazyEntityUserCard v-for="user in users" :balance="user.balance" :id="user.id"
                :name="`${user.firstName} ${user.lastName}`"></LazyEntityUserCard>
        </div>
    </ClientOnly>
</template>

<script setup lang="ts">
import { io } from 'socket.io-client';

interface LeaderboardUser {
    balance: number
    id: number
    firstName: string
    lastName: string
}

const users = useState<LeaderboardUser[]>('leaderboard-users', () => [])

const { public: { wsBase } } = useRuntimeConfig()


onMounted(() => {
    const ws = io(wsBase, {
        autoConnect: false
    })
    ws.emit('leaderboard', console.log)
    ws.on('leaderboard-update', (response: LeaderboardUser[]) => users.value = response)
    ws.connect()
})

</script>