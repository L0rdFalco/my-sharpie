document.getElementById("mySharpie_canvas") ? exit() : chrome.storage.local.get({
    penColor: "#B042B8",
    penThickness: 5,
    highlightThickness: 22,
    eraseThickness: 30,
    textSize: 20
}, function (g) {
    init(g)
});

function exit() {
    document.getElementById("mySharpie_canvas").remove();
    document.getElementById("mySharpie_draggable").remove()
}

function convertHex(g, G = .3) {
    var d = g.replace("#", "");
    3 === d.length && (d = d[0] + d[0] + d[1] + d[1] + d[2] + d[2]);
    g = parseInt(d.substring(0, 2), 16);
    var H = parseInt(d.substring(2, 4), 16);
    d = parseInt(d.substring(4, 6), 16);
    return "rgba(" + g + "," + H + "," + d + "," + G + ")"
}

async function init(g) {
    function G(a, c) {
        console.log("G");
        a.style.background = ""
    }

    function d(a) {
        console.log("d");
        b.discardActiveObject().renderAll();
        b.wrapperEl.style.cursor = "crosshair";
        b.wrapperEl.style.pointerEvents = "auto";
        b.selection = !0;
        b.isDrawingMode = !0;
        I = p = z = J = K = n = !1;
        R.forEach(G);
        a.style.background = "rgba(0,0,0,0.2)"
    }

    function H() {
        console.log("H");
        var a = document.getElementById("mySharpie_draggable");
        (new Promise(function (c, e) {
            a.style.display = "none";
            setTimeout(function () {
                "none" == a.style.display ? c() : e()
            }, 500)
        })).then(function () {
            chrome.runtime.sendMessage({
                message: "from-content-script"
            },
                function (c) {
                    screenshot = c.screenshot;
                    c = new Date;
                    c = c.getFullYear() + "-" + ("0" + (c.getMonth() + 1)).slice(-2).toString() + "-" + ("0" + c.getDate()).slice(-2);
                    var e = document.createElement("a");
                    e.download = "SS_" + c + "_mySharpie.png";
                    e.href = screenshot;
                    document.body.appendChild(e);
                    e.click();
                    document.body.removeChild(e);
                    c = URL.createObjectURL(new Blob(['<h1 style="font-family:\'Helvetica\',\'Arial\',sans-serif;">edited image</h1><img width="100%" src="' + screenshot + '"></img>'], {
                        type: "text/html"
                    }));
                    window.open(c);
                    a.style.display = "block"
                })
        }).catch(function () {
            console.error("An error has occured.")
        })
    }

    function S() {
        console.log("S");
        b.clear();
        A()
    }

    function T() {
        console.log("T");
        d(ha);
        J = !0;
        b.freeDrawingBrush = ia;
        f.value = U;
        b.freeDrawingBrush.width = parseInt(f.value) || 5
    }

    function V() {
        console.log("v");
        d(ja);
        z = !0;
        b.freeDrawingBrush = B;
        b.freeDrawingBrush.color = convertHex(l.value);
        f.value = W;
        b.freeDrawingBrush.width = parseInt(f.value) || 5
    }

    function X() {
        console.log("x");
        d(Y);
        b.freeDrawingBrush = B;
        b.freeDrawingBrush.color = l.value;
        f.value = C;
        b.freeDrawingBrush.width = parseInt(f.value) || 5
    }

    function Z() {
        console.log("z");
        d(ka);
        K = !0;
        b.isDrawingMode = !1;
        b.wrapperEl.style.pointerEvents = "none"
    }

    function L() {
        console.log("l");
        d(la);
        b.isDrawingMode = !1;
        I = !0;
        b.getObjects().forEach(a => {
            a.selectable = !0;
            a.hoverCursor = "move"
        })
    }

    function aa() {
        console.log("aa");
        d(ma);
        n = !0;
        b.isDrawingMode = !1;
        f.value = na
    }

    function q() {
        console.log("q");
        d(oa);
        p = !0;
        f.value = C;
        b.isDrawingMode = !1;
        b.selection = !1;
        ba()
    }

    function ba() {
        console.log("ba");
        b.getObjects().forEach(a => {
            a.selectable = !1;
            a.hoverCursor = "normal"
        })
    }

    function r(a, c) {
        console.log("r");
        c ? (a.style.opacity = 1, a.style.cursor = "pointer") : (a.style.opacity = .3, a.style.cursor = "not-allowed")
    }

    function A() {
        console.log("A");
        M = [];
        r(D, !1);
        null !== t && (N.push(t), r(E, !0));
        t = JSON.stringify(b)
    }

    function ca(a, c, e, h) {
        console.log("ca");
        0 != a.length && (c.push(t), t = a.pop(), b.clear(), b.loadFromJSON(t), b.renderAll(), r(e, !0), r(h, 0 < a.length))
    }

    function da() {
        console.log("da");
        ca(N, M, D, E)
    }

    function ea() {
        console.log();
        ca(M, N, E, D);
        p && ba()
    }
    var F = document.body,
        u = document.documentElement,
        v = document.body.scrollTop || document.documentElement.scrollTop,
        w = Math.max(F.scrollHeight, F.offsetHeight, u.clientHeight, u.scrollHeight, u.offsetHeight),
        x = 7500;
    v + screen.height > x && (x += (v + screen.height) / 7500 * 7500);
    x > w &&
        (x = w);
    25E3 < x && (alert("App not allowed on this webpage"), exit());
    var b = this.__canvas = new fabric.Canvas("c", {
        isDrawingMode: !0
    });
    fabric.Object.prototype.transparentCorners = !0;
    b.setDimensions({
        width: document.body.clientWidth,
        height: x
    });
    b.wrapperEl.id = "mySharpie_canvas";
    document.body.appendChild(b.wrapperEl);
    var k = document.createElement("div");
    k.id = "mySharpie_draggable";
    document.body.appendChild(k);
    let storageObj = await chrome.storage.local.get(["state"])

    console.log(storageObj);
    if (storageObj.state === "prcHJlbWl1bSB1c2Vy") {
        k.innerHTML = '<div id="mySharpie_color"><div class="mySharpie_title">Color</div><input id="mySharpie_colorSelect" type="color" value="#FF0000"></div><div id="mySharpie_tools"><div class="mySharpie_title mySharpie_toolsTitle">Tools</div><div class="mySharpie_toolDiv"><a id="mySharpie_pen" class="mySharpie_tool"><img id="mySharpie_penImg" class="mySharpie_icon" alt="Marker" title="Marker"></img></a><a id="mySharpie_highlighter" class="mySharpie_tool"><img id="mySharpie_highlighterImg" class="mySharpie_icon" alt="Highlighter" title="Highlighter"></img></a><a id="mySharpie_eraser" class="mySharpie_tool"><img id="mySharpie_eraserImg" class="mySharpie_icon" alt="Eraser" title="Eraser"></img></a><a id="mySharpie_pointer" class="mySharpie_tool"><img id="mySharpie_pointerImg" class="mySharpie_icon" alt="Pointer" title="Pointer"></img></a><a id="mySharpie_text" class="mySharpie_tool"><img id="mySharpie_textImg" class="mySharpie_icon" alt="Text" title="Text"></img></a><a id="mySharpie_move" class="mySharpie_tool"><img id="mySharpie_moveImg" class="mySharpie_icon" alt="Move" title="Move"></img></a><a id="mySharpie_line" class="mySharpie_tool"><img id="mySharpie_lineImg" class="mySharpie_icon" alt="Line" title="Line"></img></a><a id="mySharpie_save" class="mySharpie_tool"><img id="mySharpie_saveImg" class="mySharpie_icon" alt="Save" title="Save Drawing"></img></a><a id="mySharpie_undo" class="mySharpie_tool"><img id="mySharpie_undoImg" class="mySharpie_icon" alt="Undo" title="Undo"></img></a><a id="mySharpie_redo" class="mySharpie_tool"><img id="mySharpie_redoImg" class="mySharpie_icon" alt="Redo" title="Redo"></img></a><a id="mySharpie_clear" class="mySharpie_tool"><img id="mySharpie_clearImg" class="mySharpie_icon" alt="Clear" title="Clear"></img></a><a id="mySharpie_exit" class="mySharpie_tool"><img id="mySharpie_exitImg" class="mySharpie_icon" alt="Exit" title="Exit"></img></a></div></div><div id="mySharpie_size"><div class="mySharpie_title">Size</div><input type="range" id="mySharpie_thicknessSlider" value="5" max="60" min="1"></div> ';

    }
    else {
        console.log("here");

        k.innerHTML = '<div id="mySharpie_color"><div class="mySharpie_title">Color</div><input id="mySharpie_colorSelect" type="color" value="#FF0000"></div><div id="mySharpie_tools"><div class="mySharpie_title mySharpie_toolsTitle">Tools</div><div class="mySharpie_toolDiv"><a id="mySharpie_pen" class="mySharpie_tool"><img id="mySharpie_penImg" class="mySharpie_icon" alt="Marker" title="Marker"></img></a><a id="mySharpie_highlighter" class="mySharpie_tool"><img id="mySharpie_highlighterImg" class="mySharpie_icon" alt="Highlighter" title="Highlighter"></img></a><a id="mySharpie_eraser" class="mySharpie_tool"><img id="mySharpie_eraserImg" class="mySharpie_icon" alt="Eraser" title="Eraser"></img></a><a id="mySharpie_pointer" class="mySharpie_tool"><img id="mySharpie_pointerImg" class="mySharpie_icon" alt="Pointer" title="Pointer"></img></a><a id="mySharpie_text" class="mySharpie_tool"><img id="mySharpie_textImg" class="mySharpie_icon" alt="Text" title="Text"></img></a><a id="mySharpie_move" class="mySharpie_tool"><img id="mySharpie_moveImg" class="mySharpie_icon" alt="Move" title="Move"></img></a><a id="mySharpie_line" class="mySharpie_tool"><img id="mySharpie_lineImg" class="mySharpie_icon" alt="Line" title="Line"></img></a><a id="mySharpie_save" class="mySharpie_tool"><img id="mySharpie_saveImg" class="mySharpie_icon" alt="Save" title="Save Drawing"></img></a><a id="mySharpie_undo" class="mySharpie_tool"><img id="mySharpie_undoImg" class="mySharpie_icon" alt="Undo" title="Undo"></img></a><a id="mySharpie_redo" class="mySharpie_tool"><img id="mySharpie_redoImg" class="mySharpie_icon" alt="Redo" title="Redo"></img></a><a id="mySharpie_clear" class="mySharpie_tool"><img id="mySharpie_clearImg" class="mySharpie_icon" alt="Clear" title="Clear"></img></a><a id="mySharpie_exit" class="mySharpie_tool"><img id="mySharpie_exitImg" class="mySharpie_icon" alt="Exit" title="Exit"></img></a></div></div><div id="mySharpie_size"><div class="mySharpie_title">Size</div><input type="range" id="mySharpie_thicknessSlider" value="5" max="60" min="1"></div><button id="activate_button">log in and activate full version</button>';
    }

    k.style.top = v + "px";
    0 == Math.floor(2 * Math.random())
    k.addEventListener("mousedown",
        function (a) {
            function c(fa) {
                k.style.top = fa.clientY - pa + "px";
                k.style.left = fa.clientX - h + "px"
            }

            function e() {
                window.removeEventListener("mousemove", c);
                window.removeEventListener("mouseup", e);
                window.removeEventListener("contextmenu", e)
            }
            var h = a.clientX - parseInt(window.getComputedStyle(this).left),
                pa = a.clientY - parseInt(window.getComputedStyle(this).top);
            window.addEventListener("mousemove", c);
            f.addEventListener("mousemove", e);
            window.addEventListener("mouseup", e);
            window.addEventListener("contextmenu", e)
        });

    let button_activate = document.getElementById("activate_button")

    if (button_activate) button_activate.addEventListener("click", function (e) {
        window.open("https://app-backend-gkbi.onrender.com/auth", "_blank")
    })
    var R =
        document.querySelectorAll(".mySharpie_tool");
    R.forEach(function (a, c) {
        let e = [X, V, T, Z, aa, L, q, H, da, ea, S, exit];
        var h = a.querySelector("img");
        h.src = chrome.runtime.getURL("/res/" + h.alt.toLowerCase() + ".png");
        a.onclick = e[c]
    });
    var l = document.getElementById("mySharpie_colorSelect"),
        Y = document.getElementById("mySharpie_pen"),
        ka = document.getElementById("mySharpie_pointer"),
        la = document.getElementById("mySharpie_move"),
        ma = document.getElementById("mySharpie_text"),
        oa = document.getElementById("mySharpie_line"),
        ha = document.getElementById("mySharpie_eraser"),
        ja = document.getElementById("mySharpie_highlighter"),
        f = document.getElementById("mySharpie_thicknessSlider"),
        C = g.penThickness,
        W = g.highlightThickness,
        U = g.eraseThickness,
        na = g.textSize;
    Y.style.background = "rgba(0,0,0,0.2)";
    f.value = C;
    l.value = g.penColor;
    var ia = new fabric.EraserBrush(b),
        B = b.freeDrawingBrush;
    B.color = l.value;
    B.width = parseInt(f.value) || 5;
    f.addEventListener("input", function () {
        J ? U = f.value : z ? W = f.value : C = f.value;
        b.freeDrawingBrush.width = parseInt(f.value) || 5
    }, !1);
    l.addEventListener("input", function () {
        var a =
            this.value;
        z && (a = convertHex(a));
        b.freeDrawingBrush.color = a;
        document.getElementById("mySharpie_donate") && (document.getElementById("mySharpie_donate").style.backgroundColor = this.value)
    }, !1);
    var y = !1,
        z = !1,
        J = !1,
        K = !1,
        n = !1,
        p = !1,
        I = !1,
        O = !1;
    b.getContext("2d");
    b.on("text:editing:entered", function (a) {
        y = !0
    });
    b.on("text:editing:exited", function (a) {
        y = n = !1;
        L()
    });
    var P = !1;
    b.on("mouse:down", function (a) {
        P = !0;
        if (n && !y) {
            var c = a.e;
            a = 2 * parseInt(f.value);
            if ("touchstart" == c.type) {
                var e = c.target.getBoundingClientRect();
                var h = c.targetTouches[0].pageX - e.left;
                c = c.targetTouches[0].pageY - e.top
            } else h = c.offsetX, c = c.offsetY;
            a = new fabric.IText("", {
                fontFamily: "arial",
                fontSize: a,
                fill: l.value,
                left: h,
                top: c - a / 2
            });
            b.add(a).setActiveObject(a);
            a.enterEditing()
        } else p && (O = !0, a = b.getPointer(a.e), q = new fabric.Line([a.x, a.y, a.x, a.y], {
            strokeWidth: parseInt(f.value),
            fill: l.value,
            stroke: l.value,
            originX: "center",
            originY: "center",
            selectable: !1,
            hoverCursor: "normal",
            targetFindTolerance: !0
        }), b.add(q))
    });
    b.on("mouse:move", function (a) {
        p && O &&
            (a = b.getPointer(a.e), q.set({
                x2: a.x,
                y2: a.y
            }), b.renderAll())
    });
    b.on("object:modified", function (a) {
        A()
    });
    b.on("mouse:up", function (a) {
        P = !1;
        I || n || (A(), p && (O = !1, q.setCoords()))
    });
    window.onscroll = function () {
        v = document.body.scrollTop || document.documentElement.scrollTop;
        if (v + screen.height > b.getHeight()) {
            var a = b,
                c = Math.max(F.scrollHeight, F.offsetHeight, u.clientHeight, u.scrollHeight, u.offsetHeight);
            c = a.getHeight() + 7500 < c ? a.getHeight() + 7500 : c;
            c != a.getHeight() && a.setHeight(c)
        }
        k.style.top = v + "px";
        25E3 < b.getHeight() &&
            (alert("This app won't work here. Its futile to try"), exit())
    };
    var E = document.getElementById("mySharpie_undo"),
        D = document.getElementById("mySharpie_redo");
    r(E, !1);
    r(D, !1);
    var t, N = [],
        M = [],
        Q = {};
    document.addEventListener("keydown", function (a) {
        Q[a.code] = !0;
        if ("Backspace" == a.code && !n && !y) {
            for (let c = 0; c < b.getActiveObjects().length; c++) b.remove(b.getActiveObjects()[c]);
            b.discardActiveObject().renderAll();
            A()
        }
        "Escape" == a.code && exit();
        m = {
            KeyZ: da,
            KeyR: ea,
            KeyD: X,
            KeyH: V,
            KeyM: L,
            KeyT: aa,
            KeyP: Z,
            KeyL: q,
            KeyE: T,
            KeyX: S
        };
        if (!y && !n && !P && Q.ShiftLeft && m[a.code] && ("KeyX" == a.code && !K || "KeyX" != a.code)) m[a.code]()
    });
    document.addEventListener("keyup", function (a) {
        Q[a.code] = !1
    })
};