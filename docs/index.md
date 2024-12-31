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

  const galleryImages = import.meta.glob('../assets/gallery/*.{jpg,jpeg,png}',{eager: true, as: 'url'});
  console.log(galleryImages);

  const galleryData = ref([]);
  onMounted(async () => {
    galleryData.value = await Promise.all(Object.entries(galleryImages).map(async ([path, url]) => {
      const tagFilePath = url.replace(/(jpg|jpeg|png)$/i,'txt');
      let tags = '';
      try {
        const response = await fetch(tagFilePath);
        tags = await response.text();
      } catch (error) {
        console.error(`Error fetching tags for ${url}:`, error);
      }
      if (tags === "") {
        tags = "untagged"
      }
      return { url, tags };
    }));
  });
</script>

<div class="gallery-container">
 <div v-for="(image, index) in galleryData" :key="index" class="gallery-image">
    <img :src="image.url" />
    <p>{{ image.tags }}</p>
  </div>
</div>

<style>
.gallery-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  padding: 1rem;
}

.gallery-image {
  position: relative;
  overflow: hidden;
}

.gallery-image img {
  width: 100%;
  height: 200px;
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