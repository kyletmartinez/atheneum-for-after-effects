/**
 * @name Atheneum
 * @version 1.0.2
 * @author Kyle Martinez <www.kyle-martinez.com>
 *
 * @description A 3rd-party script library and launcher for After Effects.
 *
 * @license This script is provided "as is," without warranty of any kind, expressed or implied. In
 * no event shall the author be held liable for any damages arising in any way from the use of this
 * script.
 *
 * I'm just trying to help make life as an After Effects animator a little easier.
 */

(function Atheneum(thisObj) {

    "object"!=typeof JSON&&(JSON={}),function(){var rx_one=/^[\],:{}\s]*$/,rx_two=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,rx_three=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,rx_four=/(?:^|:|,)(?:\s*\[)+/g,rx_escapable=/[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,rx_dangerous=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta,rep;function f(t){return t<10?"0"+t:t}function this_value(){return this.valueOf()}function quote(t){return rx_escapable.lastIndex=0,rx_escapable.test(t)?'"'+t.replace(rx_escapable,(function(t){var e=meta[t];return"string"==typeof e?e:"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)}))+'"':'"'+t+'"'}function str(t,e){var r,n,o,u,f,a=gap,i=e[t];switch(i&&"object"==typeof i&&"function"==typeof i.toJSON&&(i=i.toJSON(t)),"function"==typeof rep&&(i=rep.call(e,t,i)),typeof i){case"string":return quote(i);case"number":return isFinite(i)?String(i):"null";case"boolean":case"null":return String(i);case"object":if(!i)return"null";if(gap+=indent,f=[],"[object Array]"===Object.prototype.toString.apply(i)){for(u=i.length,r=0;r<u;r+=1)f[r]=str(r,i)||"null";return o=0===f.length?"[]":gap?"[\n"+gap+f.join(",\n"+gap)+"\n"+a+"]":"["+f.join(",")+"]",gap=a,o}if(rep&&"object"==typeof rep)for(u=rep.length,r=0;r<u;r+=1)"string"==typeof rep[r]&&(o=str(n=rep[r],i))&&f.push(quote(n)+(gap?": ":":")+o);else for(n in i)Object.prototype.hasOwnProperty.call(i,n)&&(o=str(n,i))&&f.push(quote(n)+(gap?": ":":")+o);return o=0===f.length?"{}":gap?"{\n"+gap+f.join(",\n"+gap)+"\n"+a+"}":"{"+f.join(",")+"}",gap=a,o}}"function"!=typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},Boolean.prototype.toJSON=this_value,Number.prototype.toJSON=this_value,String.prototype.toJSON=this_value),"function"!=typeof JSON.stringify&&(meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},JSON.stringify=function(t,e,r){var n;if(gap="",indent="","number"==typeof r)for(n=0;n<r;n+=1)indent+=" ";else"string"==typeof r&&(indent=r);if(rep=e,e&&"function"!=typeof e&&("object"!=typeof e||"number"!=typeof e.length))throw new Error("JSON.stringify");return str("",{"":t})}),"function"!=typeof JSON.parse&&(JSON.parse=function(text,reviver){var j;function walk(t,e){var r,n,o=t[e];if(o&&"object"==typeof o)for(r in o)Object.prototype.hasOwnProperty.call(o,r)&&(void 0!==(n=walk(o,r))?o[r]=n:delete o[r]);return reviver.call(t,e,o)}if(text=String(text),rx_dangerous.lastIndex=0,rx_dangerous.test(text)&&(text=text.replace(rx_dangerous,(function(t){return"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)}))),rx_one.test(text.replace(rx_two,"@").replace(rx_three,"]").replace(rx_four,"")))return j=eval("("+text+")"),"function"==typeof reviver?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}();

    var Tool = {
        "NAME": "Atheneum",
        "VERSION": "1.0.2"
    };

    /**
     * Get a setting from the After Effects preferences file.
     * @param  {String} keyName    - setting name
     * @param  {String} keyDefault - setting default
     * @return {String}            - setting value
     */
    function getAfterEffectsSettings(keyName, keyDefault) {
        var keyValue = keyDefault;
        if (app.settings.haveSetting(Tool.NAME, keyName) === true) {
            keyValue = app.settings.getSetting(Tool.NAME, keyName);
        }
        return keyValue;
    }

    /**
     * Save a setting to the After Effects preferences file.
     * @param {String} keyName  - setting name
     * @param {String} keyValue - setting value
     */
    function setAfterEffectsSetting(keyName, keyValue) {
        app.settings.saveSetting(Tool.NAME, keyName, keyValue);
        app.preferences.saveToDisk();
    }

    /**
     * Reveal the user data folder.
     */
    function revealUserDataFolder() {
        var folder = new Folder(Folder.userData.fsName + "/" + Tool.NAME);
        if (folder.exists === true) {
            var cmd = "explorer.exe \"" + folder.fsName + "\"";
            if ($.os.toLowerCase().indexOf("mac") !== -1) {
                cmd = "open \"" + folder.fsName + "\"";
            }
            system.callSystem(cmd);
        }
    }

    /**
     * Get the user data folder. If it doesn't exist, create it first.
     * @return {Folder} - user data folder
     */
    function getUserDataFolder() {
        var folder = new Folder(Folder.userData.fsName + "/" + Tool.NAME);
        if (folder.exists === false) {
            folder.create();
        }
        return folder;
    }

    /**
     * Get and parse JSON data from a file.
     * @param  {String} fileName - file name
     * @param  {Object|Array}    - file data
     * @return {Object|Array}    - file data
     */
    function getUserDataFile(fileName, fileData) {
        var folder = getUserDataFolder();
        var file = new File(folder.fsName + "/" + fileName);
        if (file.exists === true) {
            file.open("r");
            fileData = JSON.parse(file.read());
            file.close();
        }
        return fileData;
    }

    /**
     * Stringify and set JSON data to a file.
     * @param {String} fileName - file name
     * @param {Object} fileData - file data
     */
    function setUserDataFile(fileName, fileData) {
        var folder = getUserDataFolder();
        var file = new File(folder.fsName + "/" + fileName);
        file.open("w");
        file.write(JSON.stringify(fileData, undefined, 4));
        file.close();
    }

    /**
     * Set the number of uses for a script.
     * @param  {Object} favorites  - all favorites
     * @param  {String} scriptName - script name
     */
    function setFavoriteCount(favorites, scriptName) {
        favorites[scriptName] = (favorites[scriptName] || 0) + 1;
        setUserDataFile("favorites.json", favorites);
    }

    /**
     * Get the number of uses for a script.
     * @param  {Object} favorites  - all favorites
     * @param  {String} scriptName - script name
     * @return {Int}               - number of uses
     */
    function getFavoriteCount(favorites, scriptName) {
        return (favorites[scriptName] || 0);
    }

    /**
     * Get the minimum number of uses for a script to be considered a "favorite."
     * @param  {Float} percentage - percentage
     * @return {Int}              - minimum number of uses
     */
    function getMinimumCount(favorites, percentage) {
        var counts = [];
        for (var scriptName in favorites) {
            if (favorites.hasOwnProperty(scriptName) === true) {
                counts.push(favorites[scriptName]);
            }
        }
        counts.sort(function(a, b) {
            return b - a;
        });
        var minimumCount = counts[Math.floor(counts.length * percentage)];
        return (minimumCount || Infinity);
    }

    /**
     * Merge script files and favorites data into a single sorted object.
     * @param  {Array}  files     - all files
     * @param  {Object} favorites - all favorites
     * @return {Object}           - all sorted files
     */
    function mergeScriptFiles(files, favorites) {
        var scriptFiles = {
            "favorite": [],
            "standard": []
        };
        var minimumCount = getMinimumCount(favorites, 0.25);
        var numFiles = files.length;
        for (var i = 0; i < numFiles; i++) {
            var file = files[i];
            var favoriteCount = getFavoriteCount(favorites, file.name);
            if (favoriteCount >= minimumCount) {
                scriptFiles.favorite.push(file);
            } else {
                scriptFiles.standard.push(file);
            }
        }
        scriptFiles.favorite.sort(function(a, b) {
            return (a.name < b.name) ? -1 : 1;
        });
        scriptFiles.standard.sort(function(a, b) {
            return (a.name < b.name) ? -1 : 1;
        });
        return scriptFiles;
    }

    /**
     * Get all JSX and JSXBIN files from a folder and subfolders.
     * @param  {Folder} folder - current folder
     * @param  {Array}  files  - array of files
     * @return {Array}         - array of files
     */
    function getAllScriptFiles(folder, files) {
        var regex = new RegExp("\.(jsxbin|jsx)", "g");
        var items = folder.getFiles();
        var numItems = items.length;
        for (var i = 0; i < numItems; i++) {
            var item = items[i];
            if (item instanceof Folder) {
                getAllScriptFiles(item, files);
            } else {
                var name = item.displayName;
                if (name.match(regex)) {
                    files.push({
                        "name": name.replace(regex, ""),
                        "path": item.fsName
                    });
                }
            }
        }
        return files;
    }

    /**
     * Get all JSX and JSXBIN files from all folders.
     * @param  {Array} folders - array of folders
     * @return {Array}         - array of files
     */
    function getScriptFiles(folders) {
        var files = [];
        var numFolders = folders.length;
        for (var i = 0; i < numFolders; i++) {
            var path = folders[i].path;
            var folder = new Folder(path);
            if (folder.exists === true) {
                getAllScriptFiles(folder, files);
            }
        }
        return files;
    }

    /**
     * Add a file to the current listbox.
     * @param {Listbox} listbox - current listbox
     * @param {Object} file     - current file
     * @param {String} icon     - emoji icon
     */
    function addListItem(listbox, file, icon) {
        var name = (icon) ? icon + " " + file.name : file.name;
        var listItem = listbox.add("item", name);
        listItem.fileName = file.name;
        listItem.filePath = file.path;
    }

    /**
     * Check if a file name includes a subset of characters.
     * @param  {Object}  file   - current file
     * @param  {String}  filter - current filter
     * @return {Boolean}
     */
    function fileNameIncludes(file, filter) {
        return (file.name.toLowerCase().includes(filter.toLowerCase()));
    }

    /**
     * Add all files to the current listbox whose name includes a subset of characters.
     * @param {Listbox} listbox - current listbox
     * @param {Object}  files   - current files
     * @param {String}  filter  - current filter
     * @param {String}  icon    - emoji icon
     */
    function addListItems(listbox, files, filter, icon) {
        var numFiles = files.length;
        for (var i = 0; i < numFiles; i++) {
            var file = files[i];
            if (filter === "" || fileNameIncludes(file, filter)) {
                addListItem(listbox, file, icon);
            }
        }
    }

    /**
     * Add all favorite files and standard files to the current listbox whose name includes a subset
     * of characters.
     * @param {Listbox} listbox - current listbox
     * @param {String}  filter  - current filter
     */
    function populateFileList(listbox, filter) {
        listbox.removeAll();
        var icon = getAfterEffectsSettings("icon", "🎉");
        var scriptFiles = mergeScriptFiles(listbox.files, listbox.favorites);
        addListItems(listbox, scriptFiles.favorite, filter, icon);
        addListItems(listbox, scriptFiles.standard, filter);
    }

    /**
     * Run the selected script file.
     * @param {Listbox} listbox - current listbox
     */
    function runScriptFile(listbox, filter) {
        var file = new File(listbox.selection.filePath);
        if (file.exists === true) {
            $.evalFile(file);
            setFavoriteCount(listbox.favorites, listbox.selection.fileName);
            listbox.favorites = getUserDataFile("favorites.json", {});
            populateFileList(listbox, filter);
        }
    }

    /**
     * Load all folders, favorites, and files.
     * @param {Listbox} listbox - current listbox
     */
    function reloadFiles(listbox) {
        listbox.folders = getUserDataFile("folders.json", []);
        listbox.favorites = getUserDataFile("favorites.json", {});
        listbox.files = getScriptFiles(listbox.folders);
        populateFileList(listbox, "");
    }

    function removeFolder(folders, folderIndex) {
        folders.splice(folderIndex, 1);
        setUserDataFile("folders.json", folders);
    }

    function addFolder(folders, folder) {
        folders.push({
            "name": folder.name.replace(/\%20/g, " "),
            "path": folder.fsName
        });
        setUserDataFile("folders.json", folders);
    }

    function populateFolderList(folders, listbox) {
        listbox.removeAll();
        var numFolders = folders.length;
        for (var i = 0; i < numFolders; i++) {
            var folder = folders[i];
            var item = listbox.add("item", i + 1);
            item.subItems[0].text = folder.name;
            item.subItems[1].text = folder.path;
        }
    }

    function openSettingsWindow(scriptListbox) {
        var win = new Window("dialog", Tool.NAME + " Settings");

        var main = win.add("group");
        main.alignChildren = ["left", "fill"];
        main.preferredSize = [600, 300];

        var categories = main.add("listbox", undefined, ["Folders", "Favorites"]);
        categories.preferredSize.width = 150;

        var tabs = main.add("group");
        tabs.alignment = ["fill", "fill"];
        tabs.orientation = "stack";

        var tabOne = tabs.add("group");
        tabOne.alignment = ["fill", "fill"];
        tabOne.orientation = "column";

        var folderListbox = tabOne.add("listbox", undefined, "", {
            "numberOfColumns": 3,
            "showHeaders": true,
            "columnTitles": ["", "Folder Name", "File Path"]
        });
        folderListbox.alignment = ["fill", "top"];
        folderListbox.minimumSize.height = 200;

        populateFolderList(scriptListbox.folders, folderListbox);

        var folderButtons = tabOne.add("group");
        folderButtons.alignChildren = ["right", "top"];
        folderButtons.alignment = "fill";
        folderButtons.orientation = "row";

        var addFolderButton = folderButtons.add("button", undefined, "Add Folder");
        addFolderButton.onClick = function() {
            var folder = Folder.selectDialog();
            if (folder !== null) {
                addFolder(scriptListbox.folders, folder);
                populateFolderList(scriptListbox.folders, folderListbox);
                reloadFiles(scriptListbox);
            }
        };

        var removeFolderButton = folderButtons.add("button", undefined, "Remove Folder");
        removeFolderButton.onClick = function() {
            if (folderListbox.selection !== null) {
                if (confirm(Tool.NAME + "\nAre you sure you want to remove this folder?")) {
                    removeFolder(scriptListbox.folders, folderListbox.selection.index);
                    populateFolderList(scriptListbox.folders, folderListbox);
                    reloadFiles(scriptListbox);
                }
            } else {
                alert(Tool.NAME + "\nSelect the folder you would like to remove.");
            }
        };

        var reloadFoldersButton = folderButtons.add("button", undefined, "Reload All Folders");
        reloadFoldersButton.onClick = function() {
            reloadFiles(scriptListbox);
        };

        var tabTwo = tabs.add("group");
        tabTwo.alignment = ["fill", "fill"];
        tabTwo.orientation = "column";

        var iconPanel = tabTwo.add("panel", undefined, "Icon");
        iconPanel.alignment = ["fill", "top"];
        iconPanel.orientation = "row";

        iconPanel.add("statictext", undefined, "Favorites Icon:");

        var favoritesIconEditText = iconPanel.add("edittext {justify: \"center\"}");
        favoritesIconEditText.alignment = ["fill", "top"];
        favoritesIconEditText.text = getAfterEffectsSettings("icon", "🎉");
        favoritesIconEditText.onChanging = function() {
            setAfterEffectsSetting("icon", this.text);
            populateFileList(scriptListbox, "");
        };

        var favoritesGroup = tabTwo.add("group");
        favoritesGroup.alignChildren = ["fill", "fill"];
        favoritesGroup.alignment = ["fill", "top"];
        favoritesGroup.orientation = "column";

        var favoritesButtons = favoritesGroup.add("group");
        favoritesButtons.alignChildren = ["left", "top"];
        favoritesButtons.alignment = ["fill", "fill"];
        favoritesButtons.orientation = "row";

        var resetFavoritesButton = favoritesButtons.add("button", undefined, "Reset Favorites");
        resetFavoritesButton.onClick = function() {
            if (confirm(Tool.NAME + "\nAre you sure you want to remove all use history?")) {
                setUserDataFile("favorites.json", {});
                scriptListbox.favorites = getUserDataFile("favorites.json", {});
                populateFileList(scriptListbox, "");
            }
        };

        var revealFavoritesButton = favoritesButtons.add("button", undefined, "Reveal Favorites");
        revealFavoritesButton.onClick = function() {
            revealUserDataFolder();
        };

        var descriptionText = "When using "  + Tool.NAME + " the most frequently-used scripts will automatically be pushed to the top of the list and marked with an emoji of your choice. "  + Tool.NAME + " is always recording usage and will live update as you use it.";
        favoritesGroup.add("statictext", undefined, descriptionText, {
            "multiline": true
        });

        function showTab() {
            var selection = categories.selection;
            if (selection !== null) {
                var numTabs = tabs.children.length;
                for (var i = 0; i < numTabs; i++) {
                    tabs.children[i].visible = false;
                }
                tabs.children[selection.index].visible = true;
            }
        }

        categories.onChange = showTab;

        win.onShow = function() {
            categories.selection = 0;
            showTab();
        };

        var windowButtons = win.add("group");
        windowButtons.alignment = ["right", "fill"];
        windowButtons.add("statictext", undefined, Tool.NAME + " v" + Tool.VERSION);
        windowButtons.add("button", undefined, "OK", {
            "name": "ok"
        });

        win.show();
    }

    /**
     * Build the UI for this script.
     * @param  {Panel|Window} thisObj - the script panel
     */
    function buildUserInterface(thisObj) {
        var win = null;
        if (thisObj instanceof Panel) {
            win = thisObj;
        } else {
            win = new Window("palette", Tool.Name, undefined, {
                "resizeable": true
            });
        }

        win.alignChildren = ["left", "top"];
        win.margins = 0;
        win.spacing = 5;

        var group = win.add("group");
        group.alignChildren = ["right", "fill"];
        group.alignment = "fill";
        group.margins = 0;
        group.spacing = 5;

        var searchText = group.add("edittext");
        searchText.alignment = ["fill", "fill"];
        searchText.previousText = "";
        searchText.onChanging = function() {
            populateFileList(listbox, searchText.text);
        };

        var clearButton = group.add("button", undefined, "x");
        clearButton.minimumSize = [24, 24];
        clearButton.maximumSize = [24, 24];
        clearButton.onClick = function() {
            searchText.text = "";
            populateFileList(listbox, "");
        };

        var settingsButton = group.add("button", undefined, "s");
        settingsButton.minimumSize = [24, 24];
        settingsButton.maximumSize = [24, 24];
        settingsButton.onClick = function() {
            openSettingsWindow(listbox);
        };

        var listbox = win.add("listbox");
        listbox.alignment = ["fill", "fill"];
        listbox.onDoubleClick = function() {
            runScriptFile(listbox, searchText.text);
        };

        reloadFiles(listbox);

        win.onResizing = win.onResize = function() {
            this.layout.resize();
        };

        if (win instanceof Window) {
            win.center();
            win.show();
        } else {
            win.layout.layout(true);
            win.layout.resize();
        }
    }

    buildUserInterface(thisObj);

})(this);
