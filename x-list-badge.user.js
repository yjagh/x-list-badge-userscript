// ==UserScript==
// @name         X List 成员标注
// @namespace    yjli.x.listbadge
// @version      1.20260913.1902
// @description  浏览 x.com 时，给 List 1890215711097974970 中的成员：头像加圆环、@用户名后加 ★ 徽章
// @match        https://x.com/*
// @match        https://twitter.com/*
// @run-at       document-idle
// @grant        none
// @x-list-hash  9aabf638accc24bb
// @x-list-generator  3
// @license      MIT
// ==/UserScript==
//
// 本文件由自动任务根据 X List 成员名单生成，请勿手改。
// 名单：147 个成员，更新于 2026-09-13 19:02

(function () {
    'use strict';

    const MEMBER_HASHES = new Set([
        "96c06b019b71751260fdd8f13bb1130ba753ffb43b0db575f2ddc77c0bc4bbd3",
        "af917e73e8229acd58daa7702bf93a80411064f03c47db16eff05125f5f9e355",
        "f2043538b12afa9e7ab947af3cb947cedb0390bb5da7b75c111f9c69c6b1e52c",
        "48897650a8fb684efd38176e48dad3905f06189783313c69844ecd70509299ac",
        "5338408151416c5eac9e21995f180df295ffe5e9c45992462690d0af4b7462d2",
        "f45f0785c27a0d4d3a400237235d79eb9c16ffd896ec4fc681073c74e352b1a7",
        "4157053d225c7aafbbd65f4fe96809a2d25594fa548d2391748b5cfbcc9e466e",
        "b17e8ff05ca424123265df554791de52ae599e274e73674c42b32ba9ba473d43",
        "58e90f17fc48b606fe82dfc86a30c6726a058d0db58ca7a86ff211d97c267fc1",
        "565a55c5e9fe7d73338ec2256d966ecb538be15ee2de96e54e3a035b6ea20165",
        "f345c5662fb8fcaa425b42bb4274e579b28625bb71d4a6503b62b348ccb8cf02",
        "97990904d36b6643be2f79aa11cf93383e6507bc9fddfa51c62f53998ef3d3b0",
        "d31c685823db5b1ec866663922e3dd878a1ff7af89b847964b05b8daf513234c",
        "cdf30292c9f3ae20f452f4f4f5e4327a9fa74dc20d12d34eb43dfe6c9e63a4d6",
        "c4441393a38ed211e5b2cac820d9c50afb1a59cf5023f231574e4429c14f582a",
        "839672cc40bd91bad5b7ea03c2b0a163edf0a8bd25c3bcadd7e3e3f9055017dd",
        "753dd19b39240e2a16831cdb89e65bd1399255931eae34b793bbf2b86edf2c5f",
        "18cf2e727428be9567d51300c322efb687cefd0b4eeaf2adf71ee214308454f4",
        "e969a098e68a0a9eee426be422c8d4bb2a93c1f0f9034fdd9e5abfad9b65448d",
        "137011a1541b67d3d44bee39ea4b76bf5a326fd33044849a5e439f7e65589b55",
        "da2fb7cbe5844a797ba8bd40678a53645bfcada594d69482d27cce65db6e16c3",
        "ca87826c844c0308b454600d0db7ccd1cd233e03e00a3db71ddd4fc36a89d178",
        "de8047432b984b1679c88d6a5c294ef097100b30fc92c85dc3d4672e8ce0e6f5",
        "4e3d68f2d1b2b29f4a63fa9b435ba5b13b469dde26a382c0a45e8006aa7d3b4c",
        "78719ead7b1adbb68bd2fca51f87302f6c315e20615fda7a40f66b59730c6347",
        "7606ebde631cf426cf20f06fa7ffa5529c881adacfb52f6d273991e0cf4332ab",
        "2b9205585b26ed1d10e1970d6fa5bf2bf6c9031a4482a5fddd9a33f088111a20",
        "216414caa55f3f353d23b57527597ca6c1701d68c96220d6d577464c2617222b",
        "5a7f40ddd816cba2c99eec66f422328f064d5d342d2c6755859aa1deea4c17b5",
        "a1367fbe0c4a5ed23840d1c82f1d8cef67e3f31d8018beded2e06b4c641aa97b",
        "4dead3b72cd4c291f160560a36b64d9361100e4c2cd50ef4a778718d31167ed1",
        "2afbf15c5504ecf4c455062fd5d79391a2065daa4461afd485ff9d36fe568678",
        "872bb12a07c6319dee090f4c25bed8e013c3b08178d3cff4a303b9cc9eb32121",
        "892db6aebe70b85e2a22a109507caedf01088c7f4ddcd470dbbce9a59f2bfd4d",
        "d32e24dd7cd4ba602eed75e3cef6fd692c3762cd8d8ba479a6d7c34763ddf71d",
        "81b28f8834da6b87264c544b62c082e2172e62717b99694f0b050658842615f6",
        "c936817c1e2f867dbdc03aed500606b83f95f6d624d3dd6df4485789d2c1fe18",
        "dae03caa9165349c3274541155ab99d590298fa524cf7d6aeefa40e67681f8c1",
        "627710a8942d171c87876a6c3891f989f247650d2fdc48a52785d2592b739eb4",
        "1039fc5d42707468e0e7caf89e54f0c0f1f62e69a1e6ec07aa97b0847ea4a1c6",
        "f02d07b31e9d1e225a9ecebb0f2b53aaeb927ffeb4ae06090ae3babecdccdead",
        "b242bf7af35c243c8cac6510ae4ef0996e0cba541336aa4a6c2af775b7f42cd9",
        "5c64bfcd2b8b529bc2c6a3dcfc8dfb9f27303ca02aa7dedad9c2ac385bbbfafc",
        "de9722e033668f36e8df2dedb110af44871ce67d1ec3f7b2ad8e56b251777ad8",
        "cd22061909901ed247708a5af6165349fa7eeb5a33311a5bf6882d8d6212bc40",
        "76beaf63c484ae1d84fc6f4ffee9aa3f7300fe3eac78e3d75d9cb3c7ef9b499c",
        "bf95e27560ece81d64261ff0938b79678dc038377fff3e8dad8a166b1c8efe7c",
        "8b62256ee541ea399a0d6e4ce67176443e47b7a19e8a742fe3ba4a40b96ae116",
        "a871bd57d9b3c37167d2c0d098207e27cded05128c8b053cd23a2dbdfa1dd20f",
        "9eca4e7890eaa326f0abc33a9761a239751a0bfb33537067fc713b53cb2c024e",
        "98799857854b71166ded74eb83cecbeae9522fd51b25c0d7224bd23edb48f085",
        "f14cae976b6c3a0c45a6487851c8457bf8aab5e01d3f3a608db90efda9db5548",
        "a3b86b5e817564a10213ab02badb84a908bff6511e8ced138c6b529cd7cfd9a0",
        "61eb25f4c3002fda96b398bd4f70df9ee901615b68f8d7dae9be3b67c481c6af",
        "77d6fa8dc423055a8ba70f1a7979af7d4d4f65bf025fa42af40f67f132a81bb5",
        "dce0c16ef1cfead51521dd95c340b8ff2246e866542996fb4bd39ccdf89bfd69",
        "eed235cfbdbc7b95f2f4eee67000d8ab83b983d4be8633a70010521b89010aca",
        "22b4528c760f40e4530d40aae28667b378420f1715822abf002aae2c2d1d3213",
        "faa6ad2135329a8fe700ddee781354b2cadfb53b612c8e550823008f83573545",
        "6411c8d2068451011342252a352cfd8de7ad1c7f7ea79d53d5778a0c9610ca04",
        "c65429ed54acb91f0626fe269bac7e20c3d8a8be4adbf988e36007db0441bf7f",
        "31c9da42afba99e728788c7edcc1e657812db8b1bbd6bbb402b715b280549f74",
        "4e5d4d97abce0d4678c0c39fd9833da6b5b3b7fc1782de6bc80d7c203e6c6d43",
        "e5bf14e8f55911506dd6a780ab9dde80128f4fa3344f53b05eed7006429999e3",
        "c0def53cac9e7490a22ccb8c90f855ef914408fea5c69a52ad36d4af4c97291e",
        "76305053d32b1390a05bb780034abc7757170d4bc07d62253068aa4d06e8173e",
        "1cf76aa7081bea18cb89f10e60ce6d009071123894f804d5419a73fa95a6193b",
        "61f6d8ff4d4a509438a5f7377dc9572ade828b179eff900c18a966c2f8d56c43",
        "5e417d3bfe6d329dc66a1e8fd1bf6be99cf54c65b46b7695a9846e6925e4763c",
        "33879ea21adafa0cbc760265117bbfb20bc502450693e16a76c1575396d8f121",
        "de25fd7d10364fc2df313894ce8b7d45b802b8a0a7f6b128a93ffdf7f13f2394",
        "ea165b01f0400053109bc2e9f4c4be0e5abca6a4fcbde3cd17b1b123d81515c7",
        "44bddcb3019625e0c9242e6cd0df5db89f53a3e914374267b56d967eee104460",
        "bd2487f0e818e22399992b4070db62a46aff56b66e13594a48a5b0814de577af",
        "33d06780c27b60dcd599222e563a031fc2db8246fe01ef048890674d319923f7",
        "eab12ea3ae6a8c5c6e08989194fc8aa9a308e3b50e9a48f1102621aa3556d17a",
        "3102be60769bfaddccfe82ba5bb9d86f540bee11ef42f612047771eb7b50bd8c",
        "f6a7dc764072575103184e813b080aaf6a531bad0b6dc25ee03f36e15af0eaa3",
        "db9608d56a6c6196c056143f3ef49f0ed4812e475e48aedf46e60c0bd52ce8e1",
        "0ec88c5a2a3677b284afd18d2211bc784743d0d8b3c4d3d615b25c3173d2ce7b",
        "abe23ac34036835f1ef0c5b0f7094a241392e3ac577ffa82759da1746ac08765",
        "bc146cdf7d80e348dde2296244ed1a47964f20e41a910aed67a9cae1f39f9239",
        "dc866362e20aecef48857e480462c8866c0cd7a1c8d281527b141f308c0deef7",
        "dcef73ed46a7c30082ba3e5407e9b9035123d30dbc20befd02aa2fc297cfed08",
        "aca9240ba9f421702d6dd295d994180eaf477d4ff4c9fae7549ddba9e60c3337",
        "09cdd9cbab31f4873bf22aee2c6854fac08ed35191bb417b286515cd752bef13",
        "98e45a0851536dd82d558306c2cfbfca367d30a31f47865a368359201c20af25",
        "7ece0564de6290a8fd82b5e0c7060e72653cc5ab9ce3934af43e2b5c907ec70c",
        "c1cf810cf402e430b063ca1845a08dcec989d85423ba6a8f126e04a7d6903019",
        "5ca2555aef23781bd742fceda3769188a9174b51e35df91abb306009addd8172",
        "cc2777eb28edd233c917059e9685f6369473dcae17fa2eb8eb4bfa11af826daf",
        "742856fa15c3598760f141ea0d8b27374577c046eebbe0c904f49febbd51a229",
        "5cfbf98cc9a3199d61d227e547d4fe9590b76ec61c590be4d1e901a3af81fa91",
        "a5542cdd873612637ea58396b123f67c7a3d762bf6654714d71d76ae630cafbd",
        "789afe649e8f4abb0d2ffc39997a44a24b66605623bbdc9c99ff5e9659cf5c6c",
        "4072e14e6da82f0617f4c372504de945a2bda3a591f89d22c1ceb76e9a805efd",
        "39fb6d8492defe98c585df8a187a8721cad9f150a1fa8a5c9c164ae49d216ba8",
        "a5b9cfee54f2fc7a67778fffaf92dbde720f1dfd2ef264d92a336b693595d0ec",
        "6cf0a06845adee6e915e07690e40035bd8db74f966d64e995d40bf6bbd2a77af",
        "b2013fa59d192a4c733de7ea7319899ce8de3e5be46c34aca9db596b2f6ad4bf",
        "ad1b5de6b7a877c281735cd6b0bfb733144d47ec6207bb54e40384c8f95f85ae",
        "e27a5c676d445d6da6870721277b26ffaf50bd8138e216b70caced8967d1e9ac",
        "da3a5dc4da9c1c9098122fc14961285415e56e82c47d202ef6de52b1ba328127",
        "cdd1febcabe995fa7c240099e0209827d2b47b6d0bae716edc5219cca8813a5b",
        "23dc6ffa5d537839d265d5525495d7c70ab08abae615539d7208faa3da374ba3",
        "2cc538ec5b60f332eea334f5b2619733c95d244c7b23044a35c1d138dffc0d36",
        "b45b580184a4bae20917f0e448f3c6085205e8f9acdbed421b617a019440df37",
        "fdae245a41a8de2cf29cf0ae3303fe837408f23f2dab0f2e5e3a40fd5ca3b3c0",
        "552bf92758bc79ce248c17dc879a93ba8c990631e16a12ac0984decb91635ead",
        "07829b7ea9563edeb59500d4a814d2c1dbeb4580f0a665f2cddfd6765cf092e7",
        "52c1a7e77cce757e1f31d4d84951bd8d46505dca660e22f3991724c2b81b5ea5",
        "2e06f81b2c709b979a5f88413f3faeb115af0ecf5f3fc82d3761a1870cf6d85f",
        "40d3399153322b32ce7467c7308d77927fdf84f925e46d14f7337e1cca9ce1b7",
        "5fd2d156fa6d3a90fc5fdb3f645b4ed3ab6f55e52f8efba909793fb6590bc75d",
        "a9ca0a2729014722551664b48d2ae30a6cf0807c3361223cf0dba511f0591dd8",
        "a9b3c97edf0b41a7f2ac0f40506ed5b30f0914c730dee9310513bb0012bc392a",
        "1d7d119bc57b079a0542b7eefc058e2f02eb7d719089b7d6bf54ee6e7e0c2929",
        "3c0afb5cc87234164b9390ccac80f387f9b72e37f8a5712be160715042d0c2e6",
        "ed270bce58ae9d85ae8966c87c1c2d435418d56d39f11e4f4591f4c648d3f628",
        "e5ae07f9f1d8e14e53a64ca5fe59f50eef825feed9e972a0fb676fb11e922eb6",
        "d575b3e1d56906edc42c27a1c3127d1360e90226cef21dddfdebe1dbbb7245da",
        "5d7fbf825a501c4106909bf1cb235ca338ba99809b357cbc6b51761b3aa83459",
        "348f99ef0eb9425840374e7fabcdf681bc3ffa1fe5059358eb0e9b2273c1ea83",
        "0bccc8b7fd538a433914eb8e6832fe2a1ce3e75a349d15be647294e589e3b98e",
        "fbd1a58cd2373e8330c5dcd41f6212bffb335b0149ed5d5a4823e3160509d74f",
        "d3d99690b3e935fd2b592436753b5c5876d1d1504a41c3ff0f3da5b4ee5b82d7",
        "f3082eed02a43e41c823a1653c3081df4c00afd7bcb4970ce12e1ad4031b0469",
        "52e9a165503c1a1906a0fe21ea2945ab8917bb83df16d63989c4f946317371fb",
        "1204c0a5c6c31bf604af8df73cf3b7af037bc6ea2e7242e3673b2170e28d7f0d",
        "13d7c6af3268e821fd858292c8d44b83c8f090358fb29a9b299eac47290a42ae",
        "68be3250c527723225dfe00cc6cf17b19e615aadbd344648f6c07b7cc9e7f986",
        "587e5c9db8f1613cb51cf0988c4dbfdf9e69ff82c7e793195d83fca6b8f6681c",
        "b51f1b391df04133ed5d0c264846d1703ec219c52c001794c4858f3b9df89412",
        "ada73a543a945d5c4a265c98ba544fda62c13296a283518b32f447ee6ace259f",
        "e923be23eaa4233b172f31c36caafba077dee278f569805f7eab40836af48098",
        "7a044f67ac5242da4e3ed72645449c268de5547df700df94acf663a75975990c",
        "27204a40309f87b12b8a27e0ef117e4be6bf421ee1aacbb4bd75435ea82f730a",
        "188746f796fcb4b85753f314688469c4414a98131098b9b841da9f0311680d59",
        "55fdc4f8dca4a7011c26ce380c0e6005841bde73a05afb5aaa026d93ab5066cd",
        "0824aa019dae498d470d35ab2ec3d24b6ffd6a6337bee976b1dd8c207c0415ef",
        "3c47cf04466aaf07d33debfec0806d0453df344811c4d22deaa42e7d596ba937",
        "842bd8c0a03bc0d34fe0b1d4a7c48395068fe802ad57d9c23206ceaf00438249",
        "858c5cb74d59df2eda8d7a9fa26723ad186ba6a3d349b85ee2797c4b966867ca",
        "70764586a2b29697a2ca7336e5c5e284cc7fc3c79c0593354cfc02a4e0fe03a5",
        "d219db88bfcd6c86af4cb883398b89ba44a2fe9f2417d586c6681a6908113993",
        "3dfb32c235793444d41f15e3be6091189697f70f64fff830cfef1553e81f88c6",
        "8efea36343102a9f90b279d84a4effcc72255f8a467842ce6c587f3d367f2787",
    ]);

    const encoder = new TextEncoder();
    const membershipCache = new Map();

    function isMember(handle) {
        let cached = membershipCache.get(handle);
        if (!cached) {
            cached = crypto.subtle.digest('SHA-256', encoder.encode(handle)).then((buffer) => {
                const digest = Array.from(new Uint8Array(buffer),
                    (byte) => byte.toString(16).padStart(2, '0')).join('');
                return MEMBER_HASHES.has(digest);
            });
            membershipCache.set(handle, cached);
        }
        return cached;
    }

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
    async function scanOnce() {
        // 先清掉所有旧标记再重打：X 时间线是虚拟列表会回收复用 DOM 节点，
        // 留着旧标记会张冠李戴（把上一个用户的标记留给回收后的新用户）
        for (const el of document.querySelectorAll('[data-xlb]')) el.removeAttribute('data-xlb');

        const candidates = [];
        for (const a of document.querySelectorAll('a[href^="/"]')) {
            const m = RE.exec(a.getAttribute('href') || '');
            if (m) candidates.push([a, m[1].toLowerCase()]);
        }

        const matches = await Promise.all(candidates.map(([, handle]) => isMember(handle)));
        candidates.forEach(([a, handle], index) => {
            if (!matches[index] || !a.isConnected) return;
            const current = RE.exec(a.getAttribute('href') || '');
            if (!current || current[1].toLowerCase() !== handle) return;
            if ((a.textContent || '').trim().startsWith('@')) {
                // 徽章挂到内层 inline <span> 而不是链接本身：链接是 flex-direction:column，
                // ::after 会变成 flex item 被竖着挤到下一行
                (a.querySelector('span') || a).setAttribute('data-xlb', 'handle');
            } else if (a.querySelector('img')) {
                // 圆环用 inset 阴影画在盒子内部：头像链接的父级是等大的 overflow:hidden，
                // 画在外面的 outline / 非 inset 阴影会被整个裁掉
                a.setAttribute('data-xlb', 'avatar');
            }
        });
    }

    let scanning = false;
    let rescan = false;
    async function scan() {
        if (scanning) {
            rescan = true;
            return;
        }
        scanning = true;
        try {
            do {
                rescan = false;
                await scanOnce();
            } while (rescan);
        } finally {
            scanning = false;
        }
    }

    let timer = null;
    const kick = () => { clearTimeout(timer); timer = setTimeout(scan, 200); };
    new MutationObserver(kick).observe(document.body, { childList: true, subtree: true });
    kick();
})();
