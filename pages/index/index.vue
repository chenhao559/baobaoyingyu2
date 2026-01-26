<template>
	<view class="container">
		<view class="header">
			<image class="logo" src="/static/logo.png" mode="aspectFit"></image>
			<text class="title">宝宝学英语</text>
			<text class="subtitle">快乐学习，轻松成长</text>
		</view>
		
		<view class="category-list">
			<view 
				v-for="(item, index) in categories" 
				:key="index" 
				class="category-item"
				:style="{backgroundColor: item.color}"
				@click="goToPage(item)"
			>
				<text class="category-icon">{{ item.icon }}</text>
				<text class="category-name">{{ item.name }}</text>
				<text class="category-desc">{{ item.desc }}</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			categories: [
				{
					name: '单词学习',
					desc: '学习常见单词',
					icon: '📚',
					color: '#FFE4E1',
					page: '/pages/learn/learn',
					type: 'words'
				},
				{
					name: '趣味练习',
					desc: '巩固所学知识',
					icon: '🎮',
					color: '#E0F7FA',
					page: '/pages/quiz/quiz',
					type: 'quiz'
				},
				{
					name: '动物世界',
					desc: '认识动物朋友',
					icon: '🐶',
					color: '#FFF9C4',
					page: '/pages/learn/learn',
					type: 'animals'
				},
				{
					name: '颜色认知',
					desc: '学习各种颜色',
					icon: '🎨',
					color: '#E1BEE7',
					page: '/pages/learn/learn',
					type: 'colors'
				},
				{
					name: '数字乐园',
					desc: '学习英文数字',
					icon: '🔢',
					color: '#C8E6C9',
					page: '/pages/learn/learn',
					type: 'numbers'
				},
				{
					name: '水果蔬菜',
					desc: '认识水果蔬菜',
					icon: '🍎',
					color: '#FFCCBC',
					page: '/pages/learn/learn',
					type: 'fruits'
				}
			]
		}
	},
	methods: {
		goToPage(item) {
			uni.navigateTo({
				url: `${item.page}?type=${item.type}`
			})
		}
	}
}
</script>

<style scoped>
.container {
	min-height: 100vh;
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	padding: 40rpx 30rpx;
}

.header {
	text-align: center;
	margin-bottom: 60rpx;
	padding: 40rpx 0;
}

.logo {
	width: 150rpx;
	height: 150rpx;
	margin-bottom: 20rpx;
}

.title {
	display: block;
	font-size: 48rpx;
	font-weight: bold;
	color: #ffffff;
	margin-bottom: 10rpx;
}

.subtitle {
	display: block;
	font-size: 28rpx;
	color: rgba(255, 255, 255, 0.9);
}

.category-list {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
}

.category-item {
	width: 330rpx;
	height: 200rpx;
	border-radius: 20rpx;
	margin-bottom: 30rpx;
	padding: 30rpx;
	box-shadow: 0 8rpx 20rpx rgba(0, 0, 0, 0.1);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	transition: all 0.3s;
}

.category-item:active {
	transform: scale(0.95);
	box-shadow: 0 4rpx 10rpx rgba(0, 0, 0, 0.15);
}

.category-icon {
	font-size: 60rpx;
	margin-bottom: 15rpx;
}

.category-name {
	font-size: 32rpx;
	font-weight: bold;
	color: #333;
	margin-bottom: 8rpx;
}

.category-desc {
	font-size: 24rpx;
	color: #666;
}
</style>
