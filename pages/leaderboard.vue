<template>
    <ClientOnly>
        <SharedHeaderText>Top #50</SharedHeaderText>
        <div class="flex flex-col h-full min-h-[90dvh] justify-between">
            <div class="flex flex-col gap-4 max-sm:gap-8">
                <motion.div layout :key="user.id" v-for="(user, index) in users" class="flex gap-4 items-center h-28 max-sm:flex-col max-sm:h-auto">
                    <SharedInfoCard class="sm:aspect-square h-full flex items-center justify-center max-sm:w-full">
                        <p class="sm:text-3xl sm:opacity-80">
                            {{ index + 1 }}
                        </p>
                    </SharedInfoCard>
                    <LazyEntityUserCard class="h-full w-full" :balance="user.balance" :id="user.id"
                        :name="`${user.firstName} ${user.lastName}`">
                    </LazyEntityUserCard>
                </motion.div>
            </div>
            <footer class="flex items-center py-10 justify-center cursor-pointer">
                <SharedLogo @click="navigateTo('/')" width="150"></SharedLogo>
            </footer>
        </div>
    </ClientOnly>
</template>

<script setup lang="ts">
import { motion } from 'motion-v';
import { io, Socket } from 'socket.io-client';

interface LeaderboardUser {
    balance: number
    id: number
    firstName: string
    lastName: string
}

const users = useState<LeaderboardUser[]>('leaderboard-users', () => [])

const { public: { wsBase } } = useRuntimeConfig()

let ws: Socket | null = null
onMounted(() => {
    ws = io(wsBase, {
        autoConnect: false
    })
    ws.emit('leaderboard', console.log)
    ws.on('leaderboard-update', (response: LeaderboardUser[]) => users.value = response)
    ws.connect()
})

onBeforeUnmount(() => {
    ws && ws.disconnect()
})

</script>