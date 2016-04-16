function getTopStyle(style) {
    var topStyle = {
        "data_sources_files": [
            "datasource.json"
        ],
        "classes_files": [
            "class-lod.json",
            "class-admin.json",
            "class-landcover.json",
            "class-water.json",
            "class-roads.json",
            "class-barriers.json",
            "class-buildings.json",
            "class-amenity.json",
            "class-text.json",
            "class-others.json"
        ],
        "icon": "icons/",
        "include": '../user-maps/' + mapid + '/',
        "layers_files": []
    };

    var rgbColor = hexToRgb(style.background_color);
    topStyle.background_color = [rgbColor.r, rgbColor.g, rgbColor.b];

    for (var i = 0; i < style.layers_files.length; ++i) {
        topStyle.layers_files.push(style.layers_files[i].name)
    }

    return topStyle;
};

function getCommonStyle(style) {
    var commonStyle = {};
    commonStyle.classes = {};

    for (k in style) {
        // k is a rule, for example world
        commonStyle.classes[k] = {};

        for (kk in style[k]) {
            // kk is a attribute, for example line_color
            if (kk == 'fill_color' || kk == 'outline_color' || kk == 'line_color' || kk == 'label_text_color') {
                var rgbColor = hexToRgb(style[k][kk]);
                commonStyle.classes[k][kk] = [rgbColor.r, rgbColor.g, rgbColor.b];
            } else {
                commonStyle.classes[k][kk] = style[k][kk];
            }
        }
    }

    return commonStyle;
}