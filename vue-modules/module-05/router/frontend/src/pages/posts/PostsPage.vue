<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';

const router = useRouter()

interface Post {
    id: string
    title: string
    views?: number
}

const posts = ref<Post[]>([])

fetch('http://localhost:3000/posts')
    .then(res => res.json())
    .then(data => posts.value = data)
</script>


<template>
    Post de la aplicación

    <RouterLink to="/posts/new">Nuevo post</RouterLink>

    <div v-for="post in posts">
        <div><a href="#" @click.prevent="router.push(`/posts/${post.id}`)"> {{ post.title }} </a></div>
        <div>{{ post.views }} Views</div>
    </div>
</template>