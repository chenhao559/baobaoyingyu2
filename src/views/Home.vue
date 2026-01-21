<template>
  <div class="container">
    <div class="header">
      <div class="logo">📚</div>
      <h1 class="title">宝宝学英语</h1>
      <p class="subtitle">快乐学习,轻松成长</p>
    </div>
    
    <div class="category-list">
      <div 
        v-for="(item, index) in categories" 
        :key="index" 
        class="category-item"
        :style="{backgroundColor: item.color}"
        @click="goToPage(item)"
      >
        <span class="category-icon">{{ item.icon }}</span>
        <h3 class="category-name">{{ item.name }}</h3>
        <p class="category-desc">{{ item.desc }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      categories: [
        {
          name: '单词学习',
          desc: '学习常见单词',
          icon: '📚',
          color: '#FFE4E1',
          page: 'Learn',
          type: 'words'
        },
        {
          name: '趣味练习',
          desc: '巩固所学知识',
          icon: '🎮',
          color: '#E0F7FA',
          page: 'Quiz',
          type: 'quiz'
        },
        {
          name: '动物世界',
          desc: '认识动物朋友',
          icon: '🐶',
          color: '#FFF9C4',
          page: 'Learn',
          type: 'animals'
        },
        {
          name: '颜色认知',
          desc: '学习各种颜色',
          icon: '🎨',
          color: '#E1BEE7',
          page: 'Learn',
          type: 'colors'
        },
        {
          name: '数字乐园',
          desc: '学习英文数字',
          icon: '🔢',
          color: '#C8E6C9',
          page: 'Learn',
          type: 'numbers'
        },
        {
          name: '水果蔬菜',
          desc: '认识水果蔬菜',
          icon: '🍎',
          color: '#FFCCBC',
          page: 'Learn',
          type: 'fruits'
        }
      ]
    }
  },
  methods: {
    goToPage(item) {
      this.$router.push({
        name: item.page,
        query: { type: item.type }
      })
    }
  }
}
</script>

<style scoped>
.container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 40px 30px;
}

.header {
  text-align: center;
  margin-bottom: 60px;
  padding: 40px 0;
}

.logo {
  font-size: 80px;
  margin-bottom: 20px;
}

.title {
  display: block;
  font-size: 36px;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 10px;
}

.subtitle {
  display: block;
  font-size: 18px;
  color: rgba(255, 255, 255, 0.9);
}

.category-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 800px;
  margin: 0 auto;
}

.category-item {
  width: 45%;
  min-height: 150px;
  border-radius: 15px;
  margin-bottom: 20px;
  padding: 25px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 0.3s;
  cursor: pointer;
}

.category-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
}

.category-item:active {
  transform: scale(0.95);
}

.category-icon {
  font-size: 50px;
  margin-bottom: 12px;
}

.category-name {
  font-size: 22px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
}

.category-desc {
  font-size: 14px;
  color: #666;
}

@media (max-width: 768px) {
  .category-item {
    width: 48%;
    min-height: 120px;
    padding: 20px;
  }
  
  .category-icon {
    font-size: 40px;
  }
  
  .category-name {
    font-size: 18px;
  }
  
  .category-desc {
    font-size: 12px;
  }
}
</style>
