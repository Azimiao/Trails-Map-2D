export default function ImageLoadingPlugin() {
    return {
        viewerEffect({ markdownBody }) {
            const imgs = [...markdownBody.querySelectorAll('img')].filter((e) => !e.closest('a'));
            if (imgs.length === 0) {
                return;
            }
            
            imgs.forEach(img => {
                if(img.complete){
                    return;
                } 
                // 创建骨架占位符
                const placeholder = document.createElement("div");
                placeholder.className = "image-placeholder";
                // placeholder.style.width = `${img.offsetWidth || 200}px`;
                // placeholder.style.height = `${img.offsetHeight || 150}px`;
                placeholder.style.width = `100%`;
                placeholder.style.height = `180px`;
                placeholder.style.background = "#f0f0f0";
                placeholder.style.borderRadius = "5px";
                placeholder.style.display = "inline-block";

                // 隐藏图片，插入骨架
                img.style.display = "none";
                img.parentNode.insertBefore(placeholder, img);

                // 图片加载完成的处理
                img.onload = () => {
                    placeholder.remove();
                    img.style.display = "inline";
                };

                // 图片加载失败的处理
                img.onerror = () => {
                    placeholder.style.background = "#ffeded"; // 加载失败显示红色背景
                };
            });
        }
    }
}
