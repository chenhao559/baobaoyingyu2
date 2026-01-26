<template>
  <div class="container">
    <div class="header">
      <button class="btn-back" @click="$router.back()">← 返回</button>
      <h2 class="category-title">{{ categoryTitle }}</h2>
    </div>
    
    <div class="card-container">
      <div class="card" :class="{'flip': isFlipped}" @click="flipCard">
        <div class="card-front">
          <span class="word-emoji">{{ currentWord.emoji }}</span>
          <h3 class="word-english">{{ currentWord.english }}</h3>
          <p class="tap-hint">点击翻转</p>
        </div>
        <div class="card-back">
          <span class="word-emoji">{{ currentWord.emoji }}</span>
          <h3 class="word-chinese">{{ currentWord.chinese }}</h3>
          <p class="word-english-small">{{ currentWord.english }}</p>
        </div>
      </div>
    </div>
    
    <div class="progress">
      <p class="progress-text">{{ currentIndex + 1 }} / {{ wordList.length }}</p>
      <div class="progress-bar">
        <div class="progress-fill" :style="{width: progressWidth}"></div>
      </div>
    </div>
    
    <div class="controls">
      <button class="btn btn-prev" @click="prevWord" :disabled="currentIndex === 0">上一个</button>
      <button class="btn btn-speak" @click="speakWord">🔊 发音</button>
      <button class="btn btn-next" @click="nextWord" :disabled="currentIndex === wordList.length - 1">下一个</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Learn',
  data() {
    return {
      type: '',
      categoryTitle: '',
      currentIndex: 0,
      isFlipped: false,
      wordList: [],
      allWords: {
        words: [
          { english: 'Hello', chinese: '你好', emoji: '👋' },
          { english: 'Thank you', chinese: '谢谢', emoji: '🙏' },
          { english: 'Goodbye', chinese: '再见', emoji: '👋' },
          { english: 'Please', chinese: '请', emoji: '🙂' },
          { english: 'Sorry', chinese: '对不起', emoji: '😢' }
        ],
        animals: [
          { english: 'Dog', chinese: '狗', emoji: '🐶' },
          { english: 'Cat', chinese: '猫', emoji: '🐱' },
          { english: 'Bird', chinese: '鸟', emoji: '🐦' },
          { english: 'Fish', chinese: '鱼', emoji: '🐟' },
          { english: 'Rabbit', chinese: '兔子', emoji: '🐰' },
          { english: 'Elephant', chinese: '大象', emoji: '🐘' },
          { english: 'Lion', chinese: '狮子', emoji: '🦁' },
          { english: 'Monkey', chinese: '猴子', emoji: '🐵' }
        ],
        colors: [
          { english: 'Red', chinese: '红色', emoji: '🔴' },
          { english: 'Blue', chinese: '蓝色', emoji: '🔵' },
          { english: 'Green', chinese: '绿色', emoji: '🟢' },
          { english: 'Yellow', chinese: '黄色', emoji: '🟡' },
          { english: 'Orange', chinese: '橙色', emoji: '🟠' },
          { english: 'Purple', chinese: '紫色', emoji: '🟣' },
          { english: 'Pink', chinese: '粉色', emoji: '💗' },
          { english: 'Brown', chinese: '棕色', emoji: '🟤' }
        ],
        numbers: [
          { english: 'One', chinese: '一', emoji: '1️⃣' },
          { english: 'Two', chinese: '二', emoji: '2️⃣' },
          { english: 'Three', chinese: '三', emoji: '3️⃣' },
          { english: 'Four', chinese: '四', emoji: '4️⃣' },
          { english: 'Five', chinese: '五', emoji: '5️⃣' },
          { english: 'Six', chinese: '六', emoji: '6️⃣' },
          { english: 'Seven', chinese: '七', emoji: '7️⃣' },
          { english: 'Eight', chinese: '八', emoji: '8️⃣' },
          { english: 'Nine', chinese: '九', emoji: '9️⃣' },
          { english: 'Ten', chinese: '十', emoji: '🔟' }
        ],
        fruits: [
          { english: 'Apple', chinese: '苹果', emoji: '🍎' },
          { english: 'Banana', chinese: '香蕉', emoji: '🍌' },
          { english: 'Orange', chinese: '橙子', emoji: '🍊' },
          { english: 'Grape', chinese: '葡萄', emoji: '🍇' },
          { english: 'Strawberry', chinese: '草莓', emoji: '🍓' },
          { english: 'Watermelon', chinese: '西瓜', emoji: '🍉' },
          { english: 'Tomato', chinese: '番茄', emoji: '🍅' },
          { english: 'Carrot', chinese: '胡萝卜', emoji: '🥕' }
        ]
      }
    }
  },
  computed: {
    currentWord() {
      return this.wordList[this.currentIndex] || { english: '', chinese: '', emoji: '' }
    },
    progressWidth() {
      return ((this.currentIndex + 1) / this.wordList.length * 100) + '%'
    }
  },
  mounted() {
    this.type = this.$route.query.type || 'words'
    this.loadWords()
  },
  methods: {
    loadWords() {
      const titles = {
        words: '常用单词',
        animals: '动物世界',
        colors: '颜色认知',
        numbers: '数字乐园',
        fruits: '水果蔬菜'
      }
      this.categoryTitle = titles[this.type] || '学习卡片'
      this.wordList = this.allWords[this.type] || []
    },
    flipCard() {
      this.isFlipped = !this.isFlipped
    },
    prevWord() {
      if (this.currentIndex > 0) {
        this.currentIndex--
        this.isFlipped = false
      }
    },
    nextWord() {
      if (this.currentIndex < this.wordList.length - 1) {
        this.currentIndex++
        this.isFlipped = false
      }
    },
    speakWord() {
      alert(`发音: ${this.currentWord.english}`)
    }
  }
}
</script>

<style scoped>
.container {
  min-height: 100vh;
  background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
  padding: 40px 30px;
}

.header {
  text-align: center;
  margin-bottom: 40px;
  position: relative;
}

.btn-back {
  position: absolute;
  left: 0;
  top: 0;
  padding: 8px 16px;
  background: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
}

.btn-back:hover {
  background: #f0f0f0;
}

.category-title {
  font-size: 32px;
  font-weight: bold;
  color: #333;
}

.card-container {
  perspective: 1000px;
  margin-bottom: 60px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.card {
  width: 100%;
  height: 400px;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s;
  cursor: pointer;
}

.card.flip {
  transform: rotateY(180deg);
}

.card-front, .card-back {
  width: 100%;
  height: 100%;
  position: absolute;
  backface-visibility: hidden;
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px;
}

.card-back {
  transform: rotateY(180deg);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.word-emoji {
  font-size: 100px;
  margin-bottom: 30px;
}

.word-english {
  font-size: 42px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
}

.word-chinese {
  font-size: 42px;
  font-weight: bold;
  color: white;
  margin-bottom: 20px;
}

.word-english-small {
  font-size: 28px;
  color: rgba(255, 255, 255, 0.9);
}

.tap-hint {
  font-size: 14px;
  color: #999;
  margin-top: 20px;
}

.progress {
  margin-bottom: 40px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.progress-text {
  display: block;
  text-align: center;
  font-size: 18px;
  color: #666;
  margin-bottom: 20px;
}

.progress-bar {
  width: 100%;
  height: 10px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 5px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  border-radius: 5px;
  transition: width 0.3s;
}

.controls {
  display: flex;
  justify-content: center;
  gap: 15px;
  max-width: 600px;
  margin: 0 auto;
}

.btn {
  flex: 1;
  max-width: 180px;
  height: 50px;
  border-radius: 25px;
  font-size: 16px;
  color: white;
  border: none;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  cursor: pointer;
  transition: all 0.3s;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

.btn:active {
  transform: translateY(0);
}

.btn:disabled {
  background: #ccc;
  color: #999;
  cursor: not-allowed;
}

.btn:disabled:hover {
  transform: none;
  box-shadow: none;
}

.btn-speak {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.btn-speak:hover {
  box-shadow: 0 5px 15px rgba(240, 147, 251, 0.4);
}

@media (max-width: 768px) {
  .card {
    height: 350px;
  }
  
  .word-emoji {
    font-size: 80px;
  }
  
  .word-english, .word-chinese {
    font-size: 32px;
  }
  
  .controls {
    flex-wrap: wrap;
  }
  
  .btn {
    max-width: none;
  }
}
</style>
