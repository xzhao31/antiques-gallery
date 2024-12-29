---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Antiques Gallery"
  text: "Collected by ZZ"
  # tagline: "Collected by ZZ"
---

<script setup>
  const galleryImages = import.meta.glob('../assets/gallery/*.png',{eager: true});
  console.log(galleryImages);
  const galleryImageUrls = Object.values(galleryImages).map(module => module.default);
</script>

<div class="gallery-images">
<img v-for="(url, index) in galleryImageUrls" :key="index" :src="url" alt="Gallery image" />
</div>

<style>
.gallery-images {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  padding: 1rem;
}

.gallery-images img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}
</style>