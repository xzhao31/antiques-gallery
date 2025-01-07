---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Antiques Gallery"
  # text: "Collected by ZZ"
  tagline: "Collected by ZZ"
---

<script setup>
  import { ref, onMounted } from 'vue';
  import { withBase } from 'vitepress';

  const galleryData = ref([]);
  onMounted(async () => {
    try {
      const response = await fetch(withBase('/gallery-data.json'));
      const data = await response.json();
      galleryData.value = data.map(item => ({
        ...item,
        url: withBase(item.url)
      }));
    } catch (error) {
      console.error('Error loading gallery data:', error);
    }
  });
</script>

<div class="gallery-container">
  <div v-for="(image, index) in galleryData" :key="index" class="gallery-image">
    <img :src="image.url" :alt="image.tags.join(', ')" />
    <p>{{ image.tags.join(', ') }}</p>
  </div>
</div>

<style>
.gallery-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  padding: 1rem;
}

.gallery-image {
  position: relative;
  overflow: hidden;
}

.gallery-image img {
  width: 100%;
  height: 250px;
  object-fit: cover;
}

.gallery-image:hover img {
  opacity: 0.5;
}

.gallery-image p {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  padding: 1rem;
}

.gallery-image:hover p {
  opacity: 1;
}

</style>