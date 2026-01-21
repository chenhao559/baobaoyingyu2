<template>
	<view class="container">
		<view class="header">
			<text class="category-title">{{ categoryTitle }}</text>
		</view>
		
		<view class="card-container">
			<view class="card" :class="{'flip': isFlipped}" @click="flipCard">
				<view class="card-front">
					<text class="word-emoji">{{ currentWord.emoji }}</text>
					<text class="word-english">{{ currentWord.english }}</text>
					<text class="tap-hint">点击翻转</text>
				</view>
				<view class="card-back">
					<text class="word-emoji">{{ currentWord.emoji }}</text>
					<text class="word-chinese">{{ currentWord.chinese }}</text>
					<text class="word-english-small">{{ currentWord.english }}</text>
				</view>
			</view>
		</view>
		
		<view class="progress">
			<text class="progress-text">{{ currentIndex + 1 }} / {{ wordList.length }}</text>
			<view class="progress-bar">
				<view class="progress-fill" :style="{width: progressWidth}"></view>
			</view>
		</view>
		
		<view class="controls">
			<button class="btn btn-prev" @click="prevWord" :disabled="currentIndex === 0">上一个</button>
			<button class="btn btn-speak" @click="speakWord">🔊 发音</button>
			<button class="btn btn-next" @click="nextWord" :disabled="currentIndex === wordList.length - 1">下一个</button>
		</view>
	</view>
</template>

<script>
export default {
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
	onLoad(options) {
		this.type = options.type || 'words'
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
			// 在实际应用中可以使用语音合成API
			uni.showToast({
				title: `${this.currentWord.english}`,
				icon: 'none'
			})
		}
	}
}
</script>

<style scoped>
.container {
	min-height: 100vh;
	background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
	padding: 40rpx;
}

.header {
	text-align: center;
	margin-bottom: 40rpx;
}

.category-title {
	font-size: 42rpx;
	font-weight: bold;
	color: #333;
}

.card-container {
	perspective: 1000rpx;
	margin-bottom: 60rpx;
}

.card {
	width: 100%;
	height: 500rpx;
	position: relative;
	transform-style: preserve-3d;
	transition: transform 0.6s;
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
	border-radius: 30rpx;
	box-shadow: 0 10rpx 40rpx rgba(0, 0, 0, 0.15);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 40rpx;
}

.card-back {
	transform: rotateY(180deg);
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.word-emoji {
	font-size: 120rpx;
	margin-bottom: 30rpx;
}

.word-english {
	font-size: 48rpx;
	font-weight: bold;
	color: #333;
	margin-bottom: 20rpx;
}

.word-chinese {
	font-size: 48rpx;
	font-weight: bold;
	color: white;
	margin-bottom: 20rpx;
}

.word-english-small {
	font-size: 36rpx;
	color: rgba(255, 255, 255, 0.9);
}

.tap-hint {
	font-size: 24rpx;
	color: #999;
	margin-top: 20rpx;
}

.progress {
	margin-bottom: 40rpx;
}

.progress-text {
	display: block;
	text-align: center;
	font-size: 28rpx;
	color: #666;
	margin-bottom: 20rpx;
}

.progress-bar {
	width: 100%;
	height: 12rpx;
	background: rgba(255, 255, 255, 0.5);
	border-radius: 6rpx;
	overflow: hidden;
}

.progress-fill {
	height: 100%;
	background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
	border-radius: 6rpx;
	transition: width 0.3s;
}

.controls {
	display: flex;
	justify-content: space-between;
	gap: 20rpx;
}

.btn {
	flex: 1;
	height: 80rpx;
	line-height: 80rpx;
	border-radius: 40rpx;
	font-size: 28rpx;
	color: white;
	border: none;
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.btn:active {
	opacity: 0.8;
}

.btn[disabled] {
	background: #ccc;
	color: #999;
}

.btn-speak {
	background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}
</style>
