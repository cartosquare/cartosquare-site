var editorIDList = [
    "editor_top",
    "editor_admin",
    "editor_amenity",
    "editor_barriers",
    "editor_buildings",
    "editor_landcover",
    "editor_roads",
    "editor_text",
    "editor_water",
    "editor_others"
];

var editorDefaultValues = [
    editor_top_default,
    editor_admin_default,
    editor_amenity_default,
    editor_barriers_default,
    editor_buildings_default,
    editor_landcover_default,
    editor_roads_default,
    editor_text_default,
    editor_water_default,
    editor_others_default
];

var classPathList = [
    "class-top.json",
    "class-admin.json",
    "class-amenity.json",
    "class-barriers.json",
    "class-buildings.json",
    "class-landcover.json",
    "class-roads.json",
    "class-text.json",
    "class-water.json",
    "class-others.json"
]

var defaultValues = {};
var editors = {};

JSONEditor.defaults.options.theme = 'bootstrap3';
JSONEditor.defaults.options.iconlib = "bootstrap3";

// create all the editor panels
for (var i = 0; i < editorIDList.length; ++i) {
    editors[editorIDList[i]] = new JSONEditor(document.getElementById(editorIDList[i]), {
        // Enable fetching schemas via ajax
        ajax: true,

        // The schema for the editor
        schema: {
            $ref: "/assets/schemas/" + editorIDList[i] + ".json",
            //format: "grid" // or normal
            format: "normal"
        },

        // Seed the form with a starting value
        startval: editorDefaultValues[i],

        // Disable additional properties
        no_additional_properties: true,

        // Require all properties by default
        required_by_default: true,

        disable_edit_json: true,

        disable_properties: true
    });
}

// validate
var indicatorList = {};
for (var i = 0; i < editorIDList.length; ++i) {
    // Hook up the validation indicator to update its
    // status whenever the editor changes
    var editor = editors[editorIDList[i]];
    editor.on('change', function () {
        // Get an array of errors from the validator
        var errors = editor.validate();
        var indicator = document.getElementById('valid_indicator');

        // Not valid
        if (errors.length) {
            indicatorList[editorIDList[i]] = false;
        }
        // Valid
        else {
            indicatorList[editorIDList[i]] = true;
        }

        var hasError = false;
        for (k in indicatorList) {
            if (!indicatorList[k]) {
                indicator.className = 'label label-warning';
                indicator.textContent = 'not valid';
                hasError = true;
            }
        }
        if (!hasError) {
            indicator.className = 'label label-success';
            indicator.textContent = 'valid';
        }
    });
}

// Hook up the submit button to log to the console
document.getElementById('submit').addEventListener('click', function () {
    // Get the value from the editor
    for (var i = 0; i < editorIDList.length; ++i) {
        var editor = editors[editorIDList[i]];
        var style;
        if (i == 0) {
            style = mapStyle.getTopStyle(editor.getValue());
        } else {
            style = mapStyle.getCommonStyle(editor.getValue());
        }

        console.log('write file: ' + classPathList[i]);
        fs.writeFileSync('./map/includes/' + classPathList[i], JSON.stringify(style));
    }
});

// Hook up the Restore to Default button
document.getElementById('restore').addEventListener('click', function () {
    for (var i = 0; i < editorIDList.length; ++i) {
        editors[editorIDList[i]].setValue(editorDefaultValues[i]);
    }
});

/*
$('a#pannel').click(function() {
    if($("div#editors").is(":hidden")){
       $("div#editors").show();
       $("div#map-container").width("60%");
    } else {
      $("div#editors").hide(); 
      $("div#map-container").width("100%");
    }
});
*/




