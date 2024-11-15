const I18nHelper = {
    translate_cn:{
        "country":"国家/地区",
        "region":"州",
        "city":"城市",
        "village":"村庄/聚落",
        "nature":"自然",
        "mountain":"山",
        "river":"水",
        "road":"道路",
        "gate":"关所",
        "airport":"飞艇坪",
        "cave":"洞穴",
        "port":"港口",
        "bridge":"桥",
        "school":"教育",
        "tower":"塔",
        "special":"特殊",
        "fake3d":"伪3D模式",
        "editor_mode":"编辑模式",
        "control_panel":"控制面板",
        "view_layer":"展示图层",
        "about":"关于",
        "fold_up":"收起",
        "trails_map":"轨迹地图",
        "zemuria_map":"塞姆利亚大陆地图",
        "version": "版本",
        "build":"构建",
        "time":"时间",
        "guidemode":"新手引导"
    },
    GetTranslateString(key){
        return this.translate_cn.hasOwnProperty(key) ? this.translate_cn[key] : key;
    }
}

export default I18nHelper;