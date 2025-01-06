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

  console.log('trial 6')
  const galleryImages = import.meta.glob('./public/gallery/*.{jpg,jpeg,png}',{eager: true, as: 'url'});

  const galleryData = ref([]);
  onMounted(async () => {
    galleryData.value = await Promise.all(Object.entries(galleryImages).map(async ([path, url]) => {
      console.log('picture')
      console.log(path)
      console.log(url)
      const tagFilePath = path.replace(/(jpg|jpeg|png)$/i,'txt').replace(/\.\./g, '/antiques-gallery');
      console.log(tagFilePath)
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
  // onMounted(async () => {
  //   const imageContext = import.meta.glob('/public/assets/gallery/*.{jpg,jpeg,png}', { eager: true, as: 'url' });
    
  //   galleryData.value = await Promise.all(
  //     Object.entries(imageContext).map(async ([path, url]) => {
  //       const imageName = path.split('/').pop();
  //       const tagFileName = imageName.replace(/\.(jpg|jpeg|png)$/i, '.txt');
  //       const tagFilePath = `/assets/gallery/${tagFileName}`;
        
  //       let tags = '';
  //       try {
  //         const response = await fetch(tagFilePath);
  //         tags = await response.text();
  //       } catch (error) {
  //         console.error(`Error fetching tags for ${imageName}:`, error);
  //       }
        
  //       return { url, tags: tags || 'untagged' };
  //     })
  //   );
  // });



  // const images = [
  //   'https://drive.google.com/thumbnail?id=1NYBJZniY1bADgUzlbpqs1u1KtrtXSZYY&sz=w1000',
  //   'https://drive.google.com/thumbnail?id=150J0beW4TMSAXg4bxgBQcCz3giyffDca&sz=w1000',
  //   'https://drive.google.com/thumbnail?id=1d959MKRCU_bZ-h4ZQLMhgRTWpZVOf8UI&sz=w1000'
  //     ];
</script>

<div class="gallery-container">
 <div v-for="(image, index) in galleryData" :key="index" class="gallery-image">
    <img :src="image.url" />
    <p>{{ image.tags }}</p>
  </div>
  <!-- <img v-for="(image, index) in images" :key="index" :src="image" alt="Google Drive Image"> -->
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