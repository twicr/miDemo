window.onload = function() {

    logo();
    banner();
    shopCar();
}

// 监听窗口大小，判断右导航栏是否显示
window.onresize = function() {
    var navRight = document.getElementsByClassName("nav-right")[0];
    if (window.innerWidth < 1480) {
        navRight.style.display = "none";
    } else {
        navRight.style.display = "block";
    }
}

// 购物车
function shopCar() {
    var body = document.getElementsByTagName("body")[0];
    var shopCar = document.getElementsByClassName("head-right")[0].getElementsByTagName("div")[0];
    var div = document.getElementsByClassName("head-right")[0].getElementsByTagName("div")[1];
    var showList = document.getElementsByClassName("head-right")[0].getElementsByTagName("div")[3];
    var divHight = showList.children.length * 80 + 40;
    var timer;
    var speed = 5;
    //购物车移入下拉菜单
    shopCar.onmouseover = function() {
        clearInterval(timer);
        div.style.display = "block";
        div.style.top = -divHight + "px";
        timer = setInterval(function() {
            speed = -(parseInt(div.style.top) + speed) / 20;
            speed = Math.ceil(speed);
            console.log(speed);
            div.style.top = div.offsetTop + speed + "px";
            if (div.style.top > "0") {
                clearInterval(timer);
                div.style.top = "0px";
                showList.className = "shop-list";
            }
        }, 5)
        speed = 5;
    }
    //鼠标在body上移动
    body.onmousemove = function(event) {
        //获取鼠标移入下一标签的父元素节点，有些情况无className，所以用try
        try {
            var et = event.toElement.offsetParent.className;
        } catch (e) {
            console.log(e.name + ":" + e.message);
        }
        if (et != "shop-car-box") {
            setTimeout(function() { //延迟100毫秒执行
                if (div.style.top == "0px" && et != "shop-car-box") {
                    clearInterval(timer);
                    showList.className = "";
                    timer = setInterval(function() {
                        speed = (-parseInt(div.style.top) + speed) / 10;
                        speed = Math.ceil(speed);
                        div.style.top = div.offsetTop - speed + "px";
                        if (parseInt(div.style.top) <= -divHight) clearInterval(timer);
                    }, 5)
                    speed = 5;
                }
            }, 100)
            // div.style.display = "none";
        }
    }
}
// logo横移
function logo() {
    var timer;
    var logo = document.getElementById("image").getElementsByTagName("img")[0];
    var logoImg = document.getElementById("image").getElementsByTagName("a")[0];
    logo.onmouseover = function() {
        clearInterval(timer);
        timer = setInterval(function() {
            imgMove(0, logoImg);
            if (logoImg.offsetLeft == 0) clearInterval(timer);
        }, 10);
    }
    logo.onmouseout = function() {
        clearInterval(timer);
        timer = setInterval(function() {
            imgMove(-55, logoImg);
            if (logoImg.offsetLeft == -55) clearInterval(timer);
        }, 10);
    }
}

// 元素移动函数
function imgMove(i, ele) {
    var iSpeed = -(Math.abs(i) + ele.offsetLeft) / 10;
    iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
    ele.style.left = ele.offsetLeft + iSpeed + "px";
}

// 轮播图banner
function banner() {
    var bannerImg = document.getElementById("conceal").getElementsByTagName("img");
    var bannerLi = document.getElementById("circle").getElementsByTagName("li");
    var btnLeft = document.getElementById("arrows").getElementsByTagName("img")[0];
    var btnRight = document.getElementById("arrows").getElementsByTagName("img")[1];
    var timer;
    var timerBanner;
    // 初始化播放页
    var num = bannerNum();

    // 获取当前显示banner
    function bannerNum() {
        for (var i = 0; i < bannerLi.length; i++) {
            if (bannerLi[i].className == "current") {
                return i;
            }
        }
    };

    // 初始化
    startBanner();

    // 点击圆圈切换banner
    for (var i = 0; i < bannerLi.length; i++) {
        bannerLi[i].index = i;
        bannerLi[i].onclick = function() {
            var n = bannerNum();
            // console.log(n);
            // 隐藏前一播放页
            bannerLi[n].className = "";
            bannerImg[n].style.opacity = 0;
            // 将当前页设为轮播起始页
            num = this.index;
            clearInterval(timer);
            changBanner(num - 1);
            // 从当前页开始轮播
            startBanner();
        }
    }

    // banner图片淡化
    function changBanner(i) {
        var ispeed = 0;
        clearInterval(timer);
        timer = setInterval(function() {
            if (ispeed > 100) {
                clearInterval(timer);
            } else if (i < 0 || i == 4) {
                bannerImg[4].style.opacity = 0;
                bannerLi[4].className = "";
                bannerImg[0].style.opacity = ispeed / 100;
                bannerLi[0].className = "current";
            } else {
                bannerImg[i].style.opacity = 0;
                bannerLi[i].className = "";
                bannerImg[i + 1].style.opacity = ispeed / 100;
                bannerLi[i + 1].className = "current";
            }
            ispeed += 5;
        }, 25);
    }

    // 轮播banner
    function startBanner() {
        clearInterval(timerBanner);
        timerBanner = setInterval(function() {
            if (num > 4) num = 0;
            changBanner(num);
            num++;
        }, 5000);
    }

    // 点击切换上一张
    btnLeft.onclick = function() {
        num = bannerNum();
        if (bannerImg[num].style.opacity == "1") {
            // console.log(num);
            bannerLi[num].className = "";
            bannerImg[num].style.opacity = 0;
            num--;
            if (num < 0) num = 4;
            clearInterval(timer);
            changBanner(num - 1);
            startBanner();
        }
    }

    btnRight.onclick = function() {
        num = bannerNum();
        if (bannerImg[num].style.opacity == "1") {
            bannerLi[num].className = "";
            bannerImg[num].style.opacity = 0;
            num++;
            if (num > 4) num = 0;
            clearInterval(timer);
            changBanner(num - 1);
            startBanner();
        }
    }
}