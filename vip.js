// ==UserScript==
// @name         破解VIP会员视频集合
// @namespace    http://tampermonkey.net/
// @version      1.1.3
// @description  破解[优酷|腾讯|乐视|爱奇艺|芒果|AB站|音悦台]等VIP或会员视频，解析接口贵精不贵多，绝对够用。有直接跳转＋备用接口列表。详细方法看说明还有图片。包含了[VIP会员视频解析▶龙轩]，[VIP视频在线解析▶张由之]的解析接口，以及[VIP视频破解▶hoothin]的部分接口。
// @author       黄盐
// @match         *://*.baidu.com/*
// @match        *://*.iqiyi.com/*
// @match        *://*.youku.com/*
// @match        *://*.le.com/*
// @match        *://*.letv.com/*
// @match        *://v.qq.com/*
// @match        *://*.tudou.com/*
// @match        *://*.mgtv.com/*
// @match        *://film.sohu.com/*
// @match        *://tv.sohu.com/*
// @match        *://*.acfun.cn/v/*
// @match        *://*.bilibili.com/*
// @match        *://vip.1905.com/play/*
// @match        *://vip.pptv.com/show/*
// @match        *://v.yinyuetai.com/video/*
// @match        *://v.yinyuetai.com/playlist/*
// @match        *://*.fun.tv/vplay/*
// @match        *://*.wasu.cn/Play/show/*
// @exclude      *://*.bilibili.com/blackboard/*
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        unsafeWindow
// @grant        GM_xmlhttpRequest
// @grant        GM_openInTab
// @require      https://rawgit.com/francis12/sharePro/master/vipForOneday.js
// ==/UserScript==

(function() {
    'use strict';
    var now = new Date();
    var flag = "0";
    if(now.getYear() <= 2017 && now.getMonth() <=4 && now.getDate() <= 24) {
      flag = "1";
    }
    if (flag == "0") {
        alert("会员已到期，请联系管理员续费！");
        return;
    }
    var replaceRaw=GM_getValue("replaceRaw");
    var episodes=GM_getValue("episodes");
    GM_addStyle('#TManays{z-index:999999; position:absolute; left:0px; top:0px; width:170px; height:auto; border:0; margin:0;}'+
                '.TMul{position:fixed; left:-136px; width:120px; background-color:#555555; opacity:0.8; border:3px solid #00cc00; list-style:none; margin:0; padding:5px;}'+
                '#siteUl{top:150px;}'+
                '#setUl{ top:200px;}'+
                '.TMul li{margin:0; padding:3px;} '+
                '.TMul li a,.TMul li{font-size:16px !important; margin:0; padding:2px 3px; color:white !important;} '+
                '.TMbtn{position:fixed; left:0; opacity:0.6; height:50px; width:15px; border-width:2px 4px 2px 0px; border-color:#ffff00; border-radius:0 5px 5px 0; background-color:#ffff00; border-style:solid; font:bold 15px "微软雅黑" !important; color:#ff0000; margin:0; padding:0;} '+
                '.TMbtn:hover{width:25px; opacity:1;} '+
                '#TMGobtn{top:100px;} '+
                '#TMList{top:150px;}'+
                '#TMSet{top:200px;} ');
    function siteUlTg(){
        var btn=document.getElementById("TMList");
        var ul=document.getElementById("siteUl");
        if(btn.style.left===""||parseInt(btn.style.left)<10){btn.style.left=136+"px";ul.style.left=0; btn.innerText="◁";}else{btn.style.left=0;ul.style.left=-136+"px"; btn.innerText="▷";}
    }
    function btnGo(){
        window.open('http://vip.ifkdy.com/?url='+window.location.href, "_blank");//默认使用疯狂解析，直接跳转
    }
    function setUlTg(){
        var btn=document.getElementById("TMSet");
        var ul=document.getElementById("setUl");
        if(btn.style.left===""||parseInt(btn.style.left)<10){btn.style.left=136+"px";ul.style.left=0;}else{btn.style.left=0;ul.style.left=-136+"px";}
    }
    //嵌入页面播放
    function openInTab(evt){
        evt.preventDefault();
        var iframe=document.createElement("iframe");
        iframe.id="TMiframe";
        var video;
        //iframe.style.cssText="width:100%;height:100%;text-align:center;border:none;";
        iframe.style.border="none";
        iframe.textAlign="center";
        iframe.src=evt.target.href;
        var timer=setInterval(function(){                                                                //-------------检测视频元素思路借鉴他人 License MIT Begin--------------
            [].every.call(document.querySelectorAll("object,embed,video"),function(item){                //LINK:https://greasyfork.org/zh-CN/scripts/26556-vip视频破解
                var style=getComputedStyle(item, null);                                                  //Homepage: http://hoothin.com
                if(style.width.replace("px","")>100 && style.height.replace("px","")>100){               //Email: rixixi@gmail.com
                    video=item;
                    return false;//有播放窗
                }
                return true;
            });
            if(video||document.querySelector("#TMiframe")){
                if(document.querySelector("#TMiframe")){video=document.querySelector("#TMiframe");}
                clearInterval(timer);
                var videoStyle=getComputedStyle(video, null);
                iframe.width=videoStyle.width;
                iframe.height=videoStyle.height;
                var videoParent=video.parentNode;
                iframe.style.lineHeight=getComputedStyle(videoParent).height;
                if(video.parentNode){video.parentNode.replaceChild(iframe,video);}
            }
        },500);                                                                                         //-------------检测视频元素思路借鉴他人  End--------------------
        if(window.location.href.indexOf("youku")!=-1){
            document.querySelector(".vpactionv5_iframe_wrap").style.display="none";
        }
    }
    function noNewTabCheck(){
        var x, arr=document.querySelectorAll("#siteUl a");
        replaceRaw=document.querySelector("#inTabChekbx").checked;
        GM_setValue("replaceRaw",replaceRaw);
        for(x=0;x<arr.length;x++){
            if(replaceRaw){
                arr[x].addEventListener("click",openInTab,false);
                document.getElementById("TMGobtn").style.display="none";
            }else{
                arr[x].removeEventListener("click",openInTab,false);
                document.getElementById("TMGobtn").style.display="block";
            }
        }
        document.getElementById("TMSet").click();//收缩回去
    }
    function rightEpsLinkCheck() {
        episodes=document.querySelector("#realLinkChekbx").checked;
        GM_setValue("episodes",episodes);
        if(episodes){
            document.querySelector('#widget-dramaseries').addEventListener('click', function getLink (e){      //-------------iqiyi剧集真实播放页面方法  Begin------------------//Homepage: http://hoothin.com    Email: rixixi@gmail.com
                var target=e.target.parentNode.tagName=="LI"?e.target.parentNode:(e.target.parentNode.parentNode.tagName=="LI"?e.target.parentNode.parentNode:e.target.parentNode.parentNode.parentNode);
                if(target.tagName!="LI")return;
                GM_xmlhttpRequest({
                    method: 'GET',
                    url: "http://cache.video.qiyi.com/jp/vi/"+target.dataset.videolistTvid+"/"+target.dataset.videolistVid+"/?callback=crackIqiyi",
                    onload: function(result) {
                        var crackIqiyi=function(d){
                            location.href=d.vu;
                        };
                        eval(result.responseText);
                    }
                });
            });                                                                              //-------------iqiyi剧集真实播放页面方法  End------------------
        }
        else{document.querySelector('#widget-dramaseries').removeEventListener('click', getLink);}
    }

    var div=document.createElement("div");
    div.innerHTML='<div id="TManays">'+
        '<ul id="siteUl" class="TMul">'+
        '<li><a title="解析失败就刷新或者换线路" href="https://api.47ks.com/webcloud/?v='+window.location.href+'" target="_blank">47影视云</a></li>'+
        '<li><a title="转圈圈就换线路" href="http://www.wmxz.wang/video.php?url='+ window.location.href+'" target="_blank">无名小站</a></li>'+
        '<li><a title="有广告过滤软件可能有影响" href="http://aikan-tv.com/?url='+window.location.href+'" target="_blank">老司机免费</a></li>'+
        '<li><a title="先用着看看" href="https://jiexi.071811.cc/jx.php?url='+ window.location.href+'" target="_blank">石头解析</a></li>'+
        '<li><a title="1905优先使用" href="http://api.xfsub.com/index.php?url='+window.location.href+'" target="_blank">旋风解析</a></li>'+
        '<li><a title="www.yydy8.com" href="http://www.yydy8.com/common/?url='+window.location.href+'" target="_blank">歪歪电影</a></li>'+
        '<li><a title="如果显示未授权，请地址栏回车刷新" href="http://api.baiyug.cn/vip/index.php?url='+window.location.href+'" target="_blank">百域阁</a></li>'+
        '<li><a title="更换线路成功率会提高" href="http://q.z.vip.totv.72du.com/?url='+window.location.href+'" target="_blank">VIP看看</a></li>'+
        '<li><a title="qtzr.net" href="http://qtzr.net/s/?qt='+window.location.href+'" target="_blank">舞动秋天</a></li>'+
        '<li><a title="效果可能不稳定" href="http://yun.zihu.tv/play.html?url='+window.location.href+'" target="_blank">紫狐</a></li>'+
        '<li><a title="无名小站同源" href="http://www.sfsft.com/admin.php?url='+window.location.href+'" target="_blank">无名小站2</a></li>'+
        //接口有问题，暂时屏蔽  '<li><a title="刷出来速度慢，给点耐心" href="http://mt2t.com/yun?url='+window.location.href+'" target="_blank">云播放</a></li>'+
        '<li><a title="www.vipjiexi.com" href="http://www.vipjiexi.com/yun.php?url='+window.location.href+'" target="_blank">眼睛会下雨</a></li>'+
        '<li><a title="先用着看看" href="https://www.yymeier.com/api.php?url='+window.location.href+'" target="_blank">妹儿云</a></li>'+
        '</ul>'+
        '<ul id="setUl" class="TMul">'+
        '<li><label><input type="checkbox" id="inTabChekbx">本页解析</label></li>'+
        '<li><label><input type="checkbox" id="realLinkChekbx">爱奇艺正确选集</label></li>'+
        '</ul>'+
        '<button id="TMGobtn" class="TMbtn"><a title="默认用疯狂解析，失效请更换接口" href="http://vip.ifkdy.com/?url='+window.location.href+'" target="_blank">▶</a></button>'+
        '<button id="TMList" class="TMbtn">▷</button>'+
        '<button id="TMSet" class="TMbtn">☸</button>'+
        '</div>';
    document.body.appendChild(div);
    document.querySelector("#TMGobtn").addEventListener("click",btnGo,false);
    document.querySelector("#TMList").addEventListener("click",siteUlTg,false);
    document.querySelector("#TMSet").addEventListener("click",setUlTg,false);
    document.querySelector("#inTabChekbx").addEventListener("click",noNewTabCheck,false);
    document.querySelector("#inTabChekbx").checked=replaceRaw;
    document.querySelector("#realLinkChekbx").addEventListener("click",rightEpsLinkCheck,false);
    document.querySelector("#realLinkChekbx").checked=episodes;

    if(episodes && window.location.href.indexOf("iqiyi")!=-1){
        rightEpsLinkCheck();
    }
    if(replaceRaw && window.location.protocol!="https:"){noNewTabCheck();document.getElementById("TMSet").click();}    //https和http页面不能镶嵌。
    //if(replaceRaw){document.querySelector("#TMGobtn").style.display="none";}
})();

// 资源参考http://www.5ifxw.com/vip/
// 资源参考http://live.gopartook.com/
// 资源参考http://tv.dsqndh.com
//https协议页面：film.sohu.com

//v0.43版本地址：http://pan.baidu.com/s/1i5duNNB
//v1.0.5版本地址：http://pan.baidu.com/s/1gfDXNfP
