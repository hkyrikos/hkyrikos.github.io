// KLASSE WATCHLIST Set
function WatchlistSet() {
    this.watchlist = new Array();
}

WatchlistSet.prototype.Contains = function (materialNr) {
    for (j = 0; j < this.watchlist.length; j++) {
        var wl = this.watchlist[j];
        if (wl.materialNr == materialNr)
            return true;
    }
    return false;
}

WatchlistSet.prototype.Contains = function (materialNr, code) {
    for (j = 0; j < this.watchlist.length; j++) {
        var wl = this.watchlist[j];
        if (wl.materialNr == materialNr && wl.code == code)
            return true;
    }
    return false;
}

WatchlistSet.prototype.getLength = function () {
    return this.watchlist.length;
}

WatchlistSet.prototype.getItem = function (materialNr) {
    for (j = 0; j < this.watchlist.length; j++) {
        var wl = this.watchlist[j];
        if (wl.materialNr == materialNr)
            return wl;
    }
    return undefined;
}

WatchlistSet.prototype.getItem = function (materialNr, code) {
    for (j = 0; j < this.watchlist.length; j++) {
        var wl = this.watchlist[j];
        if (wl.materialNr == materialNr && wl.code == code)
            return wl;
    }
    return undefined;
}

WatchlistSet.prototype.getItems = function () {
    return this.watchlist;
}

WatchlistSet.prototype.Add = function (wlI) {
    this.watchlist.push(wlI);
}

WatchlistSet.prototype.Remove = function (materialNr) {
    for (i = 0; i < this.watchlist.length; i++) {
        var wl = this.watchlist[i];
        if (wl.materialNr == materialNr) {
            this.watchlist.splice(i, 1);
        }
    }
}

WatchlistSet.prototype.Remove = function (materialNr, code) {
    for (i = 0; i < this.watchlist.length; i++) {
        var wl = this.watchlist[i];
        if (wl.materialNr == materialNr && wl.code == code) {
            this.watchlist.splice(i, 1);
        }
    }
}

WatchlistSet.prototype.PrintWL = function () {
    var str = "";
    for (i = 0; i < this.watchlist.length; i++) {
        str += this.watchlist[i].materialNr + "-" + this.watchlist[i].count + "\n";
    }
    alert(str);
}

// KLASSE WATCHLIST
function WatchlistItem(materialNr, catalogId, name) {
    this.materialNr = materialNr;
    this.catalogId = catalogId;
    this.name = name;
    this.count = 1;
    this.machines = new Array();
    this.code = 0;
}

function WatchlistItem(materialNr, catalogId, name, code) {
    this.materialNr = materialNr;
    this.catalogId = catalogId;
    this.name = name;
    this.count = 1;
    this.machines = new Array();
    this.code = code;
}

WatchlistItem.prototype.AddMachine = function (name) {
    var fund = false;
    for (i = 0; i < this.machines.length; i++) {
        if (this.machines[i] == name) {
            fund = true;
        }
    }
    if (fund == false) {
        this.machines.push(name);
    }
}