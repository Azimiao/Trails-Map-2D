# 页面分类
 - 编辑模式
    - Layer 编辑
        - 国家
        - 区域/地区/(XX 州)
        - 城镇
        - 关卡/关口        
        - 公路/铁路
        - 山川
        - 河流
        - 特殊

    - Marker 编辑
        - Type: Layer
        - Icon:  
        - ShowLabel = true(Only Country and region show Label,or show always?)//add a option: show all text ?
        - Title：
        - Content
            - Text
            - URL
            - Image


    - 导出
    ```json
    Layers:
    [
        {"Id":"country"},
        {"Id":"region"},
        {"Id":"town"},
        {"Id":"road"},
        {"Id":""}
        {"Id":"mountain"},
        {"Id":"river"},
        {"Id":"special"},
    ]
    {
        "LayerId":0,
        "Icon": "", //null use default icon
        "Title":"",
        "Content": "",//rich html
        "EditableContent":"origin text edit able component needed",
    }
    ```


 - 展示模式
    每种 Layer 有自己独特的模板
    - Country
        - 大尺寸
        - 大图标
        - 文字外显
    - 区域/地区
        - 中尺寸
        - 中图标
        - 文字外显
    - 城镇、自然景观、道路、特殊
        - 小尺寸
        - 小图标
        - 文字默认不显
        - 图标不同

    - Layer
    - Marker
        - Icon
        - Title
        - Content