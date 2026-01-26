<template>
  <div class="container">
    <div class="header">
      <button class="btn-back" @click="$router.back()">← 返回</button>
      <h2 class="title">趣味练习</h2>
      <div class="score-board">
        <span class="score">得分: {{ score }}</span>
      </div>
    </div>
    
    <div class="question-area" v-if="!gameOver">
      <div class="question">
        <span class="question-emoji">{{ currentQuestion.emoji }}</span>
        <p class="question-text">这是什么？</p>
        <h3 class="question-word">{{ currentQuestion.chinese }}</h3>
      </div>
      
      <div class="options">
        <div 
          v-for="(option, index) in currentQuestion.options" 
          :key="index"
          class="option-item"
          :class="getOptionClass(option)"
          @click="selectOption(option)"
        >
          <span class="option-text">{{ option }}</span>
        </div>
      </div>
    </div>
    
    <div class="result-area" v-if="gameOver">
      <span class="result-emoji">{{ score >= 6 ? '🎉' : '💪' }}</span>
      <h2 class="result-title">{{ score >= 6 ? '太棒了!' : '继续加油!' }}</h2>
      <p class="result-score">你的得分: {{ score }}/10</p>
      <button class="btn-restart" @click="restartGame">再玩一次</button>
    </div>
    
    <div class="progress" v-if="!gameOver">
      <p class="progress-text">第 {{ currentQuestionIndex + 1 }} / 10 题</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Quiz',
  data() {
    return {
      score: 0,
      currentQuestionIndex: 0,
      selectedOption: '',
      answered: false,
      gameOver: false,
      questions: [],
      allWords: [
        { english: 'Dog', chinese: '狗', emoji: '🐶' },
        { english: 'Cat', chinese: '猫', emoji: '🐱' },
        { english: 'Bird', chinese: '鸟', emoji: '🐦' },
        { english: 'Fish', chinese: '鱼', emoji: '🐟' },
        { english: 'Rabbit', chinese: '兔子', emoji: '🐰' },
        { english: 'Apple', chinese: '苹果', emoji: '🍎' },
        { english: 'Banana', chinese: '香蕉', emoji: '🍌' },
        { english: 'Orange', chinese: '橙子', emoji: '🍊' },
        { english: 'Red', chinese: '红色', emoji: '🔴' },
        { english: 'Blue', chinese: '蓝色', emoji: '🔵' },
        { english: 'Green', chinese: '绿色', emoji: '🟢' },
        { english: 'Yellow', chinese: '黄色', emoji: '🟡' },
        { english: 'One', chinese: '一', emoji: '1️⃣' },
        { english: 'Two', chinese: '二', emoji: '2️⃣' },
        { english: 'Three', chinese: '三', emoji: '3️⃣' },
        { english: 'Four', chinese: '四', emoji: '4️⃣' }
      ]
    }
  },
  computed: {
    currentQuestion() {
      return this.questions[this.currentQuestionIndex] || { emoji: '', chinese: '', answer: '', options: [] }
    }
  },
  mounted() {
    this.generateQuestions()
  },
  methods: {
    generateQuestions() {
      const shuffled = [...this.allWords].sort(() => 0.5 - Math.random())
      this.questions = shuffled.slice(0, 10).map(word => {
        const wrongOptions = this.allWords
          .filter(w => w.english !== word.english)
          .sort(() => 0.5 - Math.random())
          .slice(0, 3)
          .map(w => w.english)
        
        const options = [word.english, ...wrongOptions].sort(() => 0.5 - Math.random())
        
        return {
          emoji: word.emoji,
          chinese: word.chinese,
          answer: word.english,
          options: options
        }
      })
    },
    selectOption(option) {
      if (this.answered) return
      
      this.selectedOption = option
      this.answered = true
      
      if (option === this.currentQuestion.answer) {
        this.score++
        alert('太棒了! 🎉')
      } else {
        alert('再想想哦 😊')
      }
      
      setTimeout(() => {
        if (this.currentQuestionIndex < this.questions.length - 1) {
          this.currentQuestionIndex++
          this.selectedOption = ''
          this.answered = false
        } else {
          this.gameOver = true
        }
      }, 1000)
    },
    getOptionClass(option) {
      if (!this.answered) return ''
      if (option === this.currentQuestion.answer) return 'correct'
      if (option === this.selectedOption) return 'wrong'
      return 'disabled'
    },
    restartGame() {
      this.score = 0
      this.currentQuestionIndex = 0
      this.selectedOption = ''
      this.answered = false
      this.gameOver = false
      this.generateQuestions()
    }
  }
}
</script>

<style scoped>
.container {
  min-height: 100vh;
  background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
  padding: 40px 30px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  position: relative;
}

.btn-back {
  position: absolute;
  left: 0;
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

.title {
  font-size: 32px;
  font-weight: bold;
  color: #333;
  flex: 1;
  text-align: center;
}

.score-board {
  background: white;
  padding: 10px 20px;
  border-radius: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.score {
  font-size: 18px;
  font-weight: bold;
  color: #667eea;
}

.question-area {
  background: white;
  border-radius: 20px;
  padding: 50px 30px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  margin-bottom: 40px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.question {
  text-align: center;
  margin-bottom: 50px;
}

.question-emoji {
  display: block;
  font-size: 100px;
  margin-bottom: 30px;
}

.question-text {
  font-size: 20px;
  color: #666;
  margin-bottom: 15px;
}

.question-word {
  font-size: 36px;
  font-weight: bold;
  color: #333;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.option-item {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
  border-radius: 15px;
  text-align: center;
  transition: all 0.3s;
  cursor: pointer;
}

.option-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
}

.option-item:active {
  transform: scale(0.98);
}

.option-item.correct {
  background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
}

.option-item.wrong {
  background: linear-gradient(135deg, #eb3349 0%, #f45c43 100%);
}

.option-item.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.option-item.disabled:hover {
  transform: none;
  box-shadow: none;
}

.option-text {
  font-size: 24px;
  font-weight: bold;
  color: white;
}

.result-area {
  text-align: center;
  background: white;
  border-radius: 20px;
  padding: 60px 40px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: 0 auto;
}

.result-emoji {
  display: block;
  font-size: 120px;
  margin-bottom: 30px;
}

.result-title {
  font-size: 42px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
}

.result-score {
  font-size: 28px;
  color: #667eea;
  margin-bottom: 40px;
}

.btn-restart {
  width: 200px;
  height: 50px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 25px;
  font-size: 20px;
  border: none;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-restart:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
}

.btn-restart:active {
  transform: translateY(0);
}

.progress {
  text-align: center;
}

.progress-text {
  font-size: 18px;
  color: #666;
}

@media (max-width: 768px) {
  .header {
    flex-wrap: wrap;
  }
  
  .title {
    order: -1;
    width: 100%;
    margin-bottom: 15px;
  }
  
  .btn-back {
    position: static;
  }
  
  .question-emoji {
    font-size: 80px;
  }
  
  .question-word {
    font-size: 28px;
  }
  
  .option-text {
    font-size: 20px;
  }
}
</style>
