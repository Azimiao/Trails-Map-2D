const importAllBGM = (requireContext) => {
    let bgm = [
        {
            title: "風を共に舞う気持ち",
            url:"https://book.trails-game.com/bgms/sora-fc/風を共に舞う気持ち.mp3",
        },
        {
            title: "晴れ渡る空に",
            url:"https://book.trails-game.com/bgms/sen4/In-a-Clear-Sky.mp3",
        },
        {
            title: "託されたもの",
            url:"https://book.trails-game.com/bgms/sen3/Things-Entrusted.mp3",
        }
    ];
    requireContext.keys().forEach((item,index) => {
        var a = item.replace('./','');
        a = a.substring(0, a.indexOf(".")) || a;

        bgm.push({
            title: a,
            url: requireContext(item)
        })
    });
    return bgm;
};

const BGMHelper = {
    bgm:importAllBGM(require.context('./bgm', false, /\.(mp3|ogg)$/)),
}

export default BGMHelper;