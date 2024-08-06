<script setup>
import { ref, computed, onMounted } from 'vue'

const link = ref('')
const shortenedLink = ref('')
const hasError = ref(false)

const token = import.meta.env.VITE_TINY_URL_API_KEY
const apiUrl = `https://api.tinyurl.com/create?api_token=${token}`

function shortenLink() {
    if (link.value.length == 0) {
        hasError.value = true
        return
    }

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            url: link.value,
        })
    })
    .then(response => response.json())
    .then(data => {
        shortenedLink.value = data.data.tiny_url
    })
}

function clear() {
    if (link.value.length == 0) {
        hasError.value = false
        shortenedLink.value = ''
        return
    }
}

</script>

<template>
    <main>
        <div class="flex items-center justify-center gap-3 mt-12">
            <input 
            v-model="link"
            class="border border-gray-300 rounded-md p-2 w-full"
            :class="{ 'border-red-500 border-2': hasError}"
            placeholder="Paste your link here"
            @keyup="clear"
            />
            <button @click="shortenLink">Shorten</button> 
        </div>
        <p v-if="shortenedLink && link.length > 0" class="mt-4 font-bold">Your shorten link: 
            <a :href="shortenedLink" target="_blank">{{ shortenedLink }}</a>
        </p>
    </main>
</template>