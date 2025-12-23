import { onMounted } from 'vue'

// 粒子动画核心函数（可配置参数）
export function initParticleTheme(options: {
  particleCount?: number,   // 粒子数量
  particleSize?: [number, number], // 粒子大小范围 [最小, 最大]
  speed?: number,           // 粒子速度（±speed/帧）
  color?: string,           // 粒子颜色
  opacity?: number          // 整体透明度
} = {}) {
  // 默认配置
  const config = {
    particleCount: options.particleCount || 150,
    particleSize: options.particleSize || [0.5, 2.5],
    speed: options.speed || 0.25,
    color: options.color || '#22d3ee',
    opacity: options.opacity || 0.2
  }
  console.log('AI Dark Theme config', config);

  function createParticles() {
    console.log('createParticles_');
    // 为每个幻灯片创建canvas背景
    // const slides = document.querySelectorAll('.slidev-slide')
    const slides = document.querySelectorAll(/*'#page-root'*/'#slideshow')
    console.log('AI Dark Theme slides', slides);
    slides.forEach((slide, index) => {
      // 创建canvas元素
      const canvas = document.createElement('canvas')
      canvas.id = `particle-canvas-${index}`
      canvas.className = 'particle-bg'
      canvas.style.opacity = config.opacity.toString()
      slide.appendChild(canvas)

      // 初始化canvas尺寸
      const ctx = canvas.getContext('2d')!
      function resizeCanvas() {
        canvas.width = slide.clientWidth
        canvas.height = slide.clientHeight
      }
      resizeCanvas()
      window.addEventListener('resize', resizeCanvas)

      // 创建粒子数组
      const particles = Array(config.particleCount).fill().map(() => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * (config.particleSize[1] - config.particleSize[0]) + config.particleSize[0],
        speedX: Math.random() * config.speed * 2 - config.speed,
        speedY: Math.random() * config.speed * 2 - config.speed,
        color: config.color
      }))

      // 粒子动画循环
      function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        particles.forEach(p => {
          // 更新位置
          p.x += p.speedX
          p.y += p.speedY

          // 边界反弹
          if (p.x < 0 || p.x > canvas.width) p.speedX *= -1
          if (p.y < 0 || p.y > canvas.height) p.speedY *= -1

          // 绘制粒子
          ctx.fillStyle = p.color
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          ctx.fill()
        })
        requestAnimationFrame(animate)
      }
      animate()
    })
  }

  window.createParticles = createParticles;

}

// 全局挂载粒子动画（默认配置）
initParticleTheme()

