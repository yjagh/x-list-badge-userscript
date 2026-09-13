// ==UserScript==
// @name         X List 成员标注
// @namespace    yjli.x.listbadge
// @version      1.20260913.1852
// @description  浏览 x.com 时，给 List 1890215711097974970 中的成员：头像加圆环、@用户名后加 ★ 徽章
// @match        https://x.com/*
// @match        https://twitter.com/*
// @run-at       document-idle
// @grant        none
// @x-list-hash  9aabf638accc24bb
// @x-list-generator  2
// @license      MIT
// ==/UserScript==
//
// 本文件由自动任务根据 X List 成员名单生成，请勿手改。
// 名单：147 个成员，更新于 2026-09-13 18:52

(function () {
    'use strict';

    const MEMBERS = new Set([
        "3aaaxxx3",
        "4kokuhaku",
        "9_jfm",
        "_jade_love1278",
        "aakashrana99975",
        "abnagi77",
        "adaxhl",
        "afiqkreyzfickry",
        "alwayswin_27",
        "anoano021",
        "anosayhii",
        "anxiaoan999",
        "azy7928",
        "baina200",
        "baitaotao_",
        "balabiu3398301",
        "bbsxangelia",
        "bocchi_usagi_",
        "buonbella",
        "casper59230065",
        "ces66gg",
        "chen_dezheng",
        "chipsinblack",
        "cimk1vl",
        "cuic9794",
        "cutecutenut",
        "daiyushihuangdi",
        "dalianerya888",
        "daydreamer2777",
        "deepocean_2022",
        "deng_fly_2",
        "dian_jiao96205",
        "doctorwang",
        "elfno_shashin",
        "enthus1asmm",
        "fds6090",
        "fengsiyuan",
        "fxtyoo",
        "fxtyos",
        "gooo_glee",
        "gunlt_",
        "hanpujushi",
        "haohanshibari",
        "harshsyc",
        "hckfad",
        "heeyeon_photo",
        "hekui322",
        "hotre_",
        "ies_anh",
        "iiizutad1",
        "ikeoji_mitsu",
        "iocos69",
        "isayblueisblue",
        "japapov",
        "jbny5413",
        "jingyeshiwu",
        "jojoz9786",
        "k_202505",
        "kana_kawaiiii",
        "kimikimi_photo",
        "kiss520777",
        "kmjfub",
        "kuzu_v53",
        "laibeinaixiba",
        "lan_shazhou",
        "lazzizhang",
        "lazzizhang2025",
        "linheanan",
        "lullaby1107",
        "luoyuan9115",
        "lvlv333kiss",
        "lyl945",
        "mascarponeeeeee",
        "mellow_yuri_",
        "milf_nukinuki",
        "mixed_wilson",
        "mixmico3",
        "mixmico4",
        "mouren_zhangc",
        "mr_sandman525",
        "na__tu__sb",
        "nanamodeltt",
        "narichan__v",
        "natsu201703",
        "natu_sakura_",
        "ncmsncmsncms",
        "nhatihoc",
        "ninicherri",
        "oldmuyang",
        "olympicartist",
        "pang_xie08",
        "penn040458",
        "pepepeqwq",
        "petcat_",
        "pick41805430",
        "poxbe2",
        "qing_3181",
        "qingjiaowoxiaoq",
        "realjademo",
        "rope_magic",
        "ruum_7",
        "rzt0571",
        "sara_fujie914",
        "sentoyun",
        "serenamotolaye",
        "sice3000",
        "somefluoxetine",
        "something__jojo",
        "superzworks",
        "sweetduskred",
        "tasha99106",
        "tsuki7_july",
        "usagi_bocchi_",
        "v_works2020",
        "vbnhjkuio",
        "vegoro1",
        "violetbaby2004",
        "vvhotwife",
        "wanimal912",
        "want616326751",
        "warlordgba",
        "watever177",
        "wesley_5219",
        "whisperframe",
        "whiteplace_1",
        "withzcqdxz",
        "wmv_vmw",
        "wnzi1318861",
        "wongxide",
        "wsssui",
        "wwobushivvvvv",
        "xiangcaibaozha",
        "xiaohedith",
        "xiaohuanosay",
        "xiaozhinana",
        "xixi34753378286",
        "xqian97",
        "yezihoooo",
        "yimingxvp",
        "yinxiangzupai12",
        "yunthus_",
        "yuumtx",
        "zhishi88888",
        "zhiyi1029",
        "zoe2496",
        "zpzniao",
        "zzz_zenithh",
    ]);

    const BADGE = '★';
    const COLOR = '#f5a623';
    const RING_WIDTH = '2px';

    // 徽章/圆环全用 CSS 属性选择器渲染，不往 DOM 里插节点——
    // React 重渲染会抹掉插入的节点，而属性 + 伪元素对布局侵入最小、也更稳
    const style = document.createElement('style');
    style.textContent = `
        [data-xlb="handle"]::after {
            content: "${BADGE}";
            color: ${COLOR};
            margin-left: 3px;
            font-size: 0.9em;
        }
        a[data-xlb="avatar"] {
            box-shadow: inset 0 0 0 ${RING_WIDTH} ${COLOR};
            border-radius: 50%;
        }
    `;
    document.documentElement.appendChild(style);

    const RE = /^\/([A-Za-z0-9_]{1,15})$/;

    // 同一个用户的头像链接、昵称链接、@handle 链接 href 完全相同，靠"链接内容"区分：
    // 有 <img> 的是头像，文本以 @ 开头的是 handle，昵称链接不标（否则一条推文三个标记）
    function scan() {
        // 先清掉所有旧标记再重打：X 时间线是虚拟列表会回收复用 DOM 节点，
        // 留着旧标记会张冠李戴（把上一个用户的标记留给回收后的新用户）
        for (const el of document.querySelectorAll('[data-xlb]')) el.removeAttribute('data-xlb');

        for (const a of document.querySelectorAll('a[href^="/"]')) {
            const m = RE.exec(a.getAttribute('href') || '');
            if (!m || !MEMBERS.has(m[1].toLowerCase())) continue;
            if ((a.textContent || '').trim().startsWith('@')) {
                // 徽章挂到内层 inline <span> 而不是链接本身：链接是 flex-direction:column，
                // ::after 会变成 flex item 被竖着挤到下一行
                (a.querySelector('span') || a).setAttribute('data-xlb', 'handle');
            } else if (a.querySelector('img')) {
                // 圆环用 inset 阴影画在盒子内部：头像链接的父级是等大的 overflow:hidden，
                // 画在外面的 outline / 非 inset 阴影会被整个裁掉
                a.setAttribute('data-xlb', 'avatar');
            }
        }
    }

    let timer = null;
    const kick = () => { clearTimeout(timer); timer = setTimeout(scan, 200); };
    new MutationObserver(kick).observe(document.body, { childList: true, subtree: true });
    kick();
})();
