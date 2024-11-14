import React from 'react'

const importAllImages = (requireContext) => {
    let images = {};
    requireContext.keys().forEach((item) => {
        images[item.replace('./', '')] = requireContext(item);
    });
    return images;
};

const IconHelper = {
    images:importAllImages(require.context('./images/markers', false, /\.(png|jpe?g|svg)$/)),
    default:"default.png",
    error:"unknown.png",
    getIcon :function (key){
        if(key == null || key == ""){
            key = this.default;
        }
        if(this.images.hasOwnProperty(key)){
            return this.images[key];
        }
        return this.images[this.error];
    }
}




export default IconHelper;