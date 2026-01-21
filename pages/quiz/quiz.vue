<template>
	<view class="container">
		<view class="header">
			<text class="title">趣味练习</text>
			<view class="score-board">
				<text class="score">得分: {{ score }}</text>
			</view>
		</view>
		
		<view class="question-area" v-if="!gameOver">
			<view class="question">
				<text class="question-emoji">{{ currentQuestion.emoji }}</text>
				<text class="question-text">这是什么？</text>
				<text class="question-word">{{ currentQuestion.chinese }}</text>
			</view>
			
			<view class="options">
				<view 
					v-for="(option, index) in currentQuestion.options" 
					:key="index"
					class="option-item"
					:class="getOptionClass(option)"
					@click="selectOption(option)"
				>
					<text class="option-text">{{ option }}</text>
				</view>
			</view>
		</view>
		
		<view class="result-area" v-if="gameOver">
			<text class="result-emoji">{{ score >= 6 ? '🎉' : '💪' }}</text>
			<text class="result-title">{{ score >= 6 ? '太棒了!' : '继续加油!' }}</text>
			<text class="result-score">你的得分: {{ score }}/10</text>
			<button class="btn-restart" @click="restartGame">再玩一次</button>
		</view>
		
		<view class="progress" v-if="!gameOver">
			<text class="progress-text">第 {{ currentQuestionIndex + 1 }} / 10 题</text>
		</view>
	</view>
</template>

<script>
export default {
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
	onLoad() {
		this.generateQuestions()
	},
	methods: {
		generateQuestions() {
			// 随机选择10个单词作为题目
			const shuffled = [...this.allWords].sort(() => 0.5 - Math.random())
			this.questions = shuffled.slice(0, 10).map(word => {
				// 生成错误选项
				const wrongOptions = this.allWords
					.filter(w => w.english !== word.english)
					.sort(() => 0.5 - Math.random())
					.slice(0, 3)
					.map(w => w.english)
				
				// 混合正确答案和错误选项
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
				uni.showToast({
					title: '太棒了! 🎉',
					icon: 'success'
				})
			} else {
				uni.showToast({
					title: '再想想哦 😊',
					icon: 'none'
				})
			}
			
			// 延迟后进入下一题
			setTimeout(() => {
				if (this.currentQuestionIndex < this.questions.length - 1) {
					this.currentQuestionIndex++
					this.selectedOption = ''
					this.answered = false
				} else {
					this.gameOver = true
				}
			}, 1500)
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
	padding: 40rpx;
}

.header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 40rpx;
}

.title {
	font-size: 42rpx;
	font-weight: bold;
	color: #333;
}

.score-board {
	background: white;
	padding: 15rpx 30rpx;
	border-radius: 40rpx;
	box-shadow: 0 4rpx 15rpx rgba(0, 0, 0, 0.1);
}

.score {
	font-size: 28rpx;
	font-weight: bold;
	color: #667eea;
}

.question-area {
	background: white;
	border-radius: 30rpx;
	padding: 60rpx 40rpx;
	box-shadow: 0 10rpx 40rpx rgba(0, 0, 0, 0.1);
	margin-bottom: 40rpx;
}

.question {
	text-align: center;
	margin-bottom: 60rpx;
}

.question-emoji {
	display: block;
	font-size: 120rpx;
	margin-bottom: 30rpx;
}

.question-text {
	display: block;
	font-size: 32rpx;
	color: #666;
	margin-bottom: 15rpx;
}

.question-word {
	display: block;
	font-size: 42rpx;
	font-weight: bold;
	color: #333;
}

.options {
	display: flex;
	flex-direction: column;
	gap: 20rpx;
}

.option-item {
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	padding: 30rpx;
	border-radius: 20rpx;
	text-align: center;
	transition: all 0.3s;
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
}

.option-text {
	font-size: 36rpx;
	font-weight: bold;
	color: white;
}

.result-area {
	text-align: center;
	background: white;
	border-radius: 30rpx;
	padding: 80rpx 40rpx;
	box-shadow: 0 10rpx 40rpx rgba(0, 0, 0, 0.1);
}

.result-emoji {
	display: block;
	font-size: 150rpx;
	margin-bottom: 30rpx;
}

.result-title {
	display: block;
	font-size: 48rpx;
	font-weight: bold;
	color: #333;
	margin-bottom: 20rpx;
}

.result-score {
	display: block;
	font-size: 36rpx;
	color: #667eea;
	margin-bottom: 40rpx;
}

.btn-restart {
	width: 300rpx;
	height: 80rpx;
	line-height: 80rpx;
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	color: white;
	border-radius: 40rpx;
	font-size: 32rpx;
	border: none;
}

.btn-restart:active {
	opacity: 0.8;
}

.progress {
	text-align: center;
}

.progress-text {
	font-size: 28rpx;
	color: #666;
}
</style>
