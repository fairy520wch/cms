<!-- src/components/WeatherWidget.vue -->
<template>
  <el-card shadow="hover" class="weather-widget">
    <div class="weather-header">
      <el-icon class="weather-icon">
        <Sunny />
      </el-icon>
      <div class="weather-info">
        <div class="weather-temp">{{ weather.temp }}°C</div>
        <div class="weather-desc">{{ weather.description }}</div>
        <div class="weather-city">{{weather.city}}</div>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { Sunny } from '@element-plus/icons-vue';

const weather = ref({
  temp: 0,
  description: 'Loading...',
});

const fetchWeather = async () => {
  try {
    const response = await fetch('https://restapi.amap.com/v3/weather/weatherInfo?key= &city=230103&extensions=base');
    const data = await response.json();
    if (data.status === '1' && data.lives && data.lives.length > 0) {
      weather.value.temp = data.lives[0].temperature;
      weather.value.description = data.lives[0].weather;
      weather.value.city = data.lives[0].city;

    } else {
      throw new Error('Invalid weather data');
    }
  } catch (error) {
    ElMessage.error('Failed to fetch weather data');
  }
};

onMounted(() => {
  fetchWeather();
});
</script>

<style scoped>
.weather-widget {
  display: flex;
  align-items: center;
  padding: 20px;
}

.weather-header {
  display: flex;
  align-items: center;
}

.weather-icon {
  font-size: 50px;
  margin-right: 20px;
}

.weather-info {
  text-align: left;
}

.weather-temp {
  font-size: 30px;
  font-weight: bold;
}

.weather-desc {
  font-size: 14px;
  color: #999;
}
</style>